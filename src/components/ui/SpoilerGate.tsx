import type { ReactNode } from 'react';
import { useSpoiler } from '../../context/spoiler-context';
import { allows } from '../../lib/spoiler';
import { SPOILER_LABEL } from '../../data/types';
import type { SpoilerLevel } from '../../data/types';
import '../../styles/ui.css';

interface SpoilerGateProps {
  /** 唯一 id，用于记住「用户已在本会话主动展开」 */
  id: string;
  required: SpoilerLevel;
  children: ReactNode;
  /** 剧透警告的标题 */
  heading?: string;
  /** 该内容在剧情中的位置提示 */
  teaser?: string;
  tone?: 'paper' | 'night';
  /** 阅读器以访客主动选择的全局等级为准，避免每翻一页重复确认。 */
  followLevel?: boolean;
}

/**
 * 剧透门。
 * 规则：
 * 1. 内容层级高于当前 SPOILER 设定时，一律不渲染正文。
 * 2. 默认逐处确认；连续阅读器可直接遵循访客选择的等级。
 * 3. 未允许的正文不进入 DOM。
 */
export function SpoilerGate({
  id,
  required,
  children,
  heading,
  teaser,
  tone = 'paper',
  followLevel = false,
}: SpoilerGateProps) {
  const { level, unlocked, unlock, setLevel } = useSpoiler();
  const permitted = allows(level, required);
  const open = permitted && (followLevel || unlocked.has(id));

  if (required === 'none' || open) {
    return <div className={`gate gate--open gate--${tone}`}>{children}</div>;
  }

  const reason = permitted
    ? '该内容需要你主动确认后才能展开。'
    : `当前 SPOILER 设定为 ${SPOILER_LABEL[level].en}，该内容属于 ${SPOILER_LABEL[required].en} 层级。`;

  // 剧透等级不足时，按钮必须同时提升等级并展开，绝不能是一个点了没反应的假按钮
  const openIt = () => {
    if (!permitted) setLevel(required);
    unlock(id);
  };

  return (
    <div className={`gate gate--locked gate--${tone}`}>
      <div className="gate__stripe" aria-hidden="true" />
      <p className="gate__flag">
        <span className="gate__flag-en">SPOILER — {SPOILER_LABEL[required].en}</span>
        <span className="gate__flag-zh">
          {required === 'full' ? '完全剧透' : required === 'light' ? '轻剧透' : '剧情内容'}
        </span>
      </p>

      {heading && <h4 className="gate__heading">{heading}</h4>}
      {teaser && <p className="gate__teaser">{teaser}</p>}

      <p className="gate__reason">{reason}</p>

      <div className="gate__actions">
        <button type="button" className="gate__btn" onClick={openIt}>
          <span className="gate__btn-line">
            {permitted
              ? '我已了解，仍要展开'
              : `把 SPOILER 切到 ${SPOILER_LABEL[required].en} 并展开`}
          </span>
        </button>
        {!permitted && (
          <span className="gate__hint">点击即表示接受该层级的剧透，可随时在剧情导读区改回。</span>
        )}
      </div>
    </div>
  );
}
