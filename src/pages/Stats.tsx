import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGameStore } from '../store/useGameStore';
import { GlassCard } from '../components/ui/GlassCard';

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const mockSleepData = [6.5, 7.2, 8.0, 5.8, 7.5, 8.5, 7.0];
const mockEnergyData = [4, 6, 8, 3, 7, 9, 6];

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

function SleepChart({ data, color, label }: { data: number[]; color: string; label: string }) {
  const w = 320, h = 100, px = 24, py = 10;
  const iw = w - px * 2, ih = h - py * 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [px + (iw / (data.length - 1)) * i, py + ih - ((v - min) / range) * ih] as const);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `M${pts[0][0].toFixed(1)},${py + ih} L${pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L')} L${pts[pts.length-1][0].toFixed(1)},${py + ih} Z`;

  return (
    <div className="flex flex-col items-center">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#grad-${label})`} className="aa-chart-area" />
        <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="aa-chart-line" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} className="aa-chart-dot" style={{ opacity: 0 }}>
            <title>{data[i]}h</title>
          </circle>
        ))}
      </svg>
      <div className="flex justify-between w-[320px] mt-0.5">
        {weekDays.map((d, i) => (
          <span key={d} className={`text-[8px] font-medium ${i === 6 ? 'text-[#a06cd5]' : 'text-white/25'}`}>{d}</span>
        ))}
      </div>
    </div>
  );
}

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
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo(el.querySelectorAll('.aa-chart-line'),
        { strokeDasharray: 400, strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
        '-=0.3'
      )
      .fromTo(el.querySelectorAll('.aa-chart-area'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.8'
      )
      .fromTo(el.querySelectorAll('.aa-chart-dot'),
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)' },
        '-=0.4'
      );

    return () => {
      tlRef.current?.kill();
    };
  }, [tab]);

  const maxHours = Math.max(...mockFriends.map((f) => f.hours));
  const avgSleep = (mockSleepData.reduce((a, b) => a + b, 0) / mockSleepData.length).toFixed(1);
  const avgEnergy = Math.round(mockEnergyData.reduce((a, b) => a + b, 0) / mockEnergyData.length);

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

          {/* Courbe sommeil */}
          <GlassCard className="p-[18px] aa-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[16px]">😴</span>
              <p className="text-[13px] font-semibold text-white/90">Temps de sommeil</p>
            </div>
            <SleepChart data={mockSleepData} color="#a06cd5" label="sleep" />
            <div className="text-center mt-2">
              <p className="text-[20px] font-bold text-[#a06cd5]">{avgSleep}h</p>
              <p className="text-[9px] text-white/30">Moyenne 7 nuits</p>
            </div>
          </GlassCard>

          {/* Courbe énergie */}
          <GlassCard className="p-[18px] aa-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[16px]">⚡</span>
              <p className="text-[13px] font-semibold text-white/90">Niveau d'énergie</p>
            </div>
            <SleepChart data={mockEnergyData} color="#e2cfea" label="energy" />
            <div className="text-center mt-2">
              <p className="text-[20px] font-bold text-[#e2cfea]">{avgEnergy}/10</p>
              <p className="text-[9px] text-white/30">Moyenne 7 nuits</p>
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
