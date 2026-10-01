import { newsItems, verifiedDate } from '../../data/sources';
import { assets } from '../../data/assets';
import { SourcedImage } from '../ui/SourcedImage';
import { Reveal } from '../ui/Reveal';

export function LatestNotes() {
  return (
    <section className="latest" aria-label="Millsage 最新公开信息">
      <div className="shell">
        <div className="latest__head"><p className="eyebrow">LATEST NOTES / 近况</p><span className="micro">资料更新 {verifiedDate}</span></div>
        <div className="latest__grid">
          {newsItems.map((item, i) => (
            <Reveal key={item.tag} variant="up" delay={i * 50}>
              <a className="latest__item" href={item.url} target="_blank" rel="noopener noreferrer">
                {item.image === 'live' ? <div className="latest__night" aria-hidden="true">極夜<span>LIVE 001</span></div> : <SourcedImage src={item.image === 'group' ? assets.group : assets.covers.narasu} alt={item.image === 'group' ? 'millsage 五位成员' : '鳴らす 单曲封面'} className="latest__image" />}
                <div><p className="latest__meta"><span>{item.tag}</span><time>{item.date}</time></p><h2>{item.title}</h2><p className="latest__detail">{item.detail}</p><span className="latest__arrow" aria-label="阅读官方信息">↗</span></div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
