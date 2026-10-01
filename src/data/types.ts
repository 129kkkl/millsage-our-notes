/**
 * 统一数据层类型定义 / Shared content model.
 *
 * 设计原则：
 * 1. 每一条内容都必须携带 `provenance`（内容性质），UI 只允许按此渲染标签。
 * 2. `confirmed: false` 表示该条资料尚未取得可靠来源确认，UI 必须显式提示。
 * 3. 缺失资料用 `null` 表达，禁止用编造内容填充；UI 显示「Information not yet available」。
 */

/** 内容性质：官方已公开设定 / 游戏剧情事实 / 粉丝解读 / 尚未证实的推测 */
export type Provenance = 'canon' | 'story' | 'interpretation' | 'theory';

/** 剧透层级 */
export type SpoilerLevel = 'none' | 'light' | 'full';

export const PROVENANCE_LABEL: Record<Provenance, { en: string; ja: string; zh: string }> = {
  canon: { en: 'CANON', ja: '公式設定', zh: '官方已公开设定' },
  story: { en: 'STORY', ja: '物語', zh: '游戏剧情事实' },
  interpretation: { en: 'INTERPRETATION', ja: '読み', zh: '粉丝解读' },
  theory: { en: 'THEORY', ja: '推測', zh: '尚未证实的推测' },
};

export const SPOILER_LABEL: Record<SpoilerLevel, { en: string; zh: string; note: string }> = {
  none: { en: 'OFF', zh: '无剧透', note: '不显示任何剧情内容' },
  light: { en: 'LIGHT', zh: '轻剧透', note: '显示前段剧情与人物动机，不揭示关键结局' },
  full: { en: 'FULL', zh: '完全剧透', note: '显示全部剧情摘要' },
};

/** 「目前尚未确认」的统一占位文案 */
export const NOT_AVAILABLE = {
  zh: 'Information not yet available（目前尚未确认）',
  en: 'Information not yet available',
};

/** 可失效的外部链接：只有确认过 URL 才能填 */
export interface OfficialLink {
  label: string;
  url: string;
  /** 说明该链接指向何处，避免访客误认为是本站页面 */
  note?: string;
}

export interface Names {
  jp: string;
  kana: string;
  en: string;
  /** 英文名/译名的来源说明，例如「本站约定，非官方公布」 */
  enNote?: string;
}

export type MemberId =
  | 'hotaru'
  | 'natsume'
  | 'nagi'
  | 'mahoro'
  | 'houka'
  | 'kanata';

export interface Member {
  id: MemberId;
  index: number;
  /** 现任成员为 true；旧成员（archive node）为 false */
  current: boolean;
  name: Names;
  /** 资料未确认时为 null，UI 显示「Information not yet available」 */
  instrument: string | null;
  /** 乐器在乐队中承担的角色说明（本站概括） */
  instrumentRole: string;
  cv: string | null;
  cvNote: string | null;
  /** 该角色的强调色（低饱和，贴近「暖白—极淡蓝—淡紫」体系） */
  accent: string;
  /** RGB 分量，供 CSS 渐变拼接 */
  accentRgb: string;
  /** 个人图形符号：piano / string / string / bass / drum / hollow */
  sigil: 'piano' | 'string' | 'bass' | 'drum' | 'hollow';
  keywords: string[];
  /** 只放官方设定，不放剧情理解 */
  profile: {
    summary: string;
    background: string;
    interests: string[] | null;
    interestsNote: string | null;
    relation: string;
    affiliation: string | null;
  };
  /** 剧情理解入口，受 spoiler 控制 */
  story: {
    core: string;
    tension: string;
    spoiler: SpoilerLevel;
  };
  /** RESONANCE MAP 中的「声音节点」描述 */
  voice: { note: string; provenance: Provenance };
  /** 地图坐标（viewBox 1000×640） */
  map: { x: number; y: number };
  confirmed: boolean;
  images?: { stage: string; casual: string; thumbnail: string };
  officialLinks?: OfficialLink[];
  birthday?: string;
  favoriteFood?: string;
  grade?: string;
}

export interface RelationFacet {
  id: 'connection' | 'conflict' | 'admiration' | 'memory' | 'distance';
  en: string;
  zh: string;
  glyph: string;
}

export type RelationVisual = 'solid' | 'dashed' | 'glow' | 'sharp' | 'faint';

export interface Relation {
  id: string;
  from: MemberId;
  to: MemberId;
  facet: RelationFacet['id'];
  visual: RelationVisual;
  label: string;
  detail: string;
  provenance: Provenance;
  spoiler: SpoilerLevel;
  confirmed: boolean;
}

export type MusicType = 'original' | 'cover';
export type ReleaseKind = 'single' | 'digital' | 'album' | 'in-game' | 'unconfirmed';

export interface MusicTrack {
  id: string;
  title: string;
  /** 读法/近似英文释义，仅作检索辅助，非官方译名 */
  titleEn: string;
  titleEnNote: string;
  type: MusicType;
  releaseKind: ReleaseKind;
  /** ISO 字符串；null 表示尚未确认 */
  releaseDate: string | null;
  credits: { role: string; value: string | null }[] | null;
  tags: string[];
  /** 无争议的事实性描述 */
  summary: string;
  /** 粉丝解读（视觉语言） */
  reading: string;
  /** 明确不做的推断，防止过度解读 */
  counterpoint: string;
  /** 封面视觉母题：决定本站生成的抽象封面色与线条语言 */
  art: 'burst' | 'carnation' | 'escape' | 'resonance';
  tempoMotion: 'sharp' | 'slow' | 'drift' | 'swell';
  officialLinks: OfficialLink[];
  confirmed: boolean;
  cover?: string;
  sourceUrl?: string;
  releaseNote?: string;
}

export interface StoryChapter {
  id: string;
  label: string;
  labelJa: string;
  title: string;
  subtitle: string;
  spoiler: SpoilerLevel;
  paragraphs: string[];
  pull: string | null;
  /** 滚动时的视觉阶段：亮 → 暗 → 碎 → 留白 */
  visual: 'bloom' | 'tide' | 'fracture' | 'ash' | 'residual';
}

export interface TimelineEntry {
  id: string;
  date: string | null;
  dateLabel: string;
  title: string;
  detail: string;
  provenance: Provenance;
  spoiler: SpoilerLevel;
  confirmed: boolean;
  sourceUrl?: string;
}

export interface ThemeConcept {
  id: string;
  en: string;
  ja: string;
  zh: string;
  glyph: string;
  gloss: string;
  reading: string[];
  question: string;
}

export interface NoteArticle {
  id: string;
  kicker: string;
  title: string;
  titleJa: string;
  minutes: number;
  lead: string;
  pull: string;
  body: string[];
  related: string[];
  sourceUrl?: string;
}

export interface LiveEvent {
  id: string;
  series: string;
  title: string;
  date: string | null;
  dateLabel: string;
  venue: string;
  status: 'announced' | 'unknown';
  officialLinks: OfficialLink[];
  note: string;
  confirmed: boolean;
  performer?: string;
  ticketNote?: string;
}

export interface ArchiveSlot {
  id: string;
  title: string;
  kind: string;
  /** 素材路径；null 时渲染本站设计的 placeholder */
  src: string | null;
  alt: string;
  caption: string;
  rights: string;
  /** 替换说明，渲染在 placeholder 上 */
  replaceHint: string;
  sourceUrl?: string;
  category?: 'band' | 'members' | 'music' | 'film' | 'art';
}
