import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const tabs = [
  {
    id: 'home',
    label: 'Accueil',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'focus',
    label: 'Focus',
    path: '/evening',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 'profil',
    label: 'Bilan',
    path: '/morning',
    icon: (active: boolean) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill={active ? 'white' : 'none'} stroke="white" strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
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
        <div className="h-[56px] flex items-center justify-around px-2 pb-[max(0px,env(safe-area-inset-bottom,0px))]">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 relative"
              >
                {active && (
                  <div className="absolute inset-1 rounded-[12px] bg-gradient-to-br from-[#6247AA]/20 to-[#a06cd5]/10" />
                )}
                <div className={`flex items-center justify-center transition-all duration-300 ${
                  active ? 'scale-100' : 'scale-90 opacity-50'
                }`}>
                  {tab.icon(active)}
                </div>
                <span className={`text-[9px] font-semibold tracking-[0.02em] transition-all duration-300 ${
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
