import { useEffect, useRef, useState } from 'react';
import { guideChapters, storyReferences } from '../../data/story-guide';
import type { GuideChapter } from '../../data/story-guide';
import { currentMembers } from '../../data/members';
import { useLibrary } from '../../context/library-context';
import { SectionHead } from '../ui/SectionHead';
import { SpoilerGate } from '../ui/SpoilerGate';
import { SpoilerControl } from '../layout/SpoilerControl';
import { SourcedImage } from '../ui/SourcedImage';
import { Icon, Flower } from '../ui/Icon';
import { SaveButton } from '../ui/SaveButton';
import { openMember } from '../../lib/navigation';
import { assets } from '../../data/assets';
import type { MemberId } from '../../data/types';
import '../../styles/storybook.css';

export function StoryBook() {
  const { lastChapter, setLastChapter, read } = useLibrary();
  const [activeId, setActiveId] = useState(() => guideChapters.some(c => c.id === lastChapter) ? lastChapter : 'prelude');
  const [perspective, setPerspective] = useState<MemberId | 'all'>('all');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const active = guideChapters.find(c => c.id === activeId) ?? guideChapters[0];
  const visible = guideChapters.filter(c => perspective === 'all' || c.characters.includes(perspective));
  const index = guideChapters.findIndex(c => c.id === active.id);
  const readCount = guideChapters.filter(c => read.includes(c.id)).length;

  useEffect(() => {
    const onChapter = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (guideChapters.some(c => c.id === id)) { setActiveId(id); setLastChapter(id); setPerspective('all'); }
    };
    window.addEventListener('millsage:chapter', onChapter);
    return () => window.removeEventListener('millsage:chapter', onChapter);
  }, [setLastChapter]);
  const choose = (id: string, focus = false) => {
    setActiveId(id); setLastChapter(id);
    if (focus) requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
  };
  const filter = (id: MemberId | 'all') => {
    setPerspective(id);
    if (id !== 'all' && !active.characters.includes(id)) {
      const next = guideChapters.find(c => c.characters.includes(id));
      if (next) choose(next.id);
    }
  };

  return <section id="story" className="section storybook on-night" data-phase={active.phase}>
    <div className="storybook__background" aria-hidden="true" />
    <div className="shell">
      <div className="storybook__heading">
        <SectionHead index="STORY / 01—08" title="Between the Flowers" ja="花飾りのためのデコール" zh="花饰之下的故事" tone="night" lede="从最初的相遇，到幸福背面的心事。翻开八段剧情导读，慢慢走近这支乐队。" />
        <Flower size={110} />
      </div>
      <div className="storybook__toolbar">
        <SpoilerControl tone="night" />
        <div className="storybook__progress"><span>已读 {readCount} / {guideChapters.length}</span><progress value={readCount} max={guideChapters.length} aria-label="剧情导读阅读进度" /></div>
      </div>
      <div className="storybook__perspectives" role="group" aria-label="按人物筛选剧情导读">
        <span>人物视角</span><button type="button" aria-pressed={perspective === 'all'} onClick={() => filter('all')}>全部</button>
        {currentMembers.map(m => <button type="button" key={m.id} aria-pressed={perspective === m.id} onClick={() => filter(m.id)}>{m.name.jp}</button>)}
      </div>
      <div className="storybook__book">
        <aside className="storybook__contents">
          <p className="storybook__contents-label"><Icon name="book" size={16} /> CONTENTS / 目录</p>
          <nav aria-label="剧情章节"><ol>{visible.map(c => <li key={c.id}><button type="button" aria-current={active.id === c.id ? 'step' : undefined} onClick={() => choose(c.id)}><span>{c.number}</span><span>{c.title}<small>{c.spoiler === 'none' ? '无剧透' : c.spoiler === 'light' ? '轻剧透' : '完全剧透'}</small></span>{read.includes(c.id) && <Icon name="check" size={15} />}</button></li>)}</ol></nav>
          <div className="storybook__margin-note"><span>READ AT YOUR OWN PACE</span><p>编号为本站导读分段，并非游戏话数。正文含剧情概述与独立的读后笔记。</p></div>
        </aside>
        <article className="storybook__page" aria-labelledby="chapter-title">
          <div className="storybook__page-top"><span>CHAPTER {active.number}</span><SaveButton id={'chapter:' + active.id} label={active.title} /><span>{index + 1} / {guideChapters.length}</span></div>
          <p className="storybook__en serif-italic">{active.en}</p>
          <h3 id="chapter-title" ref={titleRef} tabIndex={-1}>{active.title}</h3>
          <p className="storybook__teaser">{active.teaser}</p>
          <SpoilerGate id={'guide-' + active.id} required={active.spoiler} followLevel heading={active.spoiler === 'full' ? '继续阅读将涉及主线重要转折' : '继续阅读将涉及故事前段'} teaser={active.spoiler === 'full' ? '包含人物经历与后段剧情。确认后展开本段。' : '包含相遇与乐队过去的背景。'} tone="night">
            <ChapterContent key={active.id} chapter={active} />
          </SpoilerGate>
          <div className="storybook__pagination"><button type="button" disabled={index === 0} onClick={() => choose(guideChapters[index - 1].id, true)}>← 上一段</button><span className="storybook__page-flower"><Icon name="flower" size={24} /></span><button type="button" disabled={index === guideChapters.length - 1} onClick={() => choose(guideChapters[index + 1].id, true)}>下一段 →</button></div>
        </article>
      </div>
      <div className="storybook__source-note"><p>剧情依据公开玩家阅读记录交叉整理，完整叙事请在 Our Notes 中体验。事实概述、本站读法与尚有争议的推测分别呈现；未复制台词或剧情脚本。</p><a href="https://bang-dream-on.bushimo.jp/" target="_blank" rel="noopener noreferrer">前往原作 ↗</a></div>
      <figure className="storybook__interlude"><SourcedImage src={assets.atmosphere} alt="月光落在钢琴与白花上的原创氛围插画" /><figcaption><span>Every voice deserves to be heard.</span><small>白花与琴声 · 本站 AI 氛围插画</small></figcaption></figure>
    </div>
  </section>;
}

function ChapterContent({ chapter }: { chapter: GuideChapter }) {
  const { read, markRead, unmarkRead, journal, setJournal } = useLibrary();
  const [reading, setReading] = useState(false);
  const done = read.includes(chapter.id);
  const takeNote = () => {
    setJournal(journal + (journal ? '\n\n' : '') + '【' + chapter.title + '】\n' + chapter.question + '\n\n');
    document.getElementById('journal')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    window.dispatchEvent(new Event('millsage:journal-focus'));
  };
  return <div className="storybook__unlocked">
    <div className="storybook__chapter-layout"><div className="storybook__paragraphs">{chapter.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      <figure className="storybook__figure"><SourcedImage src={chapter.image} alt={chapter.imageLabel} /><figcaption>{chapter.imageLabel}<a href={chapter.imageSource} target="_blank" rel="noopener noreferrer">图像出处 ↗</a></figcaption></figure>
    </div>
    <div className="storybook__tags">{chapter.tags.map(t => <span key={t}># {t}</span>)}</div>
    <button type="button" className="storybook__reading-toggle" aria-expanded={reading} aria-controls={'reading-' + chapter.id} onClick={() => setReading(!reading)}><Icon name="flower" size={20} /> 页边笔记 · 本站读法 <span>{reading ? '−' : '+'}</span></button>
    {reading && <div id={'reading-' + chapter.id} className="storybook__reading"><p>{chapter.reading}</p><blockquote>{chapter.question}</blockquote><a href="#journal" onClick={e => { e.preventDefault(); takeNote(); }}>把这个问题写进手账 ↗</a></div>}
    <div className="storybook__references"><span>本段资料</span>{chapter.refs.map(id => <a key={id} href={storyReferences[id].url} target="_blank" rel="noopener noreferrer">{storyReferences[id].label}<small>{storyReferences[id].kind} ↗</small></a>)}</div>
    <div className="storybook__read-actions"><button type="button" className="journal-button" aria-pressed={done} onClick={() => done ? unmarkRead(chapter.id) : markRead(chapter.id)}><Icon name={done ? 'check' : 'book'} size={17} />{done ? '已读 · 点击撤销' : '标记为已读'}</button><div>{chapter.characters.filter(id => id !== 'kanata').map(id => <button type="button" key={id} onClick={() => openMember(id)} title="查看人物档案">{currentMembers.find(m => m.id === id)?.name.jp}</button>)}</div></div>
  </div>;
}
