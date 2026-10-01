import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LibraryContext } from './library-context';
import type { ReadingLibrary } from './library-context';

const KEY = 'millsage.library.v2';
const initial: ReadingLibrary = { saved: [], read: [], journal: '', lastChapter: 'prelude', theme: 'paper' };
function restore(): ReadingLibrary {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (!value || typeof value !== 'object') return initial;
    const strings = (data: unknown) => Array.isArray(data) ? [...new Set(data.filter((v): v is string => typeof v === 'string' && v.length < 100))].slice(0, 500) : [];
    return {
      saved: strings(value.saved), read: strings(value.read),
      journal: typeof value.journal === 'string' ? value.journal.slice(0, 8000) : '',
      lastChapter: typeof value.lastChapter === 'string' ? value.lastChapter.slice(0, 100) : 'prelude',
      theme: value.theme === 'night' ? 'night' : 'paper',
    };
  } catch { return initial; }
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ReadingLibrary>(restore);
  const [persistent, setPersistent] = useState(true);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); setPersistent(true); }
    catch { setPersistent(false); }
  }, [data]);
  useEffect(() => { document.documentElement.dataset.readingTheme = data.theme; }, [data.theme]);
  const value = useMemo(() => ({
    ...data, persistent,
    toggleSaved: (id: string) => setData(prev => ({ ...prev, saved: prev.saved.includes(id) ? prev.saved.filter(v => v !== id) : [...prev.saved, id] })),
    markRead: (id: string) => setData(prev => prev.read.includes(id) ? prev : ({ ...prev, read: [...prev.read, id] })),
    unmarkRead: (id: string) => setData(prev => ({ ...prev, read: prev.read.filter(value => value !== id) })),
    setJournal: (journal: string) => setData(prev => ({ ...prev, journal: journal.slice(0, 8000) })),
    setLastChapter: (lastChapter: string) => setData(prev => prev.lastChapter === lastChapter ? prev : ({ ...prev, lastChapter })),
    toggleTheme: () => setData(prev => ({ ...prev, theme: prev.theme === 'paper' ? 'night' : 'paper' })),
  }), [data, persistent]);
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}
