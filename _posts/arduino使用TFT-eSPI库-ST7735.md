---
title: arduino使用TFT_eSPI库(ST7735)
cover: /headimg/headimg/headimg_what.png
banner: /headimg/headimg/headimg_what.png
thumbnail: /headimg/headimg/headimg_what.png
index_img: /headimg/headimg/headimg_what.png
banner_img: /headimg/headimg/headimg_what.png
tags:
  - arduino
  - C++
categories:
  - 应用
date: 2024-03-14 08:21:56
---

## 环境配置
搜索下载TFT_eSPI库

进入文件夹`C:\Users\xx\Documents\Arduino\libraries\TFT_eSPI`，有文件`User_Setup.h`和`User_Setup_Select.h`

### User_Setup.h修改

1. 选择对应的液晶屏驱动芯片

![1.png](1.png)

2. 配置颜色显示顺序
ST7789芯片中MADCTL (36h)寄存器的第3位控制像素颜色顺序

![2.png](2.png)

3. 配置屏幕尺寸

![3.png](3.png)

4. 配置屏幕颜色模式

![4.png](4.png)

5. 定义Pin脚

![5.png](5.png)

6. 配置需要用到的字体（会占用单片机存储空间）

![6.png](6.png)

7. 配置SPI频率

![7.png](7.png)

### User_Setup_Select.h修改

![8.png](8.png)

## 写st7789.ino

```C++
#include <Arduino.h>
#include <ArduinoJson.h>
#include <TFT_eSPI.h>

void setup(void) {
  TFT_eSPI tft = TFT_eSPI();
  TFT_eSprite clk = TFT_eSprite(&tft);
  tft.init(ST7735_BLACK);
  tft.setRotation(1);
  tft.fillScreen(TFT_BLACK);
  tft.fillRect(tft.width() / 2, tft.height() / 2, 50, 50, TFT_RED);
}

void loop() {}


```

## 常用函数

> 参考链接：https://blog.csdn.net/finedayforu/article/details/108975245



<!-- 
Category：

理论：理论知识技能，技术
应用：应用笔记，实操
折腾：折腾折腾折腾折腾！(其实属于应用，但就是玩！)
方法：方法论（经验谈），如工程方法
工具：针对具体工具的介绍、使用方法、分析适用场景等；使用工具如何如何解决具体问题，应该放在「应用」里
作品：自己的作品（成品）、个人项目日志等
杂谈：生活碎碎念
自然科学：物理，化学，数学
其他：没法分类的东西

Tags

细分领域：机器之脉络(硬件),机器之魂魄(嵌入式软件,机器学习，算法等),机器之骨骼(结构),
形式：日志
具体内容：个人作品、方法论、随笔
语言：python C C# Java Html micropython 微信小程序
IDE：Arduino CUBEIDE Vscode
自然科学：代数 几何 概率 黑洞 白矮星 四维空间...
IC OR IDE : STM32 ESP32 ESP8266 C51 树莓派 RK3399 野火开发版 MIQI
模组：ws2812b
系统：Linux Windows macOS openwrt Docker   termux
游戏：MC
博客：hexo 主题 魔改
折腾系类：黑苹果，整服务器，termux

 -->


