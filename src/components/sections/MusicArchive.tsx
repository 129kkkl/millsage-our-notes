import { useEffect, useMemo, useState } from 'react';
import { SaveButton } from '../ui/SaveButton';
import { filterTracks, musicFilters, tracks } from '../../data/music';
import type { MusicFilter } from '../../data/music';
import { assets } from '../../data/assets';
import { sources } from '../../data/sources';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { OfficialLinks } from '../ui/ExternalLink';
import { ProvenanceTag } from '../ui/Provenance';
import { SourcedImage } from '../ui/SourcedImage';
import { SleeveArt, WaveformMotif } from '../art/MusicArt';
import '../../styles/music.css';

export function MusicArchive() {
  const [filter, setFilter] = useState<MusicFilter>('all');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const reveal = () => { setFilter('all'); setQuery(''); };
    window.addEventListener('millsage:track', reveal);
    return () => window.removeEventListener('millsage:track', reveal);
  }, []);
  const list = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return filterTracks(tracks, filter).filter(t => !term || [t.title, t.titleEn, ...t.tags, ...(t.credits?.map(c => c.value ?? '') ?? [])].join(' ').toLocaleLowerCase().includes(term));
  }, [filter, query]);

  return (
    <section id="music" className="section music grain">
      <div className="music__bed" aria-hidden="true" />
      <div className="shell">
        <SectionHead index="03 / MUSIC" title="The Sound of millsage" ja="音を鳴らす" zh="音乐档案" lede="4 首原创，4 首翻唱。沿着发行时间听见她们的声音，也从不同的作品认识同一支乐队。" />
        <Reveal className="music__featured" variant="up">
          <a href={sources.narasu} target="_blank" rel="noopener noreferrer" className="music__featured-art" aria-label="查看鳴らす官方发行资料"><SourcedImage src={assets.covers.narasu} alt="millsage 1st Single「鳴らす」官方封面" /></a>
          <div className="music__featured-copy">
            <p className="eyebrow">FIRST SINGLE / 2026.09.30 RELEASE</p>
            <h3 className="music__featured-title jp">鳴らす</h3>
            <p className="music__featured-lead">把五种声音，放进同一张唱片。</p>
            <p className="body-text">millsage 首张实体单曲，收录两首原创作品与两首 instrumental。初回生产版另附 LIVE 001 最速先行抽选申込券、角色卡及 Our Notes 特典交换用序列码。</p>
            <ol className="music__cd-tracks">
              <li><span>01</span>鳴らす</li><li><span>02</span>カーネーションの咲く日に</li><li><span>03</span>鳴らす <small>instrumental</small></li><li><span>04</span>カーネーションの咲く日に <small>instrumental</small></li>
            </ol>
            <p className="music__product">CD / BRMM-11075 / ¥1,650（含税）</p>
            <OfficialLinks links={[{ label:'前往官方音乐平台', url:'https://bmu.lnk.to/millsage_1stSGwe' }, { label:'单曲详情', url:sources.narasu }]} />
          </div>
        </Reveal>
        <div className="music__bar">
          <div className="music__filters" role="group" aria-label="曲目筛选">
            {musicFilters.map(f => <button key={f.id} type="button" className="music__filter" aria-pressed={filter === f.id} data-active={filter === f.id ? 'true' : 'false'} title={f.note} onClick={() => setFilter(f.id)}>{f.label}</button>)}
          </div>
          <label className="music__search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索曲名、作者或关键词" aria-label="搜索音乐档案" /></label>
        </div>
        <p className="music__result" role="status">显示 {list.length} / {tracks.length} 首 · {musicFilters.find(f => f.id === filter)?.note}</p>
        {list.length === 0 ? <div className="music__state"><p>没有找到符合条件的曲目。</p><button className="journal-button" type="button" onClick={() => { setQuery(''); setFilter('all'); }}>查看全部曲目 ↗</button></div> : (
          <ul className="music__grid">
            {list.map((t, i) => <Reveal key={t.id} as="li" variant="up" delay={i % 3 * 40} className="trk">
              <div className="trk__sleeve">
                {t.cover ? <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={t.title + ' 封面与官方出处'}><SourcedImage src={t.cover} alt={t.title + ' 官方发行封面'} /></a> : <div className="trk__original-art"><SleeveArt track={t} /><span>本站抽象图形 · 官网未公开封面</span></div>}
              </div>
              <div className="trk__body">
                <header className="trk__head"><span className={'trk__type trk__type--' + t.type}>{t.type === 'original' ? 'ORIGINAL' : 'COVER'}</span><span className="trk__release">{t.releaseKind === 'single' ? 'CD SINGLE' : t.releaseKind === 'in-game' ? 'IN GAME' : 'DIGITAL'}</span><span className="trk__date">{t.releaseDate?.replaceAll('-', '.') ?? '官网公布 · 游戏收录'}</span></header>
                <div className="trk__title-line" id={'track-' + t.id}><h3 className="trk__title jp">{t.title}</h3><SaveButton id={'track:' + t.id} label={t.title} compact /></div>
                <p className="trk__summary">{t.summary}</p>
                {t.credits && <dl className="trk__credits">{t.credits.map(c => <div key={c.role}><dt>{c.role}</dt><dd>{c.value}</dd></div>)}</dl>}
                <div className="trk__links"><OfficialLinks links={t.officialLinks} /></div>
                <details className="trk__details"><summary>阅读笔记 <span aria-hidden="true">＋</span></summary><div className="trk__reading"><ProvenanceTag value="interpretation" compact /><p>{t.reading}</p><p className="trk__counter">{t.counterpoint}</p><WaveformMotif track={t} /></div></details>
              </div>
            </Reveal>)}
          </ul>
        )}
        <p className="music__foot micro">发行日期、词曲与编曲署名来自官方页面。点击封面查看出处，点击音乐平台入口试听完整作品。图形阅读为本站创作。</p>
      </div>
    </section>
  );
}
