---
title: ESP8266 arduino OTA
banner: /headimg/headimg/headimg_what.png
cover: /headimg/headimg/headimg_what.png
thumbnail: /headimg/headimg/headimg_what.png
index_img: /headimg/headimg/headimg_what.png
banner_img: /headimg/headimg/headimg_3.jpg
date: 2024-01-15 19:02:46
tags:
    - ESP8266
    - arduino
    - OTA
categories: 应用
---

联网成功后可以通过IDE进行OTA升级，代码如下

```c++


#include <ArduinoOTA.h>

/**
 * 功能：OTA初始化
 * @param NONE
 * @return NONE
 * @example arduino_8266_OTA();
 * @note NONE
 * @history
 * V0.0.1 2024-01-05 初始版本
 * */
void arduino_8266_OTA() {
  // OTA设置并启动
  // ArduinoOTA.setHostname("ESP8266");
  // ArduinoOTA.setPassword("12345678");
  ArduinoOTA.begin();
  Serial.println("OTA ready");
  ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH) {
      type = "sketch";
    } else {  // U_FS
      type = "filesystem";
    }
    Serial.println("Start updating " + type);
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));

    // strip.setPixelColor((progress / (total / 100)) - 1, 1, 0, 1);
    strip.setPixelColor(((progress / (total / 100))) - 1, (progress / (total / 100)) / 100 * 255 * brightness / 100, (255 - (progress / (total / 100)) / 100 * 255) * brightness / 100, (255 - (progress / (total / 100)) / 100 * 255) * brightness / 100);
    strip.show();
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("OTA更新发生错误[%u]: ", error);
    if (error == OTA_AUTH_ERROR) {
      Serial.println("认证失败");
    } else if (error == OTA_BEGIN_ERROR) {
      Serial.println("开始失败");
    } else if (error == OTA_CONNECT_ERROR) {
      Serial.println("连接失败");
    } else if (error == OTA_RECEIVE_ERROR) {
      Serial.println("接收失败");
    } else if (error == OTA_END_ERROR) {
      Serial.println("结束失败");
    }
    // 复位设备
    ESP.restart();
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("OTA更新结束");
    strip.clear();  // 关闭所有灯
  });
}
```


以上代码中`brightness`是led的亮度，范围是`1`~`100`，setPixelColor可以参考点亮ws2812的文章