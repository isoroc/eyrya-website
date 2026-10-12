# 部署指南

## 技术架构

本项目包含两套服务端逻辑，共享同一个 Git 仓库：

| 层 | 技术 | 部署位置 | 说明 |
|----|------|----------|------|
| 前台网站 | Next.js（`output: 'export'`） | Cloudflare Pages | 纯静态，25 个预渲染页面 |
| 表单处理 | Cloudflare Pages Functions | Cloudflare Pages | `functions/api/contact.js`、`functions/api/wholesale.js`、`functions/api/support.js` → Resend 邮件 |
| 后台管理 | Cloudflare Pages Functions | Cloudflare Pages | `functions/api/admin/*` → D1/R2，由 `_middleware.js` 鉴权 |
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
| `ADMIN_TOKEN` | 后台令牌，`/api/admin/*` 全部依赖它；未设置时整个后台 API 返回 503 | 是 |
| `IMAGES_CUSTOM_DOMAIN` | 对外提供 R2 图片的域名，缺失时上传接口返回 503 | 是 |
| `RESEND_API_KEY` | Resend API 密钥，三个公开表单发邮件用 | 是 |
| `CONTACT_EMAIL` | 联系表单收件邮箱（默认 support@eyrya.com） | 否 |
| `WHOLESALE_EMAIL` | 批发询价表单收件邮箱（默认 wholesale@eyrya.com） | 否 |
| `SUPPORT_EMAIL` | 支持表单收件邮箱（默认 support@eyrya.com） | 否 |

> `DB`（D1）与 `IMAGES_BUCKET`（R2）是 **Binding**，在 Settings → Functions runtime → Bindings 中配置，不是环境变量。完整清单见 `.env.example`。

> 三个公开表单端点：`functions/api/contact.js`、`functions/api/wholesale.js`、`functions/api/support.js` 都依赖 `RESEND_API_KEY`。

## 4. 架构详图

```
Browser
  │
  ├── https://www.eyrya.com/         → Next.js 静态页面（Cloudflare Pages）
  │                                    outputs: dist/（25 个预渲染 HTML）
  │
  ├── https://www.eyrya.com/contact/  → 静态页面（Next.js）
  │                                    表单 POST → /api/contact
  │
  ├── https://www.eyrya.com/api/contact      → functions/api/contact.js
  │   https://www.eyrya.com/api/wholesale    → functions/api/wholesale.js
  │   https://www.eyrya.com/api/support      → functions/api/support.js    (Cloudflare Pages Functions)
  │   https://www.eyrya.com/api/admin/...    → functions/api/admin/*       → D1 + R2
  │
  └── https://www.eyrya.com/admin.html → public/admin.html（纯静态）

所有请求都在同一个 Cloudflare Pages 项目下，
functions/ 目录中的 Pages Functions 处理服务端逻辑。
wrangler.toml 配置 D1/R2 绑定，供 Pages Functions 使用。
```

## 5. SEO 文件

`sitemap.xml` 与 `robots.txt` 都由代码生成，不要在 `public/` 下手工维护：

- `app/sitemap.ts` — 从 `lib/products.ts` / `lib/posts.ts` 派生全部 URL，页面增删后自动同步
- `app/robots.ts` — 允许全站抓取，并 Disallow `/admin.html`

构建后可在 `dist/sitemap.xml`、`dist/robots.txt` 检查产物。

## 常见问题

**Q: 表单提交失败？**
A: 检查 Cloudflare Pages 环境变量中是否配置了 `RESEND_API_KEY`（以及可选的三个收件邮箱）。端点返回 502 表示 Resend 拒绝或不可达，返回 503 表示服务端未配置密钥。

**Q: 后台登录提示 "That token was rejected"？**
A: 说明 `ADMIN_TOKEN` 与输入的 token 不一致。提示 "no ADMIN_TOKEN configured on the server" 则说明环境变量没配。

**Q: 后台图片上传返回 503？**
A: 缺少 `IMAGES_CUSTOM_DOMAIN`，或 `IMAGES_BUCKET` 绑定未配置。

**Q: 样式丢失？**
A: 确认 `next.config.ts` 中 `distDir: 'dist'` 存在。

**Q: admin.html 打不开？**
A: 确认 `public/admin.html` 在构建产物中（检查 `dist/admin.html` 是否存在）。

## 费用

- Cloudflare Pages: 免费，无限请求
- Cloudflare Workers: 免费 10 万请求/天
- D1 数据库: 免费 5GB 存储，10 万次查询/天
- R2 存储: 免费 10GB 存储，100 万次操作/月
