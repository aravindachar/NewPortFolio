import React, { useEffect, useRef } from 'react';
import './PixelCard.css';

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value: number | string, reducedMotion: boolean): number {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = typeof value === 'number' ? value : parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

interface VariantConfig {
  activeColor: string | null;
  gap: number;
  speed: number;
  colors: string;
  noFocus: boolean;
}

const VARIANTS: Record<string, VariantConfig> = {
  default: {
    activeColor: 'rgba(255, 255, 255, 0.08)',
    gap: 6,
    speed: 35,
    colors: '#f8fafc,#f1f5f9,#cbd5e1,#64748b',
    noFocus: false
  },
  blue: {
    activeColor: 'rgba(56, 189, 248, 0.15)',
    gap: 8,
    speed: 30,
    colors: '#e0f2fe,#7dd3fc,#0ea5e9,#0284c7',
    noFocus: false
  },
  yellow: {
    activeColor: 'rgba(234, 179, 8, 0.15)',
    gap: 5,
    speed: 25,
    colors: '#fef08a,#fde047,#eab308,#ca8a04',
    noFocus: false
  },
  pink: {
    activeColor: 'rgba(244, 114, 182, 0.15)',
    gap: 7,
    speed: 45,
    colors: '#fecdd3,#fda4af,#ec4899,#a855f7',
    noFocus: true
  }
};

export interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'blue' | 'yellow' | 'pink';
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  variant = 'default',
  gap,
  speed,
  colors,
  noFocus,
  className = '',
  style,
  children,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number | null>(null);
  const timePreviousRef = useRef<number>(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const variantCfg = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;
  const finalNoFocus = noFocus ?? variantCfg.noFocus;

  const initPixels = () => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    if (width === 0 || height === 0) return;

    const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colorsArray = finalColors.split(',');
    const pxs: Pixel[] = [];
    const step = Math.max(2, parseInt(String(finalGap), 10));

    for (let x = 0; x < width; x += step) {
      for (let y = 0; y < height; y += step) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];

        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(new Pixel(canvasRef.current, ctx, x, y, color, getEffectiveSpeed(finalSpeed, reducedMotion), delay));
      }
    }
    pixelsRef.current = pxs;
  };

  const doAnimate = (fnName: 'appear' | 'disappear') => {
    animationRef.current = requestAnimationFrame((timestamp: number) => {
      const timePassed = timestamp - timePreviousRef.current;
      const timeInterval = 1000 / 60;

      if (timePassed >= timeInterval) {
        timePreviousRef.current = timestamp - (timePassed % timeInterval);

        const ctx = canvasRef.current?.getContext('2d');
        const container = containerRef.current;
        if (ctx && canvasRef.current && container) {
          const rect = container.getBoundingClientRect();
          ctx.clearRect(0, 0, rect.width, rect.height);

          let allIdle = true;
          for (let i = 0; i < pixelsRef.current.length; i++) {
            const pixel = pixelsRef.current[i];
            pixel[fnName]();
            if (!pixel.isIdle) {
              allIdle = false;
            }
          }
          if (allIdle) {
            return;
          }
        }
      }
      doAnimate(fnName);
    });
  };

  const handleAnimation = (name: 'appear' | 'disappear') => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    doAnimate(name);
  };

  const onMouseEnter = () => handleAnimation('appear');
  const onMouseLeave = () => handleAnimation('disappear');
  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation('appear');
  };
  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    handleAnimation('disappear');
  };

  useEffect(() => {
    initPixels();
    const observer = new ResizeObserver(() => {
      initPixels();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalGap, finalSpeed, finalColors, finalNoFocus]);

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={finalNoFocus ? undefined : onFocus}
      onBlur={finalNoFocus ? undefined : onBlur}
      tabIndex={finalNoFocus ? -1 : 0}
      style={{
        ...({
          '--pixel-card-active-color': variantCfg.activeColor
        } as React.CSSProperties),
        ...style
      }}
      {...restProps}
    >
      <canvas className="pixel-canvas" ref={canvasRef} />
      {children}
    </div>
  );
};

export default PixelCard;
