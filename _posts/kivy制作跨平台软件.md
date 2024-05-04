---
title: kivy制作跨平台软件
cover: /headimg/headimg/headimg_9.jpeg
banner: /headimg/headimg/headimg_9.jpeg
thumbnail: /headimg/headimg/headimg_9.jpeg
index_img: /headimg/headimg/headimg_9.jpeg
banner_img: /headimg/headimg/headimg_9.jpeg
tags:
  - python
  - kivy
  - 多平台
categories:
  - 应用
date: 2024-04-24 13:12:51
---

# kivy相关链接

> https://kivy.org/
> https://cycleuser.gitbooks.io/kivy-guide-chinese/content/


# 编程环境

## Anaconda

下载链接
> https://docs.anaconda.com/free/anaconda/install/

## 建立工程文件夹

```shell
mkdir test
cd test
conda create -n kivy-study python=3.7
```

## 安装一些依赖

```shell
pip install kivy
pip install buildozer
pip install Cython
```

# 初始化文件夹
`buildozer init`
初始化生成配置文件`buildozer.spec`
![2.png](2.png)

# 打包apk

写一个 demo 文件

```py main.py
import kivy
from kivy.app import App
from kivy.uix.button import Button
class hellokivy(App) :
    def build(self):
        return Button(text="hellokivy")
if __name__=="__main__" :
    hellokivy().run()
```
> 时间十分漫长，一言难尽
buildozer -v android debug
成功将会出现 `# Android packaging done! # APK myapp-0.1-arm64-v8a_armeabi-v7a-debug.apk available in the bin directory`

![1.png](1.png)


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


