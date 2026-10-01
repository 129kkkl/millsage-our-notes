import type { SpoilerLevel } from '../data/types';

export const SPOILER_ORDER: SpoilerLevel[] = ['none', 'light', 'full'];

/** 当前设定是否允许显示该层级的内容 */
export function allows(current: SpoilerLevel, required: SpoilerLevel): boolean {
  return SPOILER_ORDER.indexOf(current) >= SPOILER_ORDER.indexOf(required);
}

/** 从 localStorage 读取，失败时安全回退到 OFF */
export const SPOILER_STORAGE_KEY = 'millsage.spoiler';

export function readStoredSpoiler(): SpoilerLevel {
  if (typeof window === 'undefined') return 'none';
  try {
    const raw = window.localStorage.getItem(SPOILER_STORAGE_KEY);
    if (raw === 'none' || raw === 'light' || raw === 'full') return raw;
  } catch {
    /* 隐私模式或存储被禁用：保持默认值 */
  }
  return 'none';
}

export function writeStoredSpoiler(level: SpoilerLevel): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SPOILER_STORAGE_KEY, level);
  } catch {
    /* 存储不可用：本次会话内仍然生效，只是不持久 */
  }
}
