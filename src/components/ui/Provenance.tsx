import type { Provenance } from '../../data/types';
import { PROVENANCE_LABEL } from '../../data/types';
import '../../styles/ui.css';

const HINT: Record<Provenance, string> = {
  canon: '依据作品公开设定整理',
  story: '本作游戏剧情事实（本站概括，非原文）',
  interpretation: '本站粉丝解读，不是官方说法',
  theory: '尚未证实的推测，请勿当作结论',
};

/** 内容性质标签。任何解读类文字都必须挂这个组件。 */
export function ProvenanceTag({ value, compact = false }: { value: Provenance; compact?: boolean }) {
  const label = PROVENANCE_LABEL[value];
  return (
    <span className={`prov prov--${value}${compact ? ' prov--compact' : ''}`} title={HINT[value]}>
      <span className="prov__en">{label.en}</span>
      {!compact && <span className="prov__zh">{label.zh}</span>}
    </span>
  );
}

export function ProvenanceNote({ value }: { value: Provenance }) {
  return (
    <p className="prov-note">
      <ProvenanceTag value={value} compact />
      <span>{HINT[value]}</span>
    </p>
  );
}

/** 未确认标记：资料尚未取得可靠来源时显示 */
export function UnconfirmedTag({ text = '未确认' }: { text?: string }) {
  return (
    <span className="unconfirmed" title="本站尚未取得可核实的来源，UI 会如实标记而不是猜一个值。">
      {text}
    </span>
  );
}
