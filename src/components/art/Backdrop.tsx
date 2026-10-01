import '../../styles/art.css';

interface StaffLinesProps {
  lines?: number;
  opacity?: number;
  /** 轻微的水平位移，让五线谱不像纯装饰 */
  offset?: number;
}

/** 极淡五线谱：只作为「乐谱存在于场景中」的暗示，不喧宾夺主。 */
export function StaffLines({ lines = 5, opacity = 0.5, offset = 0 }: StaffLinesProps) {
  const gap = 11;
  const top = 10;
  const W = 1200;
  const H = top * 2 + gap * (lines - 1);
  return (
    <svg
      className="staff"
      style={{ opacity }}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: lines }, (_, i) => (
        <line
          key={i}
          x1="0"
          x2={W}
          y1={top + i * gap}
          y2={top + i * gap}
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
      <g transform={`translate(${offset}, 0)`} opacity="0.8">
        <ellipse cx="360" cy={top + 12} rx="6.5" ry="4.6" fill="currentColor" />
        <rect x="365" y={top + 2} width="1.6" height="10" fill="currentColor" />
        <ellipse cx="744" cy={top + 34} rx="6.5" ry="4.6" fill="currentColor" />
        <rect x="749" y={top + 24} width="1.6" height="10" fill="currentColor" />
        <ellipse cx="966" cy={top + 23} rx="5.5" ry="3.9" fill="currentColor" />
        <rect x="970.5" y={top + 14.5} width="1.4" height="8.5" fill="currentColor" />
      </g>
    </svg>
  );
}

interface PrismSheenProps {
  intensity?: number;
  tone?: 'paper' | 'night';
}

/** 薄膜干涉色：极少量、低透明度的斜向折射带。 */
export function PrismSheen({ intensity = 1, tone = 'paper' }: PrismSheenProps) {
  return (
    <div className={`sheen sheen--${tone}`} style={{ opacity: intensity }} aria-hidden="true">
      <span className="sheen__band sheen__band--a" />
      <span className="sheen__band sheen__band--b" />
      <span className="sheen__band sheen__band--c" />
    </div>
  );
}
