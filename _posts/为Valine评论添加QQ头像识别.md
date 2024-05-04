---
title: 为Valine评论添加QQ头像识别
banner: /headimg/headimg/headimg_11.png
cover: /headimg/headimg/headimg_11.png
thumbnail: /headimg/headimg/headimg_11.png
index_img: /headimg/headimg/headimg_11.png
banner_img: /gallery/55.jpeg
tags:
  - hexo
categories: 折腾
date: 2021-04-26 14:06:28
---


## Valine

F12 查看源码

![bug_1.png](bug_1.png)

在主题文件夹查询 Valine.js 文件，如果没有 Valine 可以去这里复制下载[link](https://unpkg.com/valine@1.4.14/dist/Valine.min.js)

打开文件 Valine.js，`Ctrl + F`查询`img class="vimg"`，注意绿色框的代码，等下要修改的部分。

查到后修改

```js
'<img class="vimg" src="' +
  (T.cdn + (0, s.default)(t.get("mail")) + T.params) +
  '">';
```

修改为

```js
'<img class="vimg" src="' + qq_img + '">';
```

要添加的代码

```js
          //var qq_img = m.cdn + a(e.get("mail")) + m.params;
          var qq_img = T.cdn + (0, s.default)(t.get("mail")) + T.params;
          if (t.get("mail").indexOf("@qq.com") >= 0) {
            var prefix = t.get("mail").replace(/@.*/, "");//前缀
            var pattern = /^\d+$/g;  //正则表达式
            var result = prefix.match(pattern);//match 是匹配的意思
            if (result !== null) {
              qq_img = "//q1.qlogo.cn/g?b=qq&nk=" + prefix + "&s=100";
            }
          }

```

![code_1.png](code_1.png)

## 修改流程

流程：
1. 默认还是gravator头像接口
2. 判断是否是qq邮箱，提取前缀prefix
3. qq头像接口是qq号，如正则筛选剔除–重命名了带英文的qq邮箱
4. 拼接头像地址
5. 加入src显示！

参考博客链接：[https://blog.csdn.net/cungudafa/article/details/104638730]()



