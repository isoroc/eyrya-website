# 🚀 部署到 GitHub Pages 指南

## 步骤 1：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名称填：`eyrya-website`（或你喜欢的名字）
3. 选择 **Public**（公开）
4. 不要勾选 "Add a README"
5. 点击 **Create repository**

## 步骤 2：上传代码到 GitHub

在终端运行以下命令：

```bash
cd eyrya-website

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/eyrya-website.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - EYRYA website"

# 推送到 GitHub
git push -u origin main
```

## 步骤 3：启用 GitHub Pages

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单选择 **Pages**
4. **Source** 选择 **GitHub Actions**
5. 保存设置

## 步骤 4：等待部署完成

1. 点击仓库顶部的 **Actions** 标签
2. 等待工作流运行完成（绿色 ✅ 表示成功）
3. 部署完成后，访问：`https://YOUR_USERNAME.github.io/eyrya-website/`

## 步骤 5：绑定自定义域名

### 方法 A：通过 GitHub 设置（推荐）

1. 在仓库的 **Settings > Pages** 页面
2. 找到 **Custom domain** 部分
3. 输入你的域名，例如：`www.eyrya.com`
4. 点击 **Save**
5. 勾选 **Enforce HTTPS**（推荐）

### 方法 B：手动配置 DNS

在你的域名服务商处添加 DNS 记录：

**如果使用 www 子域名：**
```
类型: CNAME
主机: www
值: YOUR_USERNAME.github.io
```

**如果使用根域名：**
```
类型: A
主机: @
值: 185.199.108.153

类型: A
主机: @
值: 185.199.109.153

类型: A
主机: @
值: 185.199.110.153

类型: A
主机: @
值: 185.199.111.153
```

### 创建 CNAME 文件

在你的仓库根目录创建 `CNAME` 文件（没有扩展名）：

```
www.eyrya.com
```

或者你的根域名：
```
eyrya.com
```

然后提交到 GitHub：
```bash
git add CNAME
git commit -m "Add custom domain"
git push
```

## 步骤 6：配置 Next.js（如果路径有问题）

如果你的仓库名不是 `USERNAME.github.io`，需要修改 `next.config.ts`：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // 如果仓库名是 eyrya-website，取消下面这行的注释：
  // basePath: '/eyrya-website',
  // assetPrefix: '/eyrya-website',
};

export default nextConfig;
```

## 常见问题

**Q: 部署后样式丢失？**  
A: 检查是否需要设置 `basePath` 和 `assetPrefix`

**Q: 自定义域名不生效？**  
A: DNS 传播需要时间（通常几分钟到48小时）。检查 GitHub Pages 设置页面的 DNS 检查状态。

**Q: HTTPS 证书问题？**  
A: 在 GitHub Pages 设置中取消勾选再重新勾选 "Enforce HTTPS"

## 更新网站

每次修改代码后，推送到 GitHub 会自动重新部署：

```bash
git add .
git commit -m "Update website"
git push
```

## 需要帮助的页面

- GitHub Pages 文档：https://docs.github.com/en/pages
- 自定义域名指南：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
