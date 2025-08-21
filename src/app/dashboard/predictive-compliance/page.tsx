
import { DashboardHeader } from '@/components/dashboard-header';
import { PredictiveComplianceForm } from '@/components/predictive-compliance-form';

export default function PredictiveCompliancePage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Predictive Compliance" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <PredictiveComplianceForm />
      </main>
    </div>
  );
}
