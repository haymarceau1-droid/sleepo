import { useMemo } from 'react';

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

export function Starfield() {
  const stars: Star[] = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    })),
  []);

  const shootingStars: ShootingStar[] = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 60 + 20}%`,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 15 + 5,
    })),
  []);

  const largeStars: Star[] = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 2.5,
      delay: Math.random() * 3,
    })),
  []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {largeStars.map((star) => (
        <div
          key={`lg-${star.id}`}
          className="star"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.3)`,
          } as React.CSSProperties}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            '--shoot-duration': `${s.duration}s`,
            '--shoot-delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
