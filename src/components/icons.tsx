import { BotMessageSquare } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

export function Logo({ className }: { className?: string }) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[collapsed=icon]:p-1.5">
        <BotMessageSquare className="w-6 h-6 group-data-[collapsed=icon]:w-5 group-data-[collapsed=icon]:h-5 transition-all" />
      </div>
      {!isCollapsed && (
        <h1 className="text-lg font-bold text-primary whitespace-nowrap">
          Accreditation Ace
        </h1>
      )}
    </div>
  );
}

    