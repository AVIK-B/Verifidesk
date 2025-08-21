
import { DashboardHeader } from '@/components/dashboard-header';
import { DocumentSuggestionForm } from '@/components/document-suggestion-form';

export default function DocumentSuggestionPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Document Suggestions" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <DocumentSuggestionForm />
      </main>
    </div>
  );
}
