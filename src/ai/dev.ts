import { config } from 'dotenv';
config();

import '@/ai/flows/rank-candidates-by-similarity.ts';
import '@/ai/flows/summarize-candidate-qualifications.ts';
import '@/ai/flows/extract-structured-data-from-resume.ts';