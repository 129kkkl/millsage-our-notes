import { useState } from 'react';
import { currentMembers } from '../../data/members';
import { storyReferences } from '../../data/story-guide';
import { SpoilerGate } from '../ui/SpoilerGate';
import { Flower } from '../ui/Icon';
import { SourcedImage } from '../ui/SourcedImage';
import type { MemberId } from '../../data/types';

const connections: Record<MemberId, { label: string; detail: string; chapter: string }> = {
  hotaru: { label: '憧憬，与继承的位置', detail: '奏多的音乐改变了蛍的方向。成为新主唱后，蛍试图延续她的幸福，却又从日记里读到了与美好回忆不同的心情。', chapter: 'encounter' },
  natsume: { label: '被认可过的吉他', detail: '奏多曾认可なつめ的声音。失去与认可牵引着她对新主唱的态度；她也在新的乐队中继续创作、照顾伙伴。', chapter: 'wishes' },
  nagi: { label: '留在伙伴身边', detail: '凪也是过去乐队的一员，并与まほろ有幼年好友的联系。她对まほろ的关心，是理解其选择时值得留意的一条线。', chapter: 'wishes' },
  mahoro: { label: '想把乐队留住的人', detail: 'まほろ珍视亲手组建的乐队。对奏多的怀念与自责，以及蛍带来的改变，让维系乐队成为一件同时温柔而沉重的事。', chapter: 'stage' },
  houka: { label: '被才能吸引的目光', detail: '朋花对奏多与蛍的突出才能都怀有兴趣。她观看音乐的方式，与伙伴们怀念一个人的方式并不完全相同。', chapter: 'wishes' },
  kanata: { label: '沢海奏多 · 缺席而仍在场', detail: '前任主唱的回忆连起原有四人与蛍。伙伴们记得她给予的幸福，留下的日记则显出她无法轻易说出口的痛苦。', chapter: 'diary' },
};

export function StoryConnections() {
  const [selected, setSelected] = useState<MemberId>('hotaru');
  const active = connections[selected];
  const jump = () => { window.dispatchEvent(new CustomEvent('millsage:chapter', { detail: active.chapter })); document.getElementById('story')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); };
  return <details className="story-connections"><summary><span>主线关系 · 另一张记忆地图</span><small>完全剧透</small><span>＋</span></summary><SpoilerGate id="story-connections" required="full" followLevel heading="这张地图涉及主线重要人物与过去" teaser="确认完全剧透后，查看六个人如何被相遇与记忆连在一起。">
    <div className="story-connections__body"><div className="story-connections__map" aria-label="主线人物关系图"><svg viewBox="0 0 560 450" aria-hidden="true"><circle cx="280" cy="225" r="160" fill="none" stroke="currentColor" strokeOpacity=".15" strokeDasharray="2 8" />{currentMembers.map((m, i) => { const angle = -Math.PI / 2 + i * Math.PI * 2 / 5; const x = 280 + Math.cos(angle) * 185; const y = 225 + Math.sin(angle) * 160; return <path key={m.id} d={`M280 225 Q${280 + (x - 280) * .2} ${225 + (y - 225) * .9} ${x} ${y}`} fill="none" stroke="currentColor" strokeWidth={selected === m.id ? 1.6 : .7} strokeOpacity={selected === m.id || selected === 'kanata' ? .65 : .2} />; })}</svg>
      {currentMembers.map((m, i) => { const angle = -Math.PI / 2 + i * Math.PI * 2 / 5; return <button type="button" key={m.id} className="story-connections__node" aria-label={'剧情关系：' + m.name.jp} aria-pressed={selected === m.id} onClick={() => setSelected(m.id)} style={{ left: (280 + Math.cos(angle) * 185) / 560 * 100 + '%', top: (225 + Math.sin(angle) * 160) / 450 * 100 + '%' }}><SourcedImage src={m.images?.thumbnail ?? ''} alt="" /><strong>{m.name.jp}</strong></button>; })}
      <button type="button" className="story-connections__center" aria-label="剧情关系：沢海奏多" aria-pressed={selected === 'kanata'} onClick={() => setSelected('kanata')}><Flower size={45} /><strong>沢海奏多</strong><small>MEMORY</small></button></div>
      <aside className="story-connections__reading"><p>STORY CONNECTION / 主线关系</p><h3>{active.label}</h3><p>{active.detail}</p><button type="button" className="journal-link" onClick={jump}>回到关联剧情 ↗</button><div><a href={storyReferences.mat.url} target="_blank" rel="noopener noreferrer">玩家阅读记录 ↗</a><a href={storyReferences.bear.url} target="_blank" rel="noopener noreferrer">交叉参考 ↗</a></div><small>连线呈现故事联系，不代表作者对关系的唯一解释。</small></aside>
    </div></SpoilerGate></details>;
}
