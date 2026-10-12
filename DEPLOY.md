# 部署指南

## 技术架构

| 层 | 技术 | 部署位置 | 说明 |
|----|------|----------|------|
| 前台网站 | Next.js（`output: 'export'`） | Cloudflare Pages | 纯静态，31 个预渲染页面 |
| 表单处理 | Cloudflare Pages Functions | Cloudflare Pages | `functions/api/contact.js`、`functions/api/wholesale.js`、`functions/api/support.js` → Resend 邮件 |

> 注意：`output: 'export'` 禁用了 Next.js API Routes，所有服务端逻辑走 `functions/`（Cloudflare Pages Functions）。

内容（产品、分类、文章、FAQ）全部是 `lib/` 下的静态数据，在构建期固化进 HTML。项目**没有数据库、对象存储或后台管理界面**。

## 1. 构建

```bash
npm run build
```

输出目录 `dist/`。

## 2. 部署到 Cloudflare Pages

1. 访问 https://dash.cloudflare.com → Workers & Pages → Create application → Pages → Connect to Git
2. 选择 `eyrya-website` 仓库，构建配置：

| 设置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Framework preset | Next.js |
| Build command | `npm run build` |
| Build output directory | `dist` |

3. 添加自定义域名 `eyrya.com`（Cloudflare 自动处理 DNS 和 SSL）
4. 首次部署完成后，每次 push 到 main 自动触发重新部署

## 3. 环境变量

Cloudflare Pages 项目设置 → Environment variables：

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `RESEND_API_KEY` | Resend API 密钥，三个公开表单发邮件用 | 是 |
| `CONTACT_EMAIL` | 联系表单收件邮箱（默认 support@eyrya.com） | 否 |
| `WHOLESALE_EMAIL` | 批发询价表单收件邮箱（默认 wholesale@eyrya.com） | 否 |
| `SUPPORT_EMAIL` | 支持表单收件邮箱（默认 support@eyrya.com） | 否 |

> 三个公开表单端点：`functions/api/contact.js`、`functions/api/wholesale.js`、`functions/api/support.js` 都依赖 `RESEND_API_KEY`。

> 本页只需要环境变量，**没有任何 Binding**（D1/R2 已随后台一起移除）。完整清单见 `.env.example`。

## 4. 架构详图

```
Browser
  │
  ├── https://www.eyrya.com/         → Next.js 静态页面（Cloudflare Pages）
  │                                    outputs: dist/（31 个预渲染 HTML）
  │
  ├── https://www.eyrya.com/contact/  → 静态页面（Next.js）
  │                                    表单 POST → /api/contact
  │
  ├── https://www.eyrya.com/api/contact      → functions/api/contact.js
  │   https://www.eyrya.com/api/wholesale    → functions/api/wholesale.js
  │   https://www.eyrya.com/api/support      → functions/api/support.js    (Cloudflare Pages Functions)
  │
  └── 内容来源：lib/products.ts、lib/posts.ts、lib/faq.ts（构建期固化进 HTML）

所有请求都在同一个 Cloudflare Pages 项目下，
functions/ 目录中的 Pages Functions 只处理三个表单端点。
```

## 5. SEO 文件

`sitemap.xml` 与 `robots.txt` 都由代码生成，不要在 `public/` 下手工维护：

- `app/sitemap.ts` — 从 `lib/products.ts` / `lib/posts.ts` 派生全部 URL，页面增删后自动同步
- `app/robots.ts` — 允许全站抓取，并指向 sitemap

构建后可在 `dist/sitemap.xml`、`dist/robots.txt` 检查产物。

## 常见问题

**Q: 表单提交失败？**
A: 检查 Cloudflare Pages 环境变量中是否配置了 `RESEND_API_KEY`（以及可选的三个收件邮箱）。端点返回 502 表示 Resend 拒绝或不可达，返回 503 表示服务端未配置密钥。

**Q: 样式丢失？**
A: 确认 `next.config.ts` 中 `distDir: 'dist'` 存在。

**Q: 想改产品价格 / 评分 / 文章？**
A: 改 `lib/` 下的文件再 push，不要在页面组件里改（页面组件只读 `lib/`）。见 README 的「内容管理」章节。

## 费用

- Cloudflare Pages: 免费，无限请求
- Cloudflare Workers: 免费 10 万请求/天
