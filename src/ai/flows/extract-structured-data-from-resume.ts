'use server';
/**
 * @fileOverview A resume parsing AI agent.
 *
 * - extractStructuredDataFromResume - A function that handles the resume parsing process.
 * - ExtractStructuredDataFromResumeInput - The input type for the extractStructuredDataFromResume function.
 * - ExtractStructuredDataFromResumeOutput - The return type for the extractStructuredDataFromResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractStructuredDataFromResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractStructuredDataFromResumeInput = z.infer<typeof ExtractStructuredDataFromResumeInputSchema>;

const ExtractStructuredDataFromResumeOutputSchema = z.object({
  name: z.string().describe('The name of the candidate.'),
  email: z.string().describe('The email address of the candidate.'),
  phone: z.string().describe('The phone number of the candidate.'),
  skills: z.array(z.string()).describe('A list of skills possessed by the candidate.'),
  experienceYears: z.number().describe('The total years of experience of the candidate.'),
  education: z.array(
    z.object({
      degree: z.string().describe('The degree obtained.'),
      institution: z.string().describe('The institution where the degree was obtained.'),
      year: z.number().describe('The year the degree was obtained.'),
    })
  ).describe('A list of the candidate\'s education history.'),
  workHistory: z.array(
    z.object({
      company: z.string().describe('The name of the company.'),
      role: z.string().describe('The role held at the company.'),
      durationMonths: z.number().describe('The duration of employment in months.'),
      keyAchievements: z.array(z.string()).describe('A list of key achievements in the role.'),
    })
  ).describe('A list of the candidate\'s work history.'),
});
export type ExtractStructuredDataFromResumeOutput = z.infer<typeof ExtractStructuredDataFromResumeOutputSchema>;

export async function extractStructuredDataFromResume(input: ExtractStructuredDataFromResumeInput): Promise<ExtractStructuredDataFromResumeOutput> {
  return extractStructuredDataFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractStructuredDataFromResumePrompt',
  input: {schema: ExtractStructuredDataFromResumeInputSchema},
  output: {schema: ExtractStructuredDataFromResumeOutputSchema},
  prompt: `You are an expert resume parser. Your job is to extract structured data from resumes.

  Extract the following information from the resume:
  - Name
  - Email
  - Phone
  - Skills
  - Experience Years
  - Education
  - Work History

  Here is the resume:
  {{media url=resumeDataUri}}
  `,
});

const extractStructuredDataFromResumeFlow = ai.defineFlow(
  {
    name: 'extractStructuredDataFromResumeFlow',
    inputSchema: ExtractStructuredDataFromResumeInputSchema,
    outputSchema: ExtractStructuredDataFromResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
