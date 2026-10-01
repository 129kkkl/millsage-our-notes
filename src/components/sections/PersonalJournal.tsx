import { useEffect, useRef, useState } from 'react';
import { useLibrary } from '../../context/library-context';
import { useSpoiler } from '../../context/spoiler-context';
import { searchEntries, searchKinds } from '../../data/search';
import { guideChapters } from '../../data/story-guide';
import { allows } from '../../lib/spoiler';
import { explore } from '../../lib/explore';
import { downloadFile } from '../../lib/download';
import { SectionHead } from '../ui/SectionHead';
import { SaveButton } from '../ui/SaveButton';
import { Flower, Icon } from '../ui/Icon';

export function PersonalJournal() {
  const library = useLibrary();
  const { level } = useSpoiler();
  const [kind, setKind] = useState('all');
  const [exported, setExported] = useState('');
  const field = useRef<HTMLTextAreaElement>(null);
  const allSaved = searchEntries.filter(e => library.saved.includes(e.id));
  const visible = allSaved.filter(e => (kind === 'all' || kind === e.kind) && allows(level, e.spoiler));
  const hidden = allSaved.filter(e => !allows(level, e.spoiler)).length;
  useEffect(() => {
    const focus = () => field.current?.focus({ preventScroll: true });
    window.addEventListener('millsage:journal-focus', focus);
    return () => window.removeEventListener('millsage:journal-focus', focus);
  }, []);
  const exportNotes = (format: 'json' | 'md') => {
    const content = format === 'json' ? JSON.stringify({ version: 2, saved: allSaved.map(e => ({ id: e.id, title: e.title, kind: e.kind })), read: library.read, journal: library.journal }, null, 2) : '# 我的 millsage 手账\n\n' + library.journal + '\n\n## 收藏\n\n' + allSaved.map(e => '- ' + e.title).join('\n') + '\n\n## 已读剧情\n\n' + guideChapters.filter(c => library.read.includes(c.id)).map(c => '- ' + c.title).join('\n');
    downloadFile('millsage-my-notes.' + format, content, format === 'json' ? 'application/json' : 'text/markdown;charset=utf-8');
    setExported(format.toUpperCase() + ' 手账已生成');
  };
  return <section id="journal" className="section personal-journal grain"><div className="shell">
    <div className="personal-journal__head"><SectionHead index="YOUR NOTES / A PAGE OF YOUR OWN" title="A Page for You" ja="あなたのノーツ" zh="留一页，写给自己" lede="喜欢的照片、想重听的歌、还没想明白的问题。把它们放在一起，让这本档案也成为你的手账。" /><Flower size={90} /></div>
    <div className="personal-journal__grid"><div className="journal-sheet"><div className="journal-sheet__heading"><span>MY LITTLE NOTEBOOK</span><span aria-live="polite">{library.persistent ? '已自动保存在此浏览器' : '本次会话内有效 · 可导出保存'}</span></div><label htmlFor="personal-notes">今天，想记住什么？</label><textarea id="personal-notes" ref={field} value={library.journal} maxLength={8000} onChange={e => library.setJournal(e.target.value)} placeholder="第一次听见她们时的心情，一首想再听的歌，或对「幸福」的新理解……" /><div className="journal-sheet__foot"><span>{library.journal.length} / 8000</span><button type="button" onClick={() => exportNotes('md')}><Icon name="download" size={17} />导出 Markdown</button><button type="button" onClick={() => exportNotes('json')}>JSON</button></div><p className="journal-sheet__status" role="status">{exported || '记录保存在本机浏览器；换设备前可以先导出。'}</p></div>
      <div className="saved-pages"><header><h3>夹在书里的页签 <span>{allSaved.length}</span></h3><Icon name="bookmark" size={23} /></header><div className="saved-pages__filters" role="group" aria-label="手账收藏类型">{searchKinds.filter(k => k.id !== 'member').map(k => <button type="button" key={k.id} aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>{k.label}</button>)}</div>
        {visible.length ? <ul>{visible.map(e => <li key={e.id}><button type="button" onClick={() => explore(e)}><small>{searchKinds.find(k => k.id === e.kind)?.label}</small><strong>{e.title}</strong><span>↗</span></button><SaveButton id={e.id} label={e.title} compact /></li>)}</ul> : <div className="empty-page"><Flower size={48} /><p>{allSaved.length ? '这一类还没有收藏。' : '你的第一枚页签，还在等一首歌或一张照片。'}</p><a href="#memories" className="journal-link">去相册挑选 ↗</a></div>}
        {hidden > 0 && <p className="saved-pages__hidden">{hidden} 段收藏剧情受当前剧透等级保护。</p>}
      </div></div>
  </div></section>;
}
