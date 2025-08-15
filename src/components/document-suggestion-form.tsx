'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestDocumentsAction } from '@/app/actions';
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
import type { DocumentSuggestionOutput } from '@/ai/flows/document-suggestion';
import { FileSearch, Lightbulb, Loader2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const formSchema = z.object({
  accreditationType: z.string().min(1, 'Please select an accreditation type.'),
  institutionData: z
    .string()
    .min(50, 'Please provide at least 50 characters of institution data.'),
});

export function DocumentSuggestionForm() {
  const [result, setResult] = useState<DocumentSuggestionOutput | null>(null);
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

    const response = await suggestDocumentsAction(values);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Suggestion Failed',
        description: response.error,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Get Document Suggestions</CardTitle>
          <CardDescription>
            Describe your institution and our AI will suggest relevant
            documents for your accreditation.
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
                    <FormLabel>Institution Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your institution's programs, faculty, resources, etc."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description for better suggestions.
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
                Get Suggestions
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Suggested Documents</CardTitle>
          <CardDescription>
            AI-powered suggestions based on your input.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Generating suggestions...</p>
            </div>
          ) : result ? (
            <ScrollArea className="h-[350px] w-full">
              <ul className="space-y-3 pr-4">
                {result.suggestedDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      <FileSearch className="h-3 w-3 text-primary" />
                    </div>
                    <span className="flex-1 text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
               <div className="rounded-full bg-secondary p-4">
                 <Lightbulb className="h-8 w-8 text-muted-foreground" />
               </div>
              <p className="text-muted-foreground">
                Enter your institution's data to receive document suggestions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
