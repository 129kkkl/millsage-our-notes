import type { CSSProperties } from 'react';

type IconName = 'search' | 'bookmark' | 'moon' | 'sun' | 'music' | 'arrow' | 'close' | 'download' | 'check' | 'book' | 'flower';
const paths: Record<Exclude<IconName, 'flower'>, string> = {
  search: 'M21 21l-5.2-5.2M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z',
  bookmark: 'M6 3h12v18l-6-4-6 4V3Z',
  moon: 'M20.5 13.5A9 9 0 0 1 10.5 3.5 9 9 0 1 0 20.5 13.5Z',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M17 12a5 5 0 1 0-10 0 5 5 0 0 0 10 0Z',
  music: 'M9 18V5l11-2v13M9 5l11-2M9 18c0 1.7-1.6 3-3.5 3S2 19.7 2 18s1.6-3 3.5-3S9 16.3 9 18Zm11-2c0 1.7-1.6 3-3.5 3S13 17.7 13 16s1.6-3 3.5-3 3.5 1.3 3.5 3Z',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  close: 'M5 5l14 14M19 5 5 19',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  check: 'm5 12 4 4L19 6',
  book: 'M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z',
};
export function Icon({ name, size = 20, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  if (name === 'flower') return <Flower size={size} style={style} />;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>;
}
export function Flower({ size = 64, className = '', style }: { size?: number; className?: string; style?: CSSProperties }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth=".9" aria-hidden="true" style={style}>
    {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45} 50 50)`}><path d="M50 50C23 36 26 7 44 11C61-2 76 21 50 50Z" /><path d="M50 50C47 32 42 22 44 11" opacity=".5" /></g>)}
    <circle cx="50" cy="50" r="5" /><circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>;
}
