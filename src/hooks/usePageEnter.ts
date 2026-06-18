import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function usePageEnter() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  return rootRef;
}

export function useStaggerEnter(selector: string, options?: { stagger?: number; from?: gsap.TweenVars }) {
  const { stagger = 0.08, from } = options ?? {};

  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    gsap.fromTo(els,
      { opacity: 0, y: 20, ...from },
      { opacity: 1, y: 0, duration: 0.45, stagger, ease: 'power2.out' }
    );
  }, [selector, stagger, from]);
}

export function useCountUp(ref: React.RefObject<HTMLElement | null>, target: number, duration = 1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toString();
      },
    });
  }, [ref, target, duration]);
}
