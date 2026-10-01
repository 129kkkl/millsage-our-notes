import { band } from '../../data/band';
import { archiveSlots } from '../../data/archive';
import { guideChapters } from '../../data/story-guide';
import { PROVENANCE_LABEL } from '../../data/types';
import type { Provenance } from '../../data/types';
import '../../styles/layout.css';

export function Footer() {
  const marks: Provenance[] = ['canon', 'interpretation'];

  return (
    <footer className="ftr on-night" id="colophon">
      <div className="ftr__dusk" aria-hidden="true" />
      <div className="shell">
        <div className="ftr__top">
          <div className="ftr__brandcol">
            <p className="ftr__flag">{band.disclaimer.short}</p>
            <p className="ftr__brand display">{band.name}</p>
            <p className="ftr__kana jp">{band.kana}</p>
            <p className="ftr__sub serif-italic">{band.subtitle}</p>
            <p className="micro ftr__subnote">{band.subtitleNote}</p>
          </div>

          <div className="ftr__legal">
            <p className="ftr__zh">{band.disclaimer.zh}</p>
            <p className="ftr__en">{band.disclaimer.rights}</p>
            <p className="ftr__en ftr__en--sm">{band.disclaimer.rightsEn}</p>
            <p className="ftr__zh">{band.disclaimer.conduct}</p>
            <p className="ftr__en ftr__en--sm">{band.disclaimer.conductEn}</p>
          </div>
        </div>

        <div className="ftr__legend">
          <p className="eyebrow">CONTENT LEGEND / 内容性质说明</p>
          <ul className="ftr__legend-list">
            {marks.map((m) => (
              <li key={m} className="ftr__legend-item">
                <span className={`prov prov--${m}`}>
                  <span className="prov__en">{PROVENANCE_LABEL[m].en}</span>
                  <span className="prov__zh">{PROVENANCE_LABEL[m].zh}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="ftr__legend-note">
            公开人物、发行和活动信息附官方出处；剧情导读依据公开玩家阅读记录交叉整理，人物与主题阅读为本站解读。
          </p>
        </div>

        <div className="ftr__bottom">
          <p className="micro ftr__colophon">
            资料更新 2026.10.01 · 五位成员，八首音乐，{archiveSlots.length}幅图像，{guideChapters.length}段剧情导读。
            <br />
            官方公开图像均附出处，互动图形与阅读文字为本站创作。<a href="#guide">继续探索官方资料 ↗</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
