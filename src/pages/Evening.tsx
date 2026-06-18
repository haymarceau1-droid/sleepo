import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

const mockFriendMissions = [
  { name: 'Thomas', mission: '📖 Lecture 15 min', done: true },
  { name: 'Camille', mission: '🧘 Méditation', done: false },
  { name: 'Lucas', mission: '📵 Écrans éteints', done: true },
];

export function Evening() {
  const answers = useGameStore((s) => s.answers);
  const streak = useGameStore((s) => s.streak);
  const [jokerUsed, setJokerUsed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleJoker = () => {
    if (streak.jokerAvailable && !jokerUsed) {
      setJokerUsed(true);
    }
  };

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
      { opacity: 0, y: 14, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.09, ease: 'power3.out', delay: 0.03 }
    );

    const btns = el.querySelectorAll('[data-glass="button"]');
    gsap.fromTo(btns,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.3)', delay: 0.3 }
    );

    const social = el.querySelector('.aa-social');
    if (social) {
      gsap.fromTo(social,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.45 }
      );
    }
  }, []);

  const ritualEmoji = () => {
    switch (answers.preferredRitual) {
      case 'lecture': return '📖';
      case 'musique': return '🎵';
      case 'meditation': return '🧘';
      case 'ecriture': return '✍️';
      case 'the': return '🍵';
      default: return '🌙';
    }
  };

  const ritualLabel = () => {
    switch (answers.preferredRitual) {
      case 'lecture': return 'Lecture 15 min';
      case 'musique': return 'Musique douce';
      case 'meditation': return 'Méditation';
      case 'ecriture': return 'Écrire dans ton journal';
      case 'the': return 'Infusion du soir';
      default: return 'Tout éteindre à 22h';
    }
  };

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <div className="flex flex-col items-center pt-6 pb-1 aa-header">
        <div className="text-[34px] mb-1">🌃</div>
        <h1 className="text-[24px] font-bold tracking-[-0.03em] text-white mt-1">
          Mission du soir
        </h1>
        <p className="text-[13px] text-white/35 mt-0.5">Une micro-action, un grand pas</p>
      </div>

      <GlassCard className="p-[12px] flex items-center justify-between aa-card">
        <div className="flex items-center gap-2.5">
          <div className="w-[10px] h-[10px] rounded-full bg-celadon-400 shadow-[0_0_12px_rgba(125,211,192,0.3)]" />
          <span className="text-[13px] font-medium text-white/80">Prêt pour la nuit</span>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.04em] uppercase px-3 py-1 rounded-full bg-celadon-400/10 text-celadon-400/80">
          En ligne
        </span>
      </GlassCard>

      <GlassCard className="p-[22px] flex flex-col items-center text-center aa-card">
        <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center text-[34px] mb-3.5">
          {ritualEmoji()}
        </div>
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white mb-1.5">{ritualLabel()}</h3>
        <p className="text-[12px] text-white/35 max-w-[260px] leading-relaxed">
          {jokerUsed
            ? 'Joker activé — cette mission est optionnelle. Profite de ta soirée sans pression.'
            : 'Une micro-action pour préparer ton corps et ton esprit au sommeil.'}
        </p>
        {jokerUsed && (
          <div className="mt-3.5 px-3 py-1.5 rounded-full bg-amber-400/10 text-amber-400 text-[12px] font-medium">
            🃏 Joker activé
          </div>
        )}
      </GlassCard>

      <div className="flex flex-col gap-[7px] aa-card">
        <GlassButton variant="dark" className="w-full">
          Choisir une autre mission
        </GlassButton>
        <GlassButton
          variant="dark"
          onClick={handleJoker}
          disabled={!streak.jokerAvailable || jokerUsed}
          className="w-full"
        >
          {jokerUsed ? 'Joker activé ✓' : '🃏 Activer un joker'}
        </GlassButton>
      </div>

      <GlassCard className="p-[18px] aa-social aa-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-white/80">Missions des amis</h3>
          <span className="text-[10px] text-white/30">{mockFriendMissions.filter(f => f.done).length}/{mockFriendMissions.length} faits</span>
        </div>
        <div className="space-y-[10px]">
          {mockFriendMissions.map((friend) => (
            <div key={friend.name} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] ${
                  friend.done ? 'bg-celadon-400/10' : 'bg-white/[0.03]'
                }`}>
                  {friend.done ? '✅' : friend.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white/80">{friend.name}</p>
                  <p className="text-[10px] text-white/35">{friend.mission}</p>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                friend.done
                  ? 'text-celadon-400 bg-celadon-400/10'
                  : 'text-white/25 bg-white/[0.03]'
              }`}>
                {friend.done ? 'Fait' : 'En cours'}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
