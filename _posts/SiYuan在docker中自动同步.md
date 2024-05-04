---
title: SiYuan在docker中自动同步
banner: /headimg/headimg/headimg_20.png
cover: /headimg/headimg/headimg_20.png
thumbnail: '/headimg/headimg/headimg_20.png'
index_img: '/headimg/headimg/headimg_20.png'
banner_img: /gallery/55.jpeg
date: 2022-09-09 05:34:46
tags: siyuan
categories: 折腾
---

# 2022.09.09 Fri

# 如何同步思源笔记

## 工具

1. SiYuan Note
2. Docker
3. syncthing

## 如何解决

思源笔记软件本体不能同步，网上有一些教程是通过Onedrive同步的，但是需要账号，使用云端资源，于是便想到可以在本地搭建文件同步的服务用于解决笔记同步问题。

于是我上网寻找，最后找到了syncting

## 开始搭建

### 思源笔记
提示：您可以更改“/your/workspace/part”。 思源的数据存储在“/your/workspace/part”中。 我们稍后会使用它。

```bash
sudo docker run -v /your/workspace/part:/siyuan/workspace -p 6806:6806 -u 1000:1000 --restart=always b3log/siyuan --workspace=/siyuan/workspace/
```

### 搭建 syncthing

你可以根据你的情况改变 "~/docker_softsoftware_date/st-sync" 的内容

```bash
sudo docker run -d -p 8384:8384 -p 22000:22000 -v ~/docker_softsoftware_date/st-sync:/var/syncthing --restart=always syncthing/syncthing:latest
```

### Syncthing 设置.

#### Windows or Linux

##### 添加远程设备

复制设备 ID

![image](image-20220909173428-2pb8iw2.png)​

将设备 ID 粘贴到局域网上的其他设备中。

![image](image-20220909173836-jdgjywa.png)​

##### Add folder

![image](image-20220909174240-m8epauq.png)​

在不同的终端设备添加共享文件夹

添加思源数据文件"/your/workspace/part"

另一台设备添加路径，就像这样： "E:\usr\siyuan\Siyun"

#### Android

##### 操作很简单，基本和上面一样。下面是应用的截图。

![a8db527d00df11a1ce3d44f8ee0eee1](a8db527d00df11a1ce3d44f8ee0eee1-20220909194939-55qhm16.jpg)​