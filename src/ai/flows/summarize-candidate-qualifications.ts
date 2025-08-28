'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing a candidate's qualifications from their resume.
 *
 * - summarizeCandidateQualifications - A function that takes resume data and returns a summarized qualification.
 * - SummarizeCandidateQualificationsInput - The input type for the summarizeCandidateQualifications function.
 * - SummarizeCandidateQualificationsOutput - The return type for the summarizeCandidateQualifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCandidateQualificationsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be summarized.'),
  jobDescription: z.string().describe('The job description for which the candidate is being considered.'),
});
export type SummarizeCandidateQualificationsInput = z.infer<typeof SummarizeCandidateQualificationsInputSchema>;

const SummarizeCandidateQualificationsOutputSchema = z.object({
  executiveSummary: z.string().describe('A concise summary of the candidate qualifications.'),
  keyQualifications: z.array(z.string()).describe('List of key qualifications.'),
  potentialConcerns: z.array(z.string()).describe('List of potential concerns.'),
  overallRecommendation: z.string().describe('Overall recommendation for the candidate.'),
  confidenceScore: z.number().describe('Confidence score for the summary and recommendation.'),
});
export type SummarizeCandidateQualificationsOutput = z.infer<typeof SummarizeCandidateQualificationsOutputSchema>;

export async function summarizeCandidateQualifications(input: SummarizeCandidateQualificationsInput): Promise<SummarizeCandidateQualificationsOutput> {
  return summarizeCandidateQualificationsFlow(input);
}

const summarizeCandidateQualificationsPrompt = ai.definePrompt({
  name: 'summarizeCandidateQualificationsPrompt',
  input: {schema: SummarizeCandidateQualificationsInputSchema},
  output: {schema: SummarizeCandidateQualificationsOutputSchema},
  prompt: `You are an expert HR assistant specializing in candidate screening.

You will receive a resume text and a job description. Your task is to summarize the candidate's qualifications and experience from the resume, focusing on their key strengths and determining if they are a good fit for the role described in the job description.

Resume:
{{resumeText}}

Job Description:
{{jobDescription}}

Provide an executive summary, key qualifications, potential concerns, an overall recommendation, and a confidence score.

Output in JSON format:
{{output}}`,
});

const summarizeCandidateQualificationsFlow = ai.defineFlow(
  {
    name: 'summarizeCandidateQualificationsFlow',
    inputSchema: SummarizeCandidateQualificationsInputSchema,
    outputSchema: SummarizeCandidateQualificationsOutputSchema,
  },
  async input => {
    const {output} = await summarizeCandidateQualificationsPrompt(input);
    return output!;
  }
);
