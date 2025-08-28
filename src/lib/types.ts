import type {
  ExtractStructuredDataFromResumeOutput,
} from '@/ai/flows/extract-structured-data-from-resume';
import type {
  RankCandidatesBySimilarityOutput,
} from '@/ai/flows/rank-candidates-by-similarity';
import type {
  SummarizeCandidateQualificationsOutput,
} from '@/ai/flows/summarize-candidate-qualifications';

export type ParsedResume = ExtractStructuredDataFromResumeOutput;
export type CandidateRanking = RankCandidatesBySimilarityOutput;
export type AiSummary = SummarizeCandidateQualificationsOutput;

export type ProcessingResult = {
  parsedData: ParsedResume;
  ranking: CandidateRanking;
  summary: AiSummary;
};
