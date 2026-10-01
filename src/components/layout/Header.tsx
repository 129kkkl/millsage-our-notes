import { useEffect, useRef, useState } from 'react';
import { navItems } from '../../data/nav';
import { band } from '../../data/band';
import { useLibrary } from '../../context/library-context';
import { Icon } from '../ui/Icon';
import '../../styles/layout.css';

export function Header() {
  const { theme, toggleTheme } = useLibrary();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 当前区块高亮
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // 移动端菜单：打开时锁定滚动、Esc 关闭、点击遮罩关闭
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab') {
        const buttons = menuRef.current?.querySelectorAll<HTMLButtonElement>('button');
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && !toggleRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onResize = () => { if (window.innerWidth > 1100) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  // 极夜区块（STORY / THEME）需要反色头部
  const tone = active === 'story' || active === 'theme' ? 'night' : 'paper';

  return (
    <header
      className="hdr"
      data-scrolled={scrolled ? 'true' : 'false'}
      data-open={open ? 'true' : 'false'}
      data-tone={tone}
    >
      <div className="hdr__bar">
        <button type="button" className="hdr__brand" onClick={() => go('home')} aria-label="回到首页">
          <span className="hdr__brand-name display">{band.name}</span>
          <span className="hdr__brand-sub micro">unofficial fan archive</span>
        </button>

        <nav className="hdr__nav" aria-label="主导航">
          {navItems.filter(n => ['home', 'members', 'memories', 'story', 'music', 'archive', 'journal'].includes(n.id)).map((n) => (
            <button
              key={n.id}
              type="button"
              className="hdr__link"
              data-active={active === n.id ? 'true' : 'false'}
              onClick={() => go(n.id)}
            >
              {n.zh}
            </button>
          ))}
        </nav>

        <div className="hdr__tools">
          <button type="button" className="hdr__tool" aria-label="打开全站搜索" onClick={() => window.dispatchEvent(new Event('millsage:search'))}><Icon name="search" size={18} /><span>搜索</span><kbd>Ctrl K</kbd></button>
          <button type="button" className="hdr__tool" aria-label="打开声音角落" onClick={() => window.dispatchEvent(new Event('millsage:sound'))}><Icon name="music" size={18} /></button>
          <button type="button" className="hdr__tool" aria-label={theme === 'paper' ? '切换到极夜配色' : '切换到纸面配色'} onClick={toggleTheme}><Icon name={theme === 'paper' ? 'moon' : 'sun'} size={18} /></button>
          <button
            ref={toggleRef}
            type="button"
            className="hdr__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="hdr__burger-line" />
            <span className="hdr__burger-line" />
            <span className="sr-only">{open ? '关闭菜单' : '打开菜单'}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="hdr__menu"
        data-open={open ? 'true' : 'false'}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="站点导航"
      >
        <ul className="hdr__menu-list">
          {navItems.map((n, i) => (
            <li key={n.id}>
              <button
                type="button"
                className="hdr__menu-item"
                data-active={active === n.id ? 'true' : 'false'}
                style={{ transitionDelay: `${60 + i * 26}ms` }}
                onClick={() => go(n.id)}
              >
                <span className="hdr__menu-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="hdr__menu-en display">{n.label}</span>
                <span className="hdr__menu-zh">{n.zh}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="hdr__menu-foot">
          <p className="micro">{band.disclaimer.short}</p>
          <p className="micro">NON-COMMERCIAL · NOT AFFILIATED</p>
        </div>
      </div>
    </header>
  );
}
