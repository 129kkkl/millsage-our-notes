import { seededSeries } from '../../lib/hash';
import '../../styles/art.css';

interface PetalProps {
  count?: number;
  seed?: string;
  tone?: 'paper' | 'night';
  /** 0–1，控制不透明度上限 */
  intensity?: number;
  /** 节奏倍率：切换成员时会改变，让动画节奏跟着人变 */
  speed?: number;
}

/**
 * 花瓣漂移。
 * 完全确定性（同一 seed 每次渲染位置相同），纯 CSS 动画，不使用 canvas。
 * 花瓣在本站承担叙事作用：祝福 / 生命 / 纪念，以及「正在离开」的时间感。
 */
export function Petals({
  count = 18,
  seed = 'millsage',
  tone = 'paper',
  intensity = 1,
  speed = 1,
}: PetalProps) {
  const r = seededSeries(seed, count * 4);

  return (
    <div className={`petals petals--${tone}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const left = r[i * 4] * 100;
        const size = 5 + r[i * 4 + 1] * 11;
        const dur = (22 + r[i * 4 + 2] * 26) / Math.max(0.4, speed);
        const delay = -r[i * 4 + 3] * 40;
        const drift = (r[i * 4 + 1] - 0.5) * 180;
        const spin = 220 + r[i * 4 + 2] * 460;
        const op = (0.12 + r[i * 4 + 3] * 0.3) * intensity;
        return (
          <span
            key={i}
            className="petals__p"
            style={
              {
                left: `${left}%`,
                width: `${size}px`,
                height: `${size * 0.66}px`,
                animationDuration: `${dur}s`,
                animationDelay: `${delay}s`,
                '--dx': `${drift}px`,
                '--spin': `${spin}deg`,
                opacity: op,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
