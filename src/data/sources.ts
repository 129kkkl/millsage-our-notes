export const verifiedDate = '2026.10.01';

export const sources = {
  band: 'https://bang-dream-on.bushimo.jp/character/millsage/',
  artist: 'https://bang-dream.com/artist/millsage/',
  game: 'https://bang-dream-on.bushimo.jp/',
  gameMusic: 'https://bang-dream-on.bushimo.jp/music/',
  gameMovie: 'https://bang-dream-on.bushimo.jp/movie/',
  launch: 'https://prtimes.jp/main/html/rd/p/000009767.000014827.html',
  narasu: 'https://bang-dream.com/discographies/4216/',
  carnation: 'https://bang-dream.com/discographies/4234/',
  everscape: 'https://bang-dream.com/discographies/4256/',
  kishikaisen: 'https://bushiroad-music.com/musics/millsage_kishikaisen/',
  unravel: 'https://bang-dream.com/discographies/4247/',
  aonosumika: 'https://bang-dream.com/discographies/4254/',
  stellarstellar: 'https://bang-dream.com/discographies/4273/',
  live: 'https://bang-dream.com/events/millsage_1st/',
  releaseNews: 'https://bushiroad.com/media/e471d6193020b8f4',
  releaseTour: 'https://bushiroad-music.com/topics/22115/',
  streaming: 'https://bio.to/millsageDG',
} as const;

export const officialDirectory = [
  { title: '乐队与角色', subtitle: 'Our Notes 官方人物资料', url: sources.band, kind: 'PROFILE' },
  { title: '音乐与活动', subtitle: 'BanG Dream! 艺人专页', url: sources.artist, kind: 'ARTIST' },
  { title: '全曲试听入口', subtitle: '官方音乐平台导航', url: sources.streaming, kind: 'LISTEN' },
  { title: 'Our Notes', subtitle: '游戏、新闻与宣传影像', url: sources.game, kind: 'GAME' },
  { title: 'LIVE 001「極夜」', subtitle: '演出详情与官方公告', url: sources.live, kind: 'LIVE' },
  { title: '首张单曲「鳴らす」', subtitle: '发行信息与收录曲目', url: sources.narasu, kind: 'RELEASE' },
];

export const newsItems = [
  {
    date: '2026.09.30', tag: 'NEW RELEASE', title: '第一声，从「鳴らす」开始。',
    detail: '首张实体单曲正式发行，收录「鳴らす」与「カーネーションの咲く日に」，以及两首 instrumental。',
    url: sources.narasu, image: 'narasu' as const,
  },
  {
    date: '2026.09.24', tag: 'OUR NOTES', title: '五个人的故事，已经开场。',
    detail: '《BanG Dream! Our Notes》正式上线。millsage 与一家Dumb Rock! 作为新乐队，带来各自的全新故事。',
    url: sources.launch, image: 'group' as const,
  },
  {
    date: '2026.12.25', tag: 'UPCOMING LIVE', title: 'LIVE 001「極夜」',
    detail: '首场演出将在东京 Spotify O-WEST 举行。首张单曲初回生产版附最速先行抽选申込券。',
    url: sources.live, image: 'live' as const,
  },
];

export const faqs = [
  { question: 'millsage 是哪部作品中的乐队？', answer: 'millsage（ミルサージュ）是《BanG Dream! Our Notes》中登场的五人女子乐队，以汐見蛍的键盘、歌声与演奏为中心。Our Notes 于 2026 年 9 月 24 日上线，与 MyGO!!!!!、Ave Mujica、夢限大みゅーたいぷ、 一家Dumb Rock! 一同构成作品中的五支乐队。', url: sources.launch },
  { question: '五名成员的配置有什么特别之处？', answer: '汐見蛍担任 Key. & Vo.；伊沢なつめ和琴平凪分别担任吉他；浜崎まほろ担任贝斯；和泉朋花担任鼓。双吉他与键盘主唱构成了这支乐队的编制，伊沢なつめ同时是设定中的作曲担当。', url: sources.band },
  { question: '应该从哪首歌开始听？', answer: '可以从首张单曲「鳴らす」和同盘收录的「カーネーションの咲く日に」开始，再听最早公开发行的「起死開戦」与「everscape」。这是一条本站推荐的入门路线；每首歌下方都提供官方音乐平台入口。', url: sources.narasu },
  { question: '翻唱曲和原创曲如何区分？', answer: '音乐档案按 ORIGINAL / COVER 分类。本站已核对「unravel」「青のすみか」「Stellar Stellar」的公开发行资料，并收录游戏官网公布的「ロウワー」。游戏收录与音乐平台发行是不同信息，因此不会用一个日期替代另一个。', url: sources.gameMusic },
  { question: '剧情导读和主题解读有什么区别？', answer: '剧情导读概述主线相遇、乐队过去与关键转折，依据多篇公开玩家阅读记录交叉整理，并附资料链接。页边笔记、主题与关系视觉属于本站读法；关于 USB 意图等存在分歧的推测不会当作确定事件。完整叙事请在 Our Notes 中阅读。', url: sources.game },
  { question: '收藏与手账会保存在哪里？', answer: '收藏、已读进度、手账文字和配色保存在当前浏览器的本地存储中。换设备或清除浏览器数据前，可在「我的手账」导出 Markdown 或 JSON。', url: undefined },
];
