import { band } from '../../data/band';
import { currentMembers } from '../../data/members';
import { archiveSlots } from '../../data/archive';
import { guideChapters } from '../../data/story-guide';
import { tracks } from '../../data/music';
import { videos } from '../../data/videos';
import { assets, artistPortrait } from '../../data/assets';
import { sources } from '../../data/sources';
import { useLibrary } from '../../context/library-context';
import { openMember } from '../../lib/navigation';
import { SourcedImage } from '../ui/SourcedImage';
import { Flower, Icon } from '../ui/Icon';
import { Petals } from '../art/Petals';

export function Hero() {
  const { lastChapter, read } = useLibrary();
  const resume = () => window.dispatchEvent(new CustomEvent('millsage:chapter', { detail: lastChapter }));
  return <section id="home" className="cover grain">
    <div className="cover__glow" aria-hidden="true" /><Petals count={7} seed="cover-flowers" intensity={.35} />
    <div className="shell">
      <div className="cover__folio"><span><i /> A LITTLE ARCHIVE OF OUR HAPPINESS</span><span>ミルサージュ / OUR NOTES</span></div>
      <div className="cover__body">
        <div className="cover__copy"><p className="cover__kicker">BanG Dream! Our Notes · 非官方粉丝档案</p><h1 className="cover__name display">millsage<Flower size={44} /></h1><p className="cover__japanese jp">両手いっぱいの幸せを、あなたに。</p>
          <h2>把幸福，<br />留在<span>声音里。</span></h2><p className="cover__description">白花、琴声、未说完的心事。<br />在这里，收藏她们的故事，也留下你的回响。</p>
          <div className="cover__actions"><a href="#story" className="journal-button" onClick={resume}><Icon name="book" size={18} />{read.length ? '继续读故事' : '翻开她们的故事'}<span>↗</span></a><a href="#memories" className="journal-link">走进记忆相册 <span>↗</span></a></div>
          <div className="cover__statistics"><span><strong>{guideChapters.length.toString().padStart(2, '0')}</strong>段剧情导读</span><span><strong>{archiveSlots.length}</strong>幅视觉记录</span><span><strong>{tracks.length.toString().padStart(2, '0')}</strong>首音乐</span></div>
        </div>
        <div className="cover__collage">
          <div className="cover__handwriting serif-italic">a blessing, a memory, a song.</div>
          <Flower size={180} className="cover__flower" />
          <figure className="cover__polaroid"><span className="paper-tape" aria-hidden="true" /><SourcedImage src={assets.group} alt="millsage 官方五人乐队主视觉" eager width={2100} height={1050} /><figcaption><span className="jp">五つの音、ひとつの花束。</span><a href={sources.band} target="_blank" rel="noopener noreferrer">官方主视觉 ↗</a></figcaption></figure>
          <button type="button" className="cover__little-photo" onClick={() => openMember('hotaru')} aria-label="认识汐見蛍"><SourcedImage src={artistPortrait('shiomi-hotaru')} alt="汐見蛍的官方肖像" eager /><span>01 / 汐見蛍</span></button>
          <a href="#listening" className="cover__record" onClick={() => window.dispatchEvent(new CustomEvent('millsage:listen', { detail: 'everscape' }))}><SourcedImage src={assets.covers.everscape} alt="everscape 官方发行封面" eager /><span><Icon name="music" size={15} /> 一起听，everscape</span></a>
          <div className="cover__stamp"><span>OUR LITTLE</span><Flower size={30} /><span>MEMORY BOOK</span></div>
        </div>
      </div>
      <div className="cover__cast" aria-label="快速认识五位成员">{currentMembers.map(m => <button type="button" key={m.id} onClick={() => openMember(m.id)}><SourcedImage src={m.images?.thumbnail ?? ''} alt="" /><span><strong>{m.name.jp}</strong><small>{m.instrument}</small></span><i style={{ background: m.accent }} /></button>)}</div>
      <div className="cover__bottom"><span>{band.disclaimer.zh}</span><span>{videos.length} 支官方影像 · 资料更新 2026.10.01</span><a href="#band">向下，继续这一页 <span>↓</span></a></div>
    </div>
  </section>;
}
