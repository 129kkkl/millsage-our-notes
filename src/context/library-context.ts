import { createContext, useContext } from 'react';

export interface ReadingLibrary {
  saved: string[];
  read: string[];
  journal: string;
  lastChapter: string;
  theme: 'paper' | 'night';
}

export interface LibraryValue extends ReadingLibrary {
  persistent: boolean;
  toggleSaved: (id: string) => void;
  markRead: (id: string) => void;
  unmarkRead: (id: string) => void;
  setJournal: (value: string) => void;
  setLastChapter: (id: string) => void;
  toggleTheme: () => void;
}

export const LibraryContext = createContext<LibraryValue | null>(null);
export function useLibrary() {
  const value = useContext(LibraryContext);
  if (!value) throw new Error('LibraryProvider is required');
  return value;
}
