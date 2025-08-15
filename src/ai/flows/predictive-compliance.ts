'use server';

/**
 * @fileOverview Implements the predictive compliance flow to identify potential accreditation gaps.
 *
 * - predictComplianceGaps - Predicts compliance gaps based on past submissions.
 * - PredictiveComplianceInput - The input type for the predictComplianceGaps function.
 * - PredictiveComplianceOutput - The return type for the predictComplianceGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveComplianceInputSchema = z.object({
  institutionData: z
    .string()
    .describe('Data representing the institution, including past accreditation submissions and related information.'),
  accreditationType: z
    .string()
    .describe('The type of accreditation being pursued (e.g., NAAC, NBA, NIRF).'),
});
export type PredictiveComplianceInput = z.infer<typeof PredictiveComplianceInputSchema>;

const PredictiveComplianceOutputSchema = z.object({
  complianceGaps: z
    .string()
    .describe('A detailed report of predicted compliance gaps and areas needing improvement.'),
  suggestions: z
    .string()
    .describe('Specific suggestions to address the identified compliance gaps.'),
});
export type PredictiveComplianceOutput = z.infer<typeof PredictiveComplianceOutputSchema>;

export async function predictComplianceGaps(
  input: PredictiveComplianceInput
): Promise<PredictiveComplianceOutput> {
  return predictiveComplianceFlow(input);
}

const predictiveCompliancePrompt = ai.definePrompt({
  name: 'predictiveCompliancePrompt',
  input: {schema: PredictiveComplianceInputSchema},
  output: {schema: PredictiveComplianceOutputSchema},
  prompt: `You are an expert in accreditation processes (NAAC, NBA, NIRF) for academic institutions.

  Based on the institution's data and the type of accreditation they are pursuing, identify potential compliance gaps and suggest improvements.

  Institution Data: {{{institutionData}}}
  Accreditation Type: {{{accreditationType}}}

  Provide a detailed report of compliance gaps and specific suggestions to address them.
  Ensure the output is formatted according to the PredictiveComplianceOutputSchema description.
  `, // Ensure the output is formatted according to the PredictiveComplianceOutputSchema description.
});

const predictiveComplianceFlow = ai.defineFlow(
  {
    name: 'predictiveComplianceFlow',
    inputSchema: PredictiveComplianceInputSchema,
    outputSchema: PredictiveComplianceOutputSchema,
  },
  async input => {
    const {output} = await predictiveCompliancePrompt(input);
    return output!;
  }
);
