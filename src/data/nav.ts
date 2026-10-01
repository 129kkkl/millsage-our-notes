export interface NavItem {
  id: string;
  label: string;
  zh: string;
}

/** 站点主导航。顺序同时构成浏览叙事：白 → 极夜 → 回到纸面。 */
export const navItems: NavItem[] = [
  { id: 'home', label: 'HOME', zh: '首页' },
  { id: 'band', label: 'BAND', zh: '乐队' },
  { id: 'members', label: 'MEMBERS', zh: '成员' },
  { id: 'memories', label: 'MEMORIES', zh: '相册' },
  { id: 'story', label: 'STORY', zh: '剧情' },
  { id: 'listening', label: 'LISTENING', zh: '听歌路线' },
  { id: 'music', label: 'MUSIC', zh: '音乐' },
  { id: 'media', label: 'FILM', zh: '影像' },
  { id: 'theme', label: 'THEME', zh: '主题' },
  { id: 'resonance', label: 'RESONANCE', zh: '关系' },
  { id: 'timeline', label: 'TIMELINE', zh: '年表' },
  { id: 'live', label: 'LIVE', zh: '演出' },
  { id: 'archive', label: 'ARCHIVE', zh: '档案' },
  { id: 'notes', label: 'NOTES', zh: '笔记' },
  { id: 'journal', label: 'YOUR NOTES', zh: '我的手账' },
  { id: 'wishes', label: 'A LITTLE WISH', zh: '幸福花笺' },
  { id: 'guide', label: 'GUIDE', zh: '入门' },
];
