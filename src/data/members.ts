import type { Member, MemberId } from './types';
import { memberVisuals } from './assets';
import { sources } from './sources';

/** Chinese summaries of official profiles. Editorial readings stay separate. */
export const members: Member[] = [
  {
    id: 'hotaru', index: 1, current: true,
    name: { jp: '汐見蛍', kana: 'しおみ ほたる', en: 'Hotaru Shiomi', enNote: '官网英文名' },
    instrument: 'Key. & Vo.', instrumentRole: '键盘 · 主唱', cv: '薬師寺李有', cvNote: null,
    accent: '#c2b3da', accentRgb: '194,179,218', sigil: 'piano',
    keywords: ['乐坛的天使', '古典钢琴', '善良', '感受性丰富', '园艺'],
    birthday: '3月12日', favoriteFood: 'たまごボーロ（蛋黄小饼干）', grade: '音乐科 · 3年级',
    images: memberVisuals('shiomi-hotaru'),
    officialLinks: [{ label: '汐見蛍 · 官方档案', url: sources.band + 'shiomi-hotaru/' }],
    profile: {
      summary: '被称为「乐坛的天使」的音乐天才，拥有一颗温柔而纯粹的心。',
      background: '从很小的时候起，她就在古典钢琴比赛中取得优异成绩。她感受性丰富、心地善良，也有不谙世事的一面。作为 millsage 的键盘与主唱，她的歌唱与演奏是乐队的核心。',
      interests: ['园艺'], interestsNote: '官网公开的爱好是「ガーデニング」；古典钢琴是其音乐背景。',
      relation: 'Key. & Vo.，以键盘、歌唱与演奏承担乐队的中心位置。',
      affiliation: '芸術学院中学校（艺术学院中学校）',
    },
    story: {
      core: '从公开设定来看，「天才」与「天真」在她身上同时存在。本站关心的是：出众的表达能力，是否也能帮助她理解身边人的需要？',
      tension: '「天使」是公开人物介绍中的称号；称号带来的期待与压力，是本站的阅读角度，并非已经确认的剧情结论。', spoiler: 'none',
    },
    voice: { note: '本站把键盘看作这幅声音地图的光源：歌声与琴声并行，让其他声音获得可以靠近的中心。', provenance: 'interpretation' },
    map: { x: 500, y: 122 }, confirmed: true,
  },
  {
    id: 'natsume', index: 2, current: true,
    name: { jp: '伊沢なつめ', kana: 'いざわ なつめ', en: 'Natsume Izawa', enNote: '官网英文名' },
    instrument: 'Gt.', instrumentRole: '吉他 · 作曲担当', cv: '千春', cvNote: null,
    accent: '#8b9a73', accentRgb: '139,154,115', sigil: 'string',
    keywords: ['作曲担当', '自信', '高自尊', '天台吉他', '古着'],
    birthday: '3月30日', favoriteFood: '热柜小食、硬水', grade: '2-B',
    images: memberVisuals('izawa-natsume'),
    officialLinks: [{ label: '伊沢なつめ · 官方档案', url: sources.band + 'izawa-natsume/' }],
    profile: {
      summary: '自信满满的作曲担当，骄傲而锋利的吉他手。',
      background: '她自尊心很强，对自己尚未认可的人容易表现出好战的一面，也常想占据上风。学校屋顶是她经常独自占据的地方，那里总能听见她弹奏的吉他。',
      interests: ['逛古着店'], interestsNote: '官网公开爱好为「古着屋巡り」。',
      relation: '担任吉他与作曲，将乐队的音乐构想写成具体的曲子。', affiliation: '水瀬女子学園',
    },
    story: {
      core: '本站把她的骄傲读作对自我价值的坚持：她希望写下的音乐得到回应。与蛍的天才形象并置时，「认可」成为值得思考的关键词。',
      tension: '自信不必然等于坚强，竞争也不必然等于恶意。这是基于公开性格的解读，不代表对她后续行为的定性。', spoiler: 'none',
    },
    voice: { note: '一条有棱角的吉他线。本站用偏绿的强调色和更鲜明的节奏，表达她的自信与存在感。', provenance: 'interpretation' },
    map: { x: 786, y: 246 }, confirmed: true,
  },
  {
    id: 'nagi', index: 3, current: true,
    name: { jp: '琴平凪', kana: 'ことひら なぎ', en: 'Nagi Kotohira', enNote: '官网英文名' },
    instrument: 'Gt.', instrumentRole: '吉他', cv: '結川あさき', cvNote: null,
    accent: '#899ba3', accentRgb: '137,155,163', sigil: 'string',
    keywords: ['沉稳', '成熟', '从容', '读书', '电影'],
    birthday: '12月10日', favoriteFood: 'ペロキャン（棒棒糖）', grade: '1-B',
    images: memberVisuals('kotohira-nagi'),
    officialLinks: [{ label: '琴平凪 · 官方档案', url: sources.band + 'kotohira-nagi/' }],
    profile: {
      summary: '从容而沉静的少女，总显得比实际年龄更加成熟。',
      background: '她的举止与措辞带着一种余裕，因此常被当作比同龄人更成熟的存在。官网还提到，她就读的女子学校里似乎有一个秘密的粉丝俱乐部。',
      interests: ['读书', '看电影'], interestsNote: '官网公开爱好为「読書、映画鑑賞」。',
      relation: '与なつめ共同构成双吉他编制。她与和泉朋花同在水瀬女子学園 1-B 班。', affiliation: '水瀬女子学園',
    },
    story: {
      core: '本站把她的从容视作一种不同于なつめ的表达姿态：同样是吉他手，她没有被公开设定为好战或张扬的人。',
      tension: '安静的人也可以拥有强烈的意愿。「旁观」「克制」是本站的观察词，不是官网给出的剧情身份。', spoiler: 'none',
    },
    voice: { note: '本站想象她的视觉位置像一段干净的和弦：没有抢占中心，仍然清楚地存在。', provenance: 'interpretation' },
    map: { x: 726, y: 498 }, confirmed: true,
  },
  {
    id: 'mahoro', index: 4, current: true,
    name: { jp: '浜崎まほろ', kana: 'はまさき まほろ', en: 'Mahoro Hamasaki', enNote: '官网英文名' },
    instrument: 'Ba.', instrumentRole: '贝斯 · 乐队协调者', cv: '伊駒ゆりえ', cvNote: null,
    accent: '#7a91b1', accentRgb: '122,145,177', sigil: 'bass',
    keywords: ['协调者', '亲切', '珍视乐队', '摄影', '青梅竹马'],
    birthday: '7月16日', favoriteFood: '西式点心、咖喱', grade: '2-A',
    images: memberVisuals('hamasaki-mahoro'),
    officialLinks: [{ label: '浜崎まほろ · 官方档案', url: sources.band + 'hamasaki-mahoro/' }],
    profile: {
      summary: '亲切开朗的乐队协调者，珍视与伙伴共同度过的每一天。',
      background: '她很容易与人亲近，对谁都能自然地交谈。在五人之中，她尤其珍惜亲手组建的乐队与共同度过的日子。公开介绍也提到，她有两位青梅竹马。',
      interests: ['摄影'], interestsNote: '官网公开爱好为「カメラ」。',
      relation: '担任贝斯，也负责凝聚成员，是乐队的「まとめ役」。', affiliation: '水瀬女子学園',
    },
    story: {
      core: '本站关心她为什么如此珍惜「一起组成的乐队」。协调者的存在，让音乐之外的日常关系也成为这支乐队的一部分。',
      tension: '珍视与责任之间可能存在张力；这里讨论的是公开人物介绍带来的阅读问题，没有把未经核实的事件写成事实。', spoiler: 'none',
    },
    voice: { note: '低音是这张声音地图的地平线。本站用它比喻协调者的作用：把分散的声音托在同一个空间里。', provenance: 'interpretation' },
    map: { x: 296, y: 502 }, confirmed: true,
  },
  {
    id: 'houka', index: 5, current: true,
    name: { jp: '和泉朋花', kana: 'いずみ ほうか', en: 'Houka Izumi', enNote: '官网英文名；朋花读作ほうか' },
    instrument: 'Dr.', instrumentRole: '鼓', cv: '咲川ひなの', cvNote: null,
    accent: '#c38caa', accentRgb: '195,140,170', sigil: 'drum',
    keywords: ['优雅', '社交', '俏皮', '才能', '美食'],
    birthday: '10月24日', favoriteFood: '日式料理、法式料理', grade: '1-B',
    images: memberVisuals('izumi-houka'),
    officialLinks: [{ label: '和泉朋花 · 官方档案', url: sources.band + 'izumi-houka/' }],
    profile: {
      summary: '优雅可人又带一点俏皮，对压倒性的才能怀有强烈兴趣。',
      background: '她善于社交，也有常识，是班级里颇受欢迎的人物。在得体的举止之外，她也有淘气的一面。官网特别指出，她对压倒性的「才能」有着强烈的兴趣。',
      interests: ['美食'], interestsNote: '官网公开爱好为「美食」。',
      relation: '担任鼓手，与琴平凪同在水瀬女子学園 1-B 班。', affiliation: '水瀬女子学園',
    },
    story: {
      core: '「对才能的兴趣」是她的公开设定。本站由此提出的问题是：欣赏一个人的能力，与理解这个人，是否总是同一件事？',
      tension: '本站将「好奇」作为阅读入口，保留它的多种可能性，不预先把她归类为推动者、对立者或旁观者。', spoiler: 'none',
    },
    voice: { note: '鼓点给所有声音一个共同的时间。本站在她的视觉读法中保留优雅与好奇两种不同的节奏。', provenance: 'interpretation' },
    map: { x: 214, y: 240 }, confirmed: true,
  },
];

/** Story-only index; kept separate from the five current official profiles. */
export const formerMembers: Member[] = [{
  id: 'kanata', index: 0, current: false,
  name: { jp: '沢海奏多', kana: '奏多：かなた', en: 'Kanata', enNote: '名字的罗马字写法；姓氏读法尚未核对' },
  instrument: 'Vo.', instrumentRole: '主线中的前任主唱', cv: null, cvNote: null,
  accent: '#cfd4e6', accentRgb: '207,212,230', sigil: 'hollow', keywords: ['主线', '记忆'],
  profile: { summary: '主线中的前任主唱。', background: '剧情节点依据公开阅读记录整理；当前官网人物档案仍以五位现役成员为准。', interests: null, interestsNote: null, relation: '与原有四人的共同乐队，以及与蛍的相遇，构成主线的重要联系。', affiliation: null },
  story: { core: '具体经历见完全剧透的主线导读。', tension: '个人档案中没有可靠出处的学校、生日与声优字段继续留空。', spoiler: 'full' },
  voice: { note: '由相遇与记忆连接起来的故事节点。', provenance: 'story' }, map: { x: 508, y: 592 }, confirmed: true,
  officialLinks: [{ label: '公开玩家主线阅读记录（非官方）', url: 'https://note.com/src34_/n/n64d97c2c25b6' }],
}];

export const allMembers: Member[] = [...members, ...formerMembers];
export const currentMembers: Member[] = members;
export function getMember(id: MemberId): Member {
  const found = allMembers.find(m => m.id === id);
  if (!found) throw new Error('Unknown member id: ' + id);
  return found;
}
export function memberName(m: Member): string { return m.name.jp + ' / ' + m.name.en; }
