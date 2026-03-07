# 🚀 部署指南

我们支持两种部署方式：

**方案 A：Cloudflare Pages（推荐）** - 支持表单功能
**方案 B：GitHub Pages（简单）** - 纯静态，表单不可用

---

# 方案 A：Cloudflare Pages（支持表单）

## 1. 注册 Resend（邮件服务）

1. 访问 https://resend.com
2. 注册账号（可用 GitHub 登录）
3. 验证域名（添加 DNS 记录）
   - 或使用默认域名：`onboarding@resend.dev`
4. 创建 API Key：Dashboard → API Keys → Create API Key
   - 选择 `Sending access` 权限
   - 复制 API Key（以 `re_` 开头）

## 2. Cloudflare Pages 设置

### 2.1 创建项目

1. 访问 https://dash.cloudflare.com
2. 进入 Workers & Pages
3. 点击 "Create application" → "Pages" → "Connect to Git"
4. 授权 GitHub，选择 `eyrya-website` 仓库
5. 构建设置：
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### 2.2 设置环境变量

项目设置 → Environment variables 中添加：

```
RESEND_API_KEY = re_xxxxxxxxxxxxx
CONTACT_EMAIL = support@eyrya.com
```

### 2.3 部署

首次部署后，每次 push 到 main 分支会自动部署。

## 3. 自定义域名

1. Cloudflare Pages 项目 → Custom domains
2. 添加域名 `eyrya.com`
3. 按提示添加 DNS 记录（Cloudflare 会自动提供）
4. 等待 SSL 证书自动颁发

## 费用

- **Cloudflare Pages**: 免费（无限请求）
- **Resend**: 免费 100 封/天

---

# 方案 B：GitHub Pages（纯静态）

**注意：此方案下表单无法正常工作，仅作为静态展示。**

## 步骤 1：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名称填：`eyrya-website`
3. 选择 **Public**（公开）
4. 不要勾选 "Add a README"
5. 点击 **Create repository**

## 步骤 2：上传代码

```bash
cd eyrya-website
git remote add origin https://github.com/YOUR_USERNAME/eyrya-website.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## 步骤 3：启用 GitHub Pages

1. 打开 GitHub 仓库 → Settings → Pages
2. Source 选择 Deploy from a branch
3. Branch 选择 main，文件夹选 / (root)
4. 保存

## 步骤 4：绑定自定义域名

1. 在 Pages 设置中找到 Custom domain
2. 输入 `eyrya.com`
3. 在 Cloudflare DNS 添加记录：
   - CNAME `www` → `YOUR_USERNAME.github.io`
   - 或者 A 记录指向 GitHub Pages IP
4. 勾选 Enforce HTTPS

---

# 常见问题

**Q: 表单提交没反应？**  
A: GitHub Pages 不支持服务端功能，请使用 Cloudflare Pages。

**Q: 部署后样式丢失？**  
A: 检查 next.config.ts 中的 basePath 设置。

**Q: 邮件收不到？**  
A: 检查垃圾邮件箱，Resend 新账号可能需要审核。

**Q: 如何更新网站？**  
A: 修改代码后 push 到 GitHub，会自动重新部署。

```bash
git add .
git commit -m "Update website"
git push
```
