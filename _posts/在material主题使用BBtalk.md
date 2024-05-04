---
title: 在material主题使用BBtalk
banner: /headimg/headimg/headimg_10.png
cover: /headimg/headimg/headimg_10.png
thumbnail: /headimg/headimg/headimg_10.png
index_img: /headimg/headimg/headimg_10.png
banner_img: /gallery/55.jpeg
tags:
  - material
  - hexo
categories: 折腾
date: 2021-04-25 02:13:09
---


## 新建BBtalk页面

终端输入`hexo new page bb`

打开[BBtalk](https://bb.js.org/quick-start.html#cdn%E5%BC%95%E7%94%A8)文档

复制`CDN引用`下方的代码

```html
<!-- 存放哔哔的容器 -->
<div id="bbtalk"></div>
<!-- 引用 bbtalk -->
<script src="https://cdn.jsdelivr.net/npm/bbtalk@0.1.5/dist/bbtalk.min.js"></script>
<script>
bbtalk.init({
  appId: "Y5IDwC47czJFXXXXXXSlU44Y-MdYXbMMI",
  appKey: "qgrJ3nRwXXXXXXwwnVfj0uaQ",
  serverURLs: 'https://AppID前八位.api.lncldglobal.com'
})
</script>
```

![Code_1](./Code_1.png)

终端输入`hexo s`效果如下,圆点位置会有偏差：

![test_1](./test_1.png)


打开下方链接，复制js内容，在本地新建一个`bbtalk.min.js`。

https://hp-l.gitee.io/phone/bb/bbtalk.min.js

再将上文中的复制的`CDN引用`下方的代码 `https://cdn.jsdelivr.net/npm/bbtalk@0.1.5/dist/bbtalk.min.js` 改成 `./bbtalk.min.js`

即

```html
<!-- 存放哔哔的容器 -->
<div id="bbtalk"></div>
<!-- 引用 bbtalk -->

<script src="./bbtalk.min.js"></script>
<script>
bbtalk.init({
  appId: "Y5IDwC47czJFXXXXXXSlU44Y-MdYXbMMI",
  appKey: "qgrJ3nRwXXXXXXwwnVfj0uaQ",
  serverURLs: 'https://AppID前八位.api.lncldglobal.com'
})
</script>
```

效果如下，还需进一步调整。

![test_2.png](./test_2.png)
![test_3](test_3.jpg)


