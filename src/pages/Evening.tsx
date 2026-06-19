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
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleJoker = () => {
    if (streak.jokerAvailable && !jokerUsed) {
      setJokerUsed(true);
    }
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.09 },
        '-=0.2'
      )
      .fromTo(el.querySelectorAll('[data-glass="button"]'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'back.out(1.3)' },
        '-=0.1'
      );

    return () => {
      tlRef.current?.kill();
    };
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
      <GlassCard className="p-[16px] flex items-center justify-between aa-card">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-[10px] h-[10px] rounded-full bg-[#8063d2] shadow-[0_0_12px_rgba(128,99,210,0.3)] animate-breathe" />
            <span className="text-[12px] font-medium text-white/90">Statut du soir</span>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#6247AA]/15 text-[#b8a8e6]">
          Prêt
        </span>
      </GlassCard>

      <GlassCard className="p-[22px] flex flex-col items-center text-center aa-card">
        <div className="w-[70px] h-[70px] rounded-full bg-[#6247AA]/10 flex items-center justify-center text-[34px] mb-3.5 animate-float" style={{ animationDelay: '0.3s' }}>
          {ritualEmoji()}
        </div>
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white mb-1.5">La Carte Mission</h3>
        <p className="text-[14px] text-white/80 mb-1">{ritualLabel()}</p>
        <p className="text-[12px] text-white/35 max-w-[260px] leading-relaxed">
          {jokerUsed
            ? 'Joker activé — cette mission est optionnelle.'
            : 'Une micro-action pour préparer ton corps et ton esprit au sommeil.'}
        </p>
        {jokerUsed && (
          <div className="mt-3.5 px-3 py-1.5 rounded-full bg-[#6247AA]/15 text-[#b8a8e6] text-[12px] font-medium">
            🃏 Joker activé
          </div>
        )}
      </GlassCard>

      <div className="flex flex-col gap-[7px]">
        <GlassButton variant="dark" className="w-full">
          Choisir une autre mission
        </GlassButton>
        <GlassButton
          variant="dark"
          onClick={handleJoker}
          disabled={!streak.jokerAvailable || jokerUsed}
          className="w-full"
        >
          {jokerUsed ? 'Joker activé ✓' : '🃏 Activez un joker'}
        </GlassButton>
      </div>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-white/80">Zone social</h3>
          <span className="text-[10px] text-white/30">{mockFriendMissions.filter(f => f.done).length}/{mockFriendMissions.length} faits</span>
        </div>
        <p className="text-[11px] text-white/40 mb-3">Voir les missions des amis</p>
        <div className="space-y-[10px]">
          {mockFriendMissions.map((friend) => (
            <div key={friend.name} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] ${
                  friend.done ? 'bg-[#6247AA]/15' : 'bg-white/[0.03]'
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
                  ? 'text-[#8063d2] bg-[#6247AA]/15'
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
