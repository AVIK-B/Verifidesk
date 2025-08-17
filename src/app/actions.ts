'use server';

import {
  aiDocumentVerification,
  AIDocumentVerificationInput,
} from '@/ai/flows/ai-document-verification';
import {
  predictComplianceGaps,
  PredictiveComplianceInput,
} from '@/ai/flows/predictive-compliance';
import {
  suggestDocuments,
  DocumentSuggestionInput,
} from '@/ai/flows/document-suggestion';
import { detectFraud, FraudDetectionInput } from '@/ai/flows/fraud-detection';
import { z } from 'zod';

const verifyDocumentSchema = z.object({
  documentDataUri: z.string(),
  institutionType: z.string(),
  criteria: z.string(),
});

export const verifyDocumentAction = async (
  input: AIDocumentVerificationInput
) => {
  const validatedInput = verifyDocumentSchema.parse(input);
  try {
    const result = await aiDocumentVerification(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to verify document.' };
  }
};

const suggestDocumentsSchema = z.object({
  institutionData: z.string(),
  accreditationType: z.string(),
});

export const suggestDocumentsAction = async (
  input: DocumentSuggestionInput
) => {
  const validatedInput = suggestDocumentsSchema.parse(input);
  try {
    const result = await suggestDocuments(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to suggest documents.' };
  }
};

const predictComplianceSchema = z.object({
  institutionData: z.string(),
  accreditationType: z.string(),
});

export const predictComplianceAction = async (
  input: PredictiveComplianceInput
) => {
  const validatedInput = predictComplianceSchema.parse(input);
  try {
    const result = await predictComplianceGaps(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to predict compliance gaps.' };
  }
};

const detectFraudSchema = z.object({
  documentDataUri: z.string(),
});

export const detectFraudAction = async (
  input: FraudDetectionInput
) => {
  const validatedInput = detectFraudSchema.parse(input);
  try {
    const result = await detectFraud(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to detect fraud.' };
  }
};
