import type { TimelineEntry } from './types';
import { sources } from './sources';

export const storyTimeline: TimelineEntry[] = [
  { id:'st-01', date:null, dateLabel:'HOTARU', title:'古典钢琴与「乐坛的天使」', detail:'蛍从小参加古典钢琴比赛并取得优异成绩，形成了官网人物介绍中公开的音乐背景。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.band + 'shiomi-hotaru/' },
  { id:'st-02', date:null, dateLabel:'NATSUME', title:'屋顶上的吉他与作曲', detail:'なつめ经常在学校屋顶弹吉他。她的作曲担当身份与高自尊的性格，构成另一条进入故事的线索。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.band + 'izawa-natsume/' },
  { id:'st-03', date:null, dateLabel:'FIVE MEMBERS', title:'五个人，各自的愿望', detail:'官网公开五人编制，并以幸福与祝福概括乐队的音乐愿望。完整的相遇、选择与经历请在原作中阅读。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.band },
];
export const realTimeline: TimelineEntry[] = [
  { id:'rt-01', date:'2026-03-02', dateLabel:'2026.03.02', title:'「起死開戦」数字配信', detail:'首批公开原创作品之一，3月2日 00:00（JST）起上线音乐平台。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.kishikaisen },
  { id:'rt-02', date:'2026-07-19', dateLabel:'2026.07.19', title:'「カーネーションの咲く日に」配信', detail:'Aira 与瀬名水紀参与词曲、编曲的原创作品。后收录于首张实体单曲。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.carnation },
  { id:'rt-03', date:'2026-08-21', dateLabel:'2026.08.21', title:'「unravel」翻唱版本配信', detail:'词曲 TK，编曲藤井健太郎。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.unravel },
  { id:'rt-04', date:'2026-08-28', dateLabel:'2026.08.28', title:'「青のすみか」翻唱版本配信', detail:'词曲キタニタツヤ，编曲藤井健太郎。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.aonosumika },
  { id:'rt-05', date:'2026-08-31', dateLabel:'2026.08.31', title:'「everscape」全球配信', detail:'20:00（JST）起全球配信；部分服务于次日开放。官方 MV 同时提供了影像入口。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.everscape },
  { id:'rt-06', date:'2026-09-22', dateLabel:'2026.09.22', title:'「Stellar Stellar」翻唱版本配信', detail:'21:00（JST）起配信，原词曲署名星街すいせい与 TAKU INOUE，编曲牧野太洋。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.stellarstellar },
  { id:'rt-07', date:'2026-09-24', dateLabel:'2026.09.24', title:'《BanG Dream! Our Notes》正式上线', detail:'millsage 与一家Dumb Rock! 作为新乐队登场，游戏收录全新故事。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.launch },
  { id:'rt-08', date:'2026-09-30', dateLabel:'2026.09.30', title:'1st Single「鳴らす」正式发行', detail:'首张实体 CD 发行，收录「鳴らす」「カーネーションの咲く日に」与两首 instrumental。同日起开放 LIVE 001 最速先行抽选。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.narasu },
  { id:'rt-09', date:'2026-12-25', dateLabel:'2026.12.25 / UPCOMING', title:'LIVE 001「極夜」', detail:'已公布的首场演出，东京 Spotify O-WEST。出演与票务详情请参阅官方公告。', provenance:'canon', spoiler:'none', confirmed:true, sourceUrl:sources.live },
];
export type TimelineTab = 'story' | 'real';
export const timelineTabs: { id: TimelineTab; label: string; zh: string; note: string }[] = [
  { id:'real', label:'RELEASE HISTORY', zh:'现实发行年表', note:'按官方发行日期记录，最后一项为已公布的未来演出。' },
  { id:'story', label:'STORY ENTRIES', zh:'故事入口', note:'来自官方人物档案的公开背景，不代表剧情事件的先后顺序。' },
];
