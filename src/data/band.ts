import type { OfficialLink } from './types';
import { sources } from './sources';

/**
 * 乐队层面的统一资料。所有区块（首页、Band 介绍、页脚、导航）都从这里读取，
 * 禁止在组件里另写一份。
 */
export const band = {
  name: 'millsage',
  kana: 'ミルサージュ',
  romaji: 'mirusāju',
  subtitle: 'A Handful of Happiness',
  /** 副标题是本站创作，不是官方标语 */
  subtitleNote: '本站原创副标题，非官方标语 / Original subtitle by this fan site',
  work: 'BanG Dream! Our Notes',
  catchphrase: '両手いっぱいの幸せを、あなたに。',
  catchphraseZh: '把满满的幸福，交到你的手中。',
  introduction: [
    'millsage（ミルサージュ）是《BanG Dream! Our Notes》中登场的五人女子乐队。以汐見蛍的键盘、歌唱与演奏为中心，双吉他、贝斯与鼓一同组成她们的声音。',
    '官方介绍把「幸福」与「祝福」放在她们的音乐中心：在仅有一次的人生里，带着各自的愿望继续演奏。这也是认识五位成员时最值得保留的问题——她们想要的幸福，是否相同？',
    '她们同时活跃在游戏故事与现实的音乐发行中。从 2026 年 3 月的「起死開戦」，到 9 月 30 日发行的首张实体单曲「鳴らす」，公开作品为这支新乐队留下了可以循序探索的入口。',
  ],
  form: '五人女子乐队',
  lineupTitle: 'Key. & Vo. / Gt. / Gt. / Ba. / Dr.',

  /** 一句高度克制的定义 */
  definition: {
    ja: 'それぞれの「幸せ」のために鳴らす、ひとつのバンド。',
    zh: '这是一个为了各自的「幸福」而奏响声音的乐队。',
    en: 'A band that plays for each one of its own versions of happiness.',
    note: '本站依据作品公开设定的概括性转述，非官方原文引用。',
  },

  /** 舞台设定：作品公开信息可确认的最低限度背景 */
  setting: {
    label: '舞台',
    ja: '芸術学院中学校 / 水瀬女子学園',
    zh: '蛍就读艺术学院中学校，其他四人就读水瀬女子学园',
    provenance: 'canon' as const,
    note: '学校与班级依据 Our Notes 官网人物档案；详细资料见成员区。',
  },

  conceptEntries: [
    {
      id: 'happiness',
      num: '01',
      en: 'HAPPINESS',
      ja: '幸せ',
      zh: '幸福',
      line: '五个人对「幸福」的理解可能并不相同。',
      body: '官方介绍把「幸福」放在乐队的中心。本站把它理解为一个需要五个人共同回答的问题：天赋、创作、日常与相处，可能给同一个词带来不同的含义。',
    },
    {
      id: 'blessing',
      num: '02',
      en: 'BLESSING',
      ja: '祝福',
      zh: '祝福',
      line: '祝福可以成为负担，也可以由善意造成伤害。',
      body: '从官方介绍里的「祝福」出发，本站关注善意与期待之间的距离。当我们希望一个人幸福，也可以想一想：她是否拥有选择自己幸福的余地？',
    },
    {
      id: 'talent',
      num: '03',
      en: 'TALENT',
      ja: '才能',
      zh: '才能',
      line: '才能既照亮别人，也会让人看不清身边的人。',
      body: '当一个人被固定为「天才」，她自己的意愿就容易被忽略，而她身边人的努力会被同一束光盖住。差距从来不是中性的。',
    },
    {
      id: 'memory',
      num: '04',
      en: 'MEMORY',
      ja: '記憶',
      zh: '记忆',
      line: '一张照片、一首歌，能替日常留下多少细节？',
      body: 'まほろ的官方爱好是相机，她也珍惜与乐队相处的日常。本站从这个细节出发，把照片与唱片视为两种保存时间的方式：一幅留下模样，一首留下声音。',
    },
    {
      id: 'sound',
      num: '05',
      en: 'SOUND',
      ja: '音',
      zh: '声音',
      line: '音乐可以让五个人同时发声，也可以替她们说出说不出的话。',
      body: '键盘、双吉他、贝斯与鼓让五个人在同一首歌里拥有各自的位置。本站用交叠的线条描绘这种合奏，想象不同的个性如何一起成为一支乐队。',
    },
  ],

  links: {
    /** 没有经过核实的官方 URL，一律留空；UI 会显示「官方链接尚未收录」 */
    official: [
      { label: 'Our Notes · 乐队介绍', url: sources.band },
      { label: 'BanG Dream! · 艺人专页', url: sources.artist },
      { label: '官方音乐平台', url: sources.streaming },
    ] as OfficialLink[],
    note: '人物、曲目与活动信息均可从官方入口继续阅读。',
  },

  disclaimer: {
    short: 'UNOFFICIAL FAN PROJECT',
    zh: '非官方、非商业的粉丝创作项目',
    en: 'An unofficial, non-commercial fan project.',
    rights:
      'BanG Dream!、millsage 及相关角色、乐曲、视觉素材的著作权与商标权归各权利方所有。本站不隶属于、不代表、也未获得 Bushiroad / BanG Dream! Project / 相关发行方的任何认可、授权或合作。',
    rightsEn:
      'BanG Dream!, millsage and all related characters, music and visual assets belong to their respective rights holders. This site is not affiliated with, endorsed by, or authorised by Bushiroad, the BanG Dream! Project or any publisher.',
    conduct:
      '本站不复制歌词、剧情脚本、长篇对白、付费内容或游戏资源包。分析文字、界面与互动图形均为粉丝原创。',
    conductEn:
      'No lyrics, scenario scripts, extended dialogue, paid content or game asset packs are reproduced here. All analysis, interface and interactive graphics are original fan work.',
  },
} as const;

export type Band = typeof band;
