'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-powered document verification.
 *
 * - aiDocumentVerification -  verifies documents for accreditation eligibility using AI.
 * - AIDocumentVerificationInput - The input type for the aiDocumentVerification function.
 * - AIDocumentVerificationOutput - The return type for the aiDocumentVerification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDocumentVerificationInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document to be verified, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  institutionType: z
    .string()
    .describe('The type of institution submitting the document (e.g., NAAC, NBA, NIRF).'),
  criteria: z.string().describe('The specific accreditation criteria to verify against.'),
});
export type AIDocumentVerificationInput = z.infer<typeof AIDocumentVerificationInputSchema>;

const AIDocumentVerificationOutputSchema = z.object({
  isEligible: z.boolean().describe('Whether the document is eligible for the specified accreditation.'),
  confidenceScore: z
    .number()
    .describe('A score between 0 and 1 indicating the confidence in the eligibility determination.'),
  explanation: z.string().describe('An explanation of why the document is eligible or ineligible.'),
});
export type AIDocumentVerificationOutput = z.infer<typeof AIDocumentVerificationOutputSchema>;

export async function aiDocumentVerification(input: AIDocumentVerificationInput): Promise<AIDocumentVerificationOutput> {
  return aiDocumentVerificationFlow(input);
}

const aiDocumentVerificationPrompt = ai.definePrompt({
  name: 'aiDocumentVerificationPrompt',
  input: {schema: AIDocumentVerificationInputSchema},
  output: {schema: AIDocumentVerificationOutputSchema},
  prompt: `You are an AI document verification expert specializing in accreditation eligibility.

You will assess the provided document to determine its eligibility for the specified accreditation criteria, considering the institution type.

Based on your analysis, determine whether the document is eligible or ineligible, providing a confidence score (0-1) and a clear explanation for your decision.

Institution Type: {{{institutionType}}}
Accreditation Criteria: {{{criteria}}}
Document: {{media url=documentDataUri}}`,
});

const aiDocumentVerificationFlow = ai.defineFlow(
  {
    name: 'aiDocumentVerificationFlow',
    inputSchema: AIDocumentVerificationInputSchema,
    outputSchema: AIDocumentVerificationOutputSchema,
  },
  async input => {
    const {output} = await aiDocumentVerificationPrompt(input);
    return output!;
  }
);
