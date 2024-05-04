---
title: ESP32_物联网那些事
banner: /headimg/headimg/headimg_1.jpg
cover: /headimg/headimg/headimg_1.jpg
thumbnail: /headimg/headimg/headimg_1.jpg
index_img: /headimg/headimg/headimg_1.jpg
banner_img: /gallery/55.jpeg
tags:
  - ESP32
  - 机器之魂魄
categories: 应用
date: 2020-12-03 15:44:23
---

## ESP32\_物联网那些事

通过查阅资料，ESP32 是一款物联网模块，它支持 TCP/IP 协议，于是我们可以使用 socket 通讯，实现局域网通信，它也支持 MQTT 通讯，呵远程连接到阿里云。下面的链接有详细的使用说明。

[Socket 通信](http://www.1zlab.com/wiki/micropython-esp32/sockets/)

## 使用物联网第一步：烧录固件

这里提到的固件是micropython官方出的固件，我在网上还看到了不少通过C语言写.bin固件的教程，可以写自己需要的固件刷入到ESP32中

可以参考这篇文章

[ESP32_micropython固件烧录](https://hp-l.gitee.io/2020/11/05/ESP32-micropython%E5%9B%BA%E4%BB%B6%E7%83%A7%E5%BD%95/esp32-micropython%E5%9B%BA%E4%BB%B6%E7%83%A7%E5%BD%95/?t=1606983183242)

## 如何连接到 WiFi？

[Micropython联网同步时间](https://hp-l.gitee.io/2020/11/09/micropython%E8%81%94%E7%BD%91%E5%90%8C%E6%AD%A5%E6%97%B6%E9%97%B4/micropython%E8%81%94%E7%BD%91%E5%90%8C%E6%AD%A5%E6%97%B6%E9%97%B4/?t=1606983747012)

ESP32 是可以使用 REPL 的，REPL 就像局域网下的 VSCode，可以在浏览器上编写程序，可惜他不能开机自启，于是就有人开发了一款叫做 EMP 的 IDE ，下面有链接。

[EMP项目简介](http://www.1zlab.com/wiki/micropython-esp32/emp-project/
)

我在执行原文提供的代码时发现`set_boot_mode()`报错

原文提供的代码

```python
>>> from emp_boot import set_boot_mode
>>> set_boot_mode()

>>> from emp_boot import set_boot_mode
>>> set_boot_mode()
[0]  Boot with nothing
     attention: this option will clear up boot.py, careful!
[1]  Boot with wifi startup
       this mode will auto start wifi connect program.
[2]  Easy to develop
     this mode is for developers.In this mode you can develop much easier via EMP-         IDE(emp.1zlab.com)
Please input your choice [0-2]:
```


下面给出解决方案：

在 ESP32 的 boot.py 中所有代码替换成如下代码：

```python
from emp_wifi import Wifi
from emp_webrepl import WebREPL
from emp_utils import webrepl_pass
from emp_utils import post_ip
from machine import Pin # 引用LED使用
import time
wifi_LED = Pin(12, Pin.OUT, value=1) #定义LED
if __name__ == '__main__':
    Wifi.connect()
    post_ip(Wifi.ifconfig()[0][0])
    wifi_LED.value(0)
    time.sleep(0.5)
    wifi_LED.value(1)
#     WebREPL.start(password=webrepl_pass())
#     from emp_ide import *
'''
上面两行是调用emp_ide，取消注释就可以使用emp_ide，
这里注释掉的原因是想直接调用连接WiFi的函数不使用emp_ide
'''

```

在按复位即可，终端中会提示连接网络并且输入密码，连接过的 WiFi 会被记住，下次连接自动连，非常方便

## 利用 ESP32 联网实现一些小功能

我们可以通过 socket 通讯使得 PC 可以传输数据流到 ESP32 中，下面是代码，这里仿照的是[Socket 通信](http://www.1zlab.com/wiki/micropython-esp32/sockets/)文末的代码，原文中代码只能传输字节，下面代码可以传输中文字符，通过定义 IO 口可以实现局域网点亮 LED，甚至舵机。

### ESP32 TCP 服务端

```python
from machine import Timer,Pin,RTC #调用GPIO口调用定时器库
import socket
from emp_wifi import Wifi
import network
wifi = network.WLAN(network.STA_IF)
wifi.active(True)

# 远程连接传输命令函数
def connect_to_phone():
    try:
        # 注意：线连接到WiFi网络！
        # 如果未连接到网络，以下是连接到网络的代码
        # Wifi.connect()
        ip = Wifi.ifconfig()[0][0]   #获取IP地址
        listenSocket = socket.socket()   #创建套接字
        listenSocket.bind((ip, port))   #绑定地址和端口号
        listenSocket.listen(1)   #监听套接字, 最多允许一个连接
        listenSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)   #设置套接字
        print ('tcp waiting...')

        while True:
            print("accepting.....")
            conn, addr = listenSocket.accept()   #接收连接请求，返回收发数据的套接字对象和客户端地址
            print(addr, "connected")

            while True:
                data = conn.recv(1024)   #接收数据（1024字节大小）
                if(len(data) == 0):   #判断客户端是否断开连接
                    print("close socket")
                    conn.close()   #关闭套接字
                    break
    #             print(data)
                code_utf8 = bytes.decode(data)
                print(code_utf8)
                ret = conn.send(data)   #发送数据
                if code_utf8 == "led1 open":
                    B.value(0)
                if code_utf8 == "led2 open":
                    C.value(0)
                if code_utf8 == "led1 down":
                    B.value(1)
                if code_utf8 == "led2 down":
                    C.value(1)

    except:
        if(listenSocket):   #判断套接字是否为空
            listenSocket.close()   #关闭套接字

wifi_connect()
```

### PC 端

```python
# -*- coding: UTF-8 -*-
# PC TCP Client

import socket               # 导入 socket 模块

s = socket.socket()         # 创建 socket 对象
host = '192.168.2.231'      # esp32 ip
port = 10000                # 设置端口号

s.connect((host, port))

if __name__ == '__main__':
    while True:
        msg = raw_input('>>> ')
        s.send(msg)
```



