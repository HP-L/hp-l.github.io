---
title: 基于树莓派4B的OpenWrt配置
banner: /headimg/headimg/headimg_15.webp
cover: /headimg/headimg/headimg_15.webp
thumbnail: "/headimg/headimg/headimg_15.webp"
index_img: "/headimg/headimg/headimg_15.webp"
banner_img: /gallery/55.jpeg
tags:
  - 树莓派
  - OpenWrt
categories: 应用
date: 2021-11-20 21:00:49
---


### 基于树莓派 4B 的 OpenWrt 配置

#### 制作这个 OpenWrt 的原因

想拥有一个高度自定义的路由器，于是网上一搜，大部分都是用 OpenWrt 做的，虽然费尽周折（官方烧进去后不知道怎么连通过 ssh 访问），最终找到一个非常不错的镜像文件，就是这个链接[Link](https://github.com/SuLingGG/OpenWrt-Rpi)。可以到 Releases 里面去找相应的固件下载。

#### 烧录镜像

烧录过程如下图

![图](1.png)
![图](2.png)
![图](3.png)
![图](4.png)
![图](5.png)

完成后将卡插入 tf 卡槽，启动树莓派

### 调试过程

#### 无线部分

注意：

1. 初次启动树莓派，频宽为 5GHz,一些年纪较大的电脑可能识别不了，要把频宽换成 2.4GHz。
2. 启动前向不用插入网线！！！

![图](6.png)
![图](7.png)

#### 接口设置

最初有三个接口(因为我的修改过，所以 Lan 口会有些不一样)

![图](8.png)

点解 Lan 口右侧的`修改`，选择`物理设置`，去除`eth0`的勾，点击`保存并应用`。

![图](9.png)

点击`返回至概况`，点击`添加新接口`， 名称随便写，做个标记而已，协议选择`DHCP客户端`，勾选`eth0`，点击`保存并应用`。

![图](10.png)
![图](11.png)

#### 防火墙设置

点击防火墙设置，改变以下选择项，框内全部选择接受！！！点击`保存并应用`。

![图](12.png)

进入 Wan 口防火墙，修改以下值，退出时点击`保存并应用`。

![图](13.png)
![图](14.png)
![图](15.png)

切换到转发端口页面，有如下几个接口，我们需要添加两条规则

![图](16.png)

1.  ip 上级路由器分配给树莓派的 ip 地址，点击最右侧的`添加`，再点击`保存并应用`。
    ![规则一](17.png)
2.  第二条规则先输入和第一条规则一样，点击最右侧的`添加`，点击`保存并应用`，再点击`修改`。

![规则二](18.png)

![规则二](19.png)

退出时点击`保存并应用`。

#### 完成！

可以导出配置，以免下次折腾的时候需要重新配置！
后续会写如何配置其他部分。

我们可以使用 ttyd 访问终端

![图](20.png)

可以通过`opkg`命令安装软件，就像 Ubuntu 的`apt`，不过这里不需要加`sudo`。
之前尝试安装`nmap`，但是会报错，这里给出一个解决办法

```shell
vim /etc/openclash/config/config.yaml
```

输入以下命令，`:wq`保存退出。

```shell
src/gz openwrt_nmap https://repo.turris.cz/omnia/packages/packages
```

更新一下。

```shell
opkg update
```

验证一下，输入`nmap -V`

```shell
# root @ OpenWrt in ~ [22:21:02] C:255
$ nmap -V
Nmap version 7.91 ( https://nmap.org )
Platform: aarch64-openwrt-linux-gnu
Compiled with: libz-1.2.11 libpcre-8.44 libpcap-1.10.1 nmap-libdnet-1.12 ipv6
Compiled without: liblua openssl libssh2
Available nsock engines: epoll poll select
```




