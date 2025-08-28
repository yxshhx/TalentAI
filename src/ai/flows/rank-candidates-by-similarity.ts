'use server';
/**
 * @fileOverview Ranks candidates based on the semantic similarity between their resume and the job description.
 *
 * - rankCandidatesBySimilarity - A function that ranks candidates based on the similarity between their resume and the job description.
 * - RankCandidatesBySimilarityInput - The input type for the rankCandidatesBySimilarity function.
 * - RankCandidatesBySimilarityOutput - The return type for the rankCandidatesBySimilarity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankCandidatesBySimilarityInputSchema = z.object({
  resume: z
    .string()
    .describe('The resume content as a string.'),
  jobDescription: z.string().describe('The job description as a string.'),
});
export type RankCandidatesBySimilarityInput = z.infer<typeof RankCandidatesBySimilarityInputSchema>;

const RankCandidatesBySimilarityOutputSchema = z.object({
  overallScore: z
    .number()
    .describe("The overall similarity score between the resume and the job description. Should be between 0 and 1."),
  scoringBreakdown: z.object({
    semanticSimilarity: z.number().describe('The semantic similarity score.'),
  }),
  strengths: z.array(z.string()).describe('Key strengths of the candidate.'),
  areasForImprovement: z.array(z.string()).describe('Areas where the candidate can improve.'),
});
export type RankCandidatesBySimilarityOutput = z.infer<typeof RankCandidatesBySimilarityOutputSchema>;

export async function rankCandidatesBySimilarity(
  input: RankCandidatesBySimilarityInput
): Promise<RankCandidatesBySimilarityOutput> {
  return rankCandidatesBySimilarityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rankCandidatesBySimilarityPrompt',
  input: {schema: RankCandidatesBySimilarityInputSchema},
  output: {schema: RankCandidatesBySimilarityOutputSchema},
  prompt: `You are an expert recruiter, and will analyze a resume and a job description to determine how well a candidate matches the job. Return a score between 0 and 1 to represent the overall fit, and key strengths, and areas for improvement.

Resume:
{{resume}}

Job Description:
{{jobDescription}}`,
});

const rankCandidatesBySimilarityFlow = ai.defineFlow(
  {
    name: 'rankCandidatesBySimilarityFlow',
    inputSchema: RankCandidatesBySimilarityInputSchema,
    outputSchema: RankCandidatesBySimilarityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
