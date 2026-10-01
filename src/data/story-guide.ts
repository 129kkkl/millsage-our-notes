import { assets } from './assets';
import { sources } from './sources';
import type { MemberId, SpoilerLevel } from './types';

export const storyReferences = {
  official: { label: 'Our Notes · 乐队与人物', url: sources.band, kind: '官方档案' },
  discussion: { label: 'r/BanGDream · 主线讨论', url: 'https://www.reddit.com/r/BanGDream/comments/1wpsipr/bang_dream_our_notes_millsage_story_discussion/', kind: '玩家讨论' },
  mat: { label: 'まつわい · 主线阅读记录', url: 'https://note.com/src34_/n/n64d97c2c25b6', kind: '玩家阅读记录' },
  decor: { label: 'カニスキー · 花飾りのためのデコール', url: 'https://note.com/kanisuky/n/nd9a633edad90', kind: '玩家阅读记录' },
  minor: { label: 'とたんちょ · 故事感想', url: 'https://note.com/g__minor/n/n4ac2a90249b8', kind: '玩家阅读记录' },
  bear: { label: '熊チッチ · 主线读后感', url: 'https://note.com/cloud002/n/n5f591170a6a8', kind: '玩家阅读记录' },
  suzu: { label: 'カーファ · 主线与人物感想', url: 'https://note.com/suzu_mituki/n/nf5b342e88886', kind: '玩家阅读记录' },
} as const;
export interface GuideChapter {
  id: string;
  number: string;
  title: string;
  en: string;
  teaser: string;
  spoiler: SpoilerLevel;
  phase: 'bloom' | 'tide' | 'fracture' | 'ash' | 'residual';
  paragraphs: string[];
  reading: string;
  question: string;
  characters: MemberId[];
  tags: string[];
  image: string;
  imageLabel: string;
  imageSource: string;
  refs: (keyof typeof storyReferences)[];
}

/** Original short recaps, cross-checked against public player records. Not game scripts. */
export const guideChapters: GuideChapter[] = [
  {
    id: 'prelude', number: '00', title: '幸福的入口', en: 'A handful of happiness',
    teaser: '五人的音乐，从一个温柔的愿望出发。', spoiler: 'none', phase: 'bloom',
    paragraphs: ['millsage 是《BanG Dream! Our Notes》中的五人乐队。汐見蛍担任键盘与主唱，伊沢なつめ与琴平凪担任吉他，浜崎まほろ担任贝斯，和泉朋花担任鼓。', '官方介绍以「幸福」和「祝福」为中心。主线「花飾りのためのデコール」把这一愿望放进相遇、回忆与选择之中：她们站上同一个舞台，却未必在追寻同一种幸福。'],
    reading: '白色衣装和花饰让祝福有了可以看见的形状。先把它看作一个尚未写完的问题，后面的故事会改变它的重量。',
    question: '你会先注意到谁的声音？', characters: ['hotaru', 'natsume', 'nagi', 'mahoro', 'houka'], tags: ['幸福', '白花', '乐队'],
    image: assets.group, imageLabel: '官方乐队主视觉', imageSource: sources.band, refs: ['official', 'minor'],
  },
  {
    id: 'encounter', number: '01', title: '听见另一种音乐', en: 'The first encounter',
    teaser: '在别人的声音里，发现自己还不知道的可能。', spoiler: 'light', phase: 'bloom',
    paragraphs: ['蛍的起点是古典钢琴与「天才」的称号。她与沢海奏多的相遇，让她认识到音乐也可以直接与人连接，让聆听的人感到幸福。', '奏多成为蛍憧憬的人，也成为引她走向乐队音乐的老师。蛍希望奏出那样的声音；一个与奏多有关的约定，让这段相遇延伸到了后来的 millsage。'],
    reading: '这不是技法不足的故事。蛍已经会演奏，却还在学习如何把自己的感受交给别人。对她而言，奏多首先代表了一种新的音乐观。',
    question: '一首歌带来的幸福，是从演奏者开始，还是从听众开始？', characters: ['hotaru', 'kanata'], tags: ['相遇', '才能', '憧憬'],
    image: assets.animation, imageLabel: '官方动画 CM 缩略图 · 关联视觉', imageSource: sources.gameMovie, refs: ['discussion', 'decor', 'mat'],
  },
  {
    id: 'corsage', number: '02', title: '花束的名字', en: 'Before these five voices',
    teaser: '了解一支乐队，也要回头看她们曾经的样子。', spoiler: 'light', phase: 'tide',
    paragraphs: ['在蛍成为主唱之前，奏多已与另外四人一起组成乐队。现在的五人主视觉并不是故事的全部起点，奏多与伙伴们的回忆贯穿了主线。', '阅读记录提到，乐队曾使用「アクアラピッツ」这个名字，后来才成为 millsage；新名字把「mille」与「corsage」联系起来，将许多幸福与祝福的花饰放在一起。'],
    reading: '改名使乐队从一个练习的集合，成为值得珍惜的共同生活。这里记录名字的故事，不把每一种法语联想都当作作者指定的答案。',
    question: '你会用一个怎样的名字，保存共同度过的时间？', characters: ['kanata', 'natsume', 'nagi', 'mahoro', 'houka'], tags: ['名字', '花饰', '记忆'],
    image: assets.bandCard, imageLabel: '游戏官网乐队介绍图 · 关联视觉', imageSource: sources.game, refs: ['decor', 'discussion'],
  },
  {
    id: 'absence', number: '03', title: '回忆与现在之间', en: 'A space in the middle',
    teaser: '涉及乐队过去的重要事件，请先选择完全剧透。', spoiler: 'full', phase: 'fracture',
    paragraphs: ['奏多因病去世，原来的四位成员失去了主唱，也失去了共同生活的中心。蛍与她们相遇时，面对的是一支仍被奏多的记忆牵引的乐队。', '蛍希望延续奏多带给自己的幸福；四人也从她的声音里重新感到奏多的存在。让五个人走到一起的，不只是蛍的才能，还有她们各自与奏多相连的过去。'],
    reading: '这是阅读全篇的重要转折：乐队可以补上演奏位置，却无法用另一位主唱消除失去。把相似的声音当成同一个人，会让眼前的蛍渐渐变得模糊。',
    question: '继承一个位置，与成为另一个人，有多远？', characters: ['hotaru', 'kanata', 'natsume', 'nagi', 'mahoro', 'houka'], tags: ['告别', '继承', '缺席'],
    image: assets.covers.everscape, imageLabel: 'everscape 官方封面 · 关联视觉', imageSource: sources.everscape, refs: ['mat', 'minor', 'discussion'],
  },
  {
    id: 'wishes', number: '04', title: '四个人，四种牵挂', en: 'Different reasons to stay',
    teaser: '同样选择继续演奏，背后的理由却各不相同。', spoiler: 'full', phase: 'tide',
    paragraphs: ['まほろ在回忆与自责中努力维系乐队。奏多的愿望、自己没能察觉的事情与蛍带来的变化交叠，让她很难轻松地接受一个新的开始。凪是她的幼年好友，也想陪伴她走过这段时间。', 'なつめ的吉他曾被奏多认可，因此她起初很难平静地面对蛍；但她也展现出照顾伙伴、推动事情前进的一面。朋花则对蛍的才能有强烈兴趣。选择继续演奏，并不意味着五人已经拥有相同的理由。'],
    reading: '这些动机不应被缩成「谁好、谁坏」。关心乐队、关心过去、关心某一种才能，可以同时是真实的，却也可能忽略身边人的需要。',
    question: '你最想听见谁还没有说出口的部分？', characters: ['natsume', 'nagi', 'mahoro', 'houka'], tags: ['愧疚', '创作', '才能'],
    image: assets.introduction, imageLabel: '官方乐队介绍影像缩略图 · 关联视觉', imageSource: sources.gameMovie, refs: ['bear', 'mat', 'suzu'],
  },
  {
    id: 'stage', number: '05', title: '舞台上的两种心情', en: 'When the music returns',
    teaser: '音乐让人靠近，也让未说出口的矛盾显现。', spoiler: 'full', phase: 'fracture',
    paragraphs: ['蛍的演奏与歌唱使乐队重新感到音乐的力量，但享受舞台与记得奏多之间，没有立刻找到平衡。まほろ面对蛍在演出中的喜悦时，自己未整理好的情绪也流露出来。', '后来，蛍一度重新接受自己「虹色」的音乐。她在合奏中感到，可以在 millsage 自由地表达自己，和伙伴们一起享受演奏。主线因此曾有过一个接近幸福结局的时刻——直到后面的日记改变了她对这一切的理解。'],
    reading: '表面上这是乐队重新奏响的时刻，内里却是对「我能不能快乐」的犹疑。怀念一个人，不一定意味着从此不可以拥有新的幸福。',
    question: '快乐会背叛回忆吗？', characters: ['hotaru', 'mahoro', 'kanata'], tags: ['舞台', '愧疚', '幸福'],
    image: assets.covers.narasu, imageLabel: '鳴らす 官方封面 · 关联视觉', imageSource: sources.narasu, refs: ['mat', 'bear', 'minor'],
  },
  {
    id: 'diary', number: '06', title: '留下来的文字', en: 'Behind the beautiful memory',
    teaser: '本段涉及主线后段的核心揭示。', spoiler: 'full', phase: 'ash',
    paragraphs: ['蛍发现 USB 中留下的奏多的日记。那些文字与大家记忆里明亮、给予祝福的奏多并不完全相同：她也害怕死亡、渴望活着，对命运怀有怨恨。', '日记里还出现了不愿自己的位置被别人取代、希望 millsage 随自己终结的心情。蛍因此怀疑，自己延续乐队的行动是否违背了奏多的愿望。'],
    reading: '日记是一种处境中的私人情绪，未必等于给所有人的最终命令。「故意把 USB 留给谁」「想借此毁掉乐队」属于读者推测，公开读后感也存在分歧。',
    question: '一个人最痛苦时写下的话，可以定义她的全部吗？', characters: ['hotaru', 'kanata'], tags: ['日记', '记忆', '祝福与诅咒'],
    image: assets.covers.carnation, imageLabel: 'カーネーションの咲く日に 官方封面 · 关联视觉', imageSource: sources.carnation, refs: ['decor', 'bear', 'discussion'],
  },
  {
    id: 'afterglow', number: '07', title: '幸福，是否也包括自己', en: 'An unfinished happy ending',
    teaser: '本段包含主线结尾与读后讨论。', spoiler: 'full', phase: 'residual',
    paragraphs: ['面对日记，蛍没有把矛盾交给伙伴们一起面对。她把延续乐队理解成自己的过错，试图压抑个人的意愿，成为能够满足大家期待的声音。', '乐队继续演奏，问题却没有因此结束。奏多的祝福与痛苦、四人的怀念、蛍对「让所有人幸福」的执着，仍然共存于这个看似重新成立的 millsage 之中。'],
    reading: '主线的重量在于，继续演奏不等于已经痊愈。我们更想追问：当蛍想让每个人幸福时，她能否也允许自己成为需要被理解、被关心的那个人？',
    question: '如果幸福里没有自己，还能称为幸福吗？', characters: ['hotaru', 'kanata', 'natsume', 'nagi', 'mahoro', 'houka'], tags: ['结尾', '自我', '继续生活'],
    image: assets.covers.everscape, imageLabel: 'everscape 官方封面 · 关联视觉', imageSource: sources.everscape, refs: ['suzu', 'mat', 'bear'],
  },
];

export const motifs = [
  { id: 'white', name: '白花', en: 'WHITE FLOWERS', detail: '从衣装上的花饰到歌曲标题，花让祝福成为可以看见的东西。', image: assets.covers.carnation, source: sources.carnation, target: 'archive' },
  { id: 'piano', name: '钢琴', en: 'THE PIANO', detail: '蛍的古典音乐背景，也是五人声音相遇的中心。', image: assets.members.hotaru.slug, source: sources.band + 'shiomi-hotaru/', target: 'members' },
  { id: 'photo', name: '照片', en: 'EVERYDAY MEMORY', detail: 'まほろ喜欢相机。镜头为共同度过的日常留下一个停顿。', image: assets.members.mahoro.slug, source: sources.band + 'hamasaki-mahoro/', target: 'memories' },
  { id: 'night', name: '极夜', en: 'POLAR NIGHT', detail: '首场 LIVE 的名字。夜色里的声音，让微小的光也能被看见。', image: assets.covers.everscape, source: sources.live, target: 'live' },
];
