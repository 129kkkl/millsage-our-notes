import { useEffect, useRef, useState } from 'react';
import { archiveSlots } from '../../data/archive';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { SourcedImage } from '../ui/SourcedImage';
import { SaveButton } from '../ui/SaveButton';
import { useLibrary } from '../../context/library-context';
import '../../styles/sections.css';

type Category = 'all' | 'band' | 'members' | 'music' | 'film' | 'art' | 'saved';
const categories: { id: Category; label: string }[] = [{ id:'all', label:'全部图像' }, { id:'band', label:'乐队视觉' }, { id:'members', label:'人物图像' }, { id:'music', label:'唱片封面' }, { id:'film', label:'影像记录' }, { id:'art', label:'原创插画' }, { id:'saved', label:'我的收藏' }];

export function ArchiveRoom() {
  const { saved } = useLibrary();
  const [category, setCategory] = useState<Category>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const list = category === 'all' ? archiveSlots : archiveSlots.filter(item => category === 'saved' ? saved.includes('image:' + item.id) : item.category === category);
  const index = list.findIndex(item => item.id === selectedId);
  const selected = list[index];
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const isOpen = Boolean(selected);
  useEffect(() => {
    const openImage = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (archiveSlots.some(item => item.id === id)) { setCategory('all'); setSelectedId(id); }
    };
    window.addEventListener('millsage:image', openImage);
    return () => window.removeEventListener('millsage:image', openImage);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog?.open) dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; dialog?.close(); };
  }, [isOpen]);

  const move = (direction: number) => {
    if (list.length) setSelectedId(list[(index + direction + list.length) % list.length].id);
  };

  return (
    <section id="archive" className="section archive grain">
      <div className="shell">
        <SectionHead index="10 / ARCHIVE" title="A Visual Collection" ja="姿を、記録する" zh="视觉档案" lede="五人的舞台与日常、音乐封面与官方影像，再加上一页原创的夜色。点击放大，也可以收藏喜欢的一幅。" />
        <div className="archive__toolbar"><div className="archive__filters" role="group" aria-label="图像分类">{categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => { setSelectedId(null); setCategory(item.id); }}>{item.label}</button>)}</div><p role="status">{list.length} 幅图像</p></div>
        <ul className="archive__grid">
          {list.map((slot, i) => <Reveal as="li" key={slot.id} variant="up" delay={i % 4 * 35} className="archive__cell">
            <button type="button" className={'archive__image-button archive__image-button--' + slot.category} onClick={() => setSelectedId(slot.id)} aria-label={'放大查看：' + slot.title + ' ' + slot.kind}>
              {slot.src && <SourcedImage src={slot.src} alt={slot.alt} />}
              <span className="archive__expand" aria-hidden="true">↗</span>
            </button>
            <div className="archive__caption"><div><h3 className="archive__title jp">{slot.title}</h3><p className="archive__kind">{slot.kind}</p></div>{slot.sourceUrl && <a href={slot.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={slot.title + ' 官方图像出处'}>出处 ↗</a>}</div>
            <div className="archive__save-row"><small>{slot.category === 'art' ? 'FAN ART / AI 插画' : 'OFFICIAL VISUAL'}</small><SaveButton id={'image:' + slot.id} label={slot.title + ' ' + slot.kind} compact /></div>
          </Reveal>)}
        </ul>
        {list.length === 0 && <div className="empty-page"><p>还没有收藏图片。从其他分类中挑选喜欢的一幅吧。</p></div>}
        <p className="archive__credit">官方图像均附公开来源页。© BanG Dream! Project / FROMTOKYO / Bushiroad / Bushiroad Music 及各权利方。原创插画单独标记。</p>
      </div>
      <dialog ref={dialogRef} className="lightbox" aria-labelledby="lightbox-title" onCancel={() => setSelectedId(null)} onClick={e => { if (e.target === e.currentTarget) setSelectedId(null); }} onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); } if (e.key === 'ArrowRight') { e.preventDefault(); move(1); } }}>
        {selected && <div className="lightbox__inner"><header><span>{String(index + 1).padStart(2, '0')} / {list.length}</span><button type="button" autoFocus onClick={() => setSelectedId(null)} aria-label="关闭图片预览">关闭 ×</button></header>
          <div className="lightbox__stage"><button type="button" onClick={() => move(-1)} aria-label="上一张图片">←</button>{selected.src && <SourcedImage src={selected.src} alt={selected.alt} eager />}<button type="button" onClick={() => move(1)} aria-label="下一张图片">→</button></div>
          <footer><div><h3 id="lightbox-title">{selected.title} <span>{selected.kind}</span></h3><p>{selected.caption}</p><small>{selected.rights}</small></div><SaveButton id={'image:' + selected.id} label={selected.title + ' ' + selected.kind} />{selected.sourceUrl && <a className="journal-link" href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">查看官方出处 ↗</a>}</footer>
        </div>}
      </dialog>
    </section>
  );
}
