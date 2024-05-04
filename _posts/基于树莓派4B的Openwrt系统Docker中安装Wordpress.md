---
title: 基于树莓派4B的Openwrt系统Docker中安装Wordpress
banner: /headimg/headimg/headimg_2.jpg
cover: /headimg/headimg/headimg_2.jpg
thumbnail: /headimg/headimg/headimg_2.jpg
index_img: /headimg/headimg/headimg_2.jpg
banner_img: /gallery/55.jpeg
date: 2022-03-25 14:26:19
tags:
  - openwrt
  - Docker
categories: 应用
---

# 确保OpenWrt安装了Docker

![1.png](./1.png)

# 在命令行键入以下命令以完成安装

```sh
docker run -d --name mariadb -p 3306:3306 -e MARIADB_ROOT_PASSWORD=meimima \
-e MARIADB_DATABASE=wordpress \
--restart=always \
mariadb:latest
```

```sh
docker run -d --name wordpress -p 8083:80 -e WORDPRESS_DB_PASSWORD=meimima \
-e WORDPRESS_DB_HOST=你的IP:3306 \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_NAME=wordpress \
-e WORDPRESS_TABLE_PREFIX=wp_ \
--restart=always \
wordpress
```

安装完成后会有以下提示

![2.png](./2.png)

根据提示完成用户名密码录入

# 修改上传文件限制

```sh
docker exec -it wordpress /bin/bash
```

## 进入容器后
安装vim
```sh
mv /etc/apt/sources.list /etc/apt/sources.list.bak

cat <<EOF >/etc/apt/sources.list
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
EOF
apt update
apt install vim
```


```sh
cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
vim /usr/local/etc/php/php.ini
```
搜索以下关键字

```vim
upload_max_filesize = 200M    #文件大小限制
post_max_size = 250M    #post大小限制
memory_limit = 500M        #内存占用限制
```

## 重启docker

```sh
docker restart wordpress
```