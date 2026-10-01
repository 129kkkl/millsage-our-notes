import { useEffect, useRef, useState } from 'react';
import { Ambience } from '../../lib/ambience';
import { Icon, Flower } from '../ui/Icon';
const keys = [{ name: 'C', frequency: 261.63 }, { name: 'D', frequency: 293.66 }, { name: 'E', frequency: 329.63 }, { name: 'G', frequency: 392 }, { name: 'A', frequency: 440 }];

export function SoundCorner() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [starting, setStarting] = useState(false);
  const [rain, setRain] = useState(true);
  const [volume, setVolume] = useState(.35);
  const [error, setError] = useState('');
  const engine = useRef<Ambience | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const launch = () => setOpen(true);
    const hide = () => { if (document.hidden) { engine.current?.stop(); engine.current = null; setPlaying(false); } };
    window.addEventListener('millsage:sound', launch); document.addEventListener('visibilitychange', hide);
    const stopOther = () => { engine.current?.stop(); engine.current = null; setPlaying(false); };
    window.addEventListener('millsage:stop-media', stopOther);
    return () => { window.removeEventListener('millsage:sound', launch); document.removeEventListener('visibilitychange', hide); window.removeEventListener('millsage:stop-media', stopOther); engine.current?.stop(); };
  }, []);
  useEffect(() => {
    if (!open) return; const node = dialog.current; node?.showModal();
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { node?.close(); document.body.style.overflow = old; };
  }, [open]);
  useEffect(() => { engine.current?.setVolume(volume); }, [volume]);
  useEffect(() => { engine.current?.setRain(rain && playing); }, [rain, playing]);
  const stop = () => { engine.current?.stop(); engine.current = null; setPlaying(false); };
  const start = async () => {
    try {
      setStarting(true); setError('');
      window.dispatchEvent(new Event('millsage:stop-media'));
      engine.current ??= new Ambience(volume);
      await engine.current.start(rain); setPlaying(true);
    } catch { setError('浏览器暂时无法开启声音，请尝试刷新页面。'); }
    finally { setStarting(false); }
  };
  const playNote = async (frequency: number) => {
    try {
      if (!engine.current) window.dispatchEvent(new Event('millsage:stop-media'));
      engine.current ??= new Ambience(volume); await engine.current.note(frequency);
    }
    catch { setError('此浏览器暂不支持合成钢琴。'); }
  };
  return <>
    {playing && <div className="sound-dock"><button type="button" onClick={() => setOpen(true)}><span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>钢琴{rain ? '与雨声' : '氛围音'}</button><button type="button" onClick={stop} aria-label="停止氛围音">Ⅱ</button></div>}
    <dialog ref={dialog} className="sound-corner" aria-labelledby="sound-title" onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}><div className="sound-corner__inner"><header><span>SOUND CORNER</span><button type="button" aria-label="关闭声音角落" onClick={() => setOpen(false)}><Icon name="close" /></button></header><Flower size={78} /><h2 id="sound-title">给阅读，留一点琴声。</h2><p>本站原创合成钢琴与雨声。<br />轻触琴键，也可以弹出你自己的小小旋律。</p><div className="little-piano" aria-label="五音钢琴">{keys.map(k => <button type="button" key={k.name} aria-label={'演奏钢琴 ' + k.name} onClick={() => void playNote(k.frequency)}><span>{k.name}</span></button>)}</div><label className="sound-corner__rain"><input type="checkbox" checked={rain} onChange={e => setRain(e.target.checked)} /> 混入轻轻的雨声</label><label className="sound-corner__volume">音量 <input type="range" min="0" max=".8" step=".01" value={volume} onChange={e => setVolume(Number(e.target.value))} aria-label="氛围音音量" /><span>{Math.round(volume * 100)}%</span></label><button type="button" className="journal-button" disabled={starting} onClick={() => playing ? stop() : void start()}><Icon name="music" size={18} />{playing ? '停止氛围音' : starting ? '正在开启' : '开启氛围音'}</button><p className="sound-corner__status" role="status">{error || '离开此页后自动停止。乐队作品请到听歌路线中聆听。'}</p></div></dialog>
  </>;
}
