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
  const streakNumRef = useRef<HTMLParagraphElement>(null);
  const longestNumRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.25 });

    gsap.fromTo(el.querySelectorAll('.aa-card'),
      { opacity: 0, y: 18, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out', delay: 0.05 }
    );

    const cta = el.querySelector('[data-glass="button"]');
    if (cta) {
      gsap.fromTo(cta,
        { opacity: 0, y: 12, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.35 }
      );
    }

    if (streakNumRef.current && streak.currentStreak > 0) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: streak.currentStreak, duration: 1, delay: 0.3, ease: 'power2.out',
        onUpdate: () => { streakNumRef.current!.textContent = Math.round(obj.val).toString(); },
      });
    }
    if (longestNumRef.current && streak.longestStreak > 0) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: streak.longestStreak, duration: 1, delay: 0.4, ease: 'power2.out',
        onUpdate: () => { longestNumRef.current!.textContent = Math.round(obj.val).toString(); },
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

  const weekDots = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-2 pb-4 gap-[11px]">
      <div className="flex items-center justify-between pt-3 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center text-[20px]">
            {guardianEmoji()}
          </div>
          <div>
            <p className="text-[13px] font-medium text-white/90">Salut, aventurier</p>
            <p className="text-[11px] text-white/35">Prêt pour une bonne nuit</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/sleepcircle')}
          className="w-[36px] h-[36px] rounded-full bg-white/[0.04] flex items-center justify-center text-white/40 hover:bg-white/[0.07] transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </button>
      </div>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold tracking-[0.06em] text-white/35 uppercase">Série en cours</p>
          <div className="flex items-center gap-1.5">
            <div className={`w-[6px] h-[6px] rounded-full ${streak.currentStreak > 0 ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]' : 'bg-white/[0.12]'}`} />
            <span className="text-[10px] text-white/30">{streak.currentStreak > 0 ? 'Active' : 'En attente'}</span>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <span ref={streakNumRef} className="text-[48px] font-bold tracking-[-0.05em] text-white leading-none">
            {streak.currentStreak > 0 ? streak.currentStreak : 0}
          </span>
          <span className="text-[16px] font-medium text-white/35 pb-[6px] ml-0.5">nuits</span>
          {streak.currentStreak > 0 && (
            <span className="text-[22px] ml-auto pb-[4px]">🔥</span>
          )}
        </div>
        <div className="flex gap-[5px] mt-4">
          {weekDots.map((i) => (
            <div
              key={i}
              className={`flex-1 h-[4px] rounded-full transition-all duration-500 ${
                i < (streak.currentStreak % 7) ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-white/[0.05]'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-3.5">
          <div className="flex-1 bg-white/[0.02] rounded-[10px] p-2.5">
            <p className="text-[18px] font-bold tracking-[-0.03em]" ref={longestNumRef}>{streak.longestStreak}</p>
            <p className="text-[10px] text-white/35 mt-0.5">Record</p>
          </div>
          <div className="flex-1 bg-white/[0.02] rounded-[10px] p-2.5">
            <p className="text-[18px] font-bold tracking-[-0.03em]">{streak.jokerAvailable ? 1 : 0}</p>
            <p className="text-[10px] text-white/35 mt-0.5">Jokers 🃏</p>
          </div>
          <div className="flex-1 bg-white/[0.02] rounded-[10px] p-2.5">
            <p className="text-[18px] font-bold tracking-[-0.03em]">{answers.eveningEnergy ?? '-'}</p>
            <p className="text-[10px] text-white/35 mt-0.5">Énergie</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-white/80">Mission du soir</h2>
          <span className="text-[10px] font-semibold tracking-[0.04em] uppercase px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400/90">
            Ce soir
          </span>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="w-[50px] h-[50px] rounded-[14px] bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center text-[24px] flex-shrink-0">
            {ritualEmoji()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium tracking-[-0.01em] text-white">{ritualLabel()}</p>
            <p className="text-[12px] text-white/35 mt-0.5">Une micro-action pour ton sommeil</p>
          </div>
        </div>
        <div className="flex gap-[5px] mt-3.5">
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 h-[3px] rounded-full bg-white/[0.06]" />
        </div>
      </GlassCard>

      <GlassCard className="p-[18px] aa-card">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-white/80">Mes amis</h2>
          <button onClick={() => navigate('/sleepcircle')} className="text-[12px] font-medium text-amber-400/70 hover:text-amber-400 transition-colors">
            Voir tous →
          </button>
        </div>
        <div className="flex gap-3">
          {mockFriends.map((friend) => (
            <div key={friend.name} className="flex-1 flex flex-col items-center gap-2 bg-white/[0.02] rounded-[12px] py-3 px-2">
              <div className="relative">
                <div className="w-[42px] h-[42px] rounded-full bg-white/[0.04] flex items-center justify-center text-[18px]">
                  {friend.emoji}
                </div>
                <div className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-[2px] border-[#0f0f10] ${
                  friend.online ? 'bg-celadon-400 shadow-[0_0_6px_rgba(125,211,192,0.4)]' : 'bg-white/[0.08]'
                }`} />
              </div>
              <p className="text-[11px] font-medium text-white/80">{friend.name}</p>
              <p className="text-[10px] text-white/35">
                {friend.streak > 0 && '🔥 '}{friend.streak}j
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-1">
        <GlassButton onClick={() => navigate('/evening')} className="w-full h-[54px] text-[16px]">
          <span className="mr-2">🌙</span>
          Je vais dormir
        </GlassButton>
      </div>
    </div>
  );
}
