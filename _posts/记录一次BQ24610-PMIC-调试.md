---
title: 记录一次BQ24610 PMIC 调试
cover: /headimg/headimg/headimg_32.png
banner: /headimg/headimg/headimg_32.png
thumbnail: /headimg/headimg/headimg_32.png
index_img: /headimg/headimg/headimg_32.png
banner_img: /headimg/headimg/headimg_32.png
tags:
  - bq24610
  - PMIC
  - 机器之脉络
categories:
  - 应用
date: 2024-04-27 23:35:24
poster: # 海报（可选，全图封面卡片）
  topic: # 标题上方的小字 # 可选
  headline: # 大标题 # 必选
  caption: # 标题下方的小字 # 可选
  color: # 标题颜色 # 可选
topic: id # 专栏 id
---


# 写在前面

最近想做一块移动充电板子，想着以后其他小制作能用得上，在选择PMIC的时候选中了BQ24610，不得不说这是颗PMIC真的坑啊啊啊啊！！第一版做出来后端系统电始终是2V，查了半天规格书没发现问题，结果找了一下TI的论坛才发现不止我一个人遇到，捣鼓捣鼓就有了下面这块板子，先上图！！！

{% swiper effect:cards width:max%}
![1.jpg](1.jpg)
![2.jpg](2.jpg)
![3.jpg](3.jpg)
![4.jpg](4.jpg)
{% endswiper %}

回板了

{% image 6.jpg 实物图 %}




# BQ24610

## 特性简介

> 参考链接：https://www.ti.com.cn/document-viewer/cn/bq24610/datasheet
> BQ2461x 1 节至 6 节电池的独立同步降压电池充电器控制器

## 特性

> 600kHz NMOS-NMOS 同步降压转换器
> 适用于锂离子或锂聚合物电池的独立充电器
> 工作输入范围为 5V 至 28V VCC，支持 1 节至 6 节电池 (BQ24610)
> 工作输入范围为 5V 至 24V VCC，支持 1 节至 5 节电池 (BQ24617)
> 充电电流和适配器电流高达 10A
> 自动选择适配器或电池作为系统电源
> 电池检测
> FET 提供反向输入保护
> 充电使能引脚
> 适用于同步降压转换器的 6V 栅极驱动
> 关闭状态电池放电电流 < 15µA
> 关闭状态输入静态电流 < 1.5mA

# 原理图 设计

原理图部分基本没什么大的问题有疑问可以去看我之前转载的文章

{% link /2024/04/09/zhuan_zai_bq24610_li_dian_chi_chong_dian_fang_an_pwm_zhi_liu_mai_chong_chong_dian BQ24610锂电池充电方案 PWM直流脉冲充电 /headimg/Planck.jpg true %}

{% image 4.png 原理图设计 download:4.png %}

# Layout 设计指导

以下来自TI官方论坛下载

## BQ24610, BQ24616, BQ24617, BQ24618, and BQ24630

下面有翻译

{% image 1.png Layout设计指导 download:1.png %}
{% image 2.png Layout设计指导 download:2.png %}
{% image 3.png Layout设计指导 download:3.png %}

### 指导方案：

> - 建议采用多层PCB。至少布置两层地面。BQ24610EVM使用4层PCB(顶层，两个信号层和底层)
> - 将输入电容尽可能靠近QH MOSFET的漏极和QL MOSFET的源极，并使用尽可能短的铜走线连接。这些部件应该放在PCB的同一层上，而不是在不同的层上，并且应该使用过孔来进行连接。
> - IC应放置在开关MOSFET栅极端子附近，以保持栅极驱动信号走线短，以实现干净的MOSFET驱动。IC可以放置在PCB的另一侧，与开关mosfet分开
> - 将电感输入端尽可能靠近开关MOSFET输出端。尽量减少该走线的铜面积，以降低电场和磁场辐射，但使走线足够宽以承载充电电流。不要使用多层并联进行此连接。最小化从该区域到任何其他走线或平面的寄生电容。
> - 充电电流感应电阻应该放在电感输出的右边。将穿过感测电阻连接的感测引线路由回同一层的IC，彼此靠近(最小化环路面积)，并且不要将感测引线路由通过大电流路径(参见开尔文连接BQ24610数据表的图27，以获得最佳电流精度)。将去耦电容放在IC旁边的这些走线上。
> - 将输出电容放置在感应电阻输出和接地旁边。在连接系统地之前，必须将输出电容接地连接在连接输入电容接地的同一根铜线上。
> - 模拟地与电源地分开走线，使用单一接地连接将充电器电源地绑在充电器模拟地上。在IC下方，使用倒铜作为模拟接地，但避免电源引脚，以减少电感和电容噪声耦合。使用热垫作为单地连接点，将模拟地和电源地连接在一起。或者使用0-Ω电阻将模拟地连接到电源地(在这种情况下，热垫应连接到模拟地)。强烈建议在热垫下方采用星形连接。
> - 将IC封装背面暴露的热垫焊到PCB接地上是至关重要的。确保IC的正下方有足够的热通孔，并与其他层的接平面相连。
> - 将去耦电容放置在IC引脚旁边，并使走线连接尽可能短。
> - 对于给定的电流路径，所有过孔的大小和数量必须足够。

## 错误layout布局

{% image 5.png 错误layout布局 download:5.png %}

上图箭头是电流方向，最重大的问题应该是在于精密电阻的焊盘下方的过孔，此国控会影响BQ24610侦测电压和电流，使得输出端只能到2V。

## 成功的第一版本layout布局

{% image 6.png 成功layout布局 download:6.png %}

上图是按照TI给的设计图基本完全照搬做的，输入18V成功打出18V系统电。

## 关于充电路径

{% image 7.png 充电路径layout布局 download:7.png %}

从系统电经过表层HL MOS 电感 精密电阻 输出，这里由于有电池电压反馈，默认不插入电池该路径关闭。

## 电池放电路径

{% image 8.png 放电路径layout布局 download:8.png %}

通过一个 NMos 输出到系统电。

## 自举电容

自举电容在BUCK中有关键作用

{% image 9.png 放电路径layout布局 download:9.png %}
{% image 10.png 放电路径layout布局 download:10.png %}

{% image 12.png 放电路径layout布局 download:12.png %}

> 原文翻译
> 特性描述(续)
> 上部装置总是有足够的电压保持完全接通。如果BTST引脚到PH引脚的电压低于4.2 V超过3个周期，则关闭高侧n沟道功率MOSFET，打开低侧n沟道功率MOSFET，将PH节点拉下并给BTST电容充电。然后，高侧驱动器返回到100%占空比工作，直到检测到(BTST- ph)电压再次下降，因为泄漏电流使BTST电容器放电低于4.2 V，并重新发出复位脉冲。
> 定频振荡器在输入电压、电池电压、充电电流和温度等各种条件下都能严格控制开关频率，简化了输出滤波器的设计，使其远离可听噪声区域。关于如何选择电感、电容和MOSFET，请参见应用和实现

另一款 BUCK IC MP1484（MPS家的）规格书中写到

{% image 11.png 放电路径layout布局 download:11.png %}

> 原文翻译
> 转换器使用内部n沟道MOSFET开关将输入电压降压到调节的输出电压。由于高侧MOSFET需要大于输入电压的栅极电压，因此需要连接在SW和BS之间的升压电容器来驱动高侧栅极。当SW低时，升压电容器从内部5V轨道充电。

## _还没写完.._

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


