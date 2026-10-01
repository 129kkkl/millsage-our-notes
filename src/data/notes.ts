import type { NoteArticle } from './types';
import { sources } from './sources';

/** Essays grounded in public profiles and release pages, not unverified plot summaries. */
export const notes: NoteArticle[] = [
  {
    id:'why-white', kicker:'NOTE 01', title:'Why White?', titleJa:'白という余白', minutes:1,
    lead:'白色衣装与花饰是公开舞台视觉中最先被看见的部分。本站把白读作一张尚未写满的纸。', pull:'白色可以承载很多声音，不必只有一个答案。',
    body:['从五人的舞台装可以直接观察到共同的白色基调与花饰，而发色、乐器与细节仍然保留着差异。这种统一中的不同，是本站视觉设计的起点。','本站用暖白、纸纹与细线回应这一形象，让人物与声音成为页面的重点。白并不自动等于纯洁、幸福或悲伤；这些意义需要由具体的作品和观看者共同建立。','因此，页面里的花瓣与光属于粉丝创作的阅读语言。可以把它们当作问题，也可以把它们当作停留的地方。'],
    related:['VISUAL','WHITE','FLOWERS'], sourceUrl:sources.band,
  },
  {
    id:'meaning-of-happiness', kicker:'NOTE 02', title:'Five Kinds of Happiness', titleJa:'それぞれの幸せ', minutes:1,
    lead:'官方介绍中的「各自」值得停留。它让幸福成为五个人的问题，而不仅是乐队的一句口号。', pull:'一起演奏，也可以保留各自的愿望。',
    body:['BanG Dream! 艺人页面以各自追寻幸福来概括 millsage。公开的五人性格，也很难被归纳成完全相同的追求。','本站的读法是：一个共同的乐队，并不要求每个人先成为同一种人。音乐可以让她们在同一段时间里表达自己，也让她们有机会听见别人的方向。','这个问题可以带进听歌，也可以带进完整故事：在一段关系中，共同完成一件事与拥有相同答案，究竟是什么关系？'],
    related:['HAPPINESS','BAND'], sourceUrl:sources.artist,
  },
  {
    id:'talent-as-light', kicker:'NOTE 03', title:'A Piano at the Center', titleJa:'真ん中にあるピアノ', minutes:1,
    lead:'主唱站在键盘旁边，让歌声与钢琴同时成为一支乐队的中心。', pull:'中心是一种分工，也是一种听见别人的位置。',
    body:['汐見蛍的乐器栏写着 Key. & Vo.，公开背景来自古典钢琴比赛。官方乐队介绍也明确把她的歌唱与演奏放在主轴上。','这意味着认识 millsage 时，可以同时注意人声与键盘，而不仅把钢琴当作伴奏的装饰。其他乐器如何与这个中心相处，则需要回到具体的录音和演奏去听。','本站在人物阅读里留下「被称为天才的人」这个问题，但没有用称号替代一个人的日常。园艺、食物偏好与学校，也属于蛍的公开档案。'],
    related:['PIANO','HOTARU','VOICE'], sourceUrl:sources.band + 'shiomi-hotaru/',
  },
  {
    id:'flowers-and-mourning', kicker:'NOTE 04', title:'When Carnations Bloom', titleJa:'カーネーションの咲く日に', minutes:1,
    lead:'从舞台花饰到曲名，花是可以在公开作品里找到的线索，也是一种开放的意象。', pull:'一朵花的意义，可以随着听者改变。',
    body:['「カーネーションの咲く日に」于 2026 年 7 月 19 日开始配信，之后收录于「鳴らす」。官方署名包括 Aira 与瀬名水紀。','本站把花与时间并置，讨论等待、祝福与留下的记忆。这是一种阅读方式，歌名本身并不证明特定人物经历了什么。','听这首歌时，可以先把标题保留在脑海里，再观察它如何影响自己对整段音乐的感受。不必在开始之前就给花指定唯一的意思。'],
    related:['CARNATION','TIME','MUSIC'], sourceUrl:sources.carnation,
  },
  {
    id:'genius-and-ordinary', kicker:'NOTE 05', title:'Talent and the Everyday', titleJa:'才能と日常', minutes:1,
    lead:'出众的能力只是人物的一部分。公开档案里的爱好与食物，让五个人获得日常的尺度。', pull:'一个人，永远比她的称号多一点。',
    body:['蛍喜欢园艺，なつめ爱逛古着店，凪读书和看电影，まほろ喜欢摄影，朋花爱好美食。这些条目都来自游戏官网人物页。','本站认为，日常细节让观众有机会从「天才」「作曲担当」「协调者」这些角色定位之外，再认识一次她们。','如果想寻找更亲近的入口，可以先选一个共同爱好。它不会替代完整故事，却能让一张舞台上的面孔更容易被记住。'],
    related:['DAILY LIFE','MEMBERS'], sourceUrl:sources.band,
  },
  {
    id:'memory-after-death', kicker:'NOTE 06', title:'A Camera and a Memory', titleJa:'カメラと記憶', minutes:1,
    lead:'まほろ的公开爱好是摄影。它与她珍惜共同度过的日子这一性格，形成了一组温柔的并置。', pull:'想留下的，往往是一起度过的普通一天。',
    body:['浜崎まほろ的官网档案列出「カメラ」，也描述她比任何人都珍惜共同组建乐队的时光。','本站把这两条公开信息放在一起阅读：相机可以记录画面，珍视则让某些画面变得重要。但这并不意味着原作已经用摄影解释了她的全部心理。','这里讨论的是记忆作为日常记录的可能性。具体的回忆与经历，仍然应该从完整作品中认识。'],
    related:['MAHORO','PHOTOGRAPHY','MEMORY'], sourceUrl:sources.band + 'hamasaki-mahoro/',
  },
  {
    id:'weight-of-blessing', kicker:'NOTE 07', title:'The Weight of a Wish', titleJa:'願いの重さ', minutes:1,
    lead:'幸福与祝福是官方介绍中的愿望。本站想问的是：愿望如何成为可以与别人分享的东西？', pull:'让别人幸福，也需要听见别人的答案。',
    body:['乐队介绍把她们的音乐与仅有一次的人生、幸福和祝福联系在一起。它提供一个方向，却没有替五人的所有选择写下答案。','本站由此想到，善意与理解之间可能存在需要沟通的距离。一个愿望越大，越需要注意参与其中的每个人是否被听见。','页面首页的英文问题属于本站创作：What if a blessing can hurt? 它是阅读的邀请，不是已经确认的故事结论。'],
    related:['BLESSING','HAPPINESS','WISH'], sourceUrl:sources.band,
  },
  {
    id:'why-polar-night', kicker:'NOTE 08', title:'Into the Polar Night', titleJa:'極夜へ', minutes:1,
    lead:'LIVE 001「極夜」是已公开的演出名称。它也让网页中关于光的阅读，获得了另一个停留点。', pull:'走向舞台，也是在为声音留下一个真实的位置。',
    body:['官方公布 millsage LIVE 001「極夜」于 2026 年 12 月 25 日在 Spotify O-WEST 举行。首张单曲的初回生产版包含最速先行抽选申込券。','本站把「極夜」当作一种观看音乐的意象：光可以微弱，声音仍然清晰。这是对标题的粉丝阅读，演出的实际视觉、内容与安排以官方为准。','对于刚认识这支乐队的人，现实活动与录音发行构成另一条路线。可以从作品听起，再沿着官方信息了解她们接下来的舞台。'],
    related:['POLAR NIGHT','LIVE','LIGHT'], sourceUrl:sources.live,
  },
  {
    id:'two-guitars', kicker:'NOTE 09', title:'Two Guitars, Two Perspectives', titleJa:'二本のギター', minutes:1,
    lead:'なつめ与凪都担任吉他，公开性格却给出了两种不同的表达姿态。', pull:'相同的乐器，也可以有不同的方向。',
    body:['伊沢なつめ是骄傲、自信的作曲担当；琴平凪则沉稳，从容的举止让她常被看作更加成熟的人。她们都在 millsage 的乐器栏里写着 Gt.。','本站据此提出一种听歌与阅读的方法：不要因为角色拥有相同的乐器，就把她们理解成相同的存在。各自的性格如何进入关系，需要原作中的相处来补充。','另一个值得分清的概念是设定里的作曲担当与现实作品的制作署名。前者属于なつめ的人物身份，后者应逐曲阅读官方词曲、编曲名单。'],
    related:['NATSUME','NAGI','GUITAR'], sourceUrl:sources.band,
  },
  {
    id:'covers-as-entrance', kicker:'NOTE 10', title:'A Familiar Song, a New Voice', titleJa:'知っている曲、新しい声', minutes:1,
    lead:'翻唱为第一次听见 millsage 的人，提供了一个熟悉而直接的入口。', pull:'熟悉的作品，也能带来一次新的相遇。',
    body:['本站已核对「unravel」「青のすみか」「Stellar Stellar」的公开配信资料，也收录官网音乐页面公布的游戏翻唱「ロウワー」。原词曲与这一版本的编曲在音乐区分别列出。','可以先选择一首自己熟悉的作品，再听相同的声音如何进入 millsage 的原创曲。这是本站推荐的入门顺序，也可以反过来，从原创去探索翻唱。','翻唱的选曲不自动说明故事中的特定经历。它首先是一首可以聆听、可以在作品资料中核对的音乐。'],
    related:['COVER','LISTEN','MUSIC'], sourceUrl:sources.gameMusic,
  },
];
export function getNote(id: string): NoteArticle | undefined { return notes.find(note => note.id === id); }
