import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';

const badges = [
  { name: 'Tiroir Fermé', emoji: '📵', unlocked: true, desc: '7 jours sans écran' },
  { name: 'Lève-tôt', emoji: '🌅', unlocked: true, desc: '5 levers avant 7h' },
  { name: 'Constellation', emoji: '⭐', unlocked: true, desc: '30 nuits complètes' },
  { name: 'Zen Master', emoji: '🧘', unlocked: false, desc: '10 méditations' },
  { name: 'Joker', emoji: '🃏', unlocked: false, desc: 'Utiliser 3 jokers' },
  { name: 'Lune Pleine', emoji: '🌕', unlocked: false, desc: '60 jours de streak' },
];

const guardianEvolutions: Record<string, { level: number; emoji: string; name: string }[]> = {
  hibou: [
    { level: 1, emoji: '🦉', name: 'Hibougeon' },
    { level: 3, emoji: '🦉', name: 'Hibou Veilleur' },
    { level: 5, emoji: '🦉', name: 'Hibou Sage' },
  ],
  renard: [
    { level: 1, emoji: '🦊', name: 'Renardeau' },
    { level: 3, emoji: '🦊', name: 'Renard Rêveur' },
    { level: 5, emoji: '🦊', name: 'Renard des Songes' },
  ],
  chat: [
    { level: 1, emoji: '🐱', name: 'Chaton' },
    { level: 3, emoji: '🐱', name: 'Chat Veilleur' },
    { level: 5, emoji: '🐱', name: 'Chat Mystique' },
  ],
};

export function Profil() {
  const profile = useGameStore((s) => s.profile);
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
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
        '-=0.2'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const guardian = answers.guardian ?? 'hibou';
  const evolutions = guardianEvolutions[guardian] ?? guardianEvolutions.hibou;
  const currentEvo = [...evolutions].reverse().find((e) => streak.currentStreak >= e.level) ?? evolutions[0];
  const guardianEmoji = currentEvo.emoji;
  const guardianName = currentEvo.name;

  const levelNames = ['Débutant·e de la Nuit', 'Veilleur·euse d\'Étoiles', 'Cultivateur·rice de Rêves', 'Gardien·ne du Sommeil', 'Maître·sse des Constellations'];
  const levelIndex = Math.min(Math.floor(streak.currentStreak / 3), levelNames.length - 1);

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-3 pb-4 gap-[11px]">
      {/* En-tête */}
      <GlassCard className="p-[22px] text-center aa-card">
        <div className="relative inline-block mb-3">
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#6247AA]/20 to-[#a06cd5]/10 flex items-center justify-center text-[36px] mx-auto">
            {guardianEmoji}
          </div>
          <div className="absolute -bottom-1 -right-1 w-[24px] h-[24px] rounded-full bg-[#6247AA] flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
            {profile.guardianLevel}
          </div>
        </div>
        <h2 className="text-[20px] font-bold text-white">{profile.pseudo}</h2>
        <p className="text-[12px] text-[#e2cfea] font-medium mt-0.5">
          Niveau {levelIndex + 1} — {levelNames[levelIndex]}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className="text-[11px] text-white/30">Gardien :</span>
          <span className="text-[11px] font-medium text-white/60">{guardianName}</span>
        </div>
      </GlassCard>

      {/* Espace Gardien */}
      <GlassCard className="p-[18px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-3">Évolution du Gardien</h3>
        <div className="flex items-center justify-between">
          {evolutions.map((evo, i) => {
            const unlocked = streak.currentStreak >= evo.level;
            const isCurrent = evo.level === currentEvo.level;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-[22px] transition-all duration-300 ${
                  unlocked
                    ? isCurrent
                      ? 'bg-gradient-to-br from-[#6247AA] to-[#a06cd5] shadow-[0_0_12px_rgba(98,71,170,0.3)]'
                      : 'bg-[#6247AA]/15'
                    : 'bg-white/[0.03] opacity-30'
                }`}>
                  {unlocked ? evo.emoji : '❓'}
                </div>
                <span className={`text-[9px] font-medium ${unlocked ? 'text-white/70' : 'text-white/20'}`}>
                  {unlocked ? evo.name : `Niveau ${evo.level}`}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Vitrine des Badges */}
      <GlassCard className="p-[18px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-3">Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-[12px] transition-all duration-300 ${
                badge.unlocked
                  ? 'bg-[#6247AA]/10'
                  : 'bg-white/[0.02] opacity-40'
              }`}
            >
              <span className="text-[24px]">{badge.unlocked ? badge.emoji : '🔒'}</span>
              <span className={`text-[9px] font-medium text-center ${badge.unlocked ? 'text-white/70' : 'text-white/30'}`}>
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
