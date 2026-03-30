# EYRYA Website

品牌展示网站，销售引导落地页。驱动流量到 Amazon 和 Temu。

## 🎯 网站目标

建立品牌信任、展示产品、引导用户到 Amazon 和 Temu 完成购买。

## 📁 项目结构

```
eyrya-website/
├── app/
│   ├── components/       # 可复用组件
│   ├── products/          # 产品列表和详情页
│   ├── ideas/            # 博客/Ideas 文章页
│   ├── where-to-buy/     # 购买渠道页
│   ├── about/            # 关于页
│   ├── contact/          # 联系页
│   ├── wholesale/         # 批发询价页
│   ├── privacy/          # 隐私政策页
│   ├── terms/            # 服务条款页
│   ├── support/          # 帮助中心页
│   ├── lib/              # 工具函数
│   ├── sanity/           # Sanity CMS Schema（未启用）
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── functions/
│   └── api/              # Cloudflare Pages Functions（边缘函数）
│       ├── contact.js     # 联系表单 → Resend
│       ├── wholesale.js    # 批发询价 → Resend
│       └── admin/         # 后台管理 CRUD
├── public/
│   ├── images/            # 产品图片
│   ├── sitemap.xml        # SEO sitemap
│   ├── robots.txt         # SEO robots
│   └── admin.html         # Cloudflare Workers 后台（独立部署）
├── db/
│   ├── schema.sql         # D1 数据库 schema
│   └── migrations/        # 数据库迁移
├── wrangler.toml          # Cloudflare Workers 配置
└── next.config.ts         # Next.js 配置
```

## 🚀 页面列表

| 页面 | 路由 | 说明 |
|------|------|------|
| Home | `/` | Hero、分类、精选产品、使用场景、购买入口、Ideas 预览 |
| Products | `/products/` | 产品分类和精选产品（静态数据） |
| Product Detail | `/products/[slug]/` | 产品详情页 |
| Where to Buy | `/where-to-buy/` | Amazon + Temu 购买入口 |
| Ideas | `/ideas/` | 博客文章列表（静态数据） |
| Ideas Detail | `/ideas/[slug]/` | 博客文章详情 |
| About | `/about/` | 品牌故事 |
| Contact | `/contact/` | 联系表单（Resend 邮件） |
| Wholesale | `/wholesale/` | 批发询价表单 |
| Support | `/support/` | FAQ、发货、退货政策、订单追踪 |
| Privacy | `/privacy/` | 隐私政策 |
| Terms | `/terms/` | 服务条款 |

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.1.6 | 框架（App Router） |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 样式 |
| Framer Motion | 12.x | 动画 |
| Lucide React | 0.577.x | 图标 |
| @fontsource | 5.x | 字体（Outfit + Teko） |

## 🎨 品牌视觉系统

```css
/* globals.css 中的 CSS 变量 */
--background: #F4F1EA;   /* 暖白/米色背景 */
--foreground: #1A1A1A;   /* 深色文字 */
--accent: #DC2626;        /* 品牌红 */
```

- **主色调**: `#DC2626`（红）— 所有 accent/CTA 按钮
- **背景色**: `#F4F1EA`（暖白）— 全站背景
- **文字色**: `#1A1A1A`（近黑）— 正文
- **按钮圆角**: `rounded-sm`（2px）— 全部按钮，严控
- **字体**: Outfit（正文）+ Teko（H1/H2 大标题，全大写）

## 📦 安装和开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建静态站点（输出到 dist/）
npm run build

# lint 检查
npm run lint
```

## 🌐 部署

### Cloudflare Pages（当前方案）

1. 在 Cloudflare Dashboard 创建 Pages 项目，连接 GitHub 仓库
2. 构建配置：
   - **Framework preset**: Next.js（选择 Static Export）
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. 部署完成，每次 push 到 main 自动触发

### 目录结构说明

- `output: 'export'` 配置使 Next.js 输出纯静态 HTML
- 所有页面在构建时预渲染为静态文件
- 表单处理使用 Cloudflare Pages Functions（`functions/`）调用 Resend API
- `public/admin.html` 是独立 Cloudflare Workers 应用，部署在另一套 Workers 上

## 📝 内容管理

**当前状态：静态数据**
- 产品、分类、博客文章均为硬编码静态数据（`/app/products/page.tsx` 等文件内）
- `app/lib/sanity.ts` 包含完整的 Sanity.io 查询函数，但尚未接入

**未来扩展：Sanity CMS**
- `app/sanity/schemas.ts` 已定义完整 Schema：Product、Category、Idea、Platform、SiteSettings
- 如需动态内容，取消 `sanity.ts` 的注释并在页面中调用查询函数

## 🔒 后台管理系统

`public/admin.html` + Cloudflare D1/R2 提供独立后台：

- 产品管理（增删改查）
- 图片上传到 R2
- 分类管理
- 博客文章管理

详细配置见 [ADMIN_SETUP.md](./ADMIN_SETUP.md)

## 📄 License

© 2026 EYRYA. All rights reserved.
