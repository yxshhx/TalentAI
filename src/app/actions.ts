'use server';

import {
  extractStructuredDataFromResume,
} from '@/ai/flows/extract-structured-data-from-resume';
import {
  rankCandidatesBySimilarity,
} from '@/ai/flows/rank-candidates-by-similarity';
import {
  summarizeCandidateQualifications,
} from '@/ai/flows/summarize-candidate-qualifications';
import type { ProcessingResult } from '@/lib/types';

function formatResumeAsText(data: any): string {
  let text = `Candidate: ${data.name}\nContact: ${data.email}, ${data.phone}\n\n`;
  text += `Total Experience: ${data.experienceYears} years\n\n`;
  text += `Skills:\n- ${data.skills.join('\n- ')}\n\n`;

  text += 'Education:\n';
  data.education.forEach((edu: any) => {
    text += `- ${edu.degree} from ${edu.institution} (${edu.year})\n`;
  });

  text += '\nWork History:\n';
  data.workHistory.forEach((work: any) => {
    text += `- ${work.role} at ${work.company} (${work.durationMonths} months)\n`;
    text += `  Key Achievements:\n`;
    work.keyAchievements.forEach((ach: string) => {
      text += `    - ${ach}\n`;
    });
  });

  return text;
}

export async function processResume(
  resumeDataUri: string,
  jobDescription: string
): Promise<ProcessingResult> {
  if (!resumeDataUri) {
    throw new Error('Resume file is required.');
  }
  if (!jobDescription) {
    throw new Error('Job description is required.');
  }

  try {
    const parsedData = await extractStructuredDataFromResume({ resumeDataUri });
    const resumeAsText = formatResumeAsText(parsedData);

    const [ranking, summary] = await Promise.all([
      rankCandidatesBySimilarity({
        resume: resumeAsText,
        jobDescription: jobDescription,
      }),
      summarizeCandidateQualifications({
        resumeText: resumeAsText,
        jobDescription: jobDescription,
      }),
    ]);

    return { parsedData, ranking, summary };
  } catch (error) {
    console.error('Error processing resume:', error);
    throw new Error('Failed to process the resume. Please try again.');
  }
}
