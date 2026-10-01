import type { MusicTrack } from './types';
import { assets } from './assets';
import { sources } from './sources';

/** Public releases and the officially announced in-game cover, verified 2026-10-01. */
export const tracks: MusicTrack[] = [
  {
    id: 'narasu', title: '鳴らす', titleEn: 'To Ring Out', titleEnNote: '本站检索用释义，非官方英文标题',
    type: 'original', releaseKind: 'single', releaseDate: '2026-09-30', credits: null,
    tags: ['1st Single', '实体 CD', '键盘主唱'],
    summary: 'millsage 首张实体单曲的标题曲。CD 同时收录「カーネーションの咲く日に」与两首 instrumental；品番 BRMM-11075。',
    releaseNote: '首张 CD · 2026.09.30 / 1,650 日元（含税）',
    reading: '从「鳴らす」这一主动的动词出发，本站把它看成认识 millsage 的第一声：五个人的声音共同获得形状。',
    counterpoint: '这是本站的入门读法，曲名不等同于任何已确认的剧情结论。',
    art: 'resonance', tempoMotion: 'swell', cover: assets.covers.narasu, sourceUrl: sources.narasu,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_1stSGwe' }, { label: '发行资料', url: sources.narasu }], confirmed: true,
  },
  {
    id: 'kishikaisen', title: '起死開戦', titleEn: 'Kishi Kaisen', titleEnNote: '曲名罗马字检索',
    type: 'original', releaseKind: 'digital', releaseDate: '2026-03-02', credits: null,
    tags: ['首次配信', '原创', '2026.03'],
    summary: '2026 年 3 月 2 日起开放数字配信，是本站已核对的 millsage 最早公开发行曲目。',
    releaseNote: '3月2日 00:00（JST）起；部分平台依次上线。',
    reading: '标题的棱角与封面中的人物形成鲜明对照。本站为这首歌保留短促、斜向的视觉线条，作为重新发声的想象。',
    counterpoint: '封面与日期属于官方资料；节奏图形与关键词属于本站的视觉解读。',
    art: 'burst', tempoMotion: 'sharp', cover: assets.covers.kishikaisen, sourceUrl: sources.kishikaisen,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_KishiKaisenwe' }, { label: '发行资料', url: sources.kishikaisen }], confirmed: true,
  },
  {
    id: 'carnation', title: 'カーネーションの咲く日に', titleEn: 'The Day Carnations Bloom', titleEnNote: '本站检索用释义，非官方英文标题',
    type: 'original', releaseKind: 'digital', releaseDate: '2026-07-19',
    credits: [{ role: '作词', value: 'Aira (Dream Monster)' }, { role: '作曲 / 编曲', value: '瀬名水紀 (Dream Monster)、Aira (Dream Monster)' }],
    tags: ['康乃馨', '原创', '1st Single 收录'],
    summary: '7 月 19 日开始数字配信，后收录于首张实体单曲「鳴らす」。词曲与编曲资料均来自官方发行页。',
    releaseNote: '7月19日 00:00（JST）起配信。',
    reading: '花与时间是本站关注的两组意象。它们让「祝福」有了具体的形状，也让听者想到花开与等待。',
    counterpoint: '花的象征有多种读法；本站不以曲名断言某个角色的经历。',
    art: 'carnation', tempoMotion: 'slow', cover: assets.covers.carnation, sourceUrl: sources.carnation,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_CarnationsBloomwe' }, { label: '发行资料', url: sources.carnation }], confirmed: true,
  },
  {
    id: 'everscape', title: 'everscape', titleEn: 'everscape', titleEnNote: '官方标题',
    type: 'original', releaseKind: 'digital', releaseDate: '2026-08-31',
    credits: [{ role: '作词', value: '藤井健太郎' }, { role: '作曲', value: '藤井健太郎、瀬名水紀 (Dream Monster)' }, { role: '编曲', value: '藤井健太郎' }],
    tags: ['原创', '官方 MV', '2026.08'],
    summary: '8 月 31 日 20:00（JST）起全球同时配信，部分服务于 9 月 1 日依次开放。官方发行页同时公开了 MV。',
    releaseNote: '8月31日 20:00（JST）起全球配信。',
    reading: '本站用延伸的地平线与回声理解这个标题：声音可以离开原来的位置，也可以保留延续。',
    counterpoint: '空间与回声是本站的视觉语言，不是官方曲意说明。',
    art: 'escape', tempoMotion: 'drift', cover: assets.covers.everscape, sourceUrl: sources.everscape,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_everscapewe' }, { label: '发行资料', url: sources.everscape }], confirmed: true,
  },
  {
    id: 'unravel', title: 'unravel', titleEn: 'unravel', titleEnNote: '官方标题',
    type: 'cover', releaseKind: 'digital', releaseDate: '2026-08-21',
    credits: [{ role: '作词 / 作曲', value: 'TK' }, { role: '编曲', value: '藤井健太郎' }],
    tags: ['翻唱', 'TK', '2026.08'],
    summary: 'millsage 演唱的翻唱版本，8 月 21 日 00:00（JST）起开放数字配信。官方注明原词曲为 TK、编曲为藤井健太郎。',
    reading: '原有作品经由另一支乐队的声音重新表达，为认识 millsage 的演唱提供不同于原创曲的角度。',
    counterpoint: '翻唱的选曲与游戏故事之间，本站不建立未经官方说明的对应关系。',
    art: 'escape', tempoMotion: 'drift', cover: assets.covers.unravel, sourceUrl: sources.unravel,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_unravelwe' }, { label: '发行资料', url: sources.unravel }], confirmed: true,
  },
  {
    id: 'aonosumika', title: '青のすみか', titleEn: 'Ao no Sumika', titleEnNote: '曲名罗马字检索',
    type: 'cover', releaseKind: 'digital', releaseDate: '2026-08-28',
    credits: [{ role: '作词 / 作曲', value: 'キタニタツヤ' }, { role: '编曲', value: '藤井健太郎' }],
    tags: ['翻唱', 'キタニタツヤ', '2026.08'],
    summary: '8 月 28 日 00:00（JST）起配信的 millsage 翻唱版本。与「unravel」相隔一周，构成连续公开的两首翻唱作品。',
    reading: '本站把「青」放在白色视觉旁边，作为一种关于记忆与距离的观看方式。',
    counterpoint: '色彩读法属于本站解读，不指向原作中的特定场景。',
    art: 'carnation', tempoMotion: 'slow', cover: assets.covers.aonosumika, sourceUrl: sources.aonosumika,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_WhereOurBlueIswe' }, { label: '发行资料', url: sources.aonosumika }], confirmed: true,
  },
  {
    id: 'stellarstellar', title: 'Stellar Stellar', titleEn: 'Stellar Stellar', titleEnNote: '官方标题',
    type: 'cover', releaseKind: 'digital', releaseDate: '2026-09-22',
    credits: [{ role: '作词', value: '星街すいせい' }, { role: '作曲', value: 'TAKU INOUE' }, { role: '编曲', value: '牧野太洋' }],
    tags: ['翻唱', '星街すいせい', '官方影像'],
    summary: '9 月 22 日 21:00（JST）起配信；部分服务于 9 月 23 日开放。官方发行页公开了翻唱影像与完整词曲、编曲署名。',
    reading: '「星」与「光」在本站的视觉体系中保留距离：它们可以明亮，也可以遥远。',
    counterpoint: '视觉意象并不是官方对人物关系的说明。',
    art: 'resonance', tempoMotion: 'swell', cover: assets.covers.stellarstellar, sourceUrl: sources.stellarstellar,
    officialLinks: [{ label: '官方试听 / 音乐平台', url: 'https://bmu.lnk.to/millsage_StellarStellarwe' }, { label: '发行资料', url: sources.stellarstellar }], confirmed: true,
  },
  {
    id: 'lower', title: 'ロウワー', titleEn: 'Lower', titleEnNote: '曲名检索',
    type: 'cover', releaseKind: 'in-game', releaseDate: null,
    credits: [{ role: '作词 / 作曲', value: 'ぬゆり' }, { role: '编曲', value: '太田雄大' }],
    tags: ['翻唱', '游戏收录', 'ぬゆり'],
    summary: 'Our Notes 官网音乐页面公布的 millsage 游戏收录翻唱曲。官网列出ぬゆり的词曲与太田雄大的编曲；该页面没有给出独立音乐配信日期。',
    releaseNote: '官网公布的游戏曲目；未填写独立配信日期。',
    reading: '作为游戏曲目，它让听歌与节奏演奏成为两个可以互相补充的入口。',
    counterpoint: '游戏收录信息与音乐平台发行信息分别记录。',
    art: 'escape', tempoMotion: 'drift', sourceUrl: sources.gameMusic,
    officialLinks: [{ label: '官网曲目与署名', url: sources.gameMusic }], confirmed: true,
  },
];

export type MusicFilter = 'all' | 'original' | 'cover' | 'single' | 'digital' | 'in-game';
export const musicFilters: { id: MusicFilter; label: string; note: string }[] = [
  { id: 'all', label: '全部', note: '全部收录' },
  { id: 'original', label: '原创', note: '原创曲' },
  { id: 'cover', label: '翻唱', note: '翻唱曲' },
  { id: 'single', label: 'CD', note: '实体单曲标题曲' },
  { id: 'digital', label: '配信', note: '数字配信曲' },
  { id: 'in-game', label: '游戏', note: '仅核对游戏收录信息' },
];
export function filterTracks(list: MusicTrack[], filter: MusicFilter): MusicTrack[] {
  if (filter === 'all') return list;
  if (filter === 'original' || filter === 'cover') return list.filter(t => t.type === filter);
  return list.filter(t => t.releaseKind === filter);
}
export function getTrack(id: string): MusicTrack | undefined { return tracks.find(t => t.id === id); }
