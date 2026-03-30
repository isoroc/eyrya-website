# 部署指南

## 技术架构

本项目包含两套服务端逻辑，共享同一个 Git 仓库：

| 层 | 技术 | 部署位置 | 说明 |
|----|------|----------|------|
| 前台网站 | Next.js（`output: 'export'`） | Cloudflare Pages | 纯静态，22 个预渲染页面 |
| 表单处理 | Cloudflare Pages Functions | Cloudflare Pages | `functions/api/contact.js`、`functions/api/wholesale.js` → Resend 邮件 |
| 后台管理 | Cloudflare Pages Functions | Cloudflare Pages | `functions/api/admin/*` → D1/R2 |
| 后台界面 | 静态 HTML | Cloudflare Pages | `public/admin.html`（纯静态，无需 Workers 部署） |

> 注意：`output: 'export'` 禁用了 Next.js API Routes，所有服务端逻辑走 `functions/`（Cloudflare Pages Functions）。

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
| `RESEND_API_KEY` | Resend API 密钥，表单发邮件用 | 是 |
| `CONTACT_EMAIL` | 接收表单提交邮件的目标邮箱 | 是 |

> `functions/api/contact.js` 和 `functions/api/wholesale.js` 依赖这两个变量。

## 4. 架构详图

```
Browser
  │
  ├── https://www.eyrya.com/         → Next.js 静态页面（Cloudflare Pages）
  │                                    outputs: dist/（22 个预渲染 HTML）
  │
  ├── https://www.eyrya.com/contact/  → 静态页面（Next.js）
  │                                    表单 POST → /api/contact
  │
  ├── https://www.eyrya.com/api/contact      → functions/api/contact.js
  │   https://www.eyrya.com/api/wholesale    → functions/api/wholesale.js   (Cloudflare Pages Functions)
  │   https://www.eyrya.com/api/admin/...    → functions/api/admin/*       → D1 + R2
  │
  └── https://www.eyrya.com/admin.html → public/admin.html（纯静态）

所有请求都在同一个 Cloudflare Pages 项目下，
functions/ 目录中的 Pages Functions 处理服务端逻辑。
wrangler.toml 配置 D1/R2 绑定，供 Pages Functions 使用。
```

## 5. SEO 文件

构建产物已包含：

- `public/sitemap.xml` — 19 个页面
- `public/robots.txt` — 指向 sitemap

## 常见问题

**Q: 表单提交失败？**
A: 检查 Cloudflare Pages 环境变量中是否配置了 `RESEND_API_KEY` 和 `CONTACT_EMAIL`。

**Q: 样式丢失？**
A: 确认 `next.config.ts` 中 `distDir: 'dist'` 存在。

**Q: admin.html 打不开？**
A: 确认 `public/admin.html` 在构建产物中（检查 `dist/admin.html` 是否存在）。

## 费用

- Cloudflare Pages: 免费，无限请求
- Cloudflare Workers: 免费 10 万请求/天
- D1 数据库: 免费 5GB 存储，10 万次查询/天
- R2 存储: 免费 10GB 存储，100 万次操作/月
