---
title: SPI通讯协议
banner: /headimg/headimg/headimg_17.png
cover: /headimg/headimg/headimg_17.png
thumbnail: "/headimg/headimg/headimg_17.png"
index_img: "/headimg/headimg/headimg_17.png"
banner_img: /gallery/55.jpeg
tags:
  - SPI
  - 机器之脉络
categories: 理论
date: 2021-10-09 07:36:57
---


显示屏 TFT-LCD 信号接口有 SPI、MCU、RGB、LVDS、MIPI、eDP、HDMI 等等多种类型。其中就包括 SPI 协议，SPI 协议还有其他用途，**FLASHRAM**、**网络控制器**、**LCD 显示驱动器**、**A/D 转换器**和**MCU**等。

## SPI 协议

### 通信原理

需要至少 3 根线，分别是 SDI（数据输入）、SDO（数据输出）、SCLK（时钟）、CS（片选）

1. SDI – SerialData In,串行数据输入
2. SDO – SerialDataOut,串行数据输出
3. SCLK – Serial Clock,时钟信号，由主设备产生
4. CS – Chip Select,从设备使能信号，由主设备控制

**CS**是**从芯片**是否被**主芯片**选中的控制信号，也就是说只有**片选信号**为预先规定的**使能信号**时（高电位或低电位），主芯片对此从芯片的操作**才有效**。这就使在同一条总线上**连接多个 SPI 设备**成为可能。

### SPI 接口

SPI 接口是在 CPU 和外围低速器件之间进行**同步串行**数据传输，在**主器件**的移位脉冲下，数据按位传输，**高**位在**前**，**低**位在**后**，为全双工通信，数据传输速度总体来说比**I2C**总线要**快**，速度可达到几 Mbps。

特点：信号线少，协议简单，相对数据速率高。

1. MOSI – 主器件数据输出，从器件数据输入

2. MISO – 主器件数据输入，从器件数据输出

3. SCLK –时钟信号，由主器件产生,最大为 fPCLK/2，从模式频率最大为 fCPU/2

4. NSS – 从器件使能信号，由主器件控制,有的 IC 会标注为 CS(Chip select)

**#未完待续#**

