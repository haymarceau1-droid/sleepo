import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const tabs = [
  {
    id: 'home',
    label: 'Jardin',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'stats',
    label: 'Sommeil',
    path: '/stats',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: 'circle',
    label: 'Cercle',
    path: '/sleepcircle',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'profil',
    label: 'Profil',
    path: '/profil',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.15 }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="bg-[#102b3f]/92 border-t border-white/[0.04] backdrop-blur-[40px]">
        <div className="h-[56px] flex items-center justify-around px-1 pb-[max(0px,env(safe-area-inset-bottom,0px))]">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 relative px-0.5"
              >
                {active && (
                  <div className="absolute inset-0.5 rounded-[10px] bg-gradient-to-br from-[#6247AA]/20 to-[#a06cd5]/10" />
                )}
                <div className={`flex items-center justify-center transition-all duration-300 ${
                  active ? 'scale-100' : 'scale-90 opacity-50'
                }`}>
                  {tab.icon(active)}
                </div>
                <span className={`text-[8px] font-semibold tracking-[0.02em] transition-all duration-300 ${
                  active ? 'text-[#e2cfea]' : 'text-white/30'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
