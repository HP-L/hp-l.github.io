---
title: 记录一次MIQI RK3288 board折腾
banner: /headimg/headimg/MiQi_Board_Large.jpg
cover: /headimg/headimg/MiQi_Board_Large.jpg
thumbnail: /headimg/headimg/MiQi_Board_Large.jpg
index_img: /headimg/headimg/MiQi_Board_Large.jpg
banner_img: /headimg/headimg/MiQi_Board_Large.jpg
date: 2023-12-19 12:40:59
tags:
    - MIQI
    - KR3288
    - linux
categories: 应用
---

# 相关资料

链接

# 下载镜像

链接

# 烧录
步骤123
# 解决问题

## 无法更新

解决16.04无法升级软件问题，清空 `/etc/apt/apt.conf `

```shell
echo > /etc/apt/apt.conf
```

清空后成功升级，可是换源后又出现无法升级的问题

上网查询相关信息说需要安装`apt-transport-https`，但是我这里提示找不到相关包，
然后执行命令:

```shell
cd /usr/lib/apt/methods
ln -s http https
```

来骗一下apt，让它把http当成https。。。

成功update

## HDMI无法启动桌面

漫长更新后reboot，结果桌面无法启动。。。

再次上网求助，尝试过查找HDMI设备，等办法无用，最后想干脆远程桌面于是安装了x11vnc，reboot后HDMI奇迹般能使用了

编辑文件`/etc/X11/xorg.conf`

```conf
Section "Monitor"
        Identifier   "Monitor0"
        VendorName   "Monitor Vendor"
        ModelName    "Monitor Model"
        Modeline "1280x1024_60.00"  108.88  1280 1360 1496 1712  1024 1025 1028 1060  -HSync +Vsync
EndSection
```

```shell
sudo apt-get install x11vnc
```