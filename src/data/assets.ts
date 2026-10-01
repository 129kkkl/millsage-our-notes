/** Public website previews. Keep original URLs and link every image to its source. */
const characterBase = 'https://bang-dream-on.bushimo.jp/wordpress/wp-content/themes/bang-dream-on_prod/assets/images/';
const portalUploads = 'https://bang-dream.com/wordpress/wp-content/uploads/';

export const assets = {
  group: characterBase + 'pc/character/img_millsage.webp',
  logo: characterBase + 'common/logo_millsage.svg',
  gameLogo: characterBase + 'common/logo_bang-dream-on.webp',
  bandCard: characterBase + 'common/index/img_band_millsage.webp',
  animation: 'https://bang-dream-on.bushimo.jp/wordpress/wp-content/uploads/2026/06/26101234/ON%E4%BA%8B%E5%89%8Dmillsage_CM_.00_00_01_06.%E9%9D%99%E6%AD%A2%E7%94%BB002-1024x576.jpg',
  introduction: 'https://bang-dream-on.bushimo.jp/wordpress/wp-content/uploads/2026/06/26095648/maxresdefault-3-1024x576.webp',
  atmosphere: '/images/white-flowers-piano.webp',
  members: {
    hotaru: { slug: 'shiomi-hotaru' },
    natsume: { slug: 'izawa-natsume' },
    nagi: { slug: 'kotohira-nagi' },
    mahoro: { slug: 'hamasaki-mahoro' },
    houka: { slug: 'izumi-houka' },
  },
  covers: {
    narasu: portalUploads + '2026/06/25235358/92ae2e8e-2bc8effb-dfcc8a9b-e0cce500-768x768.jpg',
    kishikaisen: 'https://bushiroad-music.com/wordpress/wp-content/uploads/2026/02/27145612/%E3%80%90%E9%9F%B3%E6%A5%BD%E9%85%8D%E4%BF%A1JK%E3%80%91%E8%B5%B7%E6%AD%BB%E9%96%8B%E6%88%A6-1024x1024.jpg',
    carnation: portalUploads + '2026/09/17151158/10391e1d-f6498184-205fcd6b-614baf6f-e1784270963298.png',
    everscape: portalUploads + '2026/08/31114940/5048c222-6460487c-fcab35ce-774acf84-768x768.jpg',
    unravel: portalUploads + '2026/08/19165034/b08fe527-642eda32-4392ec35-7fb8cc8e-e1787125859180.jpg',
    aonosumika: portalUploads + '2026/08/27140237/4011b03f-f2289ea3-1820bcc2-207b2af1-768x768.jpg',
    stellarstellar: portalUploads + '2026/09/18113442/e4b2556f-14ede3d5-5e0395e1-c62d78ab-768x768.jpg',
  },
} as const;

export function memberVisuals(slug: string) {
  return {
    stage: characterBase + 'common/character/img_' + slug + '.webp',
    casual: characterBase + 'common/character/img_' + slug + '_2.webp',
    thumbnail: characterBase + 'common/character/nav_' + slug + '.webp',
  };
}

export function artistPortrait(slug: string) {
  return 'https://bang-dream.com/wordpress/wp-content/themes/bangdream-portal/assets/webp/common/artist/millsage/img_list_' + slug + '.webp';
}

export const imageRights = '© BanG Dream! Project / FROMTOKYO / Bushiroad';
export const musicRights = '© Bushiroad Music / 各权利方';
