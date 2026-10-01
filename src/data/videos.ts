import { sources } from './sources';

interface OfficialVideo {
  id: string; title: string; kind: string; note: string; source: string;
  thumbnail?: string; embedUrl?: string; watchUrl?: string; platform?: 'youtube' | 'bilibili';
}

/** IDs are embedded by the official artist / discography pages. */
export const videos: OfficialVideo[] = [
  { id: 'BV1XTbZ6REEY', title: 'millsage · 剧情预告片', kind: 'STORY TRAILER', note: '国际服官方账号公开的中文剧情预告。从「幸福」走近主线的另一面。', source: 'https://www.bilibili.com/video/BV1XTbZ6REEY/', platform: 'bilibili', thumbnail: 'https://i1.hdslb.com/bfs/archive/a3b5ccd7c92be137b1a02d15c5c619a80dd38cda.jpg', embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1XTbZ6REEY&page=1&autoplay=0', watchUrl: 'https://www.bilibili.com/video/BV1XTbZ6REEY/' },
  { id: '4dBoXrtaSJk', title: 'millsage · 动画 CM', kind: 'ANIMATION', note: '从官方动画宣传片认识五人的舞台气质与白花意象。', source: sources.gameMovie },
  { id: '6OeuA3UWPRg', title: 'millsage · 乐队介绍', kind: 'BAND INTRODUCTION', note: '乐队介绍影像，连接五人的声音、人物与公开设定。', source: sources.gameMovie },
  { id: 'FOfAu3lW1qg', title: '鳴らす', kind: 'MUSIC VIDEO', note: '从首张单曲的标题曲，听见 millsage 的第一声。', source: sources.artist },
  { id: 'yLM6PcfD-_Y', title: 'everscape', kind: 'MUSIC VIDEO', note: '原创作品的官方 MV，收录于官方发行资料页。', source: sources.everscape },
  { id: 'ygfd-2Be0DA', title: 'Stellar Stellar', kind: 'COVER VIDEO', note: '由 millsage 演唱的翻唱影像。', source: sources.stellarstellar },
];
