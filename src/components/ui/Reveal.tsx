import type { ElementType, ReactNode } from 'react';
import { useInView, usePrefersReducedMotion } from '../../lib/hooks';
import '../../styles/ui.css';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  /** 入场方式。默认向上淡入。 */
  variant?: 'up' | 'mask' | 'focus' | 'fade';
  style?: React.CSSProperties;
}

/**
 * 滚动揭示。
 * prefers-reduced-motion 下直接显示最终状态，不做位移与遮罩动画。
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
  variant = 'up',
  style,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const Tag = as as ElementType;
  const shown = inView || reduced;

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${className}`.trim()}
      data-shown={shown ? 'true' : 'false'}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
    >
      {children}
    </Tag>
  );
}
