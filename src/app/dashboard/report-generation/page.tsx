
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2 } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard-header';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  accreditationType: z.string().min(1, 'Please select an accreditation type.'),
  reportType: z.string().min(1, 'Please select a report type.'),
  department: z.string().min(1, 'Please select a department'),
  includeSubCriteria: z.boolean().default(false),
});

const criteriaMap = {
  NAAC: [
    { id: '1', label: 'Criterion 1: Curricular Aspects' },
    { id: '2', label: 'Criterion 2: Teaching-learning and Evaluation' },
    { id: '3', label: 'Criterion 3: Research, Innovations and Extension' },
    { id: '4', label: 'Criterion 4: Infrastructure and Learning Resources' },
    { id: '5', label: 'Criterion 5: Student Support and Progression' },
  ],
  NBA: [
    { id: '1', label: 'Criterion 1: Vision, Mission and Program Educational Objectives' },
    { id: '2', label: 'Criterion 2: Program Curriculum and Teaching-Learning Processes' },
    { id: '3', label: 'Criterion 3: Course Outcomes and Program Outcomes' },
    { id: '4', label: 'Criterion 4: Students’ Performance' },
  ],
  NIRF: [
    { id: '1', label: 'Teaching, Learning & Resources (TLR)' },
    { id: '2', label: 'Research and Professional Practice (RP)' },
    { id: '3', label: 'Graduation Outcomes (GO)' },
    { id: '4', label: 'Outreach and Inclusivity (OI)' },
  ],
};

export default function ReportGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accreditationType: 'NAAC',
      reportType: 'SSR',
      department: 'all',
      includeSubCriteria: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setGeneratedReport(null);

    // Simulate API call to generate report
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: 'Report Generated Successfully',
      description: `Your ${values.reportType} report for ${values.accreditationType} is ready.`,
    });

    setGeneratedReport(
      `This is a simulated ${values.reportType} report for the ${values.department} department, focusing on ${values.accreditationType} accreditation. Sub-criteria are ${values.includeSubCriteria ? 'included' : 'not included'}.\n\nReport Details:\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam.`
    );
    setIsGenerating(false);
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <DashboardHeader title="Report Generation" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate Accreditation Report</CardTitle>
              <CardDescription>
                Select your parameters to generate a customized report.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
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
                    name="reportType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Report Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SSR">
                              Self-Study Report (SSR)
                            </SelectItem>
                            <SelectItem value="SAR">
                              Self Assessment Report (SAR)
                            </SelectItem>
                            <SelectItem value="Compliance">
                              Compliance Report
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            <SelectItem value="Computer Science">
                              Computer Science
                            </SelectItem>
                            <SelectItem value="Mechanical Engineering">
                              Mechanical Engineering
                            </SelectItem>
                            <SelectItem value="Electronics Engineering">
                              Electronics Engineering
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="includeSubCriteria"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                         <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Include Sub-Criteria Details</FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <FileText className="mr-2 h-4 w-4" />
                    )}
                    Generate Report
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generated Report</CardTitle>
              <CardDescription>
                Your report will appear here once generated.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              {isGenerating ? (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Generating your report...
                  </p>
                </div>
              ) : generatedReport ? (
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <FileText className="h-8 w-8 text-primary" />
                       <p className="text-lg font-medium">Report Ready!</p>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {generatedReport}
                    </pre>
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="rounded-full bg-secondary p-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Configure your report options and click "Generate Report".
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
