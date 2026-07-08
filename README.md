# 暖伴（NuanBan）

> 银发情感陪伴小程序 —— 为老年人提供温暖的陪伴服务预约平台。

---

## 项目简介

**暖伴** 是一款基于微信小程序开发的情感陪伴服务平台，聚焦银发群体的情感需求，连接专业陪伴人员与需要陪伴的老人，提供便捷、安全、温暖的陪伴服务预约体验。

---

## 功能模块

- **首页**：展示平台核心服务与推荐陪伴人员
- **陪伴人员列表**：浏览、筛选可预约的陪伴师
- **陪伴师详情**：查看个人资料、服务介绍、用户评价
- **预约服务**：选择服务时间、地点，提交预约订单
- **我的订单**：查看预约记录与订单状态
- **情感日记**：记录每日心情与陪伴点滴
- **个人中心**：管理个人信息与服务设置

---

## 技术栈

- **前端**：微信小程序原生开发（WXML / WXSS / JS / JSON）
- **后端**：微信云开发（CloudBase）
- **数据库**：云开发数据库
- **云函数**：Node.js

---

## 目录结构

```
暖伴/
├── app.js                 # 小程序入口逻辑
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 搜索索引配置
├── components/            # 公共组件
│   └── companion-card/    # 陪伴师卡片组件
├── pages/                 # 页面
│   ├── index/             # 首页
│   ├── companions/        # 陪伴师列表
│   ├── companion-detail/  # 陪伴师详情
│   ├── booking/           # 预约下单
│   ├── messages/          # 消息
│   ├── diary/             # 情感日记
│   └── profile/           # 个人中心
├── cloudfunctions/        # 云函数
│   ├── getCompanions/     # 获取陪伴师列表
│   ├── getCompanionDetail/# 获取陪伴师详情
│   ├── createBooking/     # 创建预约订单
│   ├── getMyBookings/     # 获取我的订单
│   ├── updateBookingStatus/# 更新订单状态
│   ├── saveDiary/         # 保存日记
│   └── getDiaryList/      # 获取日记列表
├── images/                # 图片资源
└── utils/                 # 工具函数
```

---

## 本地开发

### 环境要求

- 微信开发者工具（建议最新稳定版）
- 已注册微信小程序账号
- 已开通微信云开发环境

### 开始运行

1. 克隆仓库到本地：

   ```bash
   git clone https://github.com/wondacly/nuanban-wxapp.git
   ```

2. 使用**微信开发者工具**导入项目目录。

3. 在 `project.config.json` 中填写你的小程序 `appid`。

4. 在微信开发者工具中点击「云开发」，开通并绑定云开发环境。

5. 右键 `cloudfunctions/` 下的云函数文件夹，选择「创建并部署：云端安装依赖」，依次部署所有云函数。

6. 在云开发控制台数据库中创建所需集合（如 `companions`、`bookings`、`diaries` 等），并根据业务初始化数据。

7. 点击开发者工具「编译」，即可预览小程序。

---

## 部署说明

- 云函数修改后，需要重新右键部署到云端才能生效。
- 数据库权限建议按集合分别配置，保护用户隐私数据。
- 正式版本通过微信开发者工具「上传」功能提交审核。

---

## 注意事项

- `project.private.config.json` 为微信开发者工具本地私有配置，已加入 `.gitignore`，不会提交到仓库。
- 请勿将云开发环境 ID、AppID、密钥等敏感信息硬编码在代码中。

---

## 相关文档

- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

---

## License

MIT
