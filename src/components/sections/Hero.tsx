import { band } from '../../data/band';
import { currentMembers } from '../../data/members';
import { assets, imageRights } from '../../data/assets';
import { sources } from '../../data/sources';
import { openMember } from '../../lib/navigation';
import { Petals } from '../art/Petals';
import { SourcedImage } from '../ui/SourcedImage';
import '../../styles/hero.css';

export function Hero() {
  return (
    <section id="home" className="hero grain">
      <div className="hero__wash" aria-hidden="true" />
      <Petals count={9} seed="hero-millsage" intensity={0.5} />
      <div className="shell hero__shell">
        <div className="hero__edition"><span>THE MILLSAGE JOURNAL</span><span>VOL. 01 / A HANDFUL OF HAPPINESS</span></div>
        <div className="hero__top">
          <div className="hero__identity">
            <p className="hero__kicker">{band.work} · UNOFFICIAL FAN ARCHIVE</p>
            <h1 className="hero__title display">millsage<span className="hero__asterisk" aria-hidden="true">✳</span></h1>
            <p className="hero__kana jp">ミルサージュ <span>五人，五种声音，五种幸福。</span></p>
          </div>
          <div className="hero__copy">
            <p className="hero__catch jp">{band.catchphrase}</p>
            <p className="hero__translation">{band.catchphraseZh}</p>
            <p className="hero__description">从一声钢琴开始，走进五个人各自的愿望。<br />这里收藏她们的面孔、音乐，以及关于幸福的回声。</p>
            <div className="hero__actions"><a href="#members" className="journal-button">认识五位成员 <span>↘</span></a><a href="#music" className="journal-link">开始听歌 <span>↗</span></a></div>
          </div>
        </div>
        <figure className="hero__visual">
          <div className="hero__image-frame">
          <SourcedImage src={assets.group} alt="millsage 官方五人主视觉，左起：琴平凪、浜崎まほろ、汐見蛍、和泉朋花、伊沢なつめ" eager width={2100} height={1050} className="hero__photo" />
          <div className="hero__visual-label"><span>FIVE VOICES.<br />ONE UNFINISHED STORY.</span><span>01 — MILLSAGE</span></div>
          </div>
          <figcaption className="hero__credits"><span>官方公开主视觉 · {imageRights}</span><a href={sources.band} target="_blank" rel="noopener noreferrer">图像出处 ↗</a></figcaption>
        </figure>
        <div className="hero__lineup" aria-label="快速选择成员">
          {currentMembers.map(m => <button key={m.id} type="button" onClick={() => openMember(m.id)} style={{ '--member-color': m.accent } as React.CSSProperties}><span className="hero__member-no">{String(m.index).padStart(2, '0')}</span><span className="hero__member-name jp">{m.name.jp}</span><span className="hero__member-role">{m.instrument}</span><span className="hero__member-arrow" aria-hidden="true">↗</span></button>)}
        </div>
        <div className="hero__footnote"><span>非官方 · 非商业 · 粉丝创作</span><span className="serif-italic">What if a blessing can hurt?</span><a href="#band">往下探索 ↓</a></div>
      </div>
    </section>
  );
}
