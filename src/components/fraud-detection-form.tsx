'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { detectFraudAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { FraudDetectionOutput } from '@/ai/flows/fraud-detection';
import { Loader2, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { Progress } from './ui/progress';

const formSchema = z.object({
  document:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length === 1, 'A document is required.'),
});

export function FraudDetectionForm() {
  const [result, setResult] = useState<FraudDetectionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: undefined,
    },
  });

  const fileRef = form.register('document');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    const file = values.document[0];
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload a document.',
      });
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      const response = await detectFraudAction({ documentDataUri: dataUri });

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Fraud Detection Failed',
          description: response.error,
        });
      }
      setIsLoading(false);
    };
    reader.onerror = (error) => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the uploaded file.',
      });
      console.error('FileReader error:', error);
      setIsLoading(false);
    };
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Detect Document Fraud</CardTitle>
          <CardDescription>
            Upload a document and our AI will analyze it for signs of fraud.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document (PDF, JPEG, PNG)</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} accept=".pdf,.jpeg,.jpg,.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Analyze Document
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>
            The AI-powered fraud analysis will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing document...</p>
            </div>
          ) : result ? (
            <div className="w-full space-y-4">
              <div
                className={`flex items-center gap-4 rounded-lg border p-4 ${
                  result.isFraudulent
                    ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'
                    : 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'
                }`}
              >
                {result.isFraudulent ? (
                  <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
                ) : (
                  <ShieldCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {result.isFraudulent
                      ? 'Potential Fraud Detected'
                      : 'No Fraud Detected'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Based on AI analysis.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <span className="text-sm font-medium">
                    Confidence Score
                  </span>
                  <span className="text-sm font-bold text-primary">{`${(
                    result.confidenceScore * 100
                  ).toFixed(0)}%`}</span>
                </div>
                <Progress
                  value={result.confidenceScore * 100}
                  className="h-2"
                />
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Reasoning</h4>
                <p className="rounded-md bg-secondary p-3 text-sm text-muted-foreground">
                  {result.reasoning}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full bg-secondary p-4">
                <ShieldQuestion className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Submit a document to begin fraud analysis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
