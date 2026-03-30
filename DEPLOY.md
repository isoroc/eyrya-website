# 🚀 部署指南

**当前方案：Cloudflare Pages（纯静态）**

---

## 1. 构建配置

本项目使用 Next.js Static HTML Export，无需服务端。

```bash
npm run build
```

输出目录：`dist/`

## 2. Cloudflare Pages 部署

### 2.1 创建项目

1. 访问 https://dash.cloudflare.com
2. 进入 Workers & Pages → Create application → Pages → Connect to Git
3. 授权 GitHub，选择 `eyrya-website` 仓库
4. 构建配置：

| 设置项 | 值 |
|--------|-----|
| Production branch | `main` |
| Framework preset | Next.js |
| Build command | `npm run build` |
| Build output directory | `dist` |

### 2.2 自定义域名

1. Pages 项目 → Custom domains
2. 添加域名 `eyrya.com`
3. Cloudflare 自动检测 DNS 记录，按提示添加
4. 等待 SSL 证书自动颁发

### 2.3 自动部署

首次部署完成后，每次 push 到 main 分支自动触发重新部署。

## 3. 架构说明

### Cloudflare Pages Functions

`functions/` 目录中的 Cloudflare Pages Functions（边缘函数）与 Next.js 静态导出共存：
- `functions/api/contact.js` — 联系表单 → Resend API 发送邮件
- `functions/api/wholesale.js` — 批发询价 → Resend API 发送邮件
- `functions/api/admin/*` — 后台管理 CRUD（产品、分类、图片上传）

> 注意：`output: 'export'` 禁用了 Next.js API Routes，所有服务端逻辑使用 Cloudflare Pages Functions。

## 4. SEO 文件

构建产物已包含：

- `public/sitemap.xml` — 19 个页面（自动生成）
- `public/robots.txt` — 指向 sitemap

## 5. 环境变量配置

在 Cloudflare Pages 项目设置中添加以下环境变量：

| 变量名 | 说明 |
|--------|------|
| `RESEND_API_KEY` | Resend API 密钥（用于发送邮件） |
| `CONTACT_EMAIL` | 接收表单提交邮件的目标邮箱 |

> 两个表单函数 `functions/api/contact.js` 和 `functions/api/wholesale.js` 依赖这两个变量。

## 6. Cloudflare Pages + Workers 架构

```
eyrya-website (Next.js 静态)
├── dist/ → Cloudflare Pages 自动部署
│
eyrya-website Workers (独立)
├── admin.html → Cloudflare Workers 部署
├── D1 数据库 → 产品/文章数据
└── R2 存储 → 图片
```

## 常见问题

**Q: 部署后样式丢失？**
A: 检查 `next.config.ts` 中 `distDir: 'dist'` 是否正确。

**Q: 表单无法提交？**
A: 检查 Cloudflare Pages 环境变量中是否配置了 `RESEND_API_KEY` 和 `CONTACT_EMAIL`。表单通过 `functions/api/contact.js` 和 `functions/api/wholesale.js` 调用 Resend API 发送邮件。

**Q: 如何更新网站？**
A: 修改代码后 push 到 GitHub，自动重新部署：
```bash
git add .
git commit -m "Update"
git push
```

## 费用

- **Cloudflare Pages**: 免费，无限请求
- **Cloudflare Workers**: 免费 10 万请求/天
- **D1 数据库**: 免费 5GB 存储，10 万次查询/天
- **R2 存储**: 免费 10GB 存储，100 万次操作/月
