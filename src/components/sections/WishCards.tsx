import { useState } from 'react';
import { currentMembers } from '../../data/members';
import { SectionHead } from '../ui/SectionHead';
import { Flower, Icon } from '../ui/Icon';
import { downloadFile } from '../../lib/download';

const palettes = ['#ece5f4', '#e8ebdf', '#e4ebef', '#e1e8f2', '#f3e3eb'];
export function WishCards() {
  const [message, setMessage] = useState('愿每一种声音，\n都能找到自己的幸福。');
  const [author, setAuthor] = useState('一个听见她们的人');
  const [color, setColor] = useState(0);
  const [status, setStatus] = useState('');
  const download = async () => {
    const canvas = document.createElement('canvas'); canvas.width = 1200; canvas.height = 1500;
    const ctx = canvas.getContext('2d'); if (!ctx) { setStatus('此浏览器暂时无法生成花笺'); return; }
    const gradient = ctx.createLinearGradient(0, 0, 1200, 1500); gradient.addColorStop(0, '#faf8f2'); gradient.addColorStop(1, palettes[color]); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1200, 1500);
    ctx.strokeStyle = currentMembers[color].accent; ctx.lineWidth = 2; ctx.strokeRect(65, 65, 1070, 1370);
    ctx.save(); ctx.translate(600, 395); ctx.strokeStyle = currentMembers[color].accent; ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) { ctx.save(); ctx.rotate(i * Math.PI / 4); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-95, -50, -85, -175, -20, -140); ctx.bezierCurveTo(50, -200, 95, -85, 0, 0); ctx.stroke(); ctx.restore(); }
    ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    ctx.textAlign = 'center'; ctx.fillStyle = '#687065'; ctx.font = '28px Georgia'; ctx.fillText('A LITTLE WISH / MILLSAGE', 600, 145);
    ctx.fillStyle = '#343c37'; ctx.font = '48px "Microsoft YaHei", sans-serif';
    const lines: string[] = [];
    for (const paragraph of message.trim().split('\n')) { let line = ''; for (const char of paragraph) { if (ctx.measureText(line + char).width > 810) { lines.push(line); line = ''; } line += char; } lines.push(line); }
    lines.slice(0, 7).forEach((line, i) => ctx.fillText(line, 600, 700 + i * 84));
    ctx.font = '30px "Microsoft YaHei", sans-serif'; ctx.fillStyle = '#687065'; ctx.fillText('— ' + (author.trim() || '一个听见她们的人'), 600, 1310);
    ctx.font = '20px Georgia'; ctx.fillText('UNOFFICIAL FAN-MADE MEMORY CARD', 600, 1380);
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
    if (blob) { downloadFile('millsage-a-little-wish.png', blob, 'image/png'); setStatus('花笺已生成 · 1200 × 1500 PNG'); }
  };
  return <section id="wishes" className="section wishes"><div className="shell"><SectionHead index="A LITTLE WISH / TO KEEP" title="Send a Little Happiness" ja="小さな祝福" zh="做一张属于你的幸福花笺" lede="选一种颜色，写下一点心意。让今天的幸福，有一个可以留下来的形状。" />
    <div className="wishes__body"><div className="wishes__controls"><label htmlFor="wish-message">写给自己，或写给她们</label><textarea id="wish-message" value={message} maxLength={80} onChange={e => setMessage(e.target.value)} /><small>{message.length} / 80</small><label htmlFor="wish-author">署名</label><input id="wish-author" value={author} maxLength={20} onChange={e => setAuthor(e.target.value)} /><fieldset><legend>用她的颜色，装饰这一页</legend><div>{currentMembers.map((m, i) => <button type="button" key={m.id} aria-pressed={color === i} aria-label={'花笺配色：' + m.name.jp} onClick={() => setColor(i)} style={{ '--swatch': m.accent } as React.CSSProperties}><span /><small>{m.name.jp}</small></button>)}</div></fieldset><button type="button" className="journal-button" disabled={!message.trim()} onClick={() => void download()}><Icon name="download" size={18} />保存我的花笺</button><p role="status" className="wishes__status">{status || '可保存为 PNG 图片，文字与配色由你决定。'}</p></div>
      <div className="wish-card" style={{ '--wish-paper': palettes[color], '--wish-ink': currentMembers[color].accent } as React.CSSProperties}><div className="wish-card__border"><p>A LITTLE WISH / MILLSAGE</p><Flower size={135} /><blockquote>{message || '写下一点幸福。'}</blockquote><span>— {author || '一个听见她们的人'}</span><small>UNOFFICIAL FAN-MADE MEMORY CARD</small></div></div></div>
  </div></section>;
}
