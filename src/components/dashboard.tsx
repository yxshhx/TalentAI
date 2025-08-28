'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { processResume } from '@/app/actions';
import type { ProcessingResult } from '@/lib/types';
import { CandidateProfile, CandidateProfileSkeleton } from './candidate-profile';
import { RankingResults, RankingResultsSkeleton } from './ranking-results';
import { AiSummary, AiSummarySkeleton } from './ai-summary';
import { ConfigPanel } from './config-panel';
import { TalentAILogo } from './logo';
import { FileUp, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';

export function Dashboard() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeDataUri, setResumeDataUri] = useState<string>('');
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [isAnonymized, setIsAnonymized] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setResumeDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!resumeDataUri) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload a resume.',
      });
      return;
    }
    if (!jobDescription.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide a job description.',
      });
      return;
    }

    startTransition(async () => {
      setResults(null);
      try {
        const data = await processResume(resumeDataUri, jobDescription);
        setResults(data);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Processing Failed',
          description: error.message || 'An unexpected error occurred.',
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <TalentAILogo className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">TalentAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="anonymize-mode" checked={isAnonymized} onCheckedChange={setIsAnonymized} />
              <Label htmlFor="anonymize-mode">Anonymize</Label>
            </div>
            <ConfigPanel />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Screen Candidate</CardTitle>
                <CardDescription>Upload a resume and provide the job description to begin analysis.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="resume-upload">Resume</Label>
                    <Input id="resume-upload" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" className="file:text-primary file:font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={10}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Candidate'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-2">
            {isPending && (
              <>
                <CandidateProfileSkeleton />
                <RankingResultsSkeleton />
                <AiSummarySkeleton />
              </>
            )}

            {results && !isPending && (
              <>
                <CandidateProfile data={results.parsedData} isAnonymized={isAnonymized} />
                <RankingResults data={results.ranking} />
                <AiSummary data={results.summary} />
              </>
            )}

            {!results && !isPending && (
              <Card className="flex h-[60vh] flex-col items-center justify-center text-center">
                <CardContent className="space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                    <FileUp className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Awaiting Analysis</h3>
                  <p className="text-muted-foreground">Your candidate analysis results will appear here.</p>
                </CardContent>
              </Card>
            )}
            
            <Card>
                <CardHeader>
                    <CardTitle>ATS Integration</CardTitle>
                    <CardDescription>Connect TalentAI to your existing Applicant Tracking Systems.</CardDescription>
                </CardHeader>
                <CardContent className='flex items-center gap-4'>
                    <Badge variant="outline">Workday</Badge>
                    <Badge variant="outline">Greenhouse</Badge>
                    <Badge variant="outline">Lever</Badge>
                    <Button variant="secondary" size="sm" disabled>Connect ATS</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
