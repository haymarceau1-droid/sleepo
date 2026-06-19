import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { Starfield } from '../ui/Starfield';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-aave-bg flex flex-col relative">
      <Starfield />
      <main className="flex-1 overflow-y-auto pb-[max(66px,calc(50px+env(safe-area-inset-bottom,0px)+16px))] relative z-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
