import { useEffect, useRef, useState } from 'react';
import { searchArchive, searchKinds } from '../../data/search';
import type { SearchKind } from '../../data/search';
import { useSpoiler } from '../../context/spoiler-context';
import { explore } from '../../lib/explore';
import { Icon, Flower } from '../ui/Icon';

export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<SearchKind | 'all'>('all');
  const { level } = useSpoiler();
  const ref = useRef<HTMLDialogElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const results = searchArchive(query, kind, level);
  useEffect(() => {
    const launch = () => { setOpen(true); setQuery(''); setKind('all'); };
    const key = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); launch(); } };
    window.addEventListener('millsage:search', launch); window.addEventListener('keydown', key);
    return () => { window.removeEventListener('millsage:search', launch); window.removeEventListener('keydown', key); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const dialog = ref.current; dialog?.showModal(); field.current?.focus();
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = previous; };
  }, [open]);
  return <dialog ref={ref} className="search-palette" aria-labelledby="search-title" onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
    <div className="search-palette__inner"><header><span id="search-title">在这本档案里寻找</span><button type="button" aria-label="关闭全站搜索" onClick={() => setOpen(false)}><Icon name="close" /></button></header>
      <label className="search-palette__field"><Icon name="search" size={25} /><input ref={field} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="人物、剧情、曲名、图片……" aria-label="全站搜索关键词" /></label>
      <div className="search-palette__filters" role="group" aria-label="搜索内容类型">{searchKinds.map(k => <button type="button" key={k.id} aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>{k.label}</button>)}</div>
      <p className="search-palette__count" role="status">{query ? `找到 ${results.length} 条记录` : '从一位成员、一首歌或一张照片开始'}<span>剧透：{level === 'none' ? '关闭' : level === 'light' ? '轻度' : '完全'}</span></p>
      <div className="search-palette__results">{results.length ? results.slice(0, 25).map(r => <button type="button" key={r.id} onClick={() => { setOpen(false); requestAnimationFrame(() => explore(r)); }}><span className="search-palette__kind">{searchKinds.find(k => k.id === r.kind)?.label}</span><span><strong>{r.title}</strong><small>{r.description}</small></span><Icon name="arrow" size={18} /></button>) : <div className="empty-page"><Flower size={50} /><p>没有找到。试试「蛍」「白花」或「everscape」。</p></div>}</div>
      <footer><span>剧情搜索遵循当前剧透等级</span><kbd>ESC</kbd><span>关闭</span><kbd>Ctrl K</kbd><span>重新搜索</span></footer>
    </div>
  </dialog>;
}
