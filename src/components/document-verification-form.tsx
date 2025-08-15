'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { verifyDocumentAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { AIDocumentVerificationOutput } from '@/ai/flows/ai-document-verification';
import { CheckCircle, Loader2, ThumbsDown, ThumbsUp, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const formSchema = z.object({
  document:
    typeof window === 'undefined'
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((files) => files?.length === 1, 'A document is required.'),
  institutionType: z.string().min(1, 'Please select an institution type.'),
  criteria: z.string().min(3, 'Please specify the accreditation criteria.'),
});

export function DocumentVerificationForm() {
  const [result, setResult] = useState<AIDocumentVerificationOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: undefined,
      institutionType: '',
      criteria: '',
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
      const response = await verifyDocumentAction({
        documentDataUri: dataUri,
        institutionType: values.institutionType,
        criteria: values.criteria,
      });

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification Failed',
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
          <CardTitle>Verify Document</CardTitle>
          <CardDescription>
            Upload a document and our AI will verify its eligibility against
            accreditation criteria.
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
                    <FormLabel>Document (PDF, JPEG)</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} accept=".pdf,.jpeg,.jpg,.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="institutionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accreditation Body</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an accreditation body" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NAAC">NAAC</SelectItem>
                        <SelectItem value="NBA">NBA</SelectItem>
                        <SelectItem value="NIRF">NIRF</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="criteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accreditation Criteria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 'Criterion 1.1.1: Curriculum Design'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The specific criteria to verify against.
                    </FormDescription>
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
                Verify Document
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verification Result</CardTitle>
          <CardDescription>
            The AI-powered verification results will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-[300px] items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Verifying document...</p>
            </div>
          ) : result ? (
            <div className="w-full space-y-4">
              <div className={`flex items-center gap-4 rounded-lg border p-4 ${result.isEligible ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'}`}>
                {result.isEligible ? <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" /> : <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {result.isEligible ? 'Eligible' : 'Ineligible'}
                  </h3>
                  <p className="text-sm text-muted-foreground">Based on the provided criteria.</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-sm font-bold text-primary">{`${(result.confidenceScore * 100).toFixed(0)}%`}</span>
                </div>
                <Progress value={result.confidenceScore * 100} className="h-2" />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Explanation</h4>
                <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                  {result.explanation}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Submit a document to see the verification result.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
