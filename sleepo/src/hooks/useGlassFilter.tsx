import { useMemo, useCallback, useRef, useState, useEffect } from 'react';

let filterCounter = 0;

function sdRoundedRect(x: number, y: number, w: number, h: number, r: number): number {
  const px = Math.abs(x - w / 2);
  const py = Math.abs(y - h / 2);
  const hw = w / 2;
  const hh = h / 2;
  const qx = px - hw + r;
  const qy = py - hh + r;
  const maxQx = Math.max(qx, 0);
  const maxQy = Math.max(qy, 0);
  return Math.sqrt(maxQx * maxQx + maxQy * maxQy) + Math.min(Math.max(qx, qy), 0) - r;
}

function generateDisplacementMap(
  width: number,
  height: number,
  radius: number,
  rimWidth: number
): string {
  const scale = Math.min(1, 512 / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const r = radius * scale;
  const rim = rimWidth * scale;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sdf = sdRoundedRect(x, y, w, h, r);
      let rv = 128;
      let gv = 128;

      if (sdf <= 0) {
        const dist = -sdf;
        if (dist < rim) {
          const eps = Math.max(0.5, rim * 0.04);
          const gx = (sdRoundedRect(x + eps, y, w, h, r) - sdRoundedRect(x - eps, y, w, h, r)) / (2 * eps);
          const gy = (sdRoundedRect(x, y + eps, w, h, r) - sdRoundedRect(x, y - eps, w, h, r)) / (2 * eps);
          const len = Math.sqrt(gx * gx + gy * gy);
          if (len > 0.001) {
            const nx = gx / len;
            const ny = gy / len;
            const t = Math.min(dist / rim, 1);
            const proximity = 1 - t * t * (3 - 2 * t);
            rv = 128 + Math.round(nx * proximity * 127);
            gv = 128 + Math.round(ny * proximity * 127);
          }
        }
      }

      const idx = (y * w + x) * 4;
      data[idx] = Math.max(0, Math.min(255, rv));
      data[idx + 1] = Math.max(0, Math.min(255, gv));
      data[idx + 2] = 128;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export interface GlassFilterOptions {
  rimRatio?: number;
  displacementScale?: number;
  cornerRadius?: number;
}

export interface GlassFilterState {
  filterId: string;
  containerRef: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
  mapUri: string;
}

export function useGlassFilter(
  options: GlassFilterOptions = {}
): GlassFilterState {
  const { rimRatio = 0.07, cornerRadius = 20 } = options;
  const id = useMemo(() => {
    filterCounter++;
    return `glass-${filterCounter}`;
  }, []);

  const elRef = useRef<HTMLDivElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const rafRef = useRef<number>(0);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      elRef.current = node;
      const rect = node.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setDims({ w: Math.round(rect.width), h: Math.round(rect.height) });
        });
      }
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { inlineSize, blockSize } = entry.borderBoxSize[0] || {};

          if (inlineSize && blockSize) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
              setDims({ w: Math.round(inlineSize), h: Math.round(blockSize) });
            });
          }
        }
      });
      ro.observe(node);
      roRef.current = ro;
    } else {
      cancelAnimationFrame(rafRef.current);
      roRef.current?.disconnect();
      roRef.current = null;
      elRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      roRef.current?.disconnect();
    };
  }, []);

  const mapUri = useMemo(() => {
    if (!dims) return '';
    const rim = Math.max(4, Math.min(dims.w, dims.h) * rimRatio);
    return generateDisplacementMap(dims.w, dims.h, cornerRadius, rim);
  }, [dims, rimRatio, cornerRadius]);

  const style: React.CSSProperties = useMemo(() => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: cornerRadius,
    background: 'rgba(255,255,255,0.05)',
    border: '0.5px solid rgba(255,255,255,0.07)',
    boxShadow: 'inset 0 0.5px 0 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.2)',
  }), [cornerRadius]);

  return { filterId: id, containerRef, style, mapUri };
}

export function GlassFilterSVG({ id, mapUri }: { id: string; mapUri: string }) {
  if (!mapUri) return null;

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      aria-hidden
    >
      <defs>
        <filter
          id={id}
          x="-8%" y="-8%"
          width="116%" height="116%"
          filterUnits="userSpaceOnUse"
        >
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale={6}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feDropShadow dx={0} dy={2} stdDeviation={4} floodColor="rgba(0,0,0,0.18)" floodOpacity={1} />
        </filter>
        <filter id={`${id}-chroma`} x="-8%" y="-8%" width="116%" height="116%" filterUnits="userSpaceOnUse">
          <feDisplacementMap in="SourceGraphic" in2="map" scale={9} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <feImage href={mapUri} result="map" />
      </defs>
    </svg>
  );
}
