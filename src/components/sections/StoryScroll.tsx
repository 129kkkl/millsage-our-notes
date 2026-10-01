import { useEffect, useMemo, useRef, useState } from 'react';
import { storyChapters, storyIntro } from '../../data/story';
import type { StoryChapter } from '../../data/types';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { SpoilerGate } from '../ui/SpoilerGate';
import { ProvenanceTag } from '../ui/Provenance';
import { Petals } from '../art/Petals';
import { usePrefersReducedMotion } from '../../lib/hooks';
import '../../styles/story.css';

export function StoryScroll() {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(storyChapters[0].id);
  const [inSection, setInSection] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeChapter = useMemo(
    () => storyChapters.find((c) => c.id === activeId) ?? storyChapters[0],
    [activeId],
  );

  // 电影式滚动：不做滚动劫持，只观察哪一章正在视口中央
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'));
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) setActiveId(best.target.getAttribute('data-chapter') ?? storyChapters[0].id);
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.15, 0.5, 0.9] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // 章节轨是 fixed 定位，必须知道「现在是否在 STORY 区块内」，否则会浮在全站之上
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInSection(entry.isIntersecting),
      { rootMargin: '-20% 0px -20% 0px' },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const jump = (id: string) => {
    const el = sectionRef.current?.querySelector<HTMLElement>(`[data-chapter="${id}"]`);
    el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const phase = activeChapter.visual;

  return (
    <section
      id="story"
      ref={sectionRef}
      className="on-night story grain"
      data-phase={phase}
    >
      {/* 从纸面进入极夜的过渡带 */}
      <div className="story__dusk" aria-hidden="true" />

      <div className={`story__field story__field--${phase}`} aria-hidden="true">
        {phase === 'fracture' && <CrackField />}
        {phase === 'bloom' && <BloomField />}
        {phase === 'residual' && <ResidualField />}
        {(phase === 'ash' || phase === 'tide') && (
          <Petals
            count={16}
            seed={`story-${phase}`}
            tone="night"
            intensity={phase === 'ash' ? 0.9 : 0.45}
          />
        )}
      </div>

      <div className="shell story__shell">
        <SectionHead
          index="05 / READING"
          title={storyIntro.en}
          ja={storyIntro.ja}
          zh={storyIntro.zh}
          tone="night"
          lede={storyIntro.lead}
        />

        <div className="story__status">
          <span className="eyebrow">READING FROM PUBLIC PROFILES</span>
          <p className="story__status-body">
            七段从公开人物背景出发的阅读。关于才能、相处与声音，也关于每个人如何理解幸福。
          </p>
          <p className="story__status-note">
            <ProvenanceTag value="interpretation" compact /> 从官方公开背景出发的主题阅读。完整剧情请前往 Our Notes。
          </p>
        </div>

        {/* 章节进度轨（仅在 STORY 区块内、宽屏显示） */}
        <nav
          className="story__rail"
          data-on={inSection ? 'true' : 'false'}
          aria-label="章节导航"
          aria-hidden={!inSection}
        >
          {storyChapters.map((c) => {
            const on = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                className="story__rail-item"
                data-active={on ? 'true' : 'false'}
                onClick={() => jump(c.id)}
              >
                <span className="story__rail-label">{c.label}</span>
                <span className="story__rail-line" aria-hidden="true" />
                <span className="story__rail-title">{c.title}</span>
              </button>
            );
          })}
        </nav>

        <ol className="story__list">
          {storyChapters.map((c, i) => (
            <Chapter key={c.id} chapter={c} index={i} onJump={jump} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  onJump,
}: {
  chapter: StoryChapter;
  index: number;
  onJump: (id: string) => void;
}) {
  return (
    <li className="story__chapter" data-chapter={chapter.id} data-visual={chapter.visual}>
      <Reveal variant="mask" className="story__chapter-head">
        <div className="story__chapter-meta">
          <span className="story__chapter-label">{chapter.label}</span>
          <span className="story__chapter-labelja jp">{chapter.labelJa}</span>
          {index < storyChapters.length - 1 && (
            <button
              type="button"
              className="story__next"
              onClick={() => onJump(storyChapters[index + 1].id)}
              aria-label={`前往下一章：${storyChapters[index + 1].title}`}
            >
              ↓
            </button>
          )}
        </div>
        <h3 className="story__chapter-title display">{chapter.title}</h3>
        <p className="story__chapter-sub jp">{chapter.subtitle}</p>
      </Reveal>

      <Reveal variant="up" delay={60} className="story__chapter-body">
        {chapter.spoiler === 'none' ? <ChapterText chapter={chapter} /> : <SpoilerGate
          id={`story-${chapter.id}`}
          required={chapter.spoiler}
          tone="night"
          heading={chapter.title}
          teaser={
            chapter.spoiler === 'full'
              ? '展开深入的人物与主题阅读。'
              : '本章为本站的人物与主题阅读。'
          }
        >
          <ChapterText chapter={chapter} />
        </SpoilerGate>}
      </Reveal>
    </li>
  );
}

function ChapterText({ chapter }: { chapter: StoryChapter }) {
  return <>{chapter.paragraphs.map((paragraph, i) => <p key={i} className="body-text story__p">{paragraph}</p>)}{chapter.pull && <blockquote className="story__pull display"><span className="story__pull-mark" aria-hidden="true">“</span>{chapter.pull}</blockquote>}</>;
}

function BloomField() {
  return (
    <svg className="story__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="st-bloom" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="600" cy="340" r="420" fill="url(#st-bloom)" />
    </svg>
  );
}

function CrackField() {
  return (
    <svg className="story__svg" viewBox="0 0 1200 800" preserveAspectRatio="none">
      <defs>
        <linearGradient id="st-crack" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.3" stopColor="#b8a6f4" stopOpacity="0.6" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.8" stopColor="#8fb0f2" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="story__crack">
        <path d="M0 520 L240 520 L268 486 L420 486 L448 546 L700 546 L726 500 L940 500 L968 560 L1200 560" fill="none" stroke="url(#st-crack)" strokeWidth="1.6" />
        <path d="M0 548 L232 548 L260 596 L430 596 L458 536 L1200 536" fill="none" stroke="url(#st-crack)" strokeWidth="0.8" opacity="0.6" />
        <path d="M268 486 L276 380 M448 546 L470 660 M726 500 L742 396" fill="none" stroke="url(#st-crack)" strokeWidth="0.7" opacity="0.5" />
      </g>
    </svg>
  );
}

function ResidualField() {
  return (
    <svg className="story__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="st-res" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="0.3" stopColor="#b8a6f4" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="story__res-light" cx="600" cy="520" r="180" fill="url(#st-res)" />
      {Array.from({ length: 5 }, (_, i) => (
        <circle
          key={i}
          className="story__res-ring"
          cx="600"
          cy="520"
          r={70 + i * 46}
          style={{ animationDelay: `${i * 1.1}s` }}
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.6"
          opacity="0.16"
        />
      ))}
    </svg>
  );
}
