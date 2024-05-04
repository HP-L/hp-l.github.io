---
title: ESP8266 arduino http OTA
banner: /headimg/headimg/headimg_what.png
cover: /headimg/headimg/headimg_what.png
thumbnail: /headimg/headimg/headimg_what.png
index_img: /headimg/headimg/headimg_what.png
banner_img: /headimg/headimg/headimg_3.jpg
date: 2024-01-15 19:10:24
tags:
    - ESP8266
    - arduino
    - OTA
categories: 应用
---

ESP8266不仅可以通过IDE进行OTA，也可以通过具体网址进行OTA


```c++

#include <ESP8266httpUpdate.h>
// ESP8266HTTPUpdateServer httpUpdater;
WiFiClient UpdateClient;


/**
 * 功能：联网下载固件文件OTA
 * @param NONE
 * @return NONE
 * @example https_OTA();
 * @note NONE
 * @link https://zhuanlan.zhihu.com/p/435855807
 * @history
 * V0.0.1 2024-01-05 初始版本，未能实现功能
 * V0.0.1 2024-01-08 更新变量 UpdateClient，成功升级
 * */
void https_OTA() {
  while (1) {
    // 设置回调函数以获取下载进度
    ESPhttpUpdate.onProgress([](int progress, int total) {
      Serial.printf("Progress: %d%%\n", (progress * 100) / total);
      strip.setPixelColor(((progress / (total / 100))) - 1, (progress / (total / 100)) / 100 * 255 * brightness / 100, (255 - (progress / (total / 100)) / 100 * 255) * brightness / 100, (255 - (progress / (total / 100)) / 100 * 255) * brightness / 100);
      strip.show();
    });

    t_httpUpdate_return ret = ESPhttpUpdate.update(UpdateClient, "http://xxxxxxxx/beta_0_0_1.bin");
    // t_httpUpdate_return ESP8266HTTPUpdate::handleUpdate("http://hp-l.gitee.io/electronic_calendar_main/IoT/electronic.bin");
    switch (ret) {
      case HTTP_UPDATE_OK:
        Serial.println("Firmware updated successfully");
        break;
      case HTTP_UPDATE_FAILED:
        Serial.println("Firmware update failed");
        break;
      case HTTP_UPDATE_NO_UPDATES:
        Serial.println("No firmware updates available");
        break;
      default:
        Serial.printf("Firmware update error %d\n", ret);
        break;
    }
  }
}

```