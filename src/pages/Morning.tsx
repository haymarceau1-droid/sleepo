import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';

const mockFriends = [
  { name: 'Thomas', hours: 7.5, emoji: '🐺' },
  { name: 'Camille', hours: 6.8, emoji: '🦉' },
  { name: 'Lucas', hours: 8.2, emoji: '🦊' },
];

export function Morning() {
  const answers = useGameStore((s) => s.answers);
  const streak = useGameStore((s) => s.streak);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12 },
        '-=0.2'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const maxHours = Math.max(...mockFriends.map((f) => f.hours));

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <GlassCard className="p-[22px] aa-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[42px] h-[42px] rounded-full bg-[#6247AA]/15 flex items-center justify-center text-[20px]">
            📊
          </div>
          <h3 className="text-[16px] font-semibold text-white/90">Statistiques</h3>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/[0.02] rounded-[12px] p-3 text-center">
            <p className="text-[24px] font-bold text-[#8063d2]">{streak.currentStreak}</p>
            <p className="text-[10px] text-white/35 mt-1 uppercase tracking-[0.04em]">Série</p>
          </div>
          <div className="bg-white/[0.02] rounded-[12px] p-3 text-center">
            <p className="text-[24px] font-bold text-[#8063d2]">
              {answers.idealBedtime ?? '-'}<span className="text-[14px] text-white/40">h</span>
            </p>
            <p className="text-[10px] text-white/35 mt-1 uppercase tracking-[0.04em]">Coucher</p>
          </div>
          <div className="bg-white/[0.02] rounded-[12px] p-3 text-center">
            <p className="text-[24px] font-bold text-white/80">{streak.longestStreak}</p>
            <p className="text-[10px] text-white/35 mt-1 uppercase tracking-[0.04em]">Record</p>
          </div>
        </div>

        <div className="bg-[#6247AA]/10 rounded-[10px] p-3">
          <p className="text-[12px] text-[#b8a8e6] text-center leading-relaxed">
            {streak.currentStreak > 0
              ? `🔥 ${streak.currentStreak} nuits d'affilée. Continue comme ça !`
              : "🌱 Pas de pression. Ce soir est une nouvelle chance."}
          </p>
        </div>
      </GlassCard>

      <GlassCard className="p-[22px] aa-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[42px] h-[42px] rounded-full bg-[#6247AA]/15 flex items-center justify-center text-[20px]">
            👥
          </div>
          <h3 className="text-[16px] font-semibold text-white/90">Score des amis</h3>
        </div>

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
                    className="h-full rounded-full bg-gradient-to-r from-[#6247AA] to-[#8063d2]"
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
