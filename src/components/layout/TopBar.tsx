import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const titles: Record<string, string> = {
  '/home': 'Accueil',
  '/evening': 'Mission du soir',
  '/morning': 'Bilan',
  '/sleepcircle': 'Cercle',
};

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const barRef = useRef<HTMLDivElement>(null);
  const title = titles[location.pathname] ?? 'Sleepo';

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, []);

  return (
    <header ref={barRef} className="glass-nav sticky top-0 z-40 safe-top">
      <div className="h-[52px] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-[17px]">🌙</span>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">{title}</span>
        </div>

        <div className="flex items-center gap-[18px]">
          <button onClick={() => navigate('/sleepcircle')} className="text-white/35 hover:text-white/70 transition-colors" aria-label="Cercle de sommeil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button className="text-white/35 hover:text-white/70 transition-colors" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button className="text-white/35 hover:text-white/70 transition-colors" aria-label="Paramètres">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
