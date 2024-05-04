---
title: smb文件共享设置
date: 2022-03-23 22:31:28
banner: /headimg/headimg/headimg_16.png
cover: /headimg/headimg/headimg_16.png
thumbnail: /headimg/headimg/headimg_16.png
index_img: /headimg/headimg/headimg_16.png
banner_img: /gallery/55.jpeg
tags:
  - linux
  - smb
categories: 应用
---

# linux服务器设置文件夹共享

vim /etc/samba/smb.conf

```conf
[Quark-Doc]
    path=/home/pi/Documents/Quark-Doc
    # 注意：path的值为你要共享的文件夹名称，此处我选择了根目录
    # 说明信息
    comment = NAS Storage
    # 可以访问的用户
   #  valid users = pi,root
    # 可被其他人看到资源名称（非内容）
    browseable = yes
    # 可写
    writable = yes
    public = yes
    # 新建文件的权限为 664
    create mask = 0664
    # 新建目录的权限为 775
    directory mask = 0775
```
保存后重启服务

```shell
sudo service smbd restart
```

# Window设置映射网络驱动器

![1.png](./1.png)

![2.png](./2.png)

输入服务器上的密码即可，我设置的是服务器root账户密码