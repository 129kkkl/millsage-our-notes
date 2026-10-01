import { seededSeries } from '../../lib/hash';
import type { MusicTrack } from '../../data/types';
import '../../styles/art.css';

const MOTION: Record<MusicTrack['tempoMotion'], { dur: number; label: string }> = {
  sharp: { dur: 1.1, label: '短促、密集、骤停' },
  slow: { dur: 6.4, label: '缓慢、层叠、几乎不推进' },
  drift: { dur: 4.2, label: '漂移、留有回声' },
  swell: { dur: 3.2, label: '逐渐增强' },
};

/**
 * 波形母题。
 *
 * 明确声明：这是**视觉表现**，不是从原曲音频分析得到的数据。
 * 柱高由曲名做确定性伪随机生成，仅用于表达节奏性格。
 */
export function WaveformMotif({ track, bars = 56 }: { track: MusicTrack; bars?: number }) {
  const r = seededSeries(`wave:${track.id}`, bars);
  const motion = MOTION[track.tempoMotion];

  return (
    <div className="wave" data-motion={track.tempoMotion}>
      <div className="wave__bars" aria-hidden="true">
        {r.map((v, i) => {
          const h = 12 + v * 78;
          return (
            <span
              key={i}
              className="wave__bar"
              style={
                {
                  height: `${h}%`,
                  animationDuration: `${motion.dur + (i % 7) * 0.09}s`,
                  animationDelay: `${-(i % 11) * 0.13}s`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
      <p className="wave__note micro">
        VISUAL MOTIF — 本站生成的抽象波形，仅表达节奏性格，<strong>不是</strong>对原曲音频的分析结果。
        节奏性格：{motion.label}
      </p>
    </div>
  );
}

const ART_LABEL: Record<MusicTrack['art'], string> = {
  burst: '爆发',
  carnation: '花',
  escape: '远方',
  resonance: '共鸣',
};

/**
 * 封面视觉母题。
 * 全部是本站原创的抽象图形，不是官方封面，也不是 AI 生成的「封面图」。
 */
export function SleeveArt({ track }: { track: MusicTrack }) {
  return (
    <div className="sleeve" data-art={track.art}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${track.title} 的本站原创抽象封面母题`}>
        <defs>
          <linearGradient id={`sl-${track.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#efeff4" stopOpacity="0.7" />
            <stop offset="1" stopColor="#dfe2ec" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`slp-${track.id}`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.35" stopColor="#b8a6f4" stopOpacity="0.85" />
            <stop offset="0.62" stopColor="#8fb0f2" stopOpacity="0.7" />
            <stop offset="0.82" stopColor="#f3c6d6" stopOpacity="0.8" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="200" height="200" fill={`url(#sl-${track.id})`} />
        <SleeveMotif art={track.art} pid={`slp-${track.id}`} />

        <g stroke="rgba(21,21,26,0.22)" strokeWidth="0.5">
          <rect x="9" y="9" width="182" height="182" fill="none" />
        </g>
        <g fill="rgba(21,21,26,0.5)" fontSize="7" letterSpacing="2.4">
          <text x="17" y="24">
            {ART_LABEL[track.art].toUpperCase()}
          </text>
          <text x="17" y="186">FAN VISUAL</text>
        </g>
      </svg>
    </div>
  );
}

function SleeveMotif({ art, pid }: { art: MusicTrack['art']; pid: string }) {
  switch (art) {
    case 'burst':
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              x1={-10 + i * 12}
              y1="200"
              x2={70 + i * 12}
              y2="0"
              stroke={`url(#${pid})`}
              strokeWidth={i % 3 === 0 ? 2.4 : 0.8}
              opacity={0.35 + i * 0.06}
            />
          ))}
          <circle cx="52" cy="60" r="7" fill="#ffffff" opacity="0.95" />
          <path d="M0 118 L84 118 L96 108 L150 108 L162 122 L200 122" fill="none" stroke={`url(#${pid})`} strokeWidth="1.4" />
        </g>
      );
    case 'carnation':
      return (
        <g>
          {Array.from({ length: 6 }, (_, ring) => {
            const r = 16 + ring * 13;
            return (
              <g key={ring} opacity={0.72 - ring * 0.08}>
                {Array.from({ length: 8 }, (_, p) => {
                  const a = (p / 8) * Math.PI * 2 + ring * 0.36;
                  return (
                    <ellipse
                      key={p}
                      cx={100 + Math.cos(a) * r}
                      cy={104 + Math.sin(a) * r * 0.62}
                      rx={r * 0.44}
                      ry={r * 0.24}
                      transform={`rotate(${(a * 180) / Math.PI} ${100 + Math.cos(a) * r} ${104 + Math.sin(a) * r * 0.62})`}
                      fill="none"
                      stroke={`url(#${pid})`}
                      strokeWidth="0.9"
                    />
                  );
                })}
              </g>
            );
          })}
          <circle cx="100" cy="104" r="5" fill="#ffffff" />
          <path d="M100 118 L100 168" stroke="rgba(21,21,26,0.24)" strokeWidth="0.8" />
        </g>
      );
    case 'escape':
      return (
        <g>
          <path d="M0 148 L200 148" stroke="rgba(21,21,26,0.26)" strokeWidth="0.8" />
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d={`M${18 + i * 28} ${138 - i * 3} L${18 + i * 28} ${158 + i * 3}`}
              stroke={`url(#${pid})`}
              strokeWidth={1.6 - i * 0.2}
              opacity={0.85 - i * 0.11}
            />
          ))}
          {Array.from({ length: 3 }, (_, i) => (
            <ellipse
              key={i}
              cx={150}
              cy={44 + i * 12}
              rx={10 + i * 7}
              ry={4 + i * 2.4}
              fill="none"
              stroke={`url(#${pid})`}
              strokeWidth="0.8"
              opacity={0.7 - i * 0.18}
            />
          ))}
        </g>
      );
    case 'resonance':
    default:
      return (
        <g>
          {Array.from({ length: 5 }, (_, i) => {
            const y = 78 + i * 11;
            const amp = 14 - i * 1.4;
            return (
              <path
                key={i}
                d={`M0 ${y} C 34 ${y - amp}, 62 ${y + amp}, 100 ${y} S 166 ${y - amp}, 200 ${y}`}
                fill="none"
                stroke={`url(#${pid})`}
                strokeWidth="1.1"
                opacity={0.35 + i * 0.13}
              />
            );
          })}
          <circle cx="100" cy="105" r="26" fill="none" stroke={`url(#${pid})`} strokeWidth="0.6" strokeDasharray="2 5" />
        </g>
      );
  }
}
