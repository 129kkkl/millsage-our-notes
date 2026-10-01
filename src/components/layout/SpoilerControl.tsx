import { useSpoiler } from '../../context/spoiler-context';
import { SPOILER_LABEL } from '../../data/types';
import type { SpoilerLevel } from '../../data/types';
import '../../styles/layout.css';

const LEVELS: SpoilerLevel[] = ['none', 'light', 'full'];

/** 三档剧透开关。写入 localStorage，刷新后保持。 */
export function SpoilerControl({ tone = 'paper' }: { tone?: 'paper' | 'night' }) {
  const { level, setLevel, persistent } = useSpoiler();

  return (
    <div className={`spctl spctl--${tone}`}>
      <span className="spctl__label micro">SPOILER</span>
      <div className="spctl__group" role="radiogroup" aria-label="剧透等级" onKeyDown={e => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (LEVELS.indexOf(level) + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
        setLevel(LEVELS[next]); (e.currentTarget.children[next] as HTMLButtonElement)?.focus();
      }}>
        {LEVELS.map((lv) => {
          const active = level === lv;
          return (
            <button
              key={lv}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              className="spctl__opt"
              data-active={active ? 'true' : 'false'}
              title={`${SPOILER_LABEL[lv].en} — ${SPOILER_LABEL[lv].zh}：${SPOILER_LABEL[lv].note}`}
              onClick={() => setLevel(lv)}
            >
              {SPOILER_LABEL[lv].zh}
            </button>
          );
        })}
      </div>
      {!persistent && (
        <span className="spctl__warn micro" title="浏览器存储不可用，本次会话内有效">
          SESSION ONLY
        </span>
      )}
    </div>
  );
}
