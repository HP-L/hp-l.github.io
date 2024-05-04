---
title: ESP32_micropython固件烧录
banner: /headimg/headimg/headimg_2.png
cover: /headimg/headimg/headimg_2.png
thumbnail: /headimg/headimg/headimg_2.png
index_img: /headimg/headimg/headimg_2.png
banner_img: /gallery/55.jpeg
tags:
  - ESP32
  - micropython
  - 机器之魂魄
categories: 应用
date: 2020-11-05 09:40:23
---


## ESP32_micropython 固件烧录

### 烧录准备

1.micropython IDE：[Thonny](https://thonny.org/)

![thonny_download.png](./thonny_download.png)

2.ESP32 的 micropython 固件：[戳我进下载页面](https://www.micropython.org/download/esp32/)，micropython 还支持其他芯片[link](https://www.micropython.org/download/)，下载页面有很多固件选择，由于我的是不带 SPIRAM 的，因此我选择了第一个。

![micropython固件](./micropython固件.png)

3.烧录工具：
这里提供两种，esptool 在 GitHub 上有教程，这里就不细讲。

- esptool：[github link](https://github.com/espressif/esptool)
- Thonny: micropython IDE
- Flash 下载工具：[link](https://www.espressif.com/support/download/other-tools)

  ![烧录工具.png](./烧录工具.png)

4.ESP32 模组： 打开淘宝......

### 烧录过程

#### 使用 Thonny 烧录

点击工具栏运行，选择“选择解释器...”

![Thonny_烧录固件.png](./Thonny_烧录固件.png)
![Thonny_烧录固件1.png](./Thonny_烧录固件1.png)


选择我们在 Micropython 官网下载的固件后点击 install
这是从 ESP 官网上下载的启动模式方法：

![启动模式.png](./启动模式.png)
![启动模式1.png](./启动模式1.png)

即GPIO0和GPIO2全部接地，同时按下复位按键，保持1毫秒再断开GPIO0断开接地（因为 GPIO0 默认上拉），便开始下载。

#### 使用 Flash 下载工具

从官网下载了工具后双击打开，等待几秒后，点击 ESP32downloadTools，选择我们在 Micropython 官网下载的固件后点击 START

![flash_download.png](./flash_download.png)
![flash_download1.png](./flash_download1.png)

再按照上文中的启动方法启动即可下载。

成功之后 shell 会出现下图：

![SHELL.png](./SHELL.png)

像 python 一样可以实时输入，ESP32 可以直接看到 LED 灯被点亮



