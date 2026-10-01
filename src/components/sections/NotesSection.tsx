import { useEffect, useState } from 'react';
import { SaveButton } from '../ui/SaveButton';
import { notes } from '../../data/notes';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { ProvenanceTag } from '../ui/Provenance';
import '../../styles/sections.css';

export function NotesSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  useEffect(() => {
    const reveal = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (notes.some(n => n.id === id)) { setOpenId(id); requestAnimationFrame(() => document.getElementById('note-article-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })); }
    };
    window.addEventListener('millsage:note', reveal);
    return () => window.removeEventListener('millsage:note', reveal);
  }, []);

  return (
    <section id="notes" className="section notes grain">
      <div className="notes__bed" aria-hidden="true" />
      <div className="shell">
        <SectionHead
          index="11 / NOTES"
          title="Notes"
          ja="読み"
          zh="阅读笔记"
          lede="十篇从公开资料出发的阅读笔记。关于白色、键盘、日常、翻唱，以及五个人各自的幸福。"
        />

        <ol className="notes__list">
          {notes.map((n, i) => {
            const open = openId === n.id;
            return (
              <li key={n.id} id={'note-article-' + n.id} className="notes__item" data-open={open ? 'true' : 'false'}>
                <Reveal variant="up" delay={Math.min(i, 6) * 40}>
                  <article className="notes__card">
                    <div className="notes__aside">
                      <p className="notes__kicker">{n.kicker}</p>
                      <p className="notes__minutes micro">{n.minutes} MIN</p>
                      <ProvenanceTag value="interpretation" compact />
                      <SaveButton id={'note:' + n.id} label={n.title} compact />
                    </div>

                    <div className="notes__main">
                      <h3 className="notes__title display">{n.title}</h3>
                      <p className="notes__titleja jp">{n.titleJa}</p>
                      <p className="notes__lead">{n.lead}</p>

                      <button
                        type="button"
                        className="notes__toggle"
                        aria-expanded={open}
                        aria-controls={`note-${n.id}`}
                        onClick={() => setOpenId(open ? null : n.id)}
                      >
                        <span className="notes__toggle-line" aria-hidden="true" />
                        <span className="micro">{open ? '收起' : '展开全文'}</span>
                      </button>

                      <div
                        id={`note-${n.id}`}
                        className="notes__body"
                        data-open={open ? 'true' : 'false'}
                        role="region"
                        aria-label={n.title}
                        aria-hidden={!open}
                        inert={!open}
                      >
                        <div className="notes__body-inner">
                          {n.body.map((p, k) => (
                            <p key={k} className="body-text">
                              {p}
                            </p>
                          ))}
                          <blockquote className="notes__pull display">{n.pull}</blockquote>
                          {n.sourceUrl && <a className="journal-link" href={n.sourceUrl} target="_blank" rel="noopener noreferrer">公开资料出处 ↗</a>}
                          <p className="notes__related">
                            <span className="micro">RELATED</span>
                            {n.related.map((r) => (
                              <span key={r} className="chip">
                                {r}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
