import { useEffect, useState } from 'react';
import { getTrack } from '../../data/music';
import { videos } from '../../data/videos';
import { SectionHead } from '../ui/SectionHead';
import { SourcedImage } from '../ui/SourcedImage';
import { SaveButton } from '../ui/SaveButton';
import { Icon } from '../ui/Icon';

const routes = [
  { id: 'beginning', label: '初次相遇', en: 'FIRST BLOOM', note: '从原创作品开始，认识白花背后的五种声音。', tracks: ['narasu', 'kishikaisen', 'carnation'] },
  { id: 'memory', label: '回忆的颜色', en: 'FADED MEMORIES', note: '沿着风景与记忆，在熟悉的曲子里听见她们。', tracks: ['everscape', 'aonosumika', 'unravel'] },
  { id: 'night', label: '夜色里的光', en: 'AFTER THE DUSK', note: '把夜晚交给两首翻唱，也给自己留一点光。', tracks: ['stellarstellar', 'lower'] },
];
export function ListeningRoom() {
  const [routeId, setRouteId] = useState('beginning');
  const [trackId, setTrackId] = useState('narasu');
  const [playing, setPlaying] = useState(false);
  const route = routes.find(r => r.id === routeId)!;
  const track = getTrack(trackId)!;
  const video = videos.find(v => v.title === track.title);
  const trackIndex = route.tracks.indexOf(track.id);
  useEffect(() => {
    const stop = () => setPlaying(false);
    const listen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const next = routes.find(r => r.tracks.includes(id));
      if (next) { setRouteId(next.id); setTrackId(id); setPlaying(false); }
    };
    window.addEventListener('millsage:stop-media', stop);
    window.addEventListener('millsage:listen', listen);
    return () => { window.removeEventListener('millsage:stop-media', stop); window.removeEventListener('millsage:listen', listen); };
  }, []);
  const chooseRoute = (id: string) => {
    const next = routes.find(r => r.id === id)!;
    setRouteId(id); setTrackId(next.tracks[0]); setPlaying(false);
  };
  const chooseTrack = (id: string) => { setTrackId(id); setPlaying(false); };
  return <section id="listening" className="section listening-room grain"><div className="shell"><SectionHead index="LISTENING ROOM / THREE LITTLE JOURNEYS" title="A Soundtrack for This Page" ja="このページに、音楽を" zh="给这一页，选一段声音" lede="三条本站编排的听歌路线。从相遇到回忆，再到夜色里的一点光。" />
    <div className="listening-room__routes" role="group" aria-label="选择听歌路线">{routes.map(r => <button type="button" key={r.id} aria-pressed={routeId === r.id} onClick={() => chooseRoute(r.id)}><span>{r.en}</span><strong>{r.label}</strong><small>{r.tracks.length} 首</small></button>)}</div>
    <div className="listening-room__player"><div className="listening-room__sleeve">{playing && video ? <div className="listening-room__video"><iframe title={track.title + ' 官方 MV'} src={'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1&rel=0'} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /><button type="button" onClick={() => setPlaying(false)} aria-label="关闭听歌路线播放器">关闭 ×</button></div> : <><div className="listening-room__vinyl" aria-hidden="true"><span /></div>{track.cover ? <SourcedImage src={track.cover} alt={track.title + ' 官方封面'} /> : <div className="listening-room__unpublished"><Icon name="music" size={60} /><p>ロウワー</p><small>游戏收录 · 官网未公开封面</small></div>}</>}</div>
      <div className="listening-room__copy"><p className="eyebrow">{route.en} / {String(trackIndex + 1).padStart(2, '0')}</p><h3 className="jp">{track.title}</h3><p>{route.note}</p><div className="listening-room__actions">{video && <button type="button" className="journal-button" onClick={() => { window.dispatchEvent(new Event('millsage:stop-media')); setPlaying(true); }}><span>▷</span>播放官方 MV</button>}<a href={track.officialLinks[0]?.url} className="journal-link" target="_blank" rel="noopener noreferrer">{video ? '官方音乐平台 ↗' : '前往官方试听入口 ↗'}</a><SaveButton id={'track:' + track.id} label={track.title} /></div>
        <ol className="listening-room__queue" aria-label={route.label + '曲目'}>{route.tracks.map((id, i) => { const t = getTrack(id)!; return <li key={id}><button type="button" aria-pressed={id === trackId} onClick={() => chooseTrack(id)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{t.title}</strong><small>{t.type === 'original' ? 'ORIGINAL' : 'COVER'}</small><Icon name={id === trackId ? 'music' : 'arrow'} size={17} /></button></li>; })}</ol>
        <div className="listening-room__transport"><button type="button" disabled={trackIndex === 0} onClick={() => chooseTrack(route.tracks[trackIndex - 1])}>← 上一首</button><span>{trackIndex + 1} / {route.tracks.length}</span><button type="button" disabled={trackIndex === route.tracks.length - 1} onClick={() => chooseTrack(route.tracks[trackIndex + 1])}>下一首 →</button></div>
      </div></div><p className="listening-room__foot">路线为本站策划。站内 MV 使用官方公开播放器；完整音源与更多平台见音乐档案。{!video && '当前曲目尚未收录官方 MV。'}</p>
  </div></section>;
}
