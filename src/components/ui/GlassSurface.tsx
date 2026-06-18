import { ReactNode } from 'react';
import { useGlassFilter } from '../../hooks/useGlassFilter';

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'button';
  onClick?: () => void;
  cornerRadius?: number;
}

export function GlassSurface({
  children,
  className = '',
  as: Tag = 'div',
  onClick,
  cornerRadius = 20,
}: GlassSurfaceProps) {
  const { containerRef, style } = useGlassFilter({
    cornerRadius,
  });

  const cursor = onClick ? 'cursor-pointer' : '';

  return (
    <Tag
      ref={containerRef}
      data-glass="surface"
      style={style}
      className={`${className} ${cursor}`}
      onClick={onClick}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: cornerRadius,
        }}
      >
        {children}
      </div>
    </Tag>
  );
}
