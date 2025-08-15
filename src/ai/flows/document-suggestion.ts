'use server';

/**
 * @fileOverview Document suggestion flow for accreditation officers.
 *
 * - suggestDocuments - A function that suggests relevant documents based on the institution's data.
 * - DocumentSuggestionInput - The input type for the suggestDocuments function.
 * - DocumentSuggestionOutput - The return type for the suggestDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentSuggestionInputSchema = z.object({
  institutionData: z
    .string()
    .describe(
      'A description of the institution, including its programs, faculty, and resources.'
    ),
  accreditationType: z
    .string()
    .describe('The type of accreditation being sought (e.g., NAAC, NBA, NIRF).'),
});
export type DocumentSuggestionInput = z.infer<typeof DocumentSuggestionInputSchema>;

const DocumentSuggestionOutputSchema = z.object({
  suggestedDocuments: z
    .array(z.string())
    .describe('A list of suggested documents relevant to the institution and accreditation type.'),
});
export type DocumentSuggestionOutput = z.infer<typeof DocumentSuggestionOutputSchema>;

export async function suggestDocuments(input: DocumentSuggestionInput): Promise<DocumentSuggestionOutput> {
  return suggestDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentSuggestionPrompt',
  input: {schema: DocumentSuggestionInputSchema},
  output: {schema: DocumentSuggestionOutputSchema},
  prompt: `You are an expert accreditation consultant. Based on the provided institution data and the type of accreditation being sought, suggest a list of relevant documents that the institution should gather.

Institution Data: {{{institutionData}}}
Accreditation Type: {{{accreditationType}}}

Suggested Documents:`, // Handlebars syntax is used here
});

const suggestDocumentsFlow = ai.defineFlow(
  {
    name: 'suggestDocumentsFlow',
    inputSchema: DocumentSuggestionInputSchema,
    outputSchema: DocumentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
