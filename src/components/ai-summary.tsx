'use client';

import type { AiSummary } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, ListChecks, AlertTriangle,ThumbsUp } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface AiSummaryProps {
  data: AiSummary;
}

export function AiSummary({ data }: AiSummaryProps) {
  const confidencePercent = Math.round(data.confidenceScore * 100);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-6 w-6 text-primary" /> AI Summary & Insights</CardTitle>
        <CardDescription>
            Generated insights based on resume and job description. Confidence: <Badge variant="secondary">{confidencePercent}%</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Executive Summary</h4>
          <p className="text-sm text-muted-foreground">{data.executiveSummary}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2"><ListChecks className='text-accent h-5 w-5' /> Key Qualifications</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {data.keyQualifications.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
            </div>
            <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2"><AlertTriangle className='text-orange-500 h-5 w-5' /> Potential Concerns</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {data.potentialConcerns.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
            </div>
        </div>

        <div>
            <h4 className="font-semibold flex items-center gap-2 mb-2"><ThumbsUp className='text-accent h-5 w-5' /> Overall Recommendation</h4>
            <p className="text-sm text-muted-foreground italic">"{data.overallRecommendation}"</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function AiSummarySkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-72 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-1" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                     <div>
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
                 <div>
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </CardContent>
        </Card>
    )
}
