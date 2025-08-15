import { BotMessageSquare } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[collapsed=icon]:p-1.5">
        <BotMessageSquare className="w-6 h-6 group-data-[collapsed=icon]:w-5 group-data-[collapsed=icon]:h-5 transition-all" />
      </div>
      <h1 className="text-lg font-bold text-primary group-data-[collapsed=icon]:hidden whitespace-nowrap">
        verifidesk.io
      </h1>
    </div>
  );
}
