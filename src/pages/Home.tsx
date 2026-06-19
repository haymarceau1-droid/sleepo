import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

const mockFriends = [
  { name: 'Thomas', streak: 5, online: true, emoji: '🐺' },
  { name: 'Camille', streak: 3, online: false, emoji: '🦉' },
  { name: 'Lucas', streak: 7, online: true, emoji: '🦊' },
];

export function Home() {
  const navigate = useNavigate();
  const streak = useGameStore((s) => s.streak);
  const answers = useGameStore((s) => s.answers);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    tlRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(el.querySelectorAll('.aa-card'),
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo(el.querySelector('[data-glass="button"]'),
        { opacity: 0, y: 12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
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
      <GlassCard className="p-[18px] flex items-center justify-between aa-card">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#6247AA]/15 flex items-center justify-center text-[18px]">
            🔥
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white/90">Streak de bon sommeil</p>
            <p className="text-[11px] text-white/40">{streak.currentStreak} nuits d'affilée</p>
          </div>
        </div>
        <span className="text-[22px] font-bold text-[#8063d2]">{streak.currentStreak}</span>
      </GlassCard>

      <GlassCard className="p-[18px] flex items-center justify-between aa-card">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#6247AA]/15 flex items-center justify-center text-[18px]">
            {ritualEmoji()}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white/90">Mission du jour</p>
            <p className="text-[11px] text-white/40">{ritualLabel()}</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#6247AA]/15 text-[#8063d2]">
          Ce soir
        </span>
      </GlassCard>

      <GlassCard className="p-[18px] flex items-center justify-between aa-card">
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#6247AA]/15 flex items-center justify-center text-[18px]">
            👥
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white/90">Score des amis</p>
            <p className="text-[11px] text-white/40">Classement du cercle</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/sleepcircle')}
          className="text-[12px] font-medium text-[#8063d2] hover:text-[#9c86dc] transition-colors"
        >
          Voir →
        </button>
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#6247AA]/15 flex items-center justify-center text-[18px]">
            🌙
          </div>
          <p className="text-[13px] font-semibold text-white/90">Amis actifs</p>
        </div>
        <div className="flex gap-3">
          {mockFriends.map((friend) => (
            <div key={friend.name} className="flex-1 flex flex-col items-center gap-2 bg-white/[0.02] rounded-[12px] py-3 px-2">
              <div className="relative">
                <div className="w-[42px] h-[42px] rounded-full bg-white/[0.04] flex items-center justify-center text-[18px]">
                  {friend.emoji}
                </div>
                <div className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-[2px] border-[#0a0d14] ${
                  friend.online ? 'bg-[#8063d2] shadow-[0_0_6px_rgba(128,99,210,0.4)]' : 'bg-white/[0.08]'
                }`} />
              </div>
              <p className="text-[11px] font-medium text-white/80">{friend.name}</p>
              <p className="text-[10px] text-white/35">{friend.streak > 0 && '🔥 '}{friend.streak}j</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-1">
        <GlassButton onClick={() => navigate('/evening')} className="w-full h-[54px] text-[16px]">
          JE VAIS DORMIR
        </GlassButton>
      </div>
    </div>
  );
}
