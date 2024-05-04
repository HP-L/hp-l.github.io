---
title: Micropython联网同步时间
banner: /headimg/headimg/headimg_3.png
cover: /headimg/headimg/headimg_3.png
thumbnail: /headimg/headimg/headimg_3.png
index_img: /headimg/headimg/headimg_3.png
banner_img: /gallery/55.jpeg
tags:
  - micropython
  - ESP32
categories: 应用

date: 2020-11-09 07:41:14
---


ntp 服务器可以自己选择，可以使用爬虫爬去时间也可以用 NTP 服务器同步，将 wifi_connect()函数最后一行 get_time_py 换成 get_time()即可
直接上程序

```python
# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()

#使用ESP32上的MicroPython連接Wi-Fi網絡
from machine import Pin,RTC
import network    #網絡模塊
import time       #計時器模塊
import ntptime    #ntptime網絡時間協議模塊

#自动联网
def wifi_connect():
  wifi_led=Pin(18,Pin.OUT)             # 初始化LED燈，可自定義
  wlan = network.WLAN(network.STA_IF)  #
  wlan.active(True)                    # 激活網絡接口
  start_time=time.time()               # 記錄開始時間

  if not wlan.isconnected():              # 如若聯網失敗
    print("当前无线未联网，正在连接中....")
    # wlan.connect("此处改为你的无线网名称", "无线网密码")
    wlan.connect('XXXXXXXX','XXXXXXXX')   # 無綫網SSID、密碼
    while not wlan.isconnected():         # 如若還未連接成功，LED則會以閃爍的方式提示未連接到WIFI
      wifi_led.value(0)
      time.sleep_ms(1000)       # 延時函數1000毫秒
      wifi_led.value(1)
      time.sleep_ms(1000)
      print("正在尝试连接到wifi....")
      print(time.time())

      if time.time()-start_time>15:       # 如若超過15秒還未連接則退出鏈接
        print("連接失敗!!!請檢查無綫網名稱和密碼是否正確...")
        break

  if wlan.isconnected():                  # 如若連接成功
    wifi_led.value(1)                     # LED燈常亮
    IP_info=wlan.ifconfig()
    print("##################################################")
    print("已連接WIFI，信息如下：")
    print("IP地址："+IP_info[0])
    print("子網掩碼："+IP_info[1])
    print("網関："+IP_info[2])
    print("DNS："+IP_info[3])
    print("##################################################")
    get_time_py()

#同步時間
def get_time():
    print("同步時間")
    print()
    print("同步前本地時間：%s" %str(time.localtime()))
    print("##")
    ntptime.NTP_DELTA = 3155644800    # 設置  UTC+8偏移時間（秒），不不設置就是UTC0
#     ntptime.host = 'pool.ntp.org'  # 可選ntp服務器為阿里雲服務器，默認是"pool.ntp.org"
    ntptime.host = 'edu.ntp.org.cn'
#     ntptime.host = '210.72.145.44' # 國家授時中心服務器IP地址
#     ntptime.host = 'ntp1.aliyun.com'
#     ntptime.host = 'cn.ntp.org.cn'
    ntptime.settime()                 # 修改設備時間
    print("同步后本地時間：%s" %str(time.localtime()))
    print("##################################################")
    rtc = RTC()
    print(rtc.datetime())

# 爬取時間
def get_time_py():
    time_api_url = """http://quan.suning.com/getSysTime.do"""
    r = request.get(time_api_url)
    content = r.text
    print('爬取時間...')
    time = re.search(
        r'{"sysTime2":"(.*?)-(.*?)-(.*?) (.*?):(.*?):(.*?)","sysTime1":"', content
        )
    print(r.text[13:29])
    print(int(r.text[27:29]))
    print(int(r.text[23:26]))
    mm = int(r.text[27:29])# 分鐘
    hh = int(r.text[23:26])# 小時
    rtc = RTC()
    time_date = rtc.datetime()
    print('重置時間！')
    rtc.datetime((time_date[0], time_date[1], time_date[2], time_date[3], hh, mm, time_date[6], time_date[7]))
    rtc.datetime()

#開始執行聯網
wifi_connect()

```