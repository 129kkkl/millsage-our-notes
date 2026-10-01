import { useState } from 'react';
import { band } from '../../data/band';
import { currentMembers } from '../../data/members';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { ProvenanceTag } from '../ui/Provenance';
import { Petals } from '../art/Petals';
import { OfficialLinks } from '../ui/ExternalLink';
import { SourcedImage } from '../ui/SourcedImage';
import { openMember } from '../../lib/navigation';
import '../../styles/band.css';

export function BandProfile() {
  const [openConcept, setOpenConcept] = useState<string | null>(band.conceptEntries[0].id);

  return (
    <section id="band" className="section band grain">
      <div className="band__glow" aria-hidden="true" />
      <Petals count={9} seed="band" intensity={0.6} />

      <div className="shell">
        <SectionHead
          index="01 / BAND"
          title="Band Profile"
          ja="それぞれの幸せ"
          zh="乐队简介"
          lede={
            <>
              {band.definition.zh}
              <br />
              <span className="band__defnote micro">{band.definition.note}</span>
            </>
          }
        />

        <div className="band__reading-path" aria-label="推荐阅读路线">
          <a href="#members"><span>01 / MEET</span><strong>先认识她们</strong><p>五人的档案与日常</p><i aria-hidden="true">↗</i></a>
          <a href="#music"><span>02 / LISTEN</span><strong>再听见声音</strong><p>原创、翻唱与首张单曲</p><i aria-hidden="true">↗</i></a>
          <a href="#story"><span>03 / READ</span><strong>走进各自的幸福</strong><p>从主题到人物关系</p><i aria-hidden="true">↗</i></a>
        </div>
        <Reveal variant="up" className="band__introduction">
          <div><p className="eyebrow">ABOUT THE BAND</p><h3 className="jp">一支乐队，<br />各自追寻的幸福。</h3><span className="serif-italic">A handful of happiness.</span></div>
          <div>{band.introduction.map(paragraph => <p key={paragraph} className="body-text">{paragraph}</p>)}<OfficialLinks links={[...band.links.official]} /></div>
        </Reveal>

        {/* 定义三语并置 */}
        <Reveal variant="up" className="band__def">
          <p className="band__def-ja jp">{band.definition.ja}</p>
          <div className="band__def-rule" aria-hidden="true" />
          <p className="band__def-zh">{band.definition.zh}</p>
          <p className="band__def-en serif-italic">{band.definition.en}</p>
        </Reveal>

        {/* 五人配置图 */}
        <Reveal variant="up" delay={80} className="band__lineup">
          <div className="band__lineup-head">
            <span className="eyebrow">LINE-UP</span>
            <span className="band__lineup-form">{band.lineupTitle}</span>
          </div>
          <ol className="band__desk">
            {currentMembers.map((m) => (
              <li key={m.id} className="band__channel" style={{ '--accent': m.accent } as React.CSSProperties}>
                <button type="button" className="band__member-photo" onClick={() => openMember(m.id)} aria-label={'查看' + m.name.jp + '的档案'}>{m.images && <SourcedImage src={m.images.thumbnail} alt={m.name.jp} />}</button>
                <span className="band__channel-line" aria-hidden="true" />
                <span className="band__channel-inst">{m.instrument ?? '—'}</span>
                <span className="band__channel-no">{String(m.index).padStart(2, '0')}</span>
                <span className="band__channel-name jp">{m.name.jp}</span>
                <span className="band__channel-en">{m.name.en}</span>
              </li>
            ))}
          </ol>
          <div className="band__meta">
            <div className="kv">
              <span className="kv__k">Work</span>
              <span className="kv__v">{band.work}</span>
            </div>
            <div className="kv">
              <span className="kv__k">Form</span>
              <span className="kv__v">
                {band.form} <ProvenanceTag value="canon" compact />
              </span>
            </div>
            <div className="kv">
              <span className="kv__k">Stage</span>
              <span className="kv__v">
                {band.setting.ja}（{band.setting.zh}） <ProvenanceTag value="canon" compact />
              </span>
            </div>
            <div className="kv">
              <span className="kv__k">Note</span>
              <span className="kv__v kv__v--na">{band.setting.note}</span>
            </div>
          </div>
        </Reveal>

        {/* 五个概念入口 */}
        <div className="band__concepts">
          <Reveal variant="fade" className="band__concepts-head">
            <span className="eyebrow">FIVE ENTRIES</span>
            <p className="band__concepts-note">
              点击任意一项，展开本站对该概念的视觉解释。这些解释属于 INTERPRETATION，不是官方释义。
            </p>
          </Reveal>

          <ul className="band__entry-list">
            {band.conceptEntries.map((c, i) => {
              const open = openConcept === c.id;
              return (
                <li key={c.id} className="band__entry" data-open={open ? 'true' : 'false'}>
                  <Reveal variant="up" delay={i * 60}>
                    <button
                      type="button"
                      className="band__entry-btn"
                      aria-expanded={open}
                      aria-controls={`concept-${c.id}`}
                      onClick={() => setOpenConcept(open ? null : c.id)}
                    >
                      <span className="band__entry-no">{c.num}</span>
                      <span className="band__entry-en display">{c.en}</span>
                      <span className="band__entry-ja jp">{c.ja}</span>
                      <span className="band__entry-zh">{c.zh}</span>
                      <span className="band__entry-mark" aria-hidden="true" />
                    </button>
                  </Reveal>
                  <div
                    id={`concept-${c.id}`}
                    className="band__entry-body"
                    data-open={open ? 'true' : 'false'}
                    role="region"
                    aria-label={c.en}
                    aria-hidden={!open}
                    inert={!open}
                  >
                    <div className="band__entry-inner">
                      <p className="band__entry-line">{c.line}</p>
                      <p className="band__entry-text">{c.body}</p>
                      <div className="band__entry-foot">
                        <ProvenanceTag value="interpretation" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
