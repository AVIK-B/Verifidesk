'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-powered fraud detection in documents.
 *
 * - detectFraud -  Analyzes documents for signs of fraudulent activity.
 * - FraudDetectionInput - The input type for the detectFraud function.
 * - FraudDetectionOutput - The return type for the detectFraud function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document to be analyzed for fraud, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the document is likely fraudulent.'),
  confidenceScore: z
    .number()
    .describe('A score between 0 and 1 indicating the confidence in the fraud determination.'),
  reasoning: z.string().describe('An explanation of why the document is considered fraudulent or not.'),
});
export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return fraudDetectionFlow(input);
}

const fraudDetectionPrompt = ai.definePrompt({
  name: 'fraudDetectionPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an AI fraud detection expert. Your task is to analyze the provided document for any signs of fraudulent activity, such as tampering, forged signatures, inconsistent information, or altered content.

Based on your analysis, determine if the document is fraudulent, provide a confidence score (from 0 to 1), and give a detailed reasoning for your conclusion.

Document for analysis: {{media url=documentDataUri}}`,
});

const fraudDetectionFlow = ai.defineFlow(
  {
    name: 'fraudDetectionFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await fraudDetectionPrompt(input);
    return output!;
  }
);
