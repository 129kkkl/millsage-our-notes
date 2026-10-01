import type { ArchiveSlot } from './types';
import { assets, imageRights, musicRights, artistPortrait } from './assets';
import { currentMembers } from './members';
import { tracks } from './music';
import { sources } from './sources';

export const archiveSlots: ArchiveSlot[] = [
  { id: 'key-visual', title: '五种声音，同一个舞台', kind: '官方主视觉', src: assets.group, alt: 'millsage 五位成员的官方主视觉', caption: '左起：琴平凪、浜崎まほろ、汐見蛍、和泉朋花、伊沢なつめ。', rights: imageRights, replaceHint: '', category: 'band', sourceUrl: sources.band },
  ...currentMembers.flatMap(member => (['stage', 'casual'] as const).map(outfit => ({
    id: member.id + '-' + outfit, title: member.name.jp, kind: outfit === 'stage' ? '舞台装' : '日常装',
    src: member.images?.[outfit] ?? null, alt: member.name.jp + (outfit === 'stage' ? ' 官方舞台装' : ' 官方日常装'),
    caption: member.instrumentRole + ' / CV. ' + member.cv, rights: imageRights, replaceHint: '', category: 'members' as const,
    sourceUrl: member.officialLinks?.[0]?.url ?? sources.band,
  }))),
  ...tracks.filter(track => track.cover).map(track => ({
    id: 'sleeve-' + track.id, title: track.title, kind: track.type === 'original' ? '原创作品封面' : '翻唱作品封面',
    src: track.cover ?? null, alt: track.title + ' 官方发行封面', caption: (track.releaseDate ?? '').replaceAll('-', '.') + ' / ' + (track.type === 'original' ? 'ORIGINAL' : 'COVER'),
    rights: musicRights, replaceHint: '', category: 'music' as const, sourceUrl: track.sourceUrl,
  })),
  { id: 'band-intro-art', title: '白花与五人的声音', kind: '游戏官网乐队介绍图', src: assets.bandCard, alt: 'millsage 官网乐队介绍视觉', caption: '来自 Our Notes 官网首页的乐队入口图。', rights: imageRights, replaceHint: '', category: 'band', sourceUrl: sources.game },
  ...currentMembers.map(member => ({
    id: member.id + '-artist', title: member.name.jp, kind: '艺人专页肖像',
    src: artistPortrait(assets.members[member.id as keyof typeof assets.members].slug), alt: member.name.jp + ' 官方艺人专页肖像',
    caption: member.instrumentRole + ' / ' + member.profile.summary, rights: imageRights, replaceHint: '', category: 'members' as const, sourceUrl: sources.artist,
  })),
  { id: 'film-animation', title: '白花盛开的舞台', kind: '官方动画 CM 缩略图', src: assets.animation, alt: 'millsage 动画宣传片官方缩略图', caption: '官方动画 CM 的公开缩略图。完整影像见放映室。', rights: imageRights, replaceHint: '', category: 'film', sourceUrl: sources.gameMovie },
  { id: 'film-introduction', title: '初次认识 millsage', kind: '官方乐队介绍缩略图', src: assets.introduction, alt: 'millsage 官方乐队介绍影片缩略图', caption: 'Our Notes 官网乐队介绍影像的公开缩略图。', rights: imageRights, replaceHint: '', category: 'film', sourceUrl: sources.gameMovie },
  { id: 'film-story-trailer', title: '花饰之下的故事', kind: '官方中文剧情预告缩略图', src: 'https://i1.hdslb.com/bfs/archive/a3b5ccd7c92be137b1a02d15c5c619a80dd38cda.jpg', alt: 'millsage 官方中文剧情预告片封面', caption: 'OurNotesOfficial 与 millsage_家団_ofc 联合公开的中文剧情预告。', rights: imageRights, replaceHint: '', category: 'film', sourceUrl: 'https://www.bilibili.com/video/BV1XTbZ6REEY/' },
  { id: 'white-piano', title: '在白花与琴声之间', kind: '本站原创氛围插画', src: assets.atmosphere, alt: '夜色音乐室里，白色康乃馨、钢琴与窗边月光的原创插画', caption: '以白花、钢琴与记忆为灵感的 AI 生成氛围插画，并非官方素材或剧情场景。', rights: '本站视觉创作 · AI 生成', replaceHint: '', category: 'art' },
];

export const archivePolicy = {
  en: 'VISUAL ARCHIVE', zh: '图像出处',
  lines: ['本页展示官方公开网站的图像预览，每张图片附原始资料页。', '图像权利归各权利方所有，本站为非官方粉丝资料整理。'],
};
