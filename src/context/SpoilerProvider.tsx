import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { SpoilerLevel } from '../data/types';
import { SpoilerContext } from './spoiler-context';
import { readStoredSpoiler, writeStoredSpoiler } from '../lib/spoiler';

/**
 * 剧透系统。
 * - 三档：OFF / LIGHT / FULL，选择写入 localStorage，刷新后保持。
 * - 每一处剧透内容还必须经过用户的主动点击（SpoilerGate）才会展开。
 */
export function SpoilerProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<SpoilerLevel>(() => readStoredSpoiler());
  const [unlocked, setUnlocked] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [persistent, setPersistent] = useState(true);

  useEffect(() => {
    // 启动时探测一次 storage 是否可写，UI 才知道要不要提示
    try {
      const probe = '__millsage_probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      setPersistent(true);
    } catch {
      setPersistent(false);
    }
  }, []);

  const setLevel = useCallback((next: SpoilerLevel) => {
    setLevelState(next);
    writeStoredSpoiler(next);
    // 降低等级时清空已展开的剧透门
    setUnlocked((prev) => (prev.size ? new Set<string>() : prev));
  }, []);

  const unlock = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ level, setLevel, unlocked, unlock, persistent }),
    [level, setLevel, unlocked, unlock, persistent],
  );

  return <SpoilerContext.Provider value={value}>{children}</SpoilerContext.Provider>;
}
