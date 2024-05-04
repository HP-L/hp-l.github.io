---
title: DNS | github访问不了解决方法
banner: /headimg/headimg/headimg_what.png
cover: /headimg/headimg/headimg_what.png
thumbnail: '/headimg/headimg/headimg_what.png'
index_img: '/headimg/headimg/headimg_what.png'
banner_img: /gallery/55.jpeg
date: 2023-11-17 03:44:04
tags:
  - 方法论
categories: 应用
---

# DNS | github访问不了解决方法

常见速度慢的原因有以下几种可能：

* 网络本来速度慢(不太可能)
* DNS解析配置导致
* hosts域名ip解析配置导致
* 网络带宽过大(不常见)

将一下代码追加到host文件中

```
# github start
# Github Hosts
# Update 20210312
140.82.112.3 github.com
140.82.112.10 nodeload.github.com
140.82.114.6 api.github.com
13.229.189.0 codeload.github.com
185.199.110.133 raw.github.com
185.199.110.153 training.github.com
185.199.110.153 assets-cdn.github.com
185.199.110.153 documentcloud.github.com
185.199.110.154 help.github.com
185.199.110.153 githubstatus.com
199.232.69.194 github.global.ssl.fastly.net
185.199.110.133 raw.githubusercontent.com
185.199.110.133 cloud.githubusercontent.com
185.199.110.133 gist.githubusercontent.com
185.199.110.133 marketplace-screenshots.githubusercontent.com
185.199.110.133 repository-images.githubusercontent.com
185.199.110.133 user-images.githubusercontent.com
185.199.110.133 desktop.githubusercontent.com
185.199.110.133 avatars.githubusercontent.com
185.199.110.133 avatars0.githubusercontent.com
185.199.110.133 avatars1.githubusercontent.com
185.199.110.133 avatars2.githubusercontent.com
185.199.110.133 avatars3.githubusercontent.com
185.199.110.133 avatars4.githubusercontent.com
185.199.110.133 avatars5.githubusercontent.com
185.199.110.133 avatars6.githubusercontent.com
185.199.110.133 avatars7.githubusercontent.com
185.199.110.133 avatars8.githubusercontent.com
# End of the section
#192.30.255.112  github.com git 
#185.31.16.184 github.global.ssl.fastly.net
#140.82.114.4 github.com
#140.82.114.4 gist.github.com
#185.199.108.153 assets-cdn.github.com
#151.101.64.133 raw.githubusercontent.com
#151.101.108.133 gist.githubusercontent.com
#151.101.108.133 cloud.githubusercontent.com
#151.101.108.133 camo.githubusercontent.com
#151.101.108.133 avatars0.githubusercontent.com
#151.101.108.133 avatars1.githubusercontent.com
#151.101.108.133 avatars2.githubusercontent.com
#151.101.108.133 avatars3.githubusercontent.com
#151.101.108.133 avatars4.githubusercontent.com
#151.101.108.133 avatars5.githubusercontent.com
#151.101.108.133 avatars6.githubusercontent.com
#151.101.108.133 avatars7.githubusercontent.com
#151.101.108.133 avatars8.githubusercontent.com 
```