import { useState } from 'react';
import { archiveSlots } from '../../data/archive';
import { useLibrary } from '../../context/library-context';
import { SectionHead } from '../ui/SectionHead';
import { SourcedImage } from '../ui/SourcedImage';
import { SaveButton } from '../ui/SaveButton';
import { Flower, Icon } from '../ui/Icon';
import { ImageViewer } from '../ui/ImageViewer';

const memories = [
  { id: 'hotaru-artist', note: '琴声之外，她也照顾花草。', tag: 'GARDENING / 汐見蛍' },
  { id: 'natsume-artist', note: '天台的吉他，古着店的午后。', tag: 'VINTAGE / 伊沢なつめ' },
  { id: 'film-animation', note: '五种声音，开成同一束白花。', tag: 'ANIMATION / 官方 CM' },
  { id: 'mahoro-artist', note: '把共同度过的日子，留在镜头里。', tag: 'CAMERA / 浜崎まほろ' },
  { id: 'sleeve-everscape', note: '一首歌，存放一段时间。', tag: 'EVERSCAPE / 音乐' },
  { id: 'nagi-artist', note: '书页、电影，和一点从容。', tag: 'BOOKS & FILMS / 琴平凪' },
  { id: 'houka-artist', note: '优雅与好奇，也可以同时存在。', tag: 'CURIOSITY / 和泉朋花' },
  { id: 'sleeve-carnation', note: '等到康乃馨再次盛开。', tag: 'CARNATIONS / 音乐' },
];

export function MemoryWall() {
  const { saved } = useLibrary();
  const [onlySaved, setOnlySaved] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const list = memories.filter(m => !onlySaved || saved.includes('image:' + m.id));
  const items = list.map(m => archiveSlots.find(a => a.id === m.id)!).filter(Boolean);
  const current = items.findIndex(m => m.id === selected);
  return <section id="memories" className="section memory-wall grain">
    <div className="shell"><div className="memory-wall__head"><SectionHead index="MEMORY / SMALL THINGS" title="Little Things, Still Here" ja="小さな幸せを、残して" zh="小小的幸福，仍然在这里" lede="乐器之外，她们也会读书、逛古着店、照顾花草。把五人的公开小档案和音乐，贴进这本记忆相册。" /><Flower size={105} /></div>
      <div className="memory-wall__toolbar"><p><Icon name="flower" size={18} /> 点击照片翻看，喜欢的一页可以收入手账。</p><button type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}><Icon name="bookmark" size={16} />{onlySaved ? '显示全部照片' : '只看我的收藏'}</button></div>
      {list.length ? <div className="memory-wall__board">{list.map((m, i) => {
        const image = items.find(a => a.id === m.id)!;
        return <article className="memory-photo" key={m.id} style={{ '--photo-angle': ([-3, 2, -1, 3, 1, -2, 2.5, -1.5][i % 8]) + 'deg' } as React.CSSProperties}>
          <span className="paper-tape" aria-hidden="true" /><button type="button" className="memory-photo__image" onClick={() => setSelected(m.id)} aria-label={'翻看相册：' + image.title}><SourcedImage src={image.src ?? ''} alt={image.alt} /><span>↗</span></button>
          <p className="memory-photo__tag">{m.tag}</p><div className="memory-photo__caption"><h3>{m.note}</h3><SaveButton id={'image:' + m.id} label={image.title + ' ' + image.kind} compact /></div><small>{image.kind} · 文字为本站随笔</small>
        </article>;
      })}</div> : <div className="empty-page"><Flower size={52} /><p>还没有收藏这一组照片。</p><button type="button" className="journal-button" onClick={() => setOnlySaved(false)}>回到相册，挑选一页 ↗</button></div>}
      <div className="memory-wall__foot"><span>IMAGES FROM OFFICIAL PUBLIC PAGES · 非剧情截图</span><a href="#archive" className="journal-link">翻看全部 {archiveSlots.length} 幅图像 ↗</a></div>
    </div>
    <ImageViewer slot={items[current] ?? null} count={items.length} index={current} onClose={() => setSelected(null)} onMove={dir => setSelected(items[(current + dir + items.length) % items.length].id)} />
  </section>;
}
