import { DashboardHeader } from '@/components/dashboard-header';
import { DocumentVerificationForm } from '@/components/document-verification-form';

export default function DocumentVerificationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="AI Document Verification" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <DocumentVerificationForm />
      </main>
    </div>
  );
}
