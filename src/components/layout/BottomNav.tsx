import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const tabs = [
  {
    id: 'home',
    label: 'Accueil',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'focus',
    label: 'Focus',
    path: '/evening',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 'profil',
    label: 'Profil',
    path: '/morning',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
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
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  return (
    <nav ref={navRef} className="glass-tab-bar fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="h-[50px] flex items-center justify-around px-3 pb-[max(0px,env(safe-area-inset-bottom,0px))]">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-[2px] relative"
            >
              {active && (
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-[20px] h-[2.5px] rounded-full bg-gradient-to-r from-amber-400/80 to-celadon-400/80" />
              )}
              <div className={`w-[44px] h-[26px] flex items-center justify-center transition-all duration-300 ${
                active ? 'scale-100' : 'scale-90'
              }`}>
                {tab.icon(active)}
              </div>
              <span className={`text-[10px] font-medium tracking-[0.01em] transition-all duration-300 ${
                active ? 'text-white' : 'text-white/35'
              }`}>
                {tab.label}
              </span>
              {active && (
                <div className="w-[4px] h-[4px] rounded-full bg-amber-400/60 mt-[1px] animate-pulse-soft" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
