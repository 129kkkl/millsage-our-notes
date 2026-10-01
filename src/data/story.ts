import type { StoryChapter } from './types';

/** Public profile facts form the starting point; these chapters are editorial readings. */
export const storyChapters: StoryChapter[] = [
  {
    id:'prologue', label:'PROLOGUE', labelJa:'序', title:'The Angel', subtitle:'先认识被称为「天使」的那个女孩。', spoiler:'none', visual:'bloom', pull:null,
    paragraphs:[
      '公开的人物介绍中，汐見蛍是一位心地善良的音乐天才。她从小在古典钢琴比赛中取得优异成绩，被称作「乐坛的天使」，同时也有纯粹、感受性丰富与不谙世事的一面。',
      '这几个词放在一起，已经构成了一个值得阅读的起点：一个拥有出众表达能力的人，会如何认识他人，如何理解自己？本站并不替完整故事回答，只把这个问题留在开始的地方。',
      'millsage 的官方介绍以她的歌唱与演奏为中心，却用「各自的幸福」描述整个乐队。这让故事的入口既有一个中心，也保留了五个人的方向。',
    ],
  },
  {
    id:'chapter-1', label:'Ⅰ', labelJa:'一', title:'Five Versions of Happiness', subtitle:'同一支乐队，也可以拥有不同的愿望。', spoiler:'none', visual:'tide',
    paragraphs:[
      '官方把幸福与祝福写进了 millsage 的介绍。本站的理解是：这不是一个已经解决的问题，而是一种她们愿意不断演奏、不断尝试的愿望。',
      '公开性格已经显出差异。蛍善良而天真；なつめ骄傲而好胜；凪从容而沉稳；まほろ珍惜共同组成的乐队；朋花对压倒性的才能抱有强烈兴趣。',
      '把这五个人只看成「一起追求幸福」，容易忽略她们各自的想法。本站更愿意把乐队当作五种愿望可以同时存在的空间：听见彼此，不等于彼此已经一致。',
    ], pull:'同一首歌里，也可以保留五种方向。',
  },
  {
    id:'chapter-2', label:'Ⅱ', labelJa:'二', title:'Talent and Recognition', subtitle:'被看见的能力，与被理解的人。', spoiler:'none', visual:'fracture',
    paragraphs:[
      '蛍拥有「音乐天才」的公开背景，なつめ则是自信满满的作曲担当。她们都与创造音乐有关，却不必以相同的方式面对认可。',
      '本站由此想到，才能可以是一种能力，也可以成为他人观看一个人的方式。一个人被称作天才以后，她的犹豫、日常与需要，仍然值得被听见。',
      'なつめ的高自尊与好战是官网公开的性格；将它理解为对自我价值的坚持，则属于本站的阅读。这里没有把竞争写成一个已经确认的冲突事件。',
    ], pull:'先听见一个人，再判断她的才能。',
  },
  {
    id:'chapter-3', label:'Ⅲ', labelJa:'三', title:'The Shape of a Band', subtitle:'音乐之外，谁把五个人连在一起？', spoiler:'none', visual:'fracture',
    paragraphs:[
      'まほろ在公开介绍中是乐队的协调者。她亲切、自然，比任何人都珍惜伙伴亲手组成的乐队与共同度过的时光。',
      '贝斯在编制中承担低音，协调者在人际关系中维系连接。本站把两者放在一起阅读，因为它们都容易在顺利的时候被忽略，却能决定整体如何站住。',
      '凪的从容与朋花的社交能力又提供了不同的相处方式。音乐中的分工是明确的，人与人之间的分工则未必能写在乐器名称旁边。',
    ], pull:'一支乐队的形状，也由排练之外的日常决定。',
  },
  {
    id:'chapter-4', label:'Ⅳ', labelJa:'四', title:'Curiosity and Distance', subtitle:'欣赏一种才能，是否等于理解一个人？', spoiler:'none', visual:'ash',
    paragraphs:[
      '朋花对压倒性的才能有强烈兴趣，这是她的公开人物设定。官网同时描述了她的优雅、社交性与一点俏皮。',
      '本站想保留这些特征之间的张力：一个人可以有礼貌，也可以好奇；可以喜欢别人的能力，却还不清楚对方想要什么。',
      '凪与朋花在水瀬女子学園同属 1-B 班，这是一条可以核实的日常联系。由「同班」进一步推断她们的关系深浅，则需要完整故事中的证据。',
    ], pull:'距离，有时藏在最自然的相处里。',
  },
  {
    id:'chapter-5', label:'Ⅴ', labelJa:'五', title:'Sound, Flowers, and Memory', subtitle:'声音会留下，花也会留下。', spoiler:'none', visual:'residual',
    paragraphs:[
      '在公开的舞台视觉里，白色衣装与花饰是一组显著的形象。「カーネーションの咲く日に」又让花成为可以在曲目标题中找到的线索。',
      '本站用纸、花瓣与残响构成这一节的视觉语言。它们可以让人想到祝福、时间与记忆，但不代表官方已经为白花指定了唯一的象征。',
      '完整故事中的告别、相遇与记忆，需要在原作中阅读。这个网页保留的是阅读的入口，而不是替尚未核实的事件写下结局。',
    ], pull:'把意象留作问题，不急着把它变成答案。',
  },
  {
    id:'epilogue', label:'EPILOGUE', labelJa:'終', title:'Whose Happiness?', subtitle:'回到最初的问题：幸福是谁的？', spoiler:'none', visual:'residual',
    paragraphs:[
      '认识了五人的背景，再回头看那句关于幸福的介绍，感觉可能已经不同。它不再只是一个美好的口号，也成为五个不同的人共同面对的问题。',
      '本站认为，理解 millsage 的一个方式，是承认每个人都有自己的位置：才能、骄傲、从容、珍视与好奇，可以同时存在，不必立即被归纳成一个答案。',
      '接下来，可以去听她们的原创曲与翻唱，或在 Our Notes 中阅读完整的相遇与选择。这个问题的下一页，应该由她们的故事继续书写。',
    ], pull:'五种声音，不需要先变成同一种愿望。',
  },
];
export const storyIntro = {
  en:'Happiness Is Not Simple', ja:'幸せは、簡単ではない', zh:'从公开背景到主题阅读',
  lead:'从五人的公开性格与乐队介绍出发，读一组关于才能、相处与幸福的笔记。以下为本站解读；完整剧情请在 Our Notes 中体验。',
};
export function chapterOrder(): StoryChapter[] { return storyChapters; }
