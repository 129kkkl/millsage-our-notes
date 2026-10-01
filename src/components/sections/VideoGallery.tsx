import { useEffect, useState } from 'react';
import { videos } from '../../data/videos';
import { sources } from '../../data/sources';
import { SectionHead } from '../ui/SectionHead';
import { SourcedImage } from '../ui/SourcedImage';
import { Reveal } from '../ui/Reveal';

export function VideoGallery() {
  const [playing, setPlaying] = useState<string | null>(null);
  useEffect(() => {
    const stop = () => setPlaying(null);
    window.addEventListener('millsage:stop-media', stop);
    return () => window.removeEventListener('millsage:stop-media', stop);
  }, []);
  return (
    <section id="media" className="section media-section">
      <div className="shell">
        <SectionHead index="04 / FILM" title="Moving Notes" ja="映像の記録" zh="影像放映室" lede="让声音与画面一起抵达。精选官方公开影像，点击封面即可在这里观看。" />
        <div className="film-grid" onClickCapture={e => { if ((e.target as Element).closest('.film__play')) window.dispatchEvent(new Event('millsage:stop-media')); }}>
          {videos.map((video, i) => <Reveal key={video.id} className="film" variant="up" delay={i * 50}>
            <div className="film__screen">
              {playing === video.id ? <div className="film__player"><iframe title={video.title + ' 官方影像'} src={video.embedUrl ?? ('https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1&rel=0')} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /><button type="button" className="film__close" aria-label={'关闭' + video.title + '播放器'} onClick={() => setPlaying(null)}>关闭 ×</button></div> : <button type="button" className="film__play" aria-label={'观看' + video.title + '官方影像'} onClick={() => setPlaying(video.id)}><SourcedImage src={video.thumbnail ?? ('https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg')} alt={video.title + ' 官方视频缩略图'} /><span className="film__play-icon" aria-hidden="true">▷</span><span className="film__play-label">PLAY OFFICIAL VIDEO</span></button>}
            </div>
            <p className="film__meta"><span>{String(i + 1).padStart(2, '0')} / {video.kind}</span><a href={video.source} target="_blank" rel="noopener noreferrer">官方出处 ↗</a></p>
            <h3 className="jp">{video.title}</h3><p className="film__note">{video.note}</p>
            <a className="journal-link film__external" href={video.watchUrl ?? ('https://www.youtube.com/watch?v=' + video.id)} target="_blank" rel="noopener noreferrer">在 {video.platform === 'bilibili' ? '哔哩哔哩' : 'YouTube'} 观看 ↗</a>
          </Reveal>)}
        </div>
        <div className="media-section__foot"><div><p>更多游戏 PV、宣传影像与官方更新</p><small>若播放器要求登录或无法加载，可使用各视频下方的平台入口继续观看。</small></div><a className="journal-link" href={sources.gameMovie} target="_blank" rel="noopener noreferrer">Our Notes 影像资料 ↗</a></div>
      </div>
    </section>
  );
}
