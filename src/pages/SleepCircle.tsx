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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo(el.querySelectorAll('.aa-friend'),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.04 },
        '-=0.15'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const maxScore = Math.max(...friendsData.map(f => f.score));
  const sorted = [...friendsData].sort((a, b) => b.score - a.score);

  const rankBadge = (rank: number) => {
    if (rank === 0) return { bg: 'bg-[#6247AA]/20', text: 'text-[#8063d2]', icon: '🥇' };
    if (rank === 1) return { bg: 'bg-white/[0.05]', text: 'text-white/60', icon: '🥈' };
    if (rank === 2) return { bg: 'bg-white/[0.03]', text: 'text-white/40', icon: '🥉' };
    return { bg: 'bg-white/[0.02]', text: 'text-white/30', icon: `${rank + 1}` };
  };

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <GlassCard className="!p-0 overflow-hidden aa-card">
        <div className="px-[16px] py-[12px] flex items-center justify-between border-b border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <span className="text-[16px]">🌌</span>
            <h2 className="text-[14px] font-semibold text-white">Liste des amis</h2>
          </div>
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
                className="flex items-center gap-3 px-[16px] py-[11px] active:bg-white/[0.01] transition-colors aa-friend hover:bg-white/[0.01]"
              >
                <div className={`w-[24px] text-center ${badge.text}`}>
                  <span className="text-[12px] font-semibold">{badge.icon}</span>
                </div>

                <div className="relative flex-shrink-0">
                  <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[17px] ${
                    i === 0 ? 'bg-[#6247AA]/15' : 'bg-white/[0.04]'
                  }`}>
                    {friend.guardian}
                  </div>
                  <div className={`absolute -bottom-[1px] -right-[1px] w-[9px] h-[9px] rounded-full border-[2px] border-[#0a0d14] ${
                    friend.online ? 'bg-[#8063d2] shadow-[0_0_6px_rgba(128,99,210,0.4)]' : 'bg-white/[0.08]'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium text-white/85">{friend.name}</p>
                    <span className="text-[10px] text-white/30">{friend.sleepHours}h</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-[4px] rounded-full bg-white/[0.05] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          i === 0
                            ? 'bg-gradient-to-r from-[#6247AA] to-[#8063d2]'
                            : 'bg-white/[0.12]'
                        }`}
                        style={{ width: `${barW}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-white/25 font-medium">{friend.defisReussis} défis</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-1">
                  <p className="text-[16px] font-bold text-[#8063d2] tracking-[-0.02em]">{friend.score}</p>
                  <p className="text-[8px] font-semibold text-white/25 uppercase tracking-[0.06em]">Score</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-2">Cette semaine</h3>
        <div className="flex items-center justify-around py-2">
          <div className="text-center">
            <p className="text-[11px] text-white/35">🥇 Meilleur score</p>
            <p className="text-[20px] font-bold text-[#8063d2] mt-0.5">{maxScore}</p>
            <p className="text-[10px] text-white/30">{sorted[0].name}</p>
          </div>
          <div className="w-[1px] h-[32px] bg-white/[0.04]" />
          <div className="text-center">
            <p className="text-[11px] text-white/35">🔥 Défis réussis</p>
            <p className="text-[20px] font-bold text-[#b8a8e6] mt-0.5">
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
