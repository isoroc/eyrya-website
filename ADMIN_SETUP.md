# 后台管理系统配置指南

## 1. 创建 D1 数据库

```bash
# 使用 Wrangler CLI
npx wrangler d1 create eyrya-db
```

记下返回的 database_id。

## 2. 创建 R2 Bucket（存储图片）

```bash
npx wrangler r2 bucket create eyrya-images
```

## 3. 更新 wrangler.toml

```toml
name = "eyrya-website"
compatibility_date = "2024-03-01"

# D1 数据库
[[d1_databases]]
binding = "DB"
database_name = "eyrya-db"
database_id = "YOUR_DATABASE_ID"

# R2 存储
[[r2_buckets]]
binding = "IMAGES_BUCKET"
bucket_name = "eyrya-images"
```

## 4. 初始化数据库

```bash
# 执行 schema 文件
npx wrangler d1 execute eyrya-db --file=./db/schema.sql
```

## 5. 设置环境变量

在 Cloudflare Pages 设置 → Environment variables：

```
# 可选：如果你有自定义域名用于图片
IMAGES_CUSTOM_DOMAIN = images.eyrya.com
```

## 6. 重新部署

推送代码触发自动部署：

```bash
git add .
git commit -m "Add admin panel and database"
git push
```

## 7. 访问后台

部署完成后访问：`https://eyrya.com/admin.html`

**默认密码**：`eyrya2024`（部署后立即修改！）

## 8. 修改管理员密码

编辑 `/public/admin.html` 中的 `ADMIN_PASSWORD` 变量：

```javascript
const ADMIN_PASSWORD = '你的新密码';
```

然后重新部署。

## 功能说明

### 产品管理
- 添加/编辑/删除产品
- 上传产品图片（自动存 R2）
- 设置价格、库存、分类
- 草稿/发布状态

### 分类管理
- 添加产品分类
- 调整分类排序

### 博客管理
- 创建博客文章
- 富文本编辑
- 封面图片

## 费用

- **D1**: 免费 5GB 存储，每天 10 万次查询
- **R2**: 免费 10GB 存储，每月 100 万次操作
- 对于小型电商完全够用

## 安全提示

1. **立即修改默认密码**
2. 生产环境建议添加更强的认证（如 Cloudflare Access）
3. 定期备份 D1 数据库

## 备份数据库

```bash
npx wrangler d1 export eyrya-db --output=./backup.sql
```
