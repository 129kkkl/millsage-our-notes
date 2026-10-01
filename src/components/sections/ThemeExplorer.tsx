import { useState } from 'react';
import { themeConcepts } from '../../data/themes';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { ProvenanceTag } from '../ui/Provenance';
import { ThemeCanvas } from '../art/ThemeCanvas';
import '../../styles/theme.css';

export function ThemeExplorer() {
  const [activeId, setActiveId] = useState(themeConcepts[0].id);
  const active = themeConcepts.find((c) => c.id === activeId) ?? themeConcepts[0];

  return (
    <section id="theme" className="on-night theme section grain" data-concept={active.id}>
      <div className="theme__haze" aria-hidden="true" />
      <div className="shell">
        <SectionHead
          index="06 / THEME"
          title="What Does Happiness Mean?"
          ja="幸せとは何か"
          zh="幸福意味着什么"
          tone="night"
          lede="幸福、才能、祝福、记忆——选择一个词，换一种观看她们的方式。八个主题，八张关于声音与光的构图。"
        />

        <div className="theme__body">
          <ul className="theme__nav" role="tablist" aria-label="主题概念">
            {themeConcepts.map((c) => {
              const on = c.id === active.id;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className="theme__nav-btn"
                    data-active={on ? 'true' : 'false'}
                    onClick={() => setActiveId(c.id)}
                  >
                    <span className="theme__nav-glyph" aria-hidden="true">
                      {c.glyph}
                    </span>
                    <span className="theme__nav-en">{c.en}</span>
                    <span className="theme__nav-zh">{c.zh}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="theme__stage">
            <div className="theme__canvas-wrap" key={active.id}>
              <ThemeCanvas conceptId={active.id} />
            </div>

            <div className="theme__text">
              <div className="theme__title-row">
                <h3 className="theme__title display">{active.en}</h3>
                <span className="theme__ja jp">{active.ja}</span>
              </div>
              <p className="theme__gloss">{active.gloss}</p>

              <div className="theme__readings">
                {active.reading.map((r, i) => (
                  <p key={i} className="theme__reading">
                    {r}
                  </p>
                ))}
              </div>

              <blockquote className="theme__question">
                <span className="theme__question-kicker micro">QUESTION FOR YOU</span>
                {active.question}
              </blockquote>

              <div className="theme__prov">
                <ProvenanceTag value="interpretation" />
                <span className="micro">以上全部为本站解读，不代表官方对概念的界定。</span>
              </div>
            </div>
          </div>
        </div>

        <Reveal variant="fade" className="theme__foot">
          <p className="micro">
            本站不给这八个概念排顺序，也不指定哪一个是「正解」。本站唯一坚持的问题是：花依然盛开，光依然漂亮，音乐依然响着——只是花瓣有缺口。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
