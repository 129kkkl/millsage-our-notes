import { useEffect, useMemo, useRef, useState } from 'react';
import { currentMembers } from '../../data/members';
import type { Member } from '../../data/types';
import { NOT_AVAILABLE } from '../../data/types';
import { SectionHead } from '../ui/SectionHead';
import { SpoilerGate } from '../ui/SpoilerGate';
import { ProvenanceTag, UnconfirmedTag } from '../ui/Provenance';
import { MemberMark } from '../art/MemberMark';
import { SourcedImage } from '../ui/SourcedImage';
import { OfficialLinks } from '../ui/ExternalLink';
import { imageRights } from '../../data/assets';
import { verifiedDate } from '../../data/sources';
import { Petals } from '../art/Petals';
import { seededSeries } from '../../lib/hash';
import '../../styles/members.css';

type Tab = 'profile' | 'story';

/** 成员切换时改变动画节奏：每人一档 */
const RHYTHM = [0.78, 1.42, 0.94, 1.12, 1.26];

export function MembersStage() {
  const [activeId, setActiveId] = useState<Member['id']>(currentMembers[0].id);
  const [tab, setTab] = useState<Tab>('profile');
  const [outfit, setOutfit] = useState<'stage' | 'casual'>('stage');
  const railRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const selectMember = (event: Event) => {
      const id = (event as CustomEvent<Member['id']>).detail;
      if (currentMembers.some(member => member.id === id)) {
        setActiveId(id);
        setTab('profile');
      }
    };
    window.addEventListener('millsage:member', selectMember);
    return () => window.removeEventListener('millsage:member', selectMember);
  }, []);

  const active = useMemo(
    () => currentMembers.find((m) => m.id === activeId) ?? currentMembers[0],
    [activeId],
  );
  const speed = RHYTHM[(active.index - 1) % RHYTHM.length];

  // 每名成员一套确定性纹理，作为背景层次的差异来源
  const texture = useMemo(() => {
    const r = seededSeries(`tex:${active.id}`, 6);
    return {
      a: r[0],
      b: r[1],
      c: r[2],
    };
  }, [active.id]);

  const onRailKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft')
      return;
    e.preventDefault();
    const i = currentMembers.findIndex((m) => m.id === activeId);
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = currentMembers[(i + dir + currentMembers.length) % currentMembers.length];
    setActiveId(next.id);
    const btn = railRef.current?.querySelectorAll('button')[next.index - 1];
    (btn as HTMLButtonElement | undefined)?.focus();
  };

  return (
    <section
      id="members"
      className="section members grain"
      style={
        {
          '--accent': active.accent,
          '--accent-rgb': active.accentRgb,
          '--tex-a': texture.a,
          '--tex-b': texture.b,
        } as React.CSSProperties
      }
    >
      <div className="members__tex" aria-hidden="true" />
      <Petals key={active.id} count={12} seed={`member-${active.id}`} intensity={0.55} speed={speed} />

      <div className="shell">
        <SectionHead
          index="02 / MEMBERS"
          title="Five Members"
          ja="五人"
          zh="成员"
          lede="一位键盘主唱，两位吉他手，一位贝斯手，一位鼓手。从舞台上的模样，到课余的日常，认识构成 millsage 的五个人。"
        />

        <div className="members__body">
          {/* Gallery rail */}
          <ul
            className="members__rail"
            ref={railRef}
            role="tablist"
            aria-label="成员选择"
            aria-orientation="horizontal"
            onKeyDown={onRailKey}
          >
            {currentMembers.map((m) => {
              const on = m.id === active.id;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    role="tab"
                    id={'member-tab-' + m.id}
                    aria-controls={'member-panel-' + m.id}
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    className="members__rail-btn"
                    data-active={on ? 'true' : 'false'}
                    onClick={() => setActiveId(m.id)}
                  >
                    {m.images && <SourcedImage src={m.images.thumbnail} alt="" className="members__rail-photo" />}
                    <span className="members__rail-no">{String(m.index).padStart(2, '0')}</span>
                    <span className="members__rail-jp jp">{m.name.jp}</span>
                    <span className="members__rail-en">{m.name.en}</span>
                    <span className="members__rail-inst">{m.instrument}</span>
                    <span className="members__rail-rule" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Stage */}
          <div className="members__stage">
            <div className="members__visual">
              <div className="members__outfits" role="group" aria-label="角色立绘版本">
                <span className="micro">OFFICIAL VISUAL</span>
                <button type="button" aria-pressed={outfit === 'stage'} onClick={() => setOutfit('stage')}>舞台装</button>
                <button type="button" aria-pressed={outfit === 'casual'} onClick={() => setOutfit('casual')}>日常装</button>
              </div>
              {active.images ? <SourcedImage src={active.images[outfit]} alt={active.name.jp + ' 官方' + (outfit === 'stage' ? '舞台装' : '日常装') + '立绘'} className="members__portrait" fallback={<MemberMark member={active} />} /> : <MemberMark member={active} />}
              <p className="members__artnote micro">
                官网公开立绘 · {imageRights}
              </p>
            </div>

            <div className="members__info">
              <div className="members__idrow">
                <div>
                  <h3 className="members__name jp">{active.name.jp}</h3>
                  <p className="members__kana jp">{active.name.kana}</p>
                </div>
                <div className="members__idright">
                  <p className="members__en display">{active.name.en}</p>
                  <p className="members__inst">{active.instrument}</p>
                </div>
              </div>

              <ul className="members__keys">
                {active.keywords.map((k) => (
                  <li key={k} className="chip">
                    {k}
                  </li>
                ))}
              </ul>

              <div className="members__tabs" role="tablist" aria-label="资料视图">
                <button
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={tab === 'profile'}
                  onClick={() => setTab('profile')}
                >
                  公开档案
                </button>
                <button
                  type="button"
                  role="tab"
                  className="tab"
                  aria-selected={tab === 'story'}
                  onClick={() => setTab('story')}
                >
                  人物阅读
                </button>
              </div>

              <div className="members__panel" role="tabpanel" id={'member-panel-' + active.id} aria-labelledby={'member-tab-' + active.id}>
                {tab === 'profile' ? (
                  <div className="members__profile">
                    <p className="members__summary">{active.profile.summary}</p>
                    <p className="body-text members__bg">{active.profile.background}</p>

                    <div className="members__kv">
                      <div className="kv">
                        <span className="kv__k">Name</span>
                        <span className="kv__v">
                          {active.name.jp}
                          <span className="members__sep">/</span>
                          {active.name.en}
                        </span>
                      </div>
                      <div className="kv">
                        <span className="kv__k">Instrument</span>
                        <span className="kv__v">
                          {active.instrument ?? <span className="kv__v--na">{NOT_AVAILABLE.en}</span>}
                          {active.instrumentRole && <span className="members__role">{active.instrumentRole}</span>}
                        </span>
                      </div>
                      <div className="kv">
                        <span className="kv__k">CV</span>
                        <span className="kv__v">
                          {active.cv ?? <span className="kv__v--na">{NOT_AVAILABLE.en}</span>}
                        </span>
                      </div>
                      <div className="kv">
                        <span className="kv__k">学校</span>
                        <span className="kv__v">
                          {active.profile.affiliation ?? NOT_AVAILABLE.zh}
                        </span>
                      </div>
                      <div className="kv"><span className="kv__k">班级 / 年级</span><span className="kv__v">{active.grade ?? NOT_AVAILABLE.zh}</span></div>
                      <div className="kv"><span className="kv__k">生日</span><span className="kv__v">{active.birthday ?? NOT_AVAILABLE.zh}</span></div>
                      <div className="kv"><span className="kv__k">喜欢的食物</span><span className="kv__v">{active.favoriteFood ?? NOT_AVAILABLE.zh}</span></div>
                      <div className="kv">
                        <span className="kv__k">爱好</span>
                        <span className="kv__v">
                          {active.profile.interests?.length ? (
                            <span className="members__interest">{active.profile.interests.join(' · ')}</span>
                          ) : (
                            <span className="kv__v--na">{NOT_AVAILABLE.en}</span>
                          )}
                          {active.profile.interestsNote && (
                            <span className="members__note">{active.profile.interestsNote}</span>
                          )}
                        </span>
                      </div>
                      <div className="kv">
                        <span className="kv__k">In Band</span>
                        <span className="kv__v">{active.profile.relation}</span>
                      </div>
                    </div>

                    <div className="members__prov">
                      <ProvenanceTag value="canon" />
                      <span className="micro">
                        资料依据 Our Notes 官网 · 核对 {verifiedDate}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="members__story">
                    <SpoilerGate
                      id={`member-story-${active.id}`}
                      required={active.story.spoiler}
                      heading={`${active.name.jp} — 人物阅读`}
                      teaser="从公开性格与背景出发的粉丝阅读，讨论可能的主题与张力。"
                    >
                      <p className="body-text">{active.story.core}</p>
                      <p className="body-text">{active.story.tension}</p>
                      <div className="members__voice">
                        <p className="eyebrow">VOICE / 声音节点</p>
                        <p className="members__voice-text serif-italic">{active.voice.note}</p>
                        <ProvenanceTag value={active.voice.provenance} />
                      </div>
                      <div className="members__prov">
                        <ProvenanceTag value="interpretation" />
                        <span className="micro">人物与声音的阅读均为本站解读。</span>
                      </div>
                    </SpoilerGate>
                    {!active.confirmed && (
                      <p className="members__unconf">
                        <UnconfirmedTag /> 该成员的公开资料尚未完成核实，本站对缺失项保持留空。
                      </p>
                    )}
                  </div>
                )}
              </div>
              <OfficialLinks links={active.officialLinks ?? []} className="members__source" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
