'use client';

import type { ParsedResume } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, GraduationCap, Mail, Phone, User, Star } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface CandidateProfileProps {
  data: ParsedResume;
  isAnonymized: boolean;
}

export function CandidateProfile({ data, isAnonymized }: CandidateProfileProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    {isAnonymized ? 'Anonymous Candidate' : data.name} 
                    <Badge variant="secondary">{data.experienceYears} YOE</Badge>
                </CardTitle>
                <CardDescription className='flex items-center gap-4 mt-2'>
                    <span className='flex items-center gap-2'><Mail className="h-4 w-4" /> {isAnonymized ? 'hidden@email.com' : data.email}</span>
                    <span className='flex items-center gap-2'><Phone className="h-4 w-4" /> {isAnonymized ? '***-***-****' : data.phone}</span>
                </CardDescription>
            </div>
            {isAnonymized && <Badge color='amber'>Anonymized</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Star className="h-5 w-5 text-accent" /> Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">{skill}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5 text-accent" /> Work History</h3>
          <div className="space-y-4 border-l-2 border-border pl-4">
            {data.workHistory.map((job, index) => (
              <div key={index} className="relative">
                 <div className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-primary"></div>
                <p className="font-semibold text-md">{job.role} at {job.company}</p>
                <p className="text-sm text-muted-foreground">{job.durationMonths} months</p>
                <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                  {job.keyAchievements.map((ach, i) => <li key={i}>{ach}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><GraduationCap className="h-5 w-5 text-accent" /> Education</h3>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index}>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CandidateProfileSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <div className='flex items-center gap-4 mt-2'>
                           <Skeleton className="h-5 w-48" />
                           <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Skeleton className="h-6 w-24 mb-2" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-28" />
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-4 border-l-2 border-border pl-4">
                       <div className="space-y-2">
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-3/4" />
                       </div>
                       <div className="space-y-2">
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-3/4" />
                       </div>
                    </div>
                </div>
                <div>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
