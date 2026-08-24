---
title: 如何编写 V2 内容
---

# 如何编写 V2 内容

V2 的内容暂时为空白。准备新增章节时，直接在 `docs/v2/` 下创建 Markdown 文件即可。

## 新增页面

例如创建 `docs/v2/first-lesson.md`：

```markdown
---
title: 第一课
---

# 第一课

在这里编写正文。
```

然后在 `docs/v2/_meta.json` 中加入页面：

```json
[
  { "type": "file", "name": "index", "label": "V2 首页" },
  { "type": "file", "name": "how-to-write", "label": "如何编写 V2 内容" },
  { "type": "file", "name": "first-lesson", "label": "第一课" }
]
```

页面文件名使用小写英文和连字符。由于项目保留 `.html` 路由，`first-lesson.md` 发布后的地址是 `/v2/first-lesson.html`。

## 本地预览

```bash
npm run dev
```

构建生产文件：

```bash
npm run build
```

新增章节后，同时检查首页链接和 `_meta.json` 的导航顺序。
