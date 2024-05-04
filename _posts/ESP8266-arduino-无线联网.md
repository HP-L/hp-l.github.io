---
title: ESP8266 arduino 无线联网
banner: /headimg/headimg/headimg_what.png
cover: /headimg/headimg/headimg_what.png
thumbnail: /headimg/headimg/headimg_what.png
index_img: /headimg/headimg/headimg_what.png
banner_img: /headimg/headimg/headimg_3.jpg
date: 2024-01-15 18:41:36
tags:
    - ESP8266
    - C++
    - arduino
categories: 应用
---

# ESP8266 WiFi 联网函数

## WiFi部分联网

```c++
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>

const char *ssid = "wifi_ssid";
const char *password = "wifi_password";

/**
 * 功能：Wifi连接
 * @param NONE
 * @return NONE
 * @example connectWifi();
 * @note NONE
 * @history
 * V0.0.1 2024-01-05 初始版本
 * */
void connectWifi() {
  // 开始连接wifi
  WiFi.begin(ssid, password);
  int num = 0;
  // 等待WiFi连接,连接成功打印IP
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
    num = num + 1;
    if (num > 9) {
      break;
    }
    strip.clear();  // 关闭所有灯
  }
  Serial.println("");
  Serial.println("WiFi Connected!");
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());
  if (WiFi.status() != WL_CONNECTED) {
    connectsoftAP();  // 无法连接 WiFi 打开 AP 模式
  }
}
```


## AP 部分

```c++
/**
 * 功能：AP连接
 * @param NONE
 * @return NONE
 * @example connectsoftAP();
 * @note NONE
 * @history
 * V0.0.1 2024-01-05 初始版本
 * */
void connectsoftAP() {
  // 设置内网
  IPAddress softLocal(192, 168, 128, 1);  // 1 设置内网WIFI IP地址
  IPAddress softGateway(192, 168, 128, 1);
  IPAddress softSubnet(255, 255, 255, 0);
  WiFi.softAPConfig(softLocal, softGateway, softSubnet);
  String apName = ("ESP8266_" + (String)ESP.getChipId());  // 2 设置WIFI名称
  const char* softAPName = apName.c_str();
  WiFi.softAP(softAPName, "adminadmin");  // 3创建wifi  名称 +密码 adminadmin  IPAddress myIP = WiFi.softAPIP();  // 4输出创建的WIFI IP地址
  Serial.print("AP IP address: ");
  Serial.println(WiFi.localIP());
  // ESP_IP = WiFi.localIP().toString();
  Serial.print("softAPName: ");  // 5输出WIFI 名称
  Serial.println(apName);
}
```