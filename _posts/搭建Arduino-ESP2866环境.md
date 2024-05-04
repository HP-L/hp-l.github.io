---
title: 搭建Arduino_ESP2866环境
banner: /headimg/headimg/headimg_4.png
cover: /headimg/headimg/headimg_4.png
thumbnail: /headimg/headimg/headimg_4.png
index_img: /headimg/headimg/headimg_4.png
banner_img: /gallery/55.jpeg
tags:
  - Arduino
  - C++
categories: 应用
date: 2020-11-21 08:03:45
---


## 下载 Arduino IDE

- [Arduino 官网](https://www.arduino.cc/)

- [Arduino IDE 1.8.13](https://downloads.arduino.cc/arduino-1.8.13-windows.zip)

下载完成后打开 arduino.exe
![打开arduino_IDE.png](./打开arduino_IDE.png)

## 添加 json 文件

打开首选项
![首选项.png](./首选项.png)
![管理器网址.png](./管理器网址.png)
在开发板管理器网址填入

```
https://arduino.esp8266.com/stable/package_esp8266com_index.json
```

或者

```
http://wechat.doit.am/package_esp8266com_index.json
```

在[GitHub 上的项目](https://github.com/esp8266/Arduino)里有最新的版本，但是需要科学上网所以选择第二个

## 添加 ESP8266 开发板

搜索栏键入 8266
![添加开发板.png](./添加开发板.png)
![查找开发板.png](./查找开发板.png)
如果出现下载失败可以从这里下载

- 如果安装过其他版本的 esp8266sdk，请先删除，再使用本安装包。

- 解压完成后，再打开 Arduino IDE，即可在 菜单栏>工具>开发板 中找到你使用的 esp8266 开发板。

来自 Arduino 中文社区的大佬

- https://share.weiyun.com/5CGEKJO

安装完成后重启 Arduino IDE 就会有显示了
![END.png](./END.png)


