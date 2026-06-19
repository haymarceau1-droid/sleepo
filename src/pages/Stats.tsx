import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';

const monthDays = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  if (day <= 23) return { day, done: Math.random() > 0.2 };
  if (day <= 27) return { day, done: false, locked: true };
  return { day, done: false, locked: true, gift: day === 28 || day === 30 };
});

const mockFriends = [
  { name: 'Thomas', hours: 7.5, emoji: '🐺' },
  { name: 'Camille', hours: 6.8, emoji: '🦉' },
  { name: 'Lucas', hours: 8.2, emoji: '🦊' },
  { name: 'Emma', hours: 7.0, emoji: '🐱' },
];

export function Stats() {
  const [tab, setTab] = useState<'personnel' | 'amis'>('personnel');
  const streak = useGameStore((s) => s.streak);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
        '-=0.2'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, [tab]);

  const maxHours = Math.max(...mockFriends.map((f) => f.hours));

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-3 pb-4 gap-[11px]">
      {/* Duolingo-style tab toggle */}
      <div className="flex rounded-[12px] bg-white/[0.04] p-[3px] mb-1 aa-card">
        <button
          onClick={() => setTab('personnel')}
          className={`flex-1 py-2 rounded-[10px] text-[12px] font-semibold transition-all duration-300 ${
            tab === 'personnel'
              ? 'bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white shadow-md'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          PERSONNEL
        </button>
        <button
          onClick={() => setTab('amis')}
          className={`flex-1 py-2 rounded-[10px] text-[12px] font-semibold transition-all duration-300 ${
            tab === 'amis'
              ? 'bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white shadow-md'
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          AMIS
        </button>
      </div>

      {tab === 'personnel' ? (
        <>
          {/* Compteur géant */}
          <GlassCard className="p-[22px] text-center aa-card">
            <div className="mb-3">
              <div className="text-5xl mb-2">🦉</div>
              <p className="text-[32px] font-bold text-white tracking-tight">{streak.currentStreak} jours</p>
              <p className="text-[12px] text-white/40 mt-1">de sommeil !</p>
            </div>
            <div className="bg-white/[0.03] rounded-[12px] p-3 mt-2">
              <p className="text-[11px] text-white/50 leading-relaxed">
                Garde ton Score de Sommeil en dormant chaque nuit selon tes objectifs !
              </p>
            </div>
          </GlassCard>

          {/* Stats rapides */}
          <GlassCard className="p-[18px] aa-card">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.02] rounded-[12px] p-4 text-center">
                <p className="text-[10px] text-white/35 uppercase tracking-[0.04em] mb-1">30 Jours suivis</p>
                <p className="text-[26px] font-bold text-[#a06cd5]">{Math.min(streak.currentStreak, 30)}</p>
                <p className="text-[9px] text-white/25">Perfect</p>
              </div>
              <div className="bg-white/[0.02] rounded-[12px] p-4 text-center">
                <p className="text-[10px] text-white/35 uppercase tracking-[0.04em] mb-1">Rêves manqués</p>
                <p className="text-[26px] font-bold text-white/60">0</p>
                <p className="text-[9px] text-white/25">Cette semaine</p>
              </div>
            </div>
          </GlassCard>

          {/* Calendrier de régularité */}
          <GlassCard className="p-[18px] aa-card">
            <h3 className="text-[13px] font-semibold text-white/80 mb-3">Calendrier de régularité</h3>
            <div className="grid grid-cols-6 gap-[5px]">
              {monthDays.map((d) => (
                <div
                  key={d.day}
                  className={`aspect-square rounded-[6px] flex items-center justify-center text-[10px] font-medium transition-all duration-300 ${
                    d.gift
                      ? 'bg-gradient-to-br from-[#6247AA] to-[#a06cd5] text-white shadow-[0_0_8px_rgba(98,71,170,0.3)]'
                      : d.done
                        ? 'bg-gradient-to-br from-[#6247AA]/30 to-[#a06cd5]/20 text-[#e2cfea]'
                        : d.locked
                          ? 'bg-white/[0.03] text-white/15'
                          : 'bg-white/[0.05] text-white/40'
                  }`}
                >
                  {d.gift ? '🎁' : d.day}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-[9px] text-white/25">
              <span className="flex items-center gap-1"><div className="w-[8px] h-[8px] rounded-[2px] bg-gradient-to-br from-[#6247AA]/30 to-[#a06cd5]/20" /> Réussi</span>
              <span className="flex items-center gap-1"><div className="w-[8px] h-[8px] rounded-[2px] bg-white/[0.03]" /> À venir</span>
              <span className="flex items-center gap-1"><div className="w-[8px] h-[8px] rounded-[2px] bg-gradient-to-br from-[#6247AA] to-[#a06cd5]" /> Cadeau</span>
            </div>
          </GlassCard>
        </>
      ) : (
        <>
          {/* Classement des amis */}
          <GlassCard className="p-[18px] aa-card">
            <h3 className="text-[13px] font-semibold text-white/80 mb-3">Score des amis</h3>
            <div className="space-y-3">
              {mockFriends.map((friend, i) => (
                <div key={friend.name} className="flex items-center gap-3">
                  <span className={`w-[18px] text-center text-[11px] font-bold ${i === 0 ? 'text-[#a06cd5]' : 'text-white/20'}`}>
                    {i + 1}
                  </span>
                  <span className="text-[16px] w-[24px] text-center">{friend.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[12px] font-medium text-white/70">{friend.name}</span>
                      <span className="text-[11px] text-white/40">{friend.hours}h</span>
                    </div>
                    <div className="w-full h-[5px] rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6247AA] to-[#a06cd5]"
                        style={{ width: `${(friend.hours / maxHours) * 100}%`, transition: 'width 0.8s ease 0.3s' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Défi commun */}
          <GlassCard className="p-[18px] aa-card">
            <h3 className="text-[13px] font-semibold text-white/80 mb-2">Défi de groupe</h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🌳</span>
              <div className="flex-1">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/70">Arbre de Lune</span>
                  <span className="text-white/40">12/20 rituels</span>
                </div>
                <div className="w-full h-[6px] rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6247AA] to-[#a06cd5]"
                    style={{ width: '60%', transition: 'width 0.8s ease' }}
                  />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-white/35 text-center">
              12/20 rituels collectifs cette semaine pour débloquer l'Arbre de Lune.
            </p>
          </GlassCard>
        </>
      )}
    </div>
  );
}
