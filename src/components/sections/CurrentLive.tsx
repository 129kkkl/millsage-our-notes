import { liveEvents } from '../../data/live';
import { band } from '../../data/band';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { OfficialLinks } from '../ui/ExternalLink';
import { ProvenanceTag, UnconfirmedTag } from '../ui/Provenance';
import { downloadFile } from '../../lib/download';
import { Icon } from '../ui/Icon';
import type { LiveEvent } from '../../data/types';
import '../../styles/sections.css';

function saveCalendar(event: LiveEvent) {
  if (!event.date) return;
  const next = new Date(event.date + 'T00:00:00Z'); next.setUTCDate(next.getUTCDate() + 1);
  const escape = (value: string) => value.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(',', '\\,').replaceAll(';', '\\;');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//millsage fan archive//Our Notes//ZH', 'BEGIN:VEVENT', 'UID:' + event.id + '@millsage.local', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''), 'DTSTART;VALUE=DATE:' + event.date.replaceAll('-', ''), 'DTEND;VALUE=DATE:' + next.toISOString().slice(0, 10).replaceAll('-', ''), 'SUMMARY:' + escape(event.series + ' ' + event.title), 'LOCATION:' + escape(event.venue), 'DESCRIPTION:' + escape('全天演出提醒，具体开演时刻及安排请以官方公告为准。'), 'URL:' + event.officialLinks[0]?.url, 'END:VEVENT', 'END:VCALENDAR', ''];
  const encoder = new TextEncoder();
  const folded = lines.map(line => {
    let output = '', segment = '';
    for (const char of line) {
      if (encoder.encode(segment + char).length > 75) { output += segment + '\r\n'; segment = ' '; }
      segment += char;
    }
    return output + segment;
  });
  downloadFile('millsage-live-001.ics', folded.join('\r\n'), 'text/calendar;charset=utf-8');
}

export function CurrentLive() {
  return (
    <section id="live" className="section section--tight current grain">
      <div className="current__bed" aria-hidden="true" />
      <div className="shell">
        <SectionHead
          index="09 / LIVE"
          title="Into the Polar Night"
          ja="今後"
          zh="当前公开活动"
          lede="2026 年的圣诞夜，millsage 将在东京迎来 LIVE 001「極夜」。把屏幕中的声音，带到真实的舞台。"
        />

        {liveEvents.length === 0 ? (
          <div className="current__empty">
            <p className="current__empty-en">NO PUBLIC EVENT ARCHIVED</p>
            <p className="current__empty-zh">目前没有可陈列的公开活动。信息补全后会自动出现在这里。</p>
          </div>
        ) : (
          <ul className="current__list">
            {liveEvents.map((ev, i) => (
              <Reveal as="li" key={ev.id} variant="up" delay={i * 80} className="current__card">
                <div className="current__poster" aria-hidden="true">
                  <span className="current__poster-jp jp">{ev.title}</span>
                  <span className="current__poster-series">{ev.series}</span>
                  <span className="current__poster-rule" />
                  <span className="current__poster-note">2026.12.25 / TOKYO</span>
                </div>

                <div className="current__info">
                  <div className="current__meta">
                    <span className="current__series">{ev.series}</span>
                    {!ev.confirmed && <UnconfirmedTag text="本站未二次核实" />}
                    <ProvenanceTag value="canon" compact />
                  </div>

                  <h3 className="current__title jp">{ev.title}</h3>

                  <div className="current__kv">
                    <div className="kv">
                      <span className="kv__k">Date</span>
                      <span className="kv__v">
                        {ev.date ?? <span className="kv__v--na">日期待确认</span>}
                      </span>
                    </div>
                    <div className="kv">
                      <span className="kv__k">Venue</span>
                      <span className="kv__v">{ev.venue}</span>
                    </div>
                    <div className="kv">
                      <span className="kv__k">Status</span>
                      <span className="kv__v">
                        {ev.status === 'announced' ? '已公开' : '状态未确认'}
                      </span>
                    </div>
                  </div>

                  <p className="current__performer">{ev.performer}</p>
                  <p className="current__ticket">{ev.ticketNote}</p>

                  <p className="current__note">{ev.note}</p>
                  {ev.date && <div className="current__calendar"><button type="button" className="journal-link" onClick={() => saveCalendar(ev)}><Icon name="download" size={17} />保存演出日历</button><small>全天提醒 · 开演时刻以官方公告为准</small></div>}

                  <div className="current__links">
                    <OfficialLinks
                      links={ev.officialLinks}
                      fallback={
                        <p className="official-links__none">
                          <span className="official-links__none-en">OFFICIAL PAGE NOT YET ARCHIVED</span>
                          <span className="official-links__none-zh">
                            官方页面地址尚未收录。本站在核实之前不提供跳转按钮，也不用任何形式模拟购票流程。
                          </span>
                        </p>
                      }
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal variant="fade" className="current__foot">
          <p className="micro">
            {band.disclaimer.zh}演出信息以官方公告为准；如与官方渠道不一致，以官方为准。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
