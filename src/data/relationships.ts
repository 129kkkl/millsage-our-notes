import type { Relation, RelationFacet, RelationVisual, MemberId } from './types';
export const relationFacets: RelationFacet[] = [
  { id:'connection', en:'CONNECTION', zh:'连接', glyph:'↔' },
  { id:'conflict', en:'CONTRAST', zh:'对照', glyph:'⟂' },
  { id:'admiration', en:'ADMIRATION', zh:'欣赏', glyph:'✦' },
  { id:'memory', en:'MEMORY', zh:'记忆', glyph:'◌' },
  { id:'distance', en:'DISTANCE', zh:'距离', glyph:'⋯' },
];
export const relationVisualLegend: { visual: RelationVisual; en: string; zh: string }[] = [
  { visual:'solid', en:'Connection', zh:'实线｜共同编制或公开联系' },
  { visual:'glow', en:'Resonance', zh:'柔光｜互补的阅读角度' },
  { visual:'dashed', en:'Question', zh:'虚线｜留作问题的联系' },
  { visual:'sharp', en:'Contrast', zh:'折线｜公开性格的对照' },
  { visual:'faint', en:'Distance', zh:'极淡线｜不同表达姿态' },
];
export const relations: Relation[] = [
  { id:'r-hotaru-natsume', from:'hotaru', to:'natsume', facet:'conflict', visual:'sharp', label:'音乐天才与作曲担当', detail:'两个人分别以键盘主唱与作曲承担创造音乐的角色。官网公开蛍的天才背景与なつめ的高自尊；本站把这组对照放在「认可」的问题里阅读，不把它写成已确认的冲突事件。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-hotaru-nagi', from:'hotaru', to:'nagi', facet:'distance', visual:'faint', label:'天真与从容', detail:'蛍的纯粹与不谙世事，和凪比实际年龄更成熟的举止形成对照。本站用一条轻线表达两种看待世界的方式。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-hotaru-mahoro', from:'hotaru', to:'mahoro', facet:'connection', visual:'glow', label:'音乐中心与乐队协调者', detail:'蛍是公开介绍中音乐上的中心，まほろ是乐队的协调者。本站认为，这提醒我们一支乐队可以拥有不同意义上的中心：音乐中的、日常中的、人与人之间的。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-hotaru-houka', from:'hotaru', to:'houka', facet:'admiration', visual:'dashed', label:'才能与对才能的兴趣', detail:'官网将蛍介绍为音乐天才，也公开了朋花对压倒性才能的兴趣。欣赏与理解是否相同，是本站留下的问题；它不直接证明任何特定关系走向。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-natsume-nagi', from:'natsume', to:'nagi', facet:'connection', visual:'solid', label:'两位吉他手', detail:'伊沢なつめ与琴平凪都担任 Gt.，构成 millsage 的双吉他编制。なつめ同时是公开设定中的作曲担当。', provenance:'canon', spoiler:'none', confirmed:true },
  { id:'r-natsume-mahoro', from:'natsume', to:'mahoro', facet:'conflict', visual:'sharp', label:'锋利与亲切', detail:'官网描述なつめ好胜、骄傲，まほろ则亲切并善于凝聚乐队。本站把它们视为不同的表达方式，讨论锋利与温和如何在同一支乐队里并存。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-natsume-houka', from:'natsume', to:'houka', facet:'admiration', visual:'dashed', label:'创造与好奇', detail:'一位以作曲表达自己，一位对出众的才能抱有兴趣。本站由此讨论看见创作者与理解创作者之间的差别。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-nagi-mahoro', from:'nagi', to:'mahoro', facet:'connection', visual:'glow', label:'从容与凝聚', detail:'凪的沉稳和まほろ的协调者身份，都让人想到乐队如何维持日常相处。这是一种根据公开性格提出的阅读角度。', provenance:'interpretation', spoiler:'none', confirmed:true },
  { id:'r-nagi-houka', from:'nagi', to:'houka', facet:'connection', visual:'solid', label:'水瀬女子学園 1-B', detail:'两人的官方人物档案都列出水瀬女子学園、1-B。这个同班联系有公开资料可核对；关系深浅请由原作补充。', provenance:'canon', spoiler:'none', confirmed:true },
  { id:'r-mahoro-houka', from:'mahoro', to:'houka', facet:'connection', visual:'glow', label:'贝斯与鼓', detail:'她们分别承担 Ba. 与 Dr.。本站以节奏组作为阅读入口：低音与节拍共享同一个时间，但人的愿望不必因此完全重合。', provenance:'interpretation', spoiler:'none', confirmed:true },
];
export function relationsFor(id: string): Relation[] { return relations.filter(r => r.from === id || r.to === id); }
export function otherEnd(r: Relation, id: MemberId): MemberId { return r.from === id ? r.to : r.from; }
