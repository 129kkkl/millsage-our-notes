import type { ReactNode } from 'react';
import type { OfficialLink } from '../../data/types';
import '../../styles/ui.css';

interface ExternalLinkProps {
  link: OfficialLink;
  className?: string;
}

/** 外部链接一律新标签页打开，并加 noopener noreferrer。 */
export function ExternalLink({ link, className = '' }: ExternalLinkProps) {
  return (
    <a
      className={`linkline ${className}`.trim()}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <span>{link.label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

interface OfficialLinksProps {
  links: OfficialLink[];
  fallback?: ReactNode;
  className?: string;
}

/**
 * 官方链接区。
 * 没有经过核实的 URL 时不渲染任何可点击元素——不做「点不动的假按钮」，
 * 而是明确告诉访客本站尚未收录。
 */
export function OfficialLinks({ links, fallback, className = '' }: OfficialLinksProps) {
  if (links.length === 0) {
    return (
      <div className={`official-links ${className}`.trim()}>
        {fallback ?? (
          <p className="official-links__none">
            <span className="official-links__none-en">OFFICIAL LINK NOT YET AVAILABLE</span>
            <span className="official-links__none-zh">
              官方链接尚未收录。本站只跳转经过核实的地址，因此在此之前不提供按钮。
            </span>
          </p>
        )}
      </div>
    );
  }
  return (
    <div className={`official-links official-links--ready ${className}`.trim()}>
      {links.map((l) => (
        <ExternalLink key={l.url} link={l} />
      ))}
    </div>
  );
}
