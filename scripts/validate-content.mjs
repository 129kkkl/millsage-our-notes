import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const compiled = await build({ stdin: { contents: `export { searchEntries, searchArchive } from './src/data/search.ts'; export { guideChapters, storyReferences } from './src/data/story-guide.ts'; export { archiveSlots } from './src/data/archive.ts'; export { currentMembers, allMembers } from './src/data/members.ts'; export { tracks } from './src/data/music.ts'; export { videos } from './src/data/videos.ts';`, resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', write: false });
const data = await import('data:text/javascript;base64,' + Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const unique = (items, label) => assert.equal(new Set(items.map(item => item.id)).size, items.length, label + ' IDs must be unique');
unique(data.searchEntries, 'Search'); unique(data.archiveSlots, 'Images'); unique(data.guideChapters, 'Chapters');
for (const chapter of data.guideChapters) {
  assert(chapter.refs.length && chapter.refs.every(ref => data.storyReferences[ref]), chapter.id + ' must have sources');
  assert(chapter.characters.every(id => data.allMembers.some(member => member.id === id)), 'Unknown character: ' + chapter.id);
}
for (const image of data.archiveSlots) {
  assert(image.src && image.alt && image.rights, image.id + ' needs a source, alt text and rights');
  if (image.src.startsWith('/')) assert(existsSync(join(root, 'public', image.src.slice(1))), 'Local image missing: ' + image.src);
  else assert(image.src.startsWith('https://'), 'Remote image must use HTTPS');
  if (image.category !== 'art') assert(image.sourceUrl?.startsWith('https://'), 'Official preview needs provenance: ' + image.id);
}
assert.equal(data.searchArchive('奏多', 'all', 'none').length, 0, 'Spoiler-free search must not reveal the earlier singer');
assert.equal(data.searchArchive('USB', 'all', 'light').length, 0, 'Light spoilers must hide the diary');
assert(data.searchArchive('USB', 'story', 'full').length > 0, 'Accepted full spoilers must be searchable');
assert.equal(data.searchArchive('Natsume 千春', 'member', 'none').length, 1, 'Multiword and multilingual search');
assert.equal(data.searchArchive('not-a-real-millsage-entry', 'all', 'full').length, 0, 'No false search matches');
assert.equal(data.searchArchive('   ', 'all', 'none').length, data.searchArchive('', 'all', 'none').length, 'Whitespace search');
console.log(JSON.stringify({ contentChecks: 'passed', members: data.currentMembers.length, chapters: data.guideChapters.length, images: data.archiveSlots.length, tracks: data.tracks.length, videos: data.videos.length, searchRecords: data.searchEntries.length }));

if (process.argv.includes('--media')) {
  const images = [...data.archiveSlots.filter(image => image.src.startsWith('https://')), ...data.videos.map(video => ({ id: 'video-' + video.id, src: video.thumbnail ?? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` }))];
  const result = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < images.length) {
      const image = images[cursor++];
      let check;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await fetch(image.src, { method: 'HEAD', signal: AbortSignal.timeout(20000) });
          check = { id: image.id, status: response.status, ok: response.ok, type: response.headers.get('content-type'), attempts: attempt + 1 };
          if (response.ok || response.status < 500) break;
        } catch (error) { check = { id: image.id, ok: false, error: error.cause?.code ?? error.message, attempts: attempt + 1 }; }
      }
      result.push(check);
    }
  }));
  await writeFile(join(root, 'artifacts', 'media-check.json'), JSON.stringify(result, null, 2));
  const failures = result.filter(item => !item.ok);
  console.log(JSON.stringify({ remoteMedia: result.length, available: result.length - failures.length, failures }));
  if (failures.length) process.exitCode = 1;
}
