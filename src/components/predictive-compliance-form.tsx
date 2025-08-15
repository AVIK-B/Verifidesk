'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { predictComplianceAction } from '@/app/actions';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { PredictiveComplianceOutput } from '@/ai/flows/predictive-compliance';
import { Lightbulb, Loader2, AlertTriangle, CheckSquare } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const formSchema = z.object({
  accreditationType: z.string().min(1, 'Please select an accreditation type.'),
  institutionData: z
    .string()
    .min(50, 'Please provide at least 50 characters of institution data.'),
});

export function PredictiveComplianceForm() {
  const [result, setResult] = useState<PredictiveComplianceOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accreditationType: '',
      institutionData: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    const response = await predictComplianceAction(values);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Prediction Failed',
        description: response.error,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Predict Compliance Gaps</CardTitle>
          <CardDescription>
            Provide your institution's past data to predict potential
            compliance gaps.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="accreditationType"
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
                name="institutionData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Submissions & Institution Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Summarize past accreditation submissions, reports, and other relevant institutional data..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detail you provide, the more accurate the prediction.
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
                Predict Gaps
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Prediction</CardTitle>
          <CardDescription>
            AI-predicted gaps and suggestions for improvement.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing data...</p>
            </div>
          ) : result ? (
            <ScrollArea className="h-[350px] w-full">
              <div className="space-y-6 pr-4">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Predicted Compliance Gaps
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-2 rounded-md border border-destructive/20 bg-destructive/5 p-4">
                     <p>{result.complianceGaps}</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold">
                    <CheckSquare className="h-5 w-5 text-green-600" />
                    Improvement Suggestions
                  </h3>
                   <div className="text-sm text-muted-foreground space-y-2 rounded-md border border-green-600/20 bg-green-500/5 p-4">
                     <p>{result.suggestions}</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full bg-secondary p-4">
                <Lightbulb className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Enter your institution's data to predict compliance gaps.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
