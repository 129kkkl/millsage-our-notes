import { useEffect, useRef } from 'react';
import type { ArchiveSlot } from '../../data/types';
import { SourcedImage } from './SourcedImage';
import { SaveButton } from './SaveButton';
import { Icon } from './Icon';

export function ImageViewer({ slot, index, count, onClose, onMove }: { slot: ArchiveSlot | null; index: number; count: number; onClose: () => void; onMove: (direction: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = Boolean(slot);
  useEffect(() => {
    if (!open) return;
    const dialog = ref.current;
    dialog?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = old; };
  }, [open]);
  return <dialog ref={ref} className="lightbox memory-lightbox" aria-labelledby="memory-image-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); onMove(-1); } if (e.key === 'ArrowRight') { e.preventDefault(); onMove(1); } }}>
    {slot && <div className="lightbox__inner"><header><span>MEMORY {index + 1} / {count}</span><button type="button" onClick={onClose} aria-label="关闭相册预览"><Icon name="close" /></button></header><div className="lightbox__stage"><button type="button" onClick={() => onMove(-1)} aria-label="相册上一张">←</button><SourcedImage src={slot.src ?? ''} alt={slot.alt} eager /><button type="button" onClick={() => onMove(1)} aria-label="相册下一张">→</button></div><footer><div><h3 id="memory-image-title">{slot.title}</h3><p>{slot.caption}</p><small>{slot.rights}</small></div><SaveButton id={'image:' + slot.id} label={slot.title + ' ' + slot.kind} />{slot.sourceUrl && <a className="journal-link" href={slot.sourceUrl} target="_blank" rel="noopener noreferrer">原始出处 ↗</a>}</footer></div>}
  </dialog>;
}
