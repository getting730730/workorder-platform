# 工单简讯平台 - Vercel 部署版

## 部署步骤

### 1. 注册 GitHub 账号
访问 https://github.com 注册一个账号

### 2. 创建 GitHub 仓库
- 登录后，点击右上角 + → New repository
- 名字叫 `workorder-platform`
- 选 Public
- 点击 Create repository

### 3. 上传代码
- 在仓库页面，点击 "uploading an existing file"
- 把这个文件夹里的所有文件拖进去：
  - api/data.js
  - api/save.js
  - public/index.html
  - public/share.html
  - package.json
  - vercel.json
- 点击 Commit changes

### 4. 注册 Vercel 账号
- 访问 https://vercel.com
- 用 GitHub 账号登录

### 5. 创建 Vercel KV 数据库
- 登录 Vercel 后，进入 Storage 页面
- 点击 Create Database → KV
- 名字叫 `workorder-kv`
- 选择区域（建议选 Hong Kong）
- 点击 Create

### 6. 部署项目
- 在 Vercel 控制台，点击 Add New → Project
- 选择刚才创建的 GitHub 仓库 `workorder-platform`
- 点击 Import
- 在 Environment Variables 部分，把 KV 数据库关联到这个项目
- 点击 Deploy

### 7. 获取 URL
- 部署完成后，Vercel 会给你一个 URL，例如：
  `https://workorder-platform-xxx.vercel.app`

## 使用

1. 打开管理后台 URL
2. 上传 Excel 文件
3. 点击「保存并分享」
4. 复制分享链接
5. 发到企微群
