import { ReactNode } from 'react';
import { GlassSurface } from './GlassSurface';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: 'div' | 'button' | 'section';
  onClick?: () => void;
}

export function GlassCard({ children, className = '', interactive = false, as: Tag = 'div', onClick }: GlassCardProps) {
  const cursor = onClick || interactive ? 'cursor-pointer active:scale-[0.985] transition-transform duration-200' : '';

  return (
    <GlassSurface as={Tag} onClick={onClick} className={`glass-card ${cursor} ${className}`} cornerRadius={20}>
      {children}
    </GlassSurface>
  );
}
