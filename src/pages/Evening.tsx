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

const rituals = [
  { key: 'tiroir', emoji: '📱', title: 'Le rituel du tiroir', desc: 'Glisse ton téléphone dans un tiroir à 22h pour libérer ta table de chevet.' },
  { key: 'lecture', emoji: '📖', title: 'Lecture du soir', desc: 'Quelques pages pour calmer ton esprit avant la nuit.' },
  { key: 'meditation', emoji: '🧘', title: 'Méditation guidée', desc: '5 minutes de respiration pour apaiser le mental.' },
];

export function Evening() {
  const streak = useGameStore((s) => s.streak);
  const [jokerUsed, setJokerUsed] = useState(false);
  const [currentRitual, setCurrentRitual] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleJoker = () => {
    if (streak.jokerAvailable && !jokerUsed) {
      setJokerUsed(true);
    }
  };

  const handleChangeMission = () => {
    setCurrentRitual((prev) => (prev + 1) % rituals.length);
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

  const ritual = rituals[currentRitual];

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-3 pb-4 gap-[11px]">
      <h2 className="text-[22px] font-bold text-white mb-1 aa-card">Préparer la nuit.</h2>

      {/* La Carte Rituel */}
      <GlassCard className="p-[22px] flex flex-col items-center text-center aa-card">
        <div className="w-[80px] h-[80px] rounded-full bg-[#6247aa]/10 flex items-center justify-center text-[40px] mb-4 animate-float" style={{ animationDelay: '0.3s' }}>
          {ritual.emoji}
        </div>
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white mb-2">{ritual.title}</h3>
        <p className="text-[14px] text-white/70 leading-relaxed mb-4">
          {ritual.desc}
        </p>
        {jokerUsed && (
          <div className="px-4 py-2 rounded-full bg-[#6247aa]/15 text-[#e2cfea] text-[12px] font-medium">
            🃏 Joker activé — mission optionnelle
          </div>
        )}
      </GlassCard>

      {/* Actions */}
      <div className="flex flex-col gap-[7px]">
        <GlassButton
          onClick={() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
          }}
          className="w-full h-[54px] text-[16px]"
        >
          🌙 Je relève le défi
        </GlassButton>
        <GlassButton variant="dark" onClick={handleChangeMission} className="w-full">
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

      {/* Social feed */}
      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13px] font-semibold text-white/80">Voir les missions des amis</h3>
          <span className="text-[10px] text-white/30">{mockFriendMissions.filter(f => f.done).length}/{mockFriendMissions.length}</span>
        </div>
        <div className="space-y-[10px]">
          {mockFriendMissions.map((friend) => (
            <div key={friend.name} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2.5">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] ${
                  friend.done ? 'bg-[#6247aa]/15' : 'bg-white/[0.03]'
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
                  ? 'text-[#a06cd5] bg-[#6247aa]/15'
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
