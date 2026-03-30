# EYRYA Website

品牌展示网站，销售引导落地页。驱动流量到 Amazon 和 Temu。

## 网站目标

建立品牌信任、展示产品、引导用户到 Amazon 和 Temu 完成购买。

## 项目结构

```
eyrya-website/
├── app/                        # Next.js App Router（前台网站）
│   ├── page.tsx                # 首页
│   ├── layout.tsx              # 根布局
│   ├── globals.css             # 全局样式
│   ├── products/              # 产品列表 + 详情页
│   ├── ideas/                  # 博客文章列表 + 详情页
│   ├── where-to-buy/           # 购买渠道页
│   ├── about/                  # 关于页
│   ├── contact/                # 联系页（表单 → Resend）
│   ├── wholesale/              # 批发询价页（表单 → Resend）
│   ├── support/                # 帮助中心页
│   ├── privacy/                # 隐私政策页
│   ├── terms/                  # 服务条款页
│   ├── lib/                    # 工具函数（含 Sanity 查询函数，未启用）
│   └── sanity/                 # Sanity CMS Schema（未启用）
│
├── functions/                  # Cloudflare Pages Functions（边缘函数）
│   └── api/
│       ├── contact.js          # 联系表单 → Resend（contact@eyrya.com）
│       ├── wholesale.js         # 批发询价 → Resend（wholesale@eyrya.com）
│       ├── support.js           # 支持表单 → Resend（support@eyrya.com）
│       └── admin/
│           ├── products.js     # 产品 CRUD
│           ├── categories.js  # 分类 CRUD
│           └── upload.js       # 图片上传到 R2
│
├── public/
│   ├── images/                 # 产品图片
│   ├── sitemap.xml             # SEO sitemap
│   ├── robots.txt              # SEO robots
│   └── admin.html              # 后台管理界面（纯静态，调用 /api/admin/*）
│
├── db/
│   └── schema.sql              # D1 数据库 schema
│
├── wrangler.toml               # Cloudflare Workers 配置（D1/R2 绑定）
└── next.config.ts              # Next.js 配置（output: 'export'）
```

## 页面列表

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
| Wholesale | `/wholesale/` | 批发询价表单（Resend 邮件） |
| Support | `/support/` | FAQ、发货、退货政策、订单追踪 |
| Privacy | `/privacy/` | 隐私政策 |
| Terms | `/terms/` | 服务条款 |

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16.1.6 | 框架（App Router，`output: 'export'`） |
| TypeScript | 类型安全 |
| Tailwind CSS 4.x | 样式 |
| Framer Motion 12.x | 动画 |
| Lucide React 0.577.x | 图标 |
| @fontsource | 字体（Outfit 正文 + Teko 大标题） |

## 品牌视觉

| 元素 | 色值 |
|------|------|
| 背景色 | `#F4F1EA`（暖白） |
| 文字色 | `#1A1A1A`（近黑） |
| 强调色 | `#DC2626`（品牌红） |
| 按钮圆角 | `rounded-sm`（2px），禁止更大 |
| 正文字体 | Outfit |
| 标题字体 | Teko（全大写） |

## 安装和开发

```bash
npm install
npm run dev      # 开发模式
npm run build    # 构建静态站点（输出到 dist/）
npm run lint     # lint 检查
```

## 部署

### Cloudflare Pages

1. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git
2. 选择 `eyrya-website` 仓库
3. 构建配置：Framework preset = Next.js，Build command = `npm run build`，Build output directory = `dist`
4. 添加自定义域名 `eyrya.com`
5. 设置环境变量：`RESEND_API_KEY`、`CONTACT_EMAIL`、`WHOLESALE_EMAIL`、`SUPPORT_EMAIL`
6. Push 到 main 分支自动触发部署

详细说明见 [DEPLOY.md](./DEPLOY.md)。

## 内容管理

**当前状态：静态数据**

产品、分类、博客文章均为硬编码静态数据（`/app/products/page.tsx` 等文件内）。

`app/lib/sanity.ts` 包含完整的 Sanity.io 查询函数，但尚未启用。

**未来扩展（Sanity CMS）**

`app/sanity/schemas.ts` 已定义完整 Schema：Product、Category、Idea、Platform、SiteSettings。如需动态内容，取消 `sanity.ts` 的注释并在页面中调用查询函数。

## 后台管理

`public/admin.html`（纯静态 HTML）+ `functions/api/admin/*`（Cloudflare Pages Functions）+ D1/R2。

功能：产品管理、分类管理、图片上传（到 R2）、博客文章管理。

详细配置见 [ADMIN_SETUP.md](./ADMIN_SETUP.md)。

## License

© 2026 EYRYA. All rights reserved.
