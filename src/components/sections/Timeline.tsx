import { useState } from 'react';
import { realTimeline, storyTimeline, timelineTabs } from '../../data/timeline';
import type { TimelineTab } from '../../data/timeline';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { SpoilerGate } from '../ui/SpoilerGate';
import { ProvenanceTag, UnconfirmedTag } from '../ui/Provenance';
import '../../styles/sections.css';

export function Timeline() {
  const [tab, setTab] = useState<TimelineTab>('real');
  const list = tab === 'story' ? storyTimeline : realTimeline;
  const meta = timelineTabs.find((t) => t.id === tab);

  return (
    <section id="timeline" className="section timeline grain">
      <div className="timeline__bed" aria-hidden="true" />
      <div className="shell">
        <SectionHead
          index="08 / TIMELINE"
          title="Millsage Archive"
          ja="年表"
          zh="时间轴"
          lede="从最初的数字配信，到第一张实体单曲与首场演出，把已经公开的记录一页页排好。"
        />

        <div className="timeline__tabs" role="tablist" aria-label="时间轴类型">
          {timelineTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className="timeline__tab"
              data-active={tab === t.id ? 'true' : 'false'}
              onClick={() => setTab(t.id)}
            >
              <span className="timeline__tab-en">{t.label}</span>
              <span className="timeline__tab-zh">{t.zh}</span>
            </button>
          ))}
        </div>

        {meta && <p className="timeline__note">{meta.note}</p>}

        <ol className="timeline__list" key={tab}>
          {list.map((e, i) => (
            <li key={e.id} className="timeline__row">
              <Reveal variant="up" delay={Math.min(i, 6) * 50} className="timeline__item">
                <div className="timeline__rail" aria-hidden="true">
                  <span className="timeline__dot" />
                  <span className="timeline__line" />
                </div>

                <div className="timeline__content">
                  <div className="timeline__meta">
                    <span className="timeline__date">{e.dateLabel}</span>
                    {!e.confirmed && <UnconfirmedTag text="未确认" />}
                    <ProvenanceTag value={e.provenance} compact />
                  </div>

                  <h3 className="timeline__title">{e.title}</h3>

                  {e.spoiler === 'none' ? (
                    <p className="timeline__detail">{e.detail}</p>
                  ) : (
                    <SpoilerGate
                      id={`timeline-${e.id}`}
                      required={e.spoiler}
                      heading={e.title}
                      teaser="这个时间轴节点涉及剧情走向。展开后无法收回。"
                    >
                      <p className="timeline__detail">{e.detail}</p>
                    </SpoilerGate>
                  )}
                  {e.sourceUrl && <a className="timeline__source" href={e.sourceUrl} target="_blank" rel="noopener noreferrer">官方资料 ↗</a>}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
