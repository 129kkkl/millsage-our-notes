import { useMemo, useState } from 'react';
import { currentMembers as allMembers, currentMembers, getMember } from '../../data/members';
import { otherEnd, relationFacets, relationVisualLegend, relations, relationsFor } from '../../data/relationships';
import type { MemberId, Relation } from '../../data/types';
import { PROVENANCE_LABEL, SPOILER_LABEL } from '../../data/types';
import { useSpoiler } from '../../context/spoiler-context';
import { allows } from '../../lib/spoiler';
import { useMediaQuery } from '../../lib/hooks';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { ProvenanceTag, UnconfirmedTag } from '../ui/Provenance';
import { StoryConnections } from './StoryConnections';
import '../../styles/resonance.css';

export function ResonanceMap() {
  const { level, setLevel, unlocked, unlock } = useSpoiler();
  const wide = useMediaQuery('(min-width: 900px)');
  const [activeId, setActiveId] = useState<MemberId>('hotaru');

  const nodeById = useMemo(() => {
    const map = new Map<MemberId, (typeof allMembers)[number]>();
    allMembers.forEach((m) => map.set(m.id, m));
    return map;
  }, []);

  const isOpen = (r: Relation) => r.spoiler === 'none' || (allows(level, r.spoiler) && unlocked.has(r.id));

  // 展开状态统一算一次，避免在渲染里反复调用
  const openIds = useMemo(
    () => new Set(relations.filter((r) => isOpen(r)).map((r) => r.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, unlocked],
  );

  const activeRelations = useMemo(() => relationsFor(activeId), [activeId]);
  const activeMember = nodeById.get(activeId) ?? currentMembers[0];

  const grouped = useMemo(() => {
    return relationFacets
      .map((f) => ({ facet: f, items: activeRelations.filter((r) => r.facet === f.id) }))
      .filter((g) => g.items.length > 0);
  }, [activeRelations]);

  const openRelation = (r: Relation) => {
    if (!allows(level, r.spoiler)) setLevel(r.spoiler);
    unlock(r.id);
  };

  return (
    <section id="resonance" className="section resonance grain">
      <div className="resonance__bed" aria-hidden="true" />
      <div className="shell">
        <SectionHead
          index="07 / RESONANCE"
          title="Resonance Map"
          ja="共鳴図"
          zh="关系图"
          lede="把五个人放在同一张声音地图里。双吉他、节奏组、同班的联系，以及公开性格之间值得阅读的对照。"
        />

        <div className="resonance__body">
          {/* 桌面：SVG 星图 */}
          {wide ? (
            <div className="resonance__map">
              <svg viewBox="0 0 1000 640" role="group" aria-label="millsage 关系星图">
                <defs>
                  <radialGradient id="rs-core" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="0.4" stopColor="#b8a6f4" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#b8a6f4" stopOpacity="0" />
                  </radialGradient>
                  <filter id="rs-soft" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="7" />
                  </filter>
                  {allMembers.map(m => <clipPath key={m.id} id={'rs-portrait-' + m.id}><circle cx={m.map.x} cy={m.map.y} r="22" /></clipPath>)}
                </defs>

                {/* 中心核心 */}
                <g className="rs-core">
                  <circle cx="500" cy="330" r="150" fill="url(#rs-core)" />
                  <circle cx="500" cy="330" r="46" fill="none" stroke="var(--prism)" strokeWidth="0.7" opacity="0.5" strokeDasharray="2 6" />
                  <circle cx="500" cy="330" r="5" fill="#ffffff" />
                  <text x="500" y="322" className="rs-core-name display" textAnchor="middle">
                    millsage
                  </text>
                  <text x="500" y="352" className="rs-core-sub" textAnchor="middle">
                    FIVE VOICES / 五种幸福
                  </text>
                </g>

                {/* 关系线 */}
                <g className="rs-edges">
                  {relations.map((r) => {
                    const a = nodeById.get(r.from);
                    const b = nodeById.get(r.to);
                    if (!a || !b) return null;
                    const open = openIds.has(r.id);
                    return (
                      <g
                        key={r.id}
                        className="rs-edge"
                        data-visual={r.visual}
                        data-open={open ? 'true' : 'false'}
                        data-facet={r.facet}
                        onClick={() => { setActiveId(r.from); if (!open) openRelation(r); }}
                        role="button"
                        tabIndex={0}
                        aria-label={
                          open
                            ? `${a.name.jp} 与 ${b.name.jp}：${r.label}`
                            : `${a.name.jp} 与 ${b.name.jp}：需要 ${SPOILER_LABEL[r.spoiler].en} 剧透等级`
                        }
                        onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setActiveId(r.from);
                                  if (!open) openRelation(r);
                                }
                              }}
                      >
                        {r.visual === 'glow' && open && (
                          <path d={bendPath(a.map.x, a.map.y, b.map.x, b.map.y, r.id)} className="rs-edge-glow" filter="url(#rs-soft)" />
                        )}
                        <path d={bendPath(a.map.x, a.map.y, b.map.x, b.map.y, r.id)} className="rs-edge-line" />
                      </g>
                    );
                  })}
                </g>

                {/* 节点 */}
                {allMembers.map((m) => {
                  const on = m.id === activeId;
                  const linked = relations.some(
                    (r) => openIds.has(r.id) && (r.from === m.id || r.to === m.id),
                  );
                  return (
                    <g
                      key={m.id}
                      className="rs-node"
                      data-active={on ? 'true' : 'false'}
                      data-hollow={m.current ? 'false' : 'true'}
                      data-linked={linked ? 'true' : 'false'}
                      onClick={() => setActiveId(m.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveId(m.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      aria-label={`选择节点：${m.name.jp}${m.current ? '' : '（旧成员 / 空席）'}`}
                    >
                      <circle
                        cx={m.map.x}
                        cy={m.map.y}
                        r={on ? 30 : 22}
                        fill={`rgba(${m.accentRgb}, 0.24)`}
                        stroke={m.accent}
                        strokeWidth="1.1"
                      />
                      {m.images && <image href={m.images.thumbnail} x={m.map.x - 22} y={m.map.y - 22} width="44" height="44" preserveAspectRatio="xMidYMid slice" clipPath={'url(#rs-portrait-' + m.id + ')'} />}
                      {on && (
                        <circle
                          cx={m.map.x}
                          cy={m.map.y}
                          r="44"
                          fill="none"
                          stroke={m.accent}
                          strokeWidth="0.6"
                          opacity="0.6"
                          className="rs-node-ring"
                        />
                      )}
                      <text x={m.map.x} y={m.map.y - 42} className="rs-node-no" textAnchor="middle">
                        {m.current ? String(m.index).padStart(2, '0') : '—'}
                      </text>
                      <text x={m.map.x} y={m.map.y + (m.current ? 52 : 50)} className="rs-node-name jp" textAnchor="middle">
                        {m.name.jp}
                      </text>
                      <text x={m.map.x} y={m.map.y + (m.current ? 68 : 66)} className="rs-node-inst" textAnchor="middle">
                        {m.instrument ?? '旧 millsage'}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <ul className="resonance__legend">
                {relationVisualLegend.map((l) => (
                  <li key={l.visual} className="resonance__legend-item">
                    <svg viewBox="0 0 40 12" className="resonance__legend-svg" data-visual={l.visual} aria-hidden="true">
                      <path d="M2 6 L38 6" className="rs-edge-line" />
                    </svg>
                    <span>{l.zh}</span>
                  </li>
                ))}
                <li className="resonance__legend-item resonance__legend-item--note">
                  <span>点击人物头像，阅读她与其他成员的公开联系和性格对照。</span>
                </li>
              </ul>
            </div>
          ) : null}

          {/* 详情面板（桌面右栏 / 窄屏则作为主视图） */}
          <aside className="resonance__panel" aria-live="polite">
            <div className="resonance__panel-head">
              <div>
                <p className="resonance__panel-no">
                  {activeMember.current ? String(activeMember.index).padStart(2, '0') : '—'}
                </p>
                <h3 className="resonance__panel-name jp">{activeMember.name.jp}</h3>
                <p className="resonance__panel-en">{activeMember.name.en}</p>
              </div>
              <p className="resonance__panel-inst">{activeMember.instrument ?? '旧 millsage 成员'}</p>
            </div>

            {!activeMember.current && (
              <p className="resonance__hollow-note">
                <UnconfirmedTag text="空席" />
                本站关于这位旧成员的正式资料尚未完成核实，因此只保留「失去」这个事实本身。
              </p>
            )}

            <p className="resonance__voice">
              <ProvenanceTag value={activeMember.voice.provenance} compact />
              {activeMember.voice.note}
            </p>

            {!wide && (
              <ul className="resonance__mobile-pick">
                {allMembers.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      className="resonance__mobile-btn"
                      data-active={m.id === activeId ? 'true' : 'false'}
                      onClick={() => setActiveId(m.id)}
                    >
                      <span className="jp">{m.name.jp}</span>
                      <span>{m.instrument ?? '空席'}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="resonance__groups">
              {grouped.length === 0 && (
                <p className="resonance__none">本站暂未收录该节点的关系描述。</p>
              )}

              {grouped.map((g) => (
                <section key={g.facet.id} className="resonance__group">
                  <h4 className="resonance__group-head">
                    <span className="resonance__group-glyph" aria-hidden="true">
                      {g.facet.glyph}
                    </span>
                    {g.facet.en}
                    <span className="resonance__group-zh">{g.facet.zh}</span>
                  </h4>

                  <ul className="resonance__rel-list">
                    {g.items.map((r) => {
                      const other = getMember(otherEnd(r, activeId));
                      const open = openIds.has(r.id);
                      return (
                        <li key={r.id} className="resonance__rel" data-open={open ? 'true' : 'false'}>
                          <div className="resonance__rel-top">
                            <span className="resonance__rel-with jp">
                              ↔ {other.name.jp}
                              {other.current ? '' : '（空席）'}
                            </span>
                            <span className="resonance__rel-label">{open ? r.label : '受剧透等级保护'}</span>
                          </div>

                          {open ? (
                            <>
                              <p className="resonance__rel-detail">{r.detail}</p>
                              <div className="resonance__rel-foot">
                                <ProvenanceTag value={r.provenance} compact />
                                <span className="micro">
                                  {PROVENANCE_LABEL[r.provenance].zh}
                                  {!r.confirmed && ' · 证据不足，本站不补全'}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="resonance__rel-locked">
                              <p className="resonance__rel-locked-text">
                                这条关系属于 {SPOILER_LABEL[r.spoiler].en} 层级（{SPOILER_LABEL[r.spoiler].zh}）。
                              </p>
                              <button
                                type="button"
                                className="resonance__rel-open"
                                onClick={() => openRelation(r)}
                              >
                                {allows(level, r.spoiler)
                                  ? '我已了解，展开这条关系'
                                  : `把 SPOILER 切到 ${SPOILER_LABEL[r.spoiler].en} 并展开`}
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </aside>
        </div>

        <StoryConnections />
        <Reveal variant="fade" className="resonance__foot">
          <p className="micro">
            编制与同班信息依据官方公开档案；性格对照和连线视觉属于本站解读，不代表已经确认的剧情关系。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** 折线：中点带一个确定性偏移，折线用 offset+2，glow 用 offset+5 */
function bendPath(x1: number, y1: number, x2: number, y2: number, seed: string): string {
  const bend = bendAmount(seed);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${x1} ${y1} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}

function bendAmount(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 97;
  return (h / 97) * 60 - 30;
}
