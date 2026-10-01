import { useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';
import { useLibrary } from '../../context/library-context';

export function ReadingTools() {
  const [progress, setProgress] = useState(0);
  const { saved } = useLibrary();
  useEffect(() => {
    let frame = 0;
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { const distance = document.documentElement.scrollHeight - innerHeight; setProgress(distance > 0 ? Math.min(100, scrollY / distance * 100) : 0); }); };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    const observer = new ResizeObserver(update); observer.observe(document.body);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); observer.disconnect(); };
  }, []);
  return <><div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" /><div className="reading-tools" data-visible={progress > 2}><a href="#journal" aria-label={'我的手账，' + saved.length + '个收藏'}><Icon name="bookmark" size={18} /><span>{saved.length}</span></a><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="回到页首">↑</button></div></>;
}
