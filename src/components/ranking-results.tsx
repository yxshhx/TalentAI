'use client';

import type { CandidateRanking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, CheckCircle, AlertCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface RankingResultsProps {
  data: CandidateRanking;
}

export function RankingResults({ data }: RankingResultsProps) {
  const overallScorePercent = Math.round(data.overallScore * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Ranking</CardTitle>
        <CardDescription>Semantic similarity and skill matching analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-semibold">Overall Score</h4>
            <span className="font-bold text-lg text-primary">{overallScorePercent}%</span>
          </div>
          <Progress value={overallScorePercent} className="h-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='space-y-4'>
            <h4 className="font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500" /> Strengths</h4>
            <div className="flex flex-wrap gap-2">
                {data.strengths.map((strength, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{strength}</span>
                    </div>
                ))}
            </div>
          </div>
          <div className='space-y-4'>
            <h4 className="font-semibold flex items-center gap-2"><TrendingDown className="h-5 w-5 text-orange-500" /> Areas for Improvement</h4>
            <div className="flex flex-wrap gap-2">
                {data.areasForImprovement.map((area, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span>{area}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RankingResultsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-64 mt-1" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='space-y-4'>
                        <Skeleton className="h-6 w-24" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-5/6" />
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <Skeleton className="h-6 w-48" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
