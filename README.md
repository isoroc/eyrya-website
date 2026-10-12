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
│   ├── robots.ts               # 构建时生成 robots.txt
│   ├── sitemap.ts              # 构建时生成 sitemap.xml（从 lib/ 派生 URL）
│   ├── products/              # 产品列表 + 分类页 + 详情页
│   ├── ideas/                  # 博客文章列表 + 分类页 + 详情页
│   ├── where-to-buy/           # 购买渠道页
│   ├── about/                  # 关于页
│   ├── contact/                # 联系页（表单 → Resend）
│   ├── wholesale/              # 批发询价页（表单 → Resend）
│   ├── support/                # 帮助中心页
│   ├── privacy/                # 隐私政策页
│   └── terms/                  # 服务条款页
│
├── lib/                        # 单一数据源（页面增删只改这里）
│   ├── products.ts            # 产品 / 分类 / 品牌数字
│   ├── posts.ts               # 博客文章（元数据 + 正文）
│   ├── faq.ts                 # 支持页 FAQ（可见内容与结构化数据共用）
│   └── db.js                  # D1 查询封装（仅后台 Functions 使用）
│
├── functions/                  # Cloudflare Pages Functions（边缘函数）
│   └── api/
│       ├── _shared.js         # CORS / JSON / 转义 / 邮件发送等公共逻辑
│       ├── contact.js          # 联系表单 → Resend（contact@eyrya.com）
│       ├── wholesale.js         # 批发询价 → Resend（wholesale@eyrya.com）
│       ├── support.js           # 支持表单 → Resend（support@eyrya.com）
│       └── admin/
│           ├── _middleware.js  # 鉴权 + CORS 守卫
│           ├── _auth.js        # 令牌校验（常量时间比较，未配置则 fail closed）
│           ├── products.js     # 产品 CRUD
│           ├── categories.js   # 分类 CRUD
│           └── upload.js       # 图片上传到 R2（魔数校验 + 大小上限）
│
├── public/
│   ├── images/                 # 产品图片
│   └── admin.html              # 后台管理界面（纯静态，调用 /api/admin/*）
│
├── db/
│   └── schema.sql              # D1 数据库 schema（唯一建表来源）
│
├── wrangler.toml               # Cloudflare Workers 配置（D1/R2 绑定）
└── next.config.ts              # Next.js 配置（output: 'export'）
```

> `sitemap.xml` 与 `robots.txt` 由 `app/sitemap.ts`、`app/robots.ts` 在构建时生成，不要再往 `public/` 手工添加。

## 页面列表

| 页面 | 路由 | 说明 |
|------|------|------|
| Home | `/` | Hero、分类、精选产品、使用场景、购买入口、Ideas 预览 |
| Products | `/products/` | 全部产品 + 分类入口 |
| Product Category | `/products/category/[slug]/` | 按分类筛选的产品列表 |
| Product Detail | `/products/[slug]/` | 产品详情页 |
| Where to Buy | `/where-to-buy/` | Amazon + Temu 购买入口 |
| Ideas | `/ideas/` | 博客文章列表 |
| Ideas Category | `/ideas/category/[slug]/` | 按分类筛选的文章列表 |
| Ideas Detail | `/ideas/[slug]/` | 博客文章详情 |
| About | `/about/` | 品牌故事 |
| Contact | `/contact/` | 联系表单（Resend 邮件） |
| Wholesale | `/wholesale/` | 批发询价表单（Resend 邮件） |
| Support | `/support/` | FAQ、发货、退货政策、订单追踪请求 |
| Privacy | `/privacy/` | 隐私政策 |
| Terms | `/terms/` | 服务条款 |

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16.1.6 | 框架（App Router，`output: 'export'`） |
| TypeScript | 类型安全 |
| Tailwind CSS 4.x | 样式 |
| @tailwindcss/typography | 文章正文排版（博客与法务页的 `prose` 样式） |
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
5. 配置环境变量与绑定：`ADMIN_TOKEN`、`IMAGES_CUSTOM_DOMAIN`、`RESEND_API_KEY`（可选 `CONTACT_EMAIL`、`WHOLESALE_EMAIL`、`SUPPORT_EMAIL`），以及 D1 `DB` / R2 `IMAGES_BUCKET` 绑定。完整清单见 `.env.example`
6. Push 到 main 分支自动触发部署

详细说明见 [DEPLOY.md](./DEPLOY.md)。

## 内容管理

**当前状态：静态数据，但只有一个来源**

产品、分类、品牌数字集中在 `lib/products.ts`；博客文章集中在 `lib/posts.ts`；支持页 FAQ 在 `lib/faq.ts`。页面组件只读取这些模块，不再各自硬编码。

改价格、评分、销量、平台链接、类目文案或文章，只改对应的 `lib/` 文件即可，首页 / 列表 / 分类页 / 详情页 / sitemap 会一起更新。

> 重要：不要在页面组件里重复写业务数字。历史上同一支产品的销量在首页写 1,247、在详情页写 50,000，评分同时存在 4.6 / 4.7 / 4.8 三个值——正是重复硬编码造成的。

## 后台管理

`public/admin.html`（纯静态 HTML）+ `functions/api/admin/*`（Cloudflare Pages Functions）+ D1/R2。

鉴权：所有 `/api/admin/*` 请求必须带 `Authorization: Bearer <ADMIN_TOKEN>`，由 `functions/api/admin/_middleware.js` 校验；未配置 `ADMIN_TOKEN` 时整个后台 API 返回 503。

功能：产品管理、分类管理、图片上传（到 R2）。博客文章管理尚未接入（前台文章为静态数据）。

详细配置见 [ADMIN_SETUP.md](./ADMIN_SETUP.md)。

## License

© 2026 EYRYA. All rights reserved.
