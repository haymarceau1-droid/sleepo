import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlassCard } from '../components/ui/GlassCard';

const friendsData = [
  { name: 'Thomas', guardian: '🐺', score: 93, sleepHours: 8.2, defisReussis: 15, online: true },
  { name: 'Lucas', guardian: '🦊', score: 85, sleepHours: 7.5, defisReussis: 12, online: true },
  { name: 'Hugo', guardian: '🐻', score: 78, sleepHours: 6.5, defisReussis: 10, online: false },
  { name: 'Camille', guardian: '🦉', score: 72, sleepHours: 6.8, defisReussis: 8, online: false },
  { name: 'Emma', guardian: '🦌', score: 68, sleepHours: 7.0, defisReussis: 5, online: true },
];

export function SleepCircle() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });

    gsap.fromTo(el.querySelector('.aa-header'),
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    const items = el.querySelectorAll('.aa-friend');
    gsap.fromTo(items,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.12 }
    );
  }, []);

  const maxScore = Math.max(...friendsData.map(f => f.score));
  const sorted = [...friendsData].sort((a, b) => b.score - a.score);

  const rankBadge = (rank: number) => {
    if (rank === 0) return { bg: 'bg-amber-400/15', text: 'text-amber-400', icon: '🥇' };
    if (rank === 1) return { bg: 'bg-slate-300/10', text: 'text-slate-300', icon: '🥈' };
    if (rank === 2) return { bg: 'bg-amber-700/10', text: 'text-amber-700', icon: '🥉' };
    return { bg: 'bg-white/[0.03]', text: 'text-white/30', icon: `${rank + 1}` };
  };

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <div className="flex flex-col items-center pt-6 pb-1 aa-header">
        <div className="text-[34px] mb-1">🌌</div>
        <h1 className="text-[24px] font-bold tracking-[-0.03em] text-white mt-1">
          Le Cercle du Sommeil
        </h1>
        <p className="text-[13px] text-white/35 mt-0.5">Grandir ensemble, une nuit à la fois</p>
      </div>

      <GlassCard className="!p-0 overflow-hidden aa-card">
        <div className="px-[16px] py-[12px] flex items-center justify-between border-b border-white/[0.04]">
          <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-white">Classement</h2>
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-white/30">
            {sorted.length} membres
          </span>
        </div>

        <div>
          {sorted.map((friend, i) => {
            const badge = rankBadge(i);
            const barW = (friend.score / maxScore) * 100;
            return (
              <div
                key={friend.name}
                className="flex items-center gap-3 px-[16px] py-[11px] active:bg-white/[0.01] transition-colors aa-friend"
              >
                <div className={`w-[24px] text-center ${badge.text}`}>
                  <span className="text-[12px] font-semibold">{badge.icon}</span>
                </div>

                <div className="relative flex-shrink-0">
                  <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[17px] ${
                    i === 0 ? 'bg-amber-400/10' : 'bg-white/[0.04]'
                  }`}>
                    {friend.guardian}
                  </div>
                  <div className={`absolute -bottom-[1px] -right-[1px] w-[9px] h-[9px] rounded-full border-[2px] border-[#0f0f10] ${
                    friend.online ? 'bg-celadon-400 shadow-[0_0_6px_rgba(125,211,192,0.4)]' : 'bg-white/[0.08]'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white/85">{friend.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-[4px] rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          i === 0
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                            : 'bg-white/[0.12]'
                        }`}
                        style={{ width: `${barW}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-1">
                  <p className="text-[16px] font-bold text-white/90 tracking-[-0.02em]">{friend.score}</p>
                  <p className="text-[8px] font-semibold text-white/25 uppercase tracking-[0.06em]">Score</p>
                </div>

                <button className="ml-0.5 px-[9px] h-[26px] rounded-[7px] bg-amber-500/10 border border-amber-500/12 text-amber-400/80 text-[10px] font-medium hover:bg-amber-500/15 transition-colors active:scale-95 whitespace-nowrap flex-shrink-0">
                  Bonne nuit
                </button>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-white/80 mb-2">Cette semaine</h3>
        <div className="flex items-center justify-around py-2">
          <div className="text-center">
            <p className="text-[11px] text-white/35">🥇 Meilleur score</p>
            <p className="text-[20px] font-bold text-amber-400 mt-0.5">{maxScore}</p>
            <p className="text-[10px] text-white/30">{sorted[0].name}</p>
          </div>
          <div className="w-[1px] h-[32px] bg-white/[0.04]" />
          <div className="text-center">
            <p className="text-[11px] text-white/35">🔥 Défis réussis</p>
            <p className="text-[20px] font-bold text-celadon-400 mt-0.5">
              {sorted.reduce((acc, f) => acc + f.defisReussis, 0)}
            </p>
            <p className="text-[10px] text-white/30">Total du groupe</p>
          </div>
          <div className="w-[1px] h-[32px] bg-white/[0.04]" />
          <div className="text-center">
            <p className="text-[11px] text-white/35">🌙 Heures moy.</p>
            <p className="text-[20px] font-bold text-white/80 mt-0.5">
              {(sorted.reduce((acc, f) => acc + f.sleepHours, 0) / sorted.length).toFixed(1)}
            </p>
            <p className="text-[10px] text-white/30">par nuit</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
