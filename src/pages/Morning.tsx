import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';

function GuardianRing({ pct }: { pct: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className="transform -rotate-90">
      <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
      <circle
        cx="65" cy="65" r={r}
        fill="none"
        stroke="url(#energyGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <defs>
        <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#7dd3c0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const mockFriends = [
  { name: 'Thomas', hours: 7.5, emoji: '🐺' },
  { name: 'Camille', hours: 6.8, emoji: '🦉' },
  { name: 'Lucas', hours: 8.2, emoji: '🦊' },
];

export function Morning() {
  const answers = useGameStore((s) => s.answers);
  const streak = useGameStore((s) => s.streak);
  const rootRef = useRef<HTMLDivElement>(null);
  const energyRef = useRef<HTMLSpanElement>(null);
  const seriesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });

    gsap.fromTo(el.querySelector('.aa-header'),
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    const cards = el.querySelectorAll('.aa-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 16, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: 'power3.out', delay: 0.03 }
    );

    if (energyRef.current && answers.eveningEnergy) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: answers.eveningEnergy, duration: 1.2, delay: 0.45, ease: 'power2.out',
        onUpdate: () => { energyRef.current!.textContent = Math.round(obj.val).toString(); },
      });
    }
    if (seriesRef.current && streak.currentStreak) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: streak.currentStreak, duration: 1, delay: 0.55, ease: 'power2.out',
        onUpdate: () => { seriesRef.current!.textContent = Math.round(obj.val).toString(); },
      });
    }
  }, []);

  const guardianEmoji = () => {
    switch (answers.guardian) {
      case 'loup': return '🐺';
      case 'hibou': return '🦉';
      case 'renard': return '🦊';
      case 'cerf': return '🦌';
      case 'ours': return '🐻';
      default: return '🌙';
    }
  };

  const energyPct = answers.eveningEnergy ? Math.round((answers.eveningEnergy / 10) * 100) : 0;

  const maxHours = Math.max(...mockFriends.map((f) => f.hours));

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <div className="flex flex-col items-center pt-6 pb-2 aa-header">
        <div className="text-[34px] mb-1">🌅</div>
        <h1 className="text-[24px] font-bold tracking-[-0.03em] text-white mt-1">
          Bonjour, aventurier
        </h1>
        <p className="text-[13px] text-white/35 mt-0.5">Ton bilan de la nuit</p>
      </div>

      <GlassCard className="p-[20px] flex flex-col items-center aa-card">
        <div className="relative flex items-center justify-center">
          <GuardianRing pct={energyPct} />
          <div className="absolute flex flex-col items-center">
            <span className="text-[28px] mb-1">{guardianEmoji()}</span>
            <span ref={energyRef} className="text-[22px] font-bold tracking-[-0.03em] text-white">
              {answers.eveningEnergy ?? '-'}
            </span>
            <span className="text-[9px] text-white/35 uppercase tracking-[0.06em] mt-0.5">Énergie</span>
          </div>
        </div>

        <div className="flex justify-between w-full mt-5 pt-4 border-t border-white/[0.04]">
          <div className="text-center flex-1">
            <p className="text-[22px] font-bold tracking-[-0.03em]"><span ref={seriesRef}>{streak.currentStreak}</span></p>
            <p className="text-[10px] text-white/35 mt-0.5 uppercase tracking-[0.04em]">Série</p>
          </div>
          <div className="w-[1px] bg-white/[0.04] mx-2" />
          <div className="text-center flex-1">
            <p className="text-[22px] font-bold tracking-[-0.03em]">
              {answers.idealBedtime ?? '-'}<span className="text-[14px] text-white/40">h</span>
            </p>
            <p className="text-[10px] text-white/35 mt-0.5 uppercase tracking-[0.04em]">Coucher</p>
          </div>
          <div className="w-[1px] bg-white/[0.04] mx-2" />
          <div className="text-center flex-1">
            <p className="text-[22px] font-bold tracking-[-0.03em]">{streak.longestStreak}</p>
            <p className="text-[10px] text-white/35 mt-0.5 uppercase tracking-[0.04em]">Record</p>
          </div>
        </div>

        <div className="mt-4 w-full bg-white/[0.02] rounded-[10px] p-2.5">
          <p className="text-[11px] text-white/40 text-center leading-relaxed">
            {streak.currentStreak > 0
              ? `🔥 ${streak.currentStreak} nuits d'affilée. Continue comme ça !`
              : "🌱 Pas de pression. Ce soir est une nouvelle chance."}
          </p>
        </div>
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-white/80 mb-3.5">Heures de sommeil</h3>
        <div className="space-y-3">
          {mockFriends.map((friend) => (
            <div key={friend.name} className="flex items-center gap-3">
              <span className="text-[16px] w-[24px] text-center">{friend.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[12px] font-medium text-white/70">{friend.name}</span>
                  <span className="text-[11px] text-white/40">{friend.hours}h</span>
                </div>
                <div className="w-full h-[5px] rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400/60 to-celadon-400/60"
                    style={{ width: `${(friend.hours / maxHours) * 100}%`, transition: 'width 0.8s ease 0.3s' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
