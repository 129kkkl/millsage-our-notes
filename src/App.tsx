import { SpoilerProvider } from './context/SpoilerProvider';
import { LibraryProvider } from './context/LibraryProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/HeroV2';
import { BandProfile } from './components/sections/BandProfile';
import { MembersStage } from './components/sections/MembersStage';
import { StoryBook } from './components/sections/StoryBook';
import { MemoryWall } from './components/sections/MemoryWall';
import { ListeningRoom } from './components/sections/ListeningRoom';
import { PersonalJournal } from './components/sections/PersonalJournal';
import { WishCards } from './components/sections/WishCards';
import { SearchPalette } from './components/layout/SearchPalette';
import { SoundCorner } from './components/layout/SoundCorner';
import { ReadingTools } from './components/layout/ReadingTools';
import { ThemeExplorer } from './components/sections/ThemeExplorer';
import { MusicArchive } from './components/sections/MusicArchive';
import { ResonanceMap } from './components/sections/ResonanceMap';
import { Timeline } from './components/sections/Timeline';
import { CurrentLive } from './components/sections/CurrentLive';
import { ArchiveRoom } from './components/sections/ArchiveRoom';
import { NotesSection } from './components/sections/NotesSection';
import { LatestNotes } from './components/sections/LatestNotes';
import { VideoGallery } from './components/sections/VideoGallery';
import { GuideSection } from './components/sections/GuideSection';

export function App() {
  return (
    <LibraryProvider><SpoilerProvider>
      <a className="skip-link" href="#main">
        跳到主要内容 / Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <LatestNotes />
        <BandProfile />
        <MembersStage />
        <MemoryWall />
        <StoryBook />
        <ListeningRoom />
        <MusicArchive />
        <VideoGallery />
        <ThemeExplorer />
        <ResonanceMap />
        <Timeline />
        <CurrentLive />
        <ArchiveRoom />
        <NotesSection />
        <PersonalJournal />
        <WishCards />
        <GuideSection />
      </main>
      <Footer />
      <SearchPalette />
      <SoundCorner />
      <ReadingTools />
    </SpoilerProvider></LibraryProvider>
  );
}
