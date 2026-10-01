import { useState } from 'react';
import type { ReactNode } from 'react';
import '../../styles/ui.css';

type LoadStatus = 'idle' | 'ready' | 'error';

interface FigureProps {
  /** 站内路径；null 表示尚未收录素材 */
  src: string | null;
  alt: string;
  /** 素材位编号，用于 placeholder 上的排版 */
  slot?: string;
  caption?: string | null;
  rights?: string | null;
  /** 图片不可用时，渲染这张原创 SVG（而不是留白或破图） */
  art?: ReactNode;
  tone?: 'paper' | 'night';
  className?: string;
}

/**
 * 带状态机的图片位。
 * empty（未收录）/ loading / ready / error 四种状态全部有符合视觉风格的呈现，
 * 任何情况下都不会出现破图图标或空白块。
 */
export function Figure({
  src,
  alt,
  slot,
  caption,
  rights,
  art,
  tone = 'paper',
  className = '',
}: FigureProps) {
  const [status, setStatus] = useState<LoadStatus>(src ? 'idle' : 'error');

  // 没有 src → 未收录；有 src 且未失败 → 渲染真实 <img>，由 onLoad/onError 决定最终状态
  const showImg = Boolean(src) && status !== 'error';
  const state = !src ? 'empty' : status === 'error' ? 'error' : status === 'ready' ? 'ready' : 'loading';

  const stateText =
    state === 'error' ? 'LOAD FAILED' : state === 'loading' ? 'LOADING' : 'NOT ARCHIVED';

  return (
    <figure className={`figure figure--${tone} ${className}`.trim()} data-state={state}>
      <div className="figure__frame">
        {showImg ? (
          <img
            className="figure__img"
            src={src ?? ''}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus('ready')}
            onError={() => setStatus('error')}
          />
        ) : (
          <div className="figure__fallback">
            {art}
            <div className="figure__mark">
              <span className="figure__slot">{slot ?? 'SLOT'}</span>
              <span className="figure__state">{stateText}</span>
            </div>
          </div>
        )}
        <span className="figure__corner figure__corner--tl" aria-hidden="true" />
        <span className="figure__corner figure__corner--br" aria-hidden="true" />
      </div>
      <figcaption className="figure__caption">
        {caption && <span className="figure__cap-text">{caption}</span>}
        {rights && <span className="figure__rights">{rights}</span>}
      </figcaption>
    </figure>
  );
}
