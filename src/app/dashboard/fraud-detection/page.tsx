import { DashboardHeader } from '@/components/dashboard-header';
import { FraudDetectionForm } from '@/components/fraud-detection-form';

export default function FraudDetectionPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="AI Fraud Detection" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <FraudDetectionForm />
      </main>
    </div>
  );
}
