import type { SearchEntry } from '../data/search';
import { openMember } from './navigation';
import type { MemberId } from '../data/types';

export function explore(entry: SearchEntry) {
  if (entry.kind === 'member') { openMember(entry.key as MemberId); return; }
  if (entry.kind === 'story') window.dispatchEvent(new CustomEvent('millsage:chapter', { detail: entry.key }));
  if (entry.kind === 'image') window.dispatchEvent(new CustomEvent('millsage:image', { detail: entry.key }));
  if (entry.kind === 'note') window.dispatchEvent(new CustomEvent('millsage:note', { detail: entry.key }));
  if (entry.kind === 'music') window.dispatchEvent(new CustomEvent('millsage:track', { detail: entry.key }));
  document.getElementById(entry.target)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  if (entry.kind === 'music') requestAnimationFrame(() => document.getElementById('track-' + entry.key)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }));
}
