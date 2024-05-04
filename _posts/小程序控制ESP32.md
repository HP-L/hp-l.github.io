---
title: 小程序局域网控制ESP32（物联网芯片）
banner: /headimg/headimg/headimg_7.png
cover: /headimg/headimg/headimg_7.png
thumbnail: /headimg/headimg/headimg_7.png
index_img: /headimg/headimg/headimg_7.png
banner_img: /gallery/55.jpeg
tags:
  - 微信小程序
  - ESP32
  - C
  - 机器之魂魄
categories: 应用
date: 2020-12-16 22:57:10
---

## 微信小程序

<!-- 代码Gitee仓库 -->

体验版二维码。
![体验版二维码](https://7.dusays.com/2020/12/16/46f7f2a73970e.jpg)
线上版二维码。
{% image ./wechar.jpg, width=200px, bg=#f4f4f4, alt=线上版二维码 %}
![jpg](./wechar.jpg)

https://gitee.com/HP-L/esp32_-we-char_-connect

## ESP32 代码


```python
from machine import Timer,Pin,RTC #调用GPIO口调用定时器库
import socket
from emp_wifi import Wifi
import time
import esp32
import usocket
# from machine import Pin, SPI, UART,I2C

# 爬虫使用库
import socket,re,sys,os
import urequests as request


hea = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36'}
rtc = RTC()

port = 10000  #端口号
listenSocket = None  #套接字

import network
wifi = network.WLAN(network.STA_IF)
wifi.active(True)

A = Pin(17, Pin.OUT, value=0)
B = Pin(12, Pin.OUT, value=1)
C = Pin(14, Pin.OUT, value=1)
D = Pin(27, Pin.OUT, value=1)
E = Pin(26, Pin.OUT, value=1)
F = Pin(25, Pin.OUT, value=1)
G = Pin(33, Pin.OUT, value=1)

# 爬时间
def get_time_pa():
    time_api_url = """http://quan.suning.com/getSysTime.do"""
    r = request.get(time_api_url, headers = hea)
    content = r.text
    print('爬取时间...')
    time = re.search(
        r'{"sysTime2":"(.*?)-(.*?)-(.*?) (.*?):(.*?):(.*?)","sysTime1":"', content
        )
    print(r.text[13:29])
    print(int(r.text[27:29]))
    print(int(r.text[23:26]))
    mm = int(r.text[27:29])# 分钟
    hh = int(r.text[23:26])# 小时
    rtc = RTC()
    time_date = rtc.datetime()
    print('重置时间！')
    rtc.datetime((time_date[0], time_date[1], time_date[2], time_date[3], hh, mm, time_date[6], time_date[7]))
    rtc.datetime()

#自动联网
def wifi_connect():
  wifi_led=Pin(12,Pin.OUT)             # 板载指示灯初始化    MODE1左边
  wlan = network.WLAN(network.STA_IF)  # 以工作站 (wlan) 模式运行，需要创建一个工作站Wi-Fi接口的实例
  wlan.active(True)                    # 在工作站对象上调用激活方法并以True作为输入值传递来激活网络接口
  start_time=time.time()               # 记录开始时间

  if not wlan.isconnected():              # 如果尚未联网成功
    print("当前无线未联网，正在连接中....")
#     wlan.connect("WiFi名称", "密码")   # 无线网SSID、密码，开始联网
    wlan.connect('','')   # 无线网SSID、密码，开始联网
    while not wlan.isconnected():         # 如果还未连接成功，则LED灯闪烁提示
      wifi_led.value(1)
      time.sleep_ms(1000)
      wifi_led.value(1)
      time.sleep_ms(1000)
      print("正在尝试连接到wifi....")
      print(time.time())
      if time.time()-start_time>15:       # 如果超过15秒还不行，就退出
        print("连接失败!!!无线网连接超过15秒，请检查无线网名称和密码是否正确..")
        break

  if wlan.isconnected():                  # 如果联接成功
    wifi_led.value(1)                     # LED灯常亮
    IP_info=wlan.ifconfig()
    print("##################################################")
    print("无线网已经连接，信息如下：")
    print("IP地址："+IP_info[0])
    print("子网掩码："+IP_info[1])
    print("网关："+IP_info[2])
    print("DNS："+IP_info[3])
    print("##################################################")
    get_time_pa()


# 获取芯片温度
# def wendu():
#     f = esp32.raw_temperature()
#     c = (f-32)/1.8
#     print(c)
#     oled.text("IC:" + str(int(c)),20,0)

# 远程连接传输命令函数
def connect_to_phone():
    try:
        ip = Wifi.ifconfig()[0][0]   #获取IP地址
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   #设置套接字
        sockaddr = socket.getaddrinfo(ip, port)
        print(sockaddr[0][4])
        s.bind(sockaddr[0][4])
        print ('tcp waiting...')
        while True:
            data, addr = s.recvfrom(1024)
            print('From %s %s' % addr)
            print('data is %s' % data)
            data_utf8 = bytes.decode(data)
            print(data_utf8)
            if data_utf8 == "led_1_on":
                B.value(0)
            if data_utf8 == "led_2_on":
                C.value(0)
            if data_utf8 == "led_1_off":
                B.value(1)
            if data_utf8 == "led_2_off":
                C.value(1)
            if data_utf8 == "led_3_on":
                D.value(0)
            if data_utf8 == "led_4_on":
                E.value(0)
            if data_utf8 == "led_3_off":
                D.value(1)
            if data_utf8 == "led_4_off":
                E.value(1)
            if data_utf8 == "led_5_on":
                F.value(0)
            if data_utf8 == "led_6_on":
                G.value(0)
            if data_utf8 == "led_5_off":
                F.value(1)
            if data_utf8 == "led_6_off":
                G.value(1)
    except:
        if(listenSocket):   #判断套接字是否为空
            listenSocket.close()   #关闭套接字

wifi_connect()
connect_to_phone()
```


本程序可连接 OLED1306 也可不连接 OLED1306，不会因为未连接显示屏报错。
可直接将 OLED1306 与 ESP32 连接，若不显示，原因可能是接线不稳，接触不良。
注意：本程序使用的时 I2C 通讯！！！硬件连接时，I2C必须接上高电平，下面程序是方便面包板使用者使用的程序。

```python
from machine import Timer,Pin,RTC #调用GPIO口调用定时器库
import socket
from emp_wifi import Wifi
import time
import esp32
import usocket

# 爬虫使用库
import socket,re,sys,os
import urequests as request

# 显示屏使用库
import machine, ssd1306, gfx

hea = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36'}
rtc = RTC()

port = 10000  #端口号
listenSocket = None  #套接字

import network

WIFI = Pin(17, Pin.OUT, value=0)
LED_1 = Pin(12, Pin.OUT, value=1)
LED_2 = Pin(14, Pin.OUT, value=1)
LED_3 = Pin(27, Pin.OUT, value=1)
LED_4 = Pin(26, Pin.OUT, value=1)
LED_5 = Pin(25, Pin.OUT, value=1)
LED_6 = Pin(33, Pin.OUT, value=1)
LED_7 = Pin(32, Pin.OUT, value=1)
L3 = Pin(13, Pin.OUT, value=1)


# 爬时间
def get_time_pa():
    time_api_url = """http://quan.suning.com/getSysTime.do"""
    r = request.get(time_api_url, headers = hea)
    content = r.text
    print('爬取时间...')
    time = re.search(
        r'{"sysTime2":"(.*?)-(.*?)-(.*?) (.*?):(.*?):(.*?)","sysTime1":"', content
        )
    print(r.text[13:29])
    print(int(r.text[27:29]))
    print(int(r.text[23:26]))
    mm = int(r.text[27:29])# 分钟
    hh = int(r.text[23:26])# 小时
    rtc = RTC()
    time_date = rtc.datetime()
    print('重置时间！')
    rtc.datetime((time_date[0], time_date[1], time_date[2], time_date[3], hh, mm, time_date[6], time_date[7]))
    rtc.datetime()

#自动联网
def wifi_connect():
  wifi_led=Pin(23,Pin.OUT)             # 板载指示灯初始化    MODE1左边
  wlan = network.WLAN(network.STA_IF)  # 以工作站 (wlan) 模式运行，需要创建一个工作站Wi-Fi接口的实例
  wlan.active(True)                    # 在工作站对象上调用激活方法并以True作为输入值传递来激活网络接口
  start_time=time.time()               # 记录开始时间

  if not wlan.isconnected():              # 如果尚未联网成功
    print("当前无线未联网，正在连接中....")
    wlan.connect('***','***')   # 无线网SSID、密码，开始联网
    while not wlan.isconnected():         # 如果还未连接成功，则LED灯闪烁提示
      wifi_led.value(0)
      time.sleep_ms(1000)
      wifi_led.value(0)
      time.sleep_ms(1000)
      print("正在尝试连接到wifi....")
      print(time.time())
      if time.time()-start_time>15:       # 如果超过15秒还不行，就退出
        print("连接失败!!!无线网连接超过15秒，请检查无线网名称和密码是否正确..")
        break

  if wlan.isconnected():                  # 如果联接成功
    wifi_led.value(0)                     # LED灯常亮
    IP_info=wlan.ifconfig()
    print("##################################################")
    print("无线网已经连接，信息如下：")
    print("IP地址："+IP_info[0])
    print("子网掩码："+IP_info[1])
    print("网关："+IP_info[2])
    print("DNS："+IP_info[3])
    print("##################################################")
#     get_time_pa()

oled_str1=''
oled_str2=''
oled_str3=''
oled_str4=''
oled_str5=''


def oled_process(str1,ip,oled,graphics):
#     i2c = machine.I2C(scl=machine.Pin(18), sda=machine.Pin(19))
#     oled = ssd1306.SSD1306_I2C(128 ,64 ,i2c)
#     graphics = gfx.GFX(128, 64, oled.pixel)
    global oled_str1
    global oled_str2
    global oled_str3
    global oled_str4
    global oled_str5
    oled_str1=oled_str2
    oled_str2=oled_str3
    oled_str3=oled_str4
    oled_str4=oled_str5
    oled_str5=str1
    oled.fill(0)
    graphics._slow_vline(0, 0, 64, 1)
    graphics._slow_vline(127, 0, 128, 1)
    graphics._slow_hline(0, 15, 128, 1)
    graphics._slow_hline(0, 16, 128, 1)
    graphics._slow_hline(0, 0, 128, 1)
    graphics._slow_hline(0, 63, 128, 1)
    oled.text("port:10000 & ip",0+2,0)
    oled.text(ip,0+2,8)
    oled.text(oled_str5,0+2,16+2)
    oled.text(oled_str4,0+2,24+2)
    oled.text(oled_str3,0+2,32+2)
    oled.text(oled_str2,0+2,40+2)
    oled.text(oled_str1,0+2,48+2)
    oled.show()


# 显示屏代码
def oled_try():
    try:
        i2c = machine.I2C(scl=machine.Pin(18), sda=machine.Pin(19))
        oled = ssd1306.SSD1306_I2C(128 ,64 ,i2c)
        graphics = gfx.GFX(128, 64, oled.pixel)
        print("get")
        connect_to_phone_oled(oled,graphics)
    except:
        print("false")
        connect_to_phone()

# 获取芯片温度
# def wendu():
#     f = esp32.raw_temperature()
#     c = (f-32)/1.8
#     print(c)
#     oled.text("IC:" + str(int(c)),20,0)

def connect_to_phone_oled(oled,graphics):
    try:
        ip = Wifi.ifconfig()[0][0]   #获取IP地址
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   #设置套接字
        sockaddr = socket.getaddrinfo(ip, port)
        print(sockaddr[0][4])
        s.bind(sockaddr[0][4])
        oled_process(sockaddr[0][4][0],sockaddr[0][4][0],oled,graphics)
        print("oled")
        print('tcp waiting...')
        while True:
            data, addr = s.recvfrom(1024)
            print('From %s %s' % addr)
            print('data is %s' % data)
            data_utf8 = bytes.decode(data)
            oled_process(data_utf8,sockaddr[0][4][0],oled,graphics)
            data_size = s.sendto(data, addr)
    #             print('From %s %s' % data_utf8)
    #             print('data is %s' % data_utf8)
            if data_utf8 == "led_1_on":
                LED_1.value(0)
#                 data_size = s.sendto("led_1_on", addr)
            if data_utf8 == "led_2_on":
                LED_2.value(0)
            if data_utf8 == "led_1_off":
                LED_1.value(1)
#                 data_size = s.sendto("led_1_off", addr)
            if data_utf8 == "led_2_off":
                LED_2.value(1)
            if data_utf8 == "led_3_on":
                LED_3.value(0)
            if data_utf8 == "led_4_on":
                LED_4.value(0)
            if data_utf8 == "led_3_off":
                LED_3.value(1)
            if data_utf8 == "led_4_off":
                LED_4.value(1)
            if data_utf8 == "led_5_on":
                LED_5.value(0)
            if data_utf8 == "led_6_on":
                LED_6.value(0)
            if data_utf8 == "led_5_off":
                LED_5.value(1)
            if data_utf8 == "led_6_off":
                LED_6.value(1)

            if data_utf8 == "led_7_on":
                LED_7.value(1)
            if data_utf8 == "led_7_off":
                LED_7.value(1)
    except:
        if(listenSocket):   #判断套接字是否为空
            listenSocket.close()   #关闭套接字



def connect_to_phone():
    try:
        ip = Wifi.ifconfig()[0][0]   #获取IP地址
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   #设置套接字
        sockaddr = socket.getaddrinfo(ip, port)
        print(sockaddr[0][4])
        s.bind(sockaddr[0][4])
        print ('tcp waiting...')
        while True:
            data, addr = s.recvfrom(1024)
            print('From %s %s' % addr)
            print('data is %s' % data)
            data_utf8 = bytes.decode(data)
#             print('From %s %s' % data_utf8)
#             print('data is %s' % data_utf8)
            data_size = s.sendto(data, addr)
            if data_utf8 == "led_1_on":
                LED_1.value(0)
            if data_utf8 == "led_2_on":
                LED_2.value(0)
            if data_utf8 == "led_1_off":
                LED_1.value(1)
            if data_utf8 == "led_2_off":
                LED_2.value(1)
            if data_utf8 == "led_3_on":
                LED_3.value(0)
            if data_utf8 == "led_4_on":
                LED_4.value(0)
            if data_utf8 == "led_3_off":
                LED_3.value(1)
            if data_utf8 == "led_4_off":
                LED_4.value(1)
            if data_utf8 == "led_5_on":
                LED_5.value(0)
            if data_utf8 == "led_6_on":
                LED_6.value(0)
            if data_utf8 == "led_5_off":
                LED_5.value(1)
            if data_utf8 == "led_6_off":
                LED_6.value(1)

            if data_utf8 == "led_7_on":
                LED_7.value(1)
            if data_utf8 == "led_7_off":
                LED_7.value(1)
    except:
        if(listenSocket):   #判断套接字是否为空
            listenSocket.close()   #关闭套接字

wifi_connect()
oled_try()
```


## 测试视屏

<iframe height=520 width=776  src="//player.bilibili.com/player.html?aid=798143285&bvid=BV1Ay4y1D7T9&cid=269108454&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="max-width: 100%, text-align: center" > </iframe>


