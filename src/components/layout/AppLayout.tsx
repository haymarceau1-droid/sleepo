import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Starfield } from '../ui/Starfield';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-aave-bg flex flex-col relative">
      <Starfield />

      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-[#102b3f]/80 backdrop-blur-[20px] border-b border-white/[0.03]">
        <div className="flex items-center justify-between h-[48px] px-4">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">🌙</span>
            <span className="text-[14px] font-semibold text-white tracking-tight">Sleepo</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/stats')}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button className="relative text-white/30 hover:text-white/60 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div className="absolute -top-1 -right-1 w-[7px] h-[7px] rounded-full bg-[#a06cd5] shadow-[0_0_6px_rgba(160,108,213,0.4)]" />
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-[max(66px,calc(50px+env(safe-area-inset-bottom,0px)+16px))] relative z-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
