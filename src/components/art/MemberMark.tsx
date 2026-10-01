import type { Member } from '../../data/types';
import '../../styles/art.css';

interface MemberMarkProps {
  member: Member;
  /** 视觉强度：非当前成员时自动降低 */
  dim?: boolean;
}

/**
 * 成员抽象视觉标记。
 *
 * 重要：这不是官方立绘，也不是 AI 生成的「角色图」。
 * 它是本站原创的图形系统——一束被照亮的人形光，加上该成员的乐器符号与一道裂痕。
 * 取得可使用的官方素材后，可在 MEMBERS 区块直接替换为 Figure 组件。
 */
export function MemberMark({ member, dim = false }: MemberMarkProps) {
  const uid = member.id;
  return (
    <div
      className="mark"
      data-dim={dim ? 'true' : 'false'}
      style={{ '--accent': member.accent, '--accent-rgb': member.accentRgb } as React.CSSProperties}
    >
      <svg viewBox="0 0 400 520" role="img" aria-label={`${member.name.jp} 的本站原创抽象视觉标记`}>
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="0.45" stopColor={`rgba(${member.accentRgb}, 0.5)`} />
            <stop offset="1" stopColor={`rgba(${member.accentRgb}, 0.14)`} />
          </linearGradient>
          <radialGradient id={`${uid}-bloom`} cx="0.5" cy="0.28" r="0.62">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.45" stopColor={`rgba(${member.accentRgb}, 0.42)`} />
            <stop offset="1" stopColor={`rgba(${member.accentRgb}, 0)`} />
          </radialGradient>
          <linearGradient id={`${uid}-prism`} x1="0" y1="0" x2="1" y2="0.15">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.24" stopColor={`rgba(${member.accentRgb}, 0.9)`} />
            <stop offset="0.52" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.74" stopColor="#b8a6f4" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-col`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="0.6" stopColor={`rgba(${member.accentRgb}, 0.5)`} />
            <stop offset="1" stopColor={`rgba(${member.accentRgb}, 0.05)`} />
          </linearGradient>
          <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <rect width="400" height="520" fill={`url(#${uid}-bg)`} />
        <rect width="400" height="520" fill={`url(#${uid}-bloom)`} />

        {/* 五线谱：极淡，只在画面里说「有乐谱」 */}
        <g stroke={`rgba(${member.accentRgb}, 0.34)`} strokeWidth="0.5" fill="none">
          {[70, 81, 92, 103, 114].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} />
          ))}
        </g>

        {/* 人形光：头部曝光 + 肩线，不做具体五官 */}
        <g filter={`url(#${uid}-soft)`} opacity="0.9">
          <ellipse cx="200" cy="196" rx="62" ry="70" fill="#ffffff" opacity="0.72" />
          <path
            d="M78 520 C96 402 140 330 200 330 C260 330 304 402 322 520 Z"
            fill={`url(#${uid}-col)`}
          />
        </g>
        <ellipse cx="200" cy="196" rx="44" ry="50" fill="#ffffff" opacity="0.34" />
        <path
          d="M78 520 C96 402 140 330 200 330 C260 330 304 402 322 520"
          fill="none"
          stroke={`rgba(${member.accentRgb}, 0.6)`}
          strokeWidth="1"
        />
        {/* 领口：一道极简的 V，帮助眼睛读出「人」 */}
        <path
          d="M172 336 L200 392 L228 336"
          fill="none"
          stroke={`rgba(${member.accentRgb}, 0.75)`}
          strokeWidth="1"
        />

        {/* 裂痕：横向错位的折射线 */}
        <g className="mark__crack">
          <path
            d="M0 296 L92 296 L104 288 L150 288 L162 300 L400 300"
            fill="none"
            stroke={`url(#${uid}-prism)`}
            strokeWidth="1.4"
          />
          <path
            d="M0 304 L88 304 L100 312 L148 312"
            fill="none"
            stroke={`rgba(${member.accentRgb}, 0.5)`}
            strokeWidth="0.6"
          />
        </g>

        {/* 乐器符号 */}
        <g
          className="mark__sigil"
          stroke={`rgba(${member.accentRgb}, 0.85)`}
          fill="none"
          strokeWidth="1.1"
        >
          <Sigil kind={member.sigil} rgb={member.accentRgb} />
        </g>

        {/* 画框刻度 */}
        <g stroke={`rgba(${member.accentRgb}, 0.5)`} strokeWidth="0.8">
          <line x1="18" y1="18" x2="18" y2="42" />
          <line x1="18" y1="18" x2="42" y2="18" />
          <line x1="382" y1="502" x2="382" y2="478" />
          <line x1="382" y1="502" x2="358" y2="502" />
        </g>
      </svg>

      <div className="mark__plate">
        <span className="mark__no">{String(member.index).padStart(2, '0')}</span>
        <span className="mark__name jp">{member.name.jp}</span>
        <span className="mark__inst">{member.instrument ?? '—'}</span>
      </div>
    </div>
  );
}

function Sigil({ kind, rgb }: { kind: Member['sigil']; rgb: string }) {
  switch (kind) {
    case 'piano': {
      const keys = Array.from({ length: 9 }, (_, i) => 40 + i * 36);
      const blacks = [1, 2, 4, 5, 6, 8];
      return (
        <g>
          {keys.map((x) => (
            <rect key={x} x={x} y={440} width="30" height="46" fill="none" />
          ))}
          {blacks.map((i) => (
            <rect
              key={i}
              x={40 + i * 36 + 20}
              y="440"
              width="16"
              height="27"
              fill={`rgba(${rgb}, 0.85)`}
              stroke="none"
            />
          ))}
          <line x1="26" y1="440" x2="374" y2="440" strokeWidth="2" />
        </g>
      );
    }
    case 'string': {
      const xs = [104, 138, 172, 206, 240, 274];
      return (
        <g>
          {xs.map((x, i) => (
            <line
              key={x}
              x1={x}
              y1="418"
              x2={x}
              y2="504"
              strokeWidth={i === 2 ? 1.8 : 0.8}
              stroke={`rgba(${rgb}, ${i === 2 ? 1 : 0.55})`}
            />
          ))}
          <path d="M88 418 L310 418 L296 432 L102 432 Z" fill={`rgba(${rgb}, 0.2)`} />
          <circle cx="206" cy="420" r="26" strokeDasharray="2 5" opacity="0.5" />
        </g>
      );
    }
    case 'bass': {
      const xs = [128, 166, 204, 242];
      return (
        <g>
          {xs.map((x, i) => (
            <path
              key={x}
              d={`M${x} 412 C${x + 4} 448, ${x - 4} 476, ${x} 510`}
              strokeWidth={i === 0 ? 2.4 : 1.4}
              stroke={`rgba(${rgb}, ${i === 0 ? 1 : 0.6})`}
            />
          ))}
          <path
            d="M112 404 C150 396, 200 414, 258 400"
            strokeWidth="0.9"
            stroke={`rgba(${rgb}, 0.45)`}
          />
          <circle cx="185" cy="430" r="3.4" fill={`rgba(${rgb}, 0.9)`} stroke="none" />
          <circle cx="215" cy="470" r="2.4" fill={`rgba(${rgb}, 0.7)`} stroke="none" />
        </g>
      );
    }
    case 'drum': {
      return (
        <g>
          <ellipse cx="200" cy="452" rx="86" ry="20" />
          <ellipse cx="200" cy="446" rx="66" ry="14" opacity="0.55" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * 86}
                y1={452 + Math.sin(a) * 20}
                x2={200 + Math.cos(a) * 108}
                y2={452 + Math.sin(a) * 26}
                strokeWidth="0.8"
                stroke={`rgba(${rgb}, 0.7)`}
              />
            );
          })}
          <ellipse cx="200" cy="452" rx="30" ry="8" fill={`rgba(${rgb}, 0.24)`} />
        </g>
      );
    }
    case 'hollow':
    default: {
      return (
        <g strokeDasharray="3 6" opacity="0.75">
          <circle cx="200" cy="452" r="62" />
          <path d="M138 452 L262 452" strokeDasharray="0" opacity="0.5" />
          <text
            x="200"
            y="458"
            textAnchor="middle"
            fontSize="13"
            letterSpacing="4"
            fill={`rgba(${rgb}, 0.8)`}
            stroke="none"
          >
            空席
          </text>
        </g>
      );
    }
  }
}
