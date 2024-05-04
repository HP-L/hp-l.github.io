---
title: 树莓派4B搭建java MC服务器
banner: /headimg/headimg/headimg_18.png
cover: /headimg/headimg/headimg_18.png
thumbnail: '/headimg/headimg/headimg_18.png'
index_img: '/headimg/headimg/headimg_18.png'
banner_img: /gallery/55.jpeg
date: 2022-06-08 12:07:05
tags: 
  - 树莓派
  - MC
categories: 应用
---

## Java 安装

安装java
```shell
sudo apt update
sudo apt install default-jdk
sudo apt install openjdk-8-jdk
sudo apt install openjdk-11-jdk
```
选择默认java版本，跟换成11

```shell
sudo update-alternatives --config java
```

## 服务器构建器下载及其安装

[下载链接](https://files.minecraftforge.net/net/minecraftforge/forge/index_1.18.2.html)

[所有版本](https://files.minecraftforge.net/net/minecraftforge/forge/)

点击下载

![1.png](1.png)

或者：

```
wget https://maven.minecraftforge.net/net/minecraftforge/forge/1.18.2-40.1.48/forge-1.18.2-40.1.48-installer.jar
```

安装

```
java -jar forge-1.18.2-40.1.48-installer.jar -install
```

会弹出图形界面，安装完成

## 运行服务器

cd 到安装目录，linux运行
```
./run.sh
```

配置eula.txt

```
eula=true
```