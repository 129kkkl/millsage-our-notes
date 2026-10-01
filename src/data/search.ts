import { currentMembers } from './members';
import { tracks } from './music';
import { archiveSlots } from './archive';
import { guideChapters } from './story-guide';
import { notes } from './notes';
import type { SpoilerLevel } from './types';

export type SearchKind = 'member' | 'story' | 'music' | 'image' | 'note';
export interface SearchEntry {
  id: string; title: string; kind: SearchKind; description: string;
  text: string; spoiler: SpoilerLevel; target: string; key: string;
}
export const searchKinds: { id: SearchKind | 'all'; label: string }[] = [
  { id: 'all', label: '全部' }, { id: 'member', label: '人物' }, { id: 'story', label: '剧情' },
  { id: 'music', label: '音乐' }, { id: 'image', label: '图片' }, { id: 'note', label: '笔记' },
];
export const searchEntries: SearchEntry[] = [
  ...currentMembers.map(m => ({ id: 'member:' + m.id, title: m.name.jp, kind: 'member' as const, description: m.profile.summary, text: [m.name.en, m.name.kana, m.cv, ...m.keywords, m.favoriteFood, m.birthday, m.profile.background].join(' '), spoiler: 'none' as const, target: 'members', key: m.id })),
  ...guideChapters.map(c => ({ id: 'chapter:' + c.id, title: c.title, kind: 'story' as const, description: c.teaser, text: [c.en, ...c.tags, ...c.paragraphs, c.reading].join(' '), spoiler: c.spoiler, target: 'story', key: c.id })),
  ...tracks.map(t => ({ id: 'track:' + t.id, title: t.title, kind: 'music' as const, description: t.type === 'original' ? '原创作品 / ' + t.summary : '翻唱作品 / ' + t.summary, text: [t.titleEn, ...t.tags, ...(t.credits?.map(c => c.value) ?? [])].join(' '), spoiler: 'none' as const, target: 'music', key: t.id })),
  ...archiveSlots.map(a => ({ id: 'image:' + a.id, title: a.title + ' · ' + a.kind, kind: 'image' as const, description: a.caption, text: a.alt, spoiler: 'none' as const, target: 'archive', key: a.id })),
  ...notes.map(n => ({ id: 'note:' + n.id, title: n.title, kind: 'note' as const, description: n.lead, text: [n.titleJa, ...n.related, ...n.body].join(' '), spoiler: 'none' as const, target: 'notes', key: n.id })),
];

export function searchArchive(query: string, kind: SearchKind | 'all', level: SpoilerLevel) {
  const order = ['none', 'light', 'full'];
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return searchEntries.filter(e => (kind === 'all' || e.kind === kind) && order.indexOf(e.spoiler) <= order.indexOf(level) && terms.every(t => (e.title + ' ' + e.description + ' ' + e.text).toLocaleLowerCase().includes(t))).sort((a, b) => Number(terms.some(t => b.title.toLocaleLowerCase().includes(t))) - Number(terms.some(t => a.title.toLocaleLowerCase().includes(t))));
}
