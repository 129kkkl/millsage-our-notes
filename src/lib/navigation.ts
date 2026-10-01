import type { MemberId } from '../data/types';

export function openMember(id: MemberId) {
  window.dispatchEvent(new CustomEvent('millsage:member', { detail: id }));
  document.getElementById('members')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
}
