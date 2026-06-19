import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

const friendsData = [
  { name: 'Chloé', guardian: '🦉', lastAction: 'a validé sa routine Zen', online: true },
  { name: 'Thomas', guardian: '🐺', lastAction: 'a terminé sa mission du soir', online: true },
  { name: 'Lucas', guardian: '🦊', lastAction: 'a médité 10 minutes', online: false },
  { name: 'Camille', guardian: '🐱', lastAction: 'a lu 15 minutes', online: false },
  { name: 'Emma', guardian: '🦌', lastAction: 'a éteint ses écrans à 22h', online: true },
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

  return (
    <div ref={rootRef} className="flex flex-col px-4 pt-3 pb-4 gap-[11px]">
      {/* Statut de guilde */}
      <GlassCard className="p-[16px] aa-card">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[16px]">🌌</span>
          <h2 className="text-[14px] font-semibold text-white">Sleep Circle</h2>
        </div>
        <div className="bg-white/[0.02] rounded-[12px] p-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-white/60">Constellation</span>
            <span className="text-[11px] font-semibold text-[#e2cfea]">80% lumineuse</span>
          </div>
          <div className="w-full h-[6px] rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6247AA] to-[#a06cd5]"
              style={{ width: '80%', transition: 'width 0.8s ease' }}
            />
          </div>
        </div>
      </GlassCard>

      {/* Flux d'activité */}
      <GlassCard className="!p-0 overflow-hidden aa-card">
        <div className="px-[16px] py-[12px] flex items-center justify-between border-b border-white/[0.04]">
          <h3 className="text-[13px] font-semibold text-white/80">Fil d'activité</h3>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-white/30">
            {friendsData.length} amis
          </span>
        </div>

        <div>
          {friendsData.map((friend) => (
            <div
              key={friend.name}
              className="flex items-center gap-3 px-[16px] py-[10px] border-b border-white/[0.02] aa-friend hover:bg-white/[0.01] transition-colors"
            >
              <div className="w-[36px] h-[36px] rounded-full bg-[#6247AA]/10 flex items-center justify-center text-[17px] flex-shrink-0">
                {friend.guardian}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-medium text-white/80">{friend.name}</span>
                  <div className={`w-[6px] h-[6px] rounded-full ${friend.online ? 'bg-[#a06cd5]' : 'bg-white/[0.08]'}`} />
                </div>
                <p className="text-[10px] text-white/40 mt-0.5">{friend.lastAction}</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <GlassButton
                  variant="dark"
                  className="!h-[28px] !px-2.5 !text-[9px] !rounded-[8px]"
                  onClick={() => {}}
                >
                  🌌 Bonne nuit
                </GlassButton>
                <GlassButton
                  variant="dark"
                  className="!h-[28px] !px-2.5 !text-[9px] !rounded-[8px]"
                  onClick={() => {}}
                >
                  🎉 Féliciter
                </GlassButton>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Défi Commun */}
      <GlassCard className="p-[16px] aa-card">
        <h3 className="text-[13px] font-semibold text-white/80 mb-2">Défi Commun</h3>
        <div className="flex items-center gap-3 mb-2">
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
    </div>
  );
}
