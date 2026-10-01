import { useMemo } from 'react';
import { usePrefersReducedMotion } from '../../lib/hooks';
import { seededSeries } from '../../lib/hash';
import '../../styles/art.css';

interface ThemeCanvasProps {
  conceptId: string;
}

/**
 * THEME EXPLORER 的视觉引擎。
 * 八张构图全部在浏览器本地运行，纯 SVG + CSS 动画，不请求网络、不调用任何模型。
 * prefers-reduced-motion 下全部停留在「有意义的静态构图」，而不是空白。
 */
export function ThemeCanvas({ conceptId }: ThemeCanvasProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="tcanvas" data-concept={conceptId} data-reduced={reduced ? 'true' : 'false'}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="presentation">
        <defs>
          <radialGradient id="tc-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.4" stopColor="#efe7ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#efe7ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tc-prism" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#b8a6f4" />
            <stop offset="0.58" stopColor="#8fb0f2" />
            <stop offset="0.82" stopColor="#f3c6d6" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tc-fill" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#d7d9e6" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <rect width="400" height="300" className="tc-bed" />
        <g className="tc-grid">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`h${i}`} x1="0" x2="400" y1={i * 34 + 17} y2={i * 34 + 17} />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={i * 40} x2={i * 40} y1="0" y2="300" />
          ))}
        </g>

        {conceptId === 'happiness' && <Happiness />}
        {conceptId === 'talent' && <Talent />}
        {conceptId === 'ordinary' && <Ordinary />}
        {conceptId === 'blessing' && <Blessing />}
        {conceptId === 'grief' && <Grief />}
        {conceptId === 'memory' && <Memory />}
        {conceptId === 'guilt' && <Guilt />}
        {conceptId === 'life' && <Life />}

        <rect x="6" y="6" width="388" height="288" className="tc-frame" fill="none" />
      </svg>
    </div>
  );
}

/* 01 HAPPINESS —— 五个方向的光点，无法完全重合，最后站成一个不规则但稳定的构图 */
function Happiness() {
  const dots = useMemo(
    () => [
      { x: 158, y: 118, from: [-190, 96], dur: 2.2 },
      { x: 232, y: 108, from: [196, -70], dur: 2.5 },
      { x: 250, y: 176, from: [180, 108], dur: 2.1 },
      { x: 150, y: 184, from: [-184, 92], dur: 2.7 },
      { x: 200, y: 148, from: [0, -150], dur: 2.4 },
    ],
    [],
  );
  return (
    <g>
      {dots.map((d, i) => (
        <g
          key={i}
          className={`tc-happy tc-happy--${i}`}
          style={{ animationDuration: `${d.dur}s`, '--from-x': `${d.from[0]}px`, '--from-y': `${d.from[1]}px` } as React.CSSProperties}
        >
          <circle cx={d.x} cy={d.y} r="26" fill="url(#tc-glow)" />
          <circle cx={d.x} cy={d.y} r="4.6" className="tc-core" />
          <circle cx={d.x} cy={d.y} r="15" className="tc-halo" style={{ animationDelay: `${d.dur + i * 0.18}s` }} />
        </g>
      ))}
      <path d="M158 118 L232 108 L250 176 L150 184 Z" className="tc-wire" />
    </g>
  );
}

/* 02 TALENT —— 一束强光在中心，一圈亮度由内向外扩散，附近更弱的光逐渐无法被看见 */
function Talent() {
  const weak = useMemo(() => {
    const r = seededSeries('talent', 7);
    const pts = Array.from({ length: 7 }, (_, i) => {
      const a = (-0.32 + i * 0.42) * Math.PI;
      const d = 46 + r[i] * 122;
      return {
        x: 200 + Math.cos(a) * d * 1.5,
        y: 150 + Math.sin(a) * d,
        d,
        rad: 2.3 + r[i + 7] * 1.8,
      };
    });
    const max = Math.max(...pts.map((p) => p.d));
    return pts.map((p) => ({ ...p, delay: -3.5 - (1.5 + 3.4 * (p.d / max)) }));
  }, []);

  return (
    <g>
      <circle cx="200" cy="150" r="70" className="tc-ring" />
      <circle cx="200" cy="150" r="44" fill="url(#tc-glow)" className="tc-core-bloom" />
      <circle cx="200" cy="150" r="7" className="tc-core" />
      {weak.map((w, i) => (
        <g key={i} className="tc-weak" style={{ animationDelay: `${w.delay}s` }}>
          <circle cx={w.x} cy={w.y} r="17" fill="url(#tc-glow)" />
          <circle cx={w.x} cy={w.y} r={w.rad} className="tc-core" />
        </g>
      ))}
      <line x1="46" y1="272" x2="354" y2="272" className="tc-wire" />
    </g>
  );
}

/* 03 ORDINARY —— 整齐的阵列里有一个被挤出刻度、扫描光永远扫不到的人 */
function Ordinary() {
  const marks = useMemo(() => {
    const r = seededSeries('ordinary', 35);
    const out: { x: number; y: number; odd: boolean }[] = [];
    for (let row = 0; row < 5; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        out.push({ x: 74 + col * 42, y: 82 + row * 34, odd: row === 2 && col === 3 });
      }
    }
    return out.map((m, i) => ({ ...m, r: 2.6 + r[i % r.length] * 1.4 }));
  }, []);

  return (
    <g>
      <line x1="60" y1="248" x2="344" y2="248" className="tc-wire" />
      {marks.map((m, i) => (
        <circle
          key={i}
          cx={m.x}
          cy={m.odd ? m.y + 30 : m.y}
          r={m.r}
          className={m.odd ? 'tc-mark tc-mark--odd' : 'tc-mark'}
          style={m.odd ? undefined : { animationDelay: `${-((m.x - 60) / 284) * 7}s` }}
        />
      ))}
      <g className="tc-scan">
        <line x1="60" y1="40" x2="60" y2="268" />
      </g>
      <text x="200" y="286" className="tc-tiny" textAnchor="middle">
        SCAN PASSES · ONE NEVER COUNTS
      </text>
    </g>
  );
}

/* 04 BLESSING —— 祝福像花瓣一样落下，其中一片特别沉 */
function Blessing() {
  const petals = useMemo(() => {
    const r = seededSeries('blessing', 8);
    return Array.from({ length: 8 }, (_, i) => ({
      x: 60 + i * 38 + r[i] * 20,
      delay: -r[i + 8] * 9,
      dur: 7 + r[i] * 6,
      scale: 0.6 + r[i + 2] * 0.8,
      heavy: i === 4,
    }));
  }, []);

  return (
    <g>
      {petals.map((p, i) => (
        <g key={i} transform={`translate(${p.x} -30) scale(${p.scale})`}>
          <g
            className={p.heavy ? 'tc-petal tc-petal--heavy' : 'tc-petal'}
            style={{ animationDelay: `${p.delay}s`, animationDuration: p.heavy ? '3.4s' : `${p.dur}s` }}
          >
            <path d="M0 0 C 9 -7, 19 -6, 24 0 C 19 7, 9 8, 0 0 Z" fill="url(#tc-prism)" />
          </g>
        </g>
      ))}
      <line x1="40" y1="286" x2="360" y2="286" className="tc-wire" />
    </g>
  );
}

/* 05 GRIEF —— 花还在开，但花瓣一片片离开枝头 */
function Grief() {
  return (
    <g>
      <g className="tc-flower">
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * 360;
          return (
            <ellipse
              key={i}
              cx="0"
              cy="-30"
              rx="14"
              ry="27"
              fill="none"
              stroke="url(#tc-prism)"
              strokeWidth="1.3"
              transform={`rotate(${a})`}
            />
          );
        })}
        <circle cx="0" cy="0" r="7" className="tc-core" />
      </g>
      <g className="tc-fall" style={{ transform: 'translate(200px, 116px)' }}>
        <path d="M0 -26 C 11 -18, 11 -4, 0 4 C -11 -4, -11 -18, 0 -26 Z" fill="url(#tc-prism)" opacity="0.9" />
      </g>
      <g className="tc-fall tc-fall--2" style={{ transform: 'translate(200px, 116px)' }}>
        <path d="M0 -26 C 11 -18, 11 -4, 0 4 C -11 -4, -11 -18, 0 -26 Z" fill="url(#tc-prism)" opacity="0.7" />
      </g>
      <path d="M200 124 L200 236" className="tc-wire" stroke="url(#tc-prism)" />
      <text x="200" y="268" className="tc-tiny" textAnchor="middle">
        STILL BLOOMING
      </text>
    </g>
  );
}

/* 06 MEMORY —— 照片不断过曝，轮廓越来越完美，随后裂纹与细节一起回来 */
function Memory() {
  return (
    <g>
      <g className="tc-photo">
        <rect x="120" y="56" width="160" height="188" fill="url(#tc-fill)" />
        <ellipse cx="200" cy="126" rx="34" ry="40" fill="#ffffff" opacity="0.55" />
        <path d="M150 244 C 168 186, 186 168, 200 168 C 214 168, 232 186, 250 244 Z" fill="#ffffff" opacity="0.4" />
      </g>
      <g className="tc-overexpose">
        <rect x="120" y="56" width="160" height="188" fill="#ffffff" />
      </g>
      <g className="tc-crackline">
        <path d="M120 176 L166 176 L176 164 L212 164 L222 180 L280 180" fill="none" stroke="#15151a" strokeWidth="1.1" opacity="0.6" />
        <path d="M120 184 L162 184 L172 196 L216 196" fill="none" stroke="#15151a" strokeWidth="0.6" opacity="0.4" />
      </g>
      <g className="tc-sprocket">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={30} y={64 + i * 22} width="14" height="9" rx="1.6" fill="none" className="tc-holes" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={`r${i}`} x={356} y={64 + i * 22} width="14" height="9" rx="1.6" fill="none" className="tc-holes" />
        ))}
      </g>
      <text x="200" y="272" className="tc-tiny" textAnchor="middle">
        EXPOSURE → IDEAL → CRACK
      </text>
    </g>
  );
}

/* 07 GUILT —— 一道总是慢半拍的影子 */
function Guilt() {
  const shape = 'M132 250 C146 196 168 172 200 172 C232 172 254 196 268 250';
  return (
    <g>
      <path d={shape} className="tc-ghost" />
      <circle cx="200" cy="140" r="30" className="tc-ghost" />
      <path d={shape} className="tc-silhouette" />
      <circle cx="200" cy="140" r="30" className="tc-silhouette" />
      <path d="M200 108 L244 92" className="tc-wire tc-wire--dashed" />
      <circle cx="244" cy="92" r="3" className="tc-core" />
      <text x="252" y="88" className="tc-tiny">
        LAG
      </text>
      <text x="200" y="278" className="tc-tiny" textAnchor="middle">
        RESPONSIBILITY ≠ FAULT
      </text>
    </g>
  );
}

/* 08 LIFE —— 心跳断了一下，然后继续；线没有断 */
function Life() {
  return (
    <g>
      <path
        d="M40 172 L128 172 L142 132 L156 200 L172 108 L190 232 L204 168 L246 168 L260 150 L272 186 L284 168 L360 168"
        className="tc-pulse"
      />
      <path d="M40 216 L360 216" className="tc-wire" />
      <g className="tc-beat">
        <circle cx="190" cy="150" r="40" fill="url(#tc-glow)" />
      </g>
      <text x="200" y="266" className="tc-tiny" textAnchor="middle">
        THE LINE DOES NOT BREAK
      </text>
    </g>
  );
}
