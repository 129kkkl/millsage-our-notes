import type { LiveEvent } from './types';
import { sources } from './sources';

/**
 * CURRENT / LIVE 区域数据。
 *
 * 原则：
 * - 不模拟售票、不显示倒计时、不生成「剩余 3 张」这类虚构状态。
 * - officialLinks 为空时，UI 显示「官方链接尚未收录」而不是一个点不动的假按钮。
 * - confirmed 为 false 时，UI 会显示「未确认」提示，提醒访客本站尚未二次核实。
 */
export const liveEvents: LiveEvent[] = [
  {
    id: 'live-001',
    series: 'millsage LIVE 001',
    title: '「極夜」',
    date: '2026-12-25',
    dateLabel: '2026.12.25',
    venue: 'Spotify O-WEST',
    status: 'announced',
    officialLinks: [{ label: '官方演出详情', url: sources.live }, { label: '首张单曲与封入特典', url: sources.narasu }],
    note:
      'millsage 的首场 LIVE 将在东京 Spotify O-WEST 举行。演出和票务安排请以官方页面的最新公告为准。',
    performer: 'Key. & Vo. 汐見蛍役 · 薬師寺李有（以官网公开出演信息为准）',
    ticketNote: '最速先行抽选：2026年9月30日 10:00 ～ 11月8日 23:59（JST）。使用 1st Single「鳴らす」初回生产版所附申込券报名。',
    confirmed: true,
  },
];
