# millsage — Our Little Memory Book

一个以白花、祝福、回忆与极夜为主题的中文非官方粉丝手账。React、TypeScript、Vite 构建；资料整理日期为 2026 年 10 月 1 日。

## 运行

需要 Node.js 20.19+ 或 22.12+。

```powershell
npm install
npm run dev
```

打开终端显示的本地地址。若当前终端的 npm 参数转发异常，可直接运行：

```powershell
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173
```

```powershell
npm run test
npm run lint
npm run build
npm run preview
```

生产文件位于 `dist/`。这是完整的本地前端项目，没有账号、后端或付费接口。

## 阅读与探索

- **八段剧情导读**：围绕主线「花飾りのためのデコール」整理相遇、乐队过去、不同的牵挂、舞台、日记与结尾；按人物筛选，切换无剧透／轻剧透／完全剧透，记录已读进度，继续上次阅读。本站分段不等于游戏话数。
- **两层关系阅读**：五位现役成员的公开关系，及完全剧透保护下的六人主线联系；点击人物查看文字并返回关联章节。
- **28 幅视觉档案**：2 幅乐队视觉、15 幅人物图像、7 张唱片封面、3 幅官方影像缩略图、1 幅 AI 氛围插画。分类、收藏、放大、左右键切换与 Esc 关闭。
- **拍立得记忆墙**：将人物兴趣、发行封面与影片组织成八张可收藏的照片卡，照片说明区分公开设定与本站文字。
- **音乐与影像**：8 首曲目、3 条本站策划的听歌路线、6 支官方公开影片，包含中文剧情预告、动画 CM、乐队介绍与音乐影像。播放器按点击加载，相互切换时停止上一处播放。
- **全站搜索**：59 条可检索记录，支持人物、剧情、音乐、图片和笔记分类及中日英文关键词；隐藏超过当前剧透等级的剧情。快捷键 Ctrl / Cmd + K。
- **个人手账**：跨区收藏，阅读进度、文字和纸面／极夜配色自动保存在当前浏览器；导出 Markdown 或 JSON。剧情问题可追加到已有笔记。
- **幸福花笺**：自定义文字、署名及五人配色，实时预览并保存 1200 × 1500 PNG。
- **声音角落**：五音合成钢琴、原创氛围旋律、可开关雨声及音量调整；需手动开启，离开页面停止，不使用乐队音源。
- **演出提醒与阅读工具**：LIVE 001「極夜」全天 ICS 日历下载、页面进度、收藏数量及回到顶部。

原有五人完整档案、两套服装、曲目署名与筛选、发行年表、主题互动、10 篇阅读笔记和官方入口继续保留。

## 内容与媒体

详细出处、剧情整理口径和图像权利说明见 [CONTENT_SOURCES.md](CONTENT_SOURCES.md)。本次没有逐话直接核对完整游戏；剧情概述依照多篇公开玩家阅读记录交叉整理，每段链接来源。本站读法单独标记，存在分歧的推测保留不确定性。

官方图片通过公开图片 URL 在线显示，图旁保留来源；影片通过 YouTube 或哔哩哔哩播放器按需加载。外部媒体与 Google Fonts 需要网络，字体有系统回退、图片有失败提示。外部平台可能需要登录或限制嵌入。

`public/images/white-flowers-piano.webp` 是本站 AI 氛围插画，明确标注为原创关联视觉。生成工具、完整提示词和格式转换记录见 [ARTWORK.md](ARTWORK.md)。不把它当作官方素材或游戏场景截图。

## 维护入口

| 文件 | 用途 |
| --- | --- |
| `src/data/story-guide.ts` | 八段剧情、读后笔记、人物视角与来源 |
| `src/data/members.ts`、`sources.ts` | 人物档案与公开出处 |
| `src/data/assets.ts`、`archive.ts`、`videos.ts` | 图像与影片记录 |
| `src/data/music.ts`、`timeline.ts`、`live.ts` | 曲目、发行及演出 |
| `src/data/search.ts` | 跨区搜索及剧透保护 |
| `src/context/LibraryProvider.tsx` | 本机收藏、进度与手账存储 |
| `src/components/sections/StoryBook.tsx` | 剧情阅读器 |
| `src/styles/polish.css`、`storybook.css` | 整体视觉、阅读器与响应式样式 |
| `scripts/validate-content.mjs` | 来源、数据与搜索保护检查 |

`npm run test` 检查记录 ID、来源引用、人物关联、图片说明、本地图像及搜索剧透过滤。`node scripts/validate-content.mjs --media` 另做远程 HEAD 可用性检查并写入 `artifacts/media-check.json`；网络重置等错误应结合实际浏览器加载结果判断。

验证与截图见 [VALIDATION.md](VALIDATION.md)。

## 声明

非官方、非商业粉丝项目，与 Bushiroad、BanG Dream! Project、FROMTOKYO 及相关发行方无隶属或合作关系。角色、商标、乐曲和官方图像归各权利方所有。本站不复制歌词、完整游戏剧情、长篇对白、付费内容或游戏资源包。
