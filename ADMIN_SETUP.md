# 后台管理配置指南

## 架构说明

```
https://www.eyrya.com/admin.html   →  public/admin.html（纯静态）
                                    调用 /api/admin/*

https://www.eyrya.com/api/admin/* →  functions/api/admin/*（Cloudflare Pages Functions）
                                    读写 D1 数据库、上传图片到 R2
```

`public/admin.html` 是纯静态 HTML，`functions/api/admin/*` 是 Cloudflare Pages Functions。两者都在同一个 Cloudflare Pages 项目下，无需独立 Workers 部署。

## 1. 创建 D1 数据库

```bash
npx wrangler d1 create eyrya-db
```

记下返回的 `database_id`。

## 2. 创建 R2 Bucket（图片存储）

```bash
npx wrangler r2 bucket create eyrya-images
```

记下返回的 `bucket_name`。

## 3. 配置 Cloudflare Pages 环境变量

在 Cloudflare Pages 项目设置 → Environment variables 中添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DB` | `eyrya-db` | D1 数据库名称 |
| `IMAGES_BUCKET` | `eyrya-images` | R2 Bucket 名称 |

> 这些变量供 `functions/api/admin/*` 中的 Pages Functions 使用。D1 和 R2 通过 Cloudflare Pages 的 D1 和 R2 集成直接绑定，不需要 wrangler.toml。

## 4. 初始化数据库

```bash
npx wrangler d1 execute eyrya-db --file=./db/schema.sql
```

## 5. 部署

```bash
git add .
git commit -m "Configure admin"
git push
```

Cloudflare Pages 自动部署。

## 6. 访问后台

`https://www.eyrya.com/admin.html`

**默认密码**：`eyrya2024`（部署后立即修改）

修改密码：编辑 `public/admin.html` 中的 `ADMIN_PASSWORD` 变量，然后重新部署。

## 功能

- 产品管理：增删改查、上传图片（存 R2）、设置价格/库存/分类、草稿/发布状态
- 分类管理：增删改查、调整排序
- 博客管理：界面预留，尚未完整接入

## 安全提示

1. 立即修改默认密码
2. 生产环境建议添加 Cloudflare Access 或其他访问控制
3. 定期备份 D1 数据库：`npx wrangler d1 export eyrya-db --output=./backup.sql`

## 费用

- D1: 免费 5GB 存储，10 万次查询/天
- R2: 免费 10GB 存储，100 万次操作/月
