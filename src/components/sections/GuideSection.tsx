import { faqs, officialDirectory, verifiedDate } from '../../data/sources';
import { SectionHead } from '../ui/SectionHead';

export function GuideSection() {
  return (
    <section id="guide" className="section guide-section">
      <div className="shell">
        <SectionHead index="12 / GUIDE" title="Keep Exploring" ja="その先へ" zh="入门问答与官方入口" lede="从这里出发，继续听、继续读。让每一个想了解她们的人，都能找到下一个入口。" />
        <div className="guide-section__body">
          <div className="faq"><p className="eyebrow">A FEW THINGS TO KNOW</p>{faqs.map((item, i) => <details key={item.question} className="faq__item" open={i === 0}><summary><span>{String(i + 1).padStart(2, '0')}</span>{item.question}<i aria-hidden="true">＋</i></summary><div><p>{item.answer}</p>{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer">相关官方资料 ↗</a>}</div></details>)}</div>
          <div className="source-directory"><p className="eyebrow">OFFICIAL DIRECTORY</p>{officialDirectory.map(item => <a key={item.kind} href={item.url} target="_blank" rel="noopener noreferrer"><span>{item.kind}</span><div><h3>{item.title}</h3><p>{item.subtitle}</p></div><i aria-hidden="true">↗</i></a>)}<p className="source-directory__date">核对日期 {verifiedDate} · 发行和活动以官方最新信息为准。</p></div>
        </div>
      </div>
    </section>
  );
}
