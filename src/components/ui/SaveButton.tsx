import { useLibrary } from '../../context/library-context';
import { Icon } from './Icon';

export function SaveButton({ id, label, compact = false }: { id: string; label: string; compact?: boolean }) {
  const { saved, toggleSaved } = useLibrary();
  const selected = saved.includes(id);
  return <button type="button" className={'save-button' + (compact ? ' save-button--compact' : '')} aria-label={(selected ? '取消收藏：' : '收藏：') + label} aria-pressed={selected} title={selected ? '已加入我的手账' : '加入我的手账'} onClick={() => toggleSaved(id)}><Icon name="bookmark" size={17} />{!compact && <span>{selected ? '已收藏' : '收藏'}</span>}</button>;
}
