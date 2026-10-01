import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import '../../styles/ui.css';

interface SectionHeadProps {
  index: string;
  title: string;
  ja?: string;
  zh?: string;
  lede?: ReactNode;
  tone?: 'paper' | 'night';
  align?: 'left' | 'split';
}

/** 统一的区块标题：编号 / 巨大 serif 标题 / 日文 / 中文 / 引导句 */
export function SectionHead({
  index,
  title,
  ja,
  zh,
  lede,
  tone = 'paper',
  align = 'left',
}: SectionHeadProps) {
  return (
    <header className={`section-head section-head--${tone} section-head--${align}`}>
      <Reveal variant="fade" className="section-head__index">
        <span className="eyebrow">{index}</span>
      </Reveal>
      <Reveal variant="mask" className="section-head__title display">
        <h2>{title}</h2>
      </Reveal>
      {(ja || zh) && (
        <Reveal variant="fade" delay={80} className="section-head__sub">
          {ja && <span className="section-head__ja jp">{ja}</span>}
          {zh && <span className="section-head__zh">{zh}</span>}
        </Reveal>
      )}
      {lede && (
        <Reveal variant="up" delay={140} className="section-head__lede lede">
          {lede}
        </Reveal>
      )}
    </header>
  );
}
