---
title: 如何加快hexo站点访问速度
banner: /headimg/headimg/headimg_what.png
cover: /headimg/headimg/headimg_what.png
thumbnail: /headimg/headimg/headimg_what.png
tags:
  - hexo
categories: [应用]
date: 2023-12-27 16:52:00
---

# 安装

```bash
npm install hexo-neat --save
```

博客根目录文件`_config.yml`文末添加如下

```yaml
# hexo-neat
# md博文压缩
neat_enable: true
# 压缩html（ejs，swig等也属于html格式片段）
neat_html:
  enable: true
  exclude:
# 压缩css  
neat_css:
  enable: true
  exclude:
# 压缩js
neat_js:
  enable: true
  mangle: true #打印日志
  output:
  compress:
  exclude: #排除文件
```

< (￣ˇ￣)/