import { useState } from 'react';
import type { ReactNode } from 'react';

interface SourcedImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  width?: number;
  height?: number;
  fallback?: ReactNode;
}

/** A new source gets a fresh load state, including when switching outfits. */
export function SourcedImage(props: SourcedImageProps) {
  return <ImageContent key={props.src} {...props} />;
}

function ImageContent({ src, alt, className = '', eager = false, width, height, fallback }: SourcedImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={'sourced-image ' + className} data-state={failed ? 'error' : 'image'}>
      {failed ? (
        <div className="sourced-image__fallback" role="img" aria-label={alt}>
          {fallback ?? <><span aria-hidden="true">✳</span><p>图片暂时无法加载</p><small>请稍后重试，或通过资料出处查看</small></>}
        </div>
      ) : (
        <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      )}
    </div>
  );
}
