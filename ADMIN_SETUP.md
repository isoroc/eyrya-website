# 后台管理配置指南

## 架构说明

```
https://www.eyrya.com/admin.html   →  public/admin.html（纯静态）
                                     每个请求都带 Authorization: Bearer <ADMIN_TOKEN>

https://www.eyrya.com/api/admin/* →  functions/api/admin/*（Cloudflare Pages Functions）
                                     先经 _middleware.js 鉴权，再读写 D1、上传图片到 R2
```

`public/admin.html` 是纯静态 HTML，`functions/api/admin/*` 是 Cloudflare Pages Functions。两者都在同一个 Cloudflare Pages 项目下，无需独立 Workers 部署。

## 鉴权模型（重要）

`/api/admin/*` 由 `functions/api/admin/_middleware.js` 统一守卫：

- 唯一凭据是服务端环境变量 `ADMIN_TOKEN`，请求须带 `Authorization: Bearer <ADMIN_TOKEN>`。
- 用常量时间比较（`functions/api/_shared.js` 的 `timingSafeEqual`），避免时序侧信道。
- **未配置 `ADMIN_TOKEN` 时整个 Admin API 返回 503**（fail closed），不会退化成开放接口。
- 浏览器不再保存任何密码；`admin.html` 只保存你输入的那个 token（存 `sessionStorage`，关闭标签页即失效），并在登录时先调用一次 API 校验。

生成一个强 token：

```bash
openssl rand -base64 32
```

## 1. 创建 D1 数据库

```bash
npx wrangler d1 create eyrya-db
```

记下返回的 `database_id`，填入 `wrangler.toml`。

## 2. 创建 R2 Bucket（图片存储）

```bash
npx wrangler r2 bucket create eyrya-images
```

## 3. 配置 Cloudflare Pages 绑定与变量

在 Cloudflare Pages 项目 → Settings → **Functions runtime → Bindings** 添加：

| 类型 | 变量名 | 值 |
|------|--------|-----|
| D1 database | `DB` | `eyrya-db` |
| R2 bucket | `IMAGES_BUCKET` | `eyrya-images` |

在 Settings → **Environment variables** 添加：

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `ADMIN_TOKEN` | 是 | 后台令牌，见上文「鉴权模型」 |
| `IMAGES_CUSTOM_DOMAIN` | 是 | 对外提供 R2 图片的域名，例如 `images.eyrya.com`。缺失时上传接口返回 503 |
| `RESEND_API_KEY` | 是 | 三个公开表单发邮件用 |
| `CONTACT_EMAIL` / `WHOLESALE_EMAIL` / `SUPPORT_EMAIL` | 否 | 收件邮箱覆盖，默认 `support@` / `wholesale@` / `support@eyrya.com` |

> 绑定（Binding）与环境变量（Environment variable）是两类不同的配置。绑定在 Git 集成的 Pages 项目里必须通过面板配置，`wrangler.toml` 中的 `[[d1_databases]]` / `[[r2_buckets]]` 仅作为本地 `wrangler pages dev` 的参考。

## 4. 初始化数据库

```bash
npx wrangler d1 execute eyrya-db --file=./db/schema.sql
```

`db/schema.sql` 是唯一的建表来源。`db/migrations/` 下的历史迁移文件对已经用 schema.sql 建好的库不适用（其中的列已包含在 schema.sql 里），不要重复执行。

## 5. 部署

```bash
git add .
git commit -m "Configure admin"
git push
```

Cloudflare Pages 自动部署。

## 6. 访问后台

1. 打开 `https://www.eyrya.com/admin.html`
2. 在登录框粘贴 `ADMIN_TOKEN` 的值，点击 Sign in
3. 校验通过后 token 存入该标签页的 `sessionStorage`；关闭标签页或点击 Logout 即清除

## 功能

- 产品管理：增删改查、上传图片（存 R2）、设置价格/库存/分类、草稿/发布状态
- 分类管理：增删改查、调整排序
- 博客管理：界面预留，尚未接入（前台文章为静态数据）

## 安全提示

1. `ADMIN_TOKEN` 只存在 Cloudflare 环境变量与你的密码管理器里，不要写进仓库或前端代码。
2. 轮换方法：在面板更新 `ADMIN_TOKEN` 并重新部署，旧 token 立即失效。
3. 上传接口只接受 JPEG / PNG / GIF / WebP / AVIF，按文件头魔数（而非客户端声明的 Content-Type）判定，单文件上限 5 MB；不接受 SVG（同源 SVG 可执行脚本）。
4. 也可以在前面再套一层 Cloudflare Access，做双因素访问控制。
5. 定期备份 D1：`npx wrangler d1 export eyrya-db --output=./backup.sql`

## 费用

- D1: 免费 5GB 存储，10 万次查询/天
- R2: 免费 10GB 存储，100 万次操作/月
