import { createContext, useContext } from 'react';
import type { SpoilerLevel } from '../data/types';

export interface SpoilerContextValue {
  level: SpoilerLevel;
  setLevel: (level: SpoilerLevel) => void;
  /** 用户在本次会话中主动点开过剧透门的章节 id 集合 */
  unlocked: ReadonlySet<string>;
  unlock: (id: string) => void;
  /** storage 是否可用（不可用时 UI 提示「本次会话内有效」） */
  persistent: boolean;
}

export const SpoilerContext = createContext<SpoilerContextValue | null>(null);

export function useSpoiler(): SpoilerContextValue {
  const ctx = useContext(SpoilerContext);
  if (!ctx) throw new Error('useSpoiler must be used inside <SpoilerProvider>');
  return ctx;
}
