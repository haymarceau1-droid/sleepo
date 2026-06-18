import { ReactNode, useState } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'dark';
  className?: string;
  disabled?: boolean;
}

export function GlassButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: GlassButtonProps) {
  const [pressed, setPressed] = useState(false);

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    borderRadius: 14,
    padding: '0 20px',
    height: 50,
    transition: 'transform 0.15s ease, background 0.2s ease',
    WebkitTapHighlightColor: 'transparent',
    transform: pressed ? 'scale(0.97)' : 'scale(1)',
    border: variant === 'dark'
      ? '0.5px solid rgba(255,255,255,0.06)'
      : '0.5px solid rgba(255,255,255,0.08)',
    background: variant === 'dark'
      ? 'rgba(255,255,255,0.06)'
      : 'rgba(0,122,255,0.85)',
    boxShadow: variant === 'dark'
      ? undefined
      : '0 2px 8px rgba(0,122,255,0.15)',
  };

  return (
    <button
      data-glass="button"
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={className}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
        {children}
      </span>
    </button>
  );
}
