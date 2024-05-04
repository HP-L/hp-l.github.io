---
title: arduino ESP8266点亮ws2812b
banner: /headimg/headimg/headimg_3.jpg
cover: /headimg/headimg/headimg_3.jpg
thumbnail: /headimg/headimg/headimg_3.jpg
index_img: /headimg/headimg/headimg_3.jpg
banner_img: /headimg/headimg/headimg_3.jpg
date: 2023-12-28 15:57:18
tags:
    - ESP8266
    - ws2812b
    - arduino
    - 机器之魂魄
categories: 应用
---

# 软件环境配置

在如图位置输入开发版管理地址
![1.png](./1.png)

```json
https://arduino.esp8266.com/stable/package_esp8266com_index.json
```

# 硬件连接

DIN 接 Nodemcu PIN D7

# 代码

## 彩虹灯

```c
#include <Adafruit_NeoPixel.h>
#define PIN D7  // pin on which the NeoPixels are connected
 
// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 8 //流水灯数量
 
// When we setup the NeoPixel library, we tell it how many pixels, and which pin to use to send signals.
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
 
// This is the 'setup' function. It runs once, when the Arduino is powered on or reset.
void setup()
{
  pixels.begin(); // This initializes the NeoPixel library.
}
 
// This is the 'loop' function. It runs over and over again, as long as the Arduino has power
void loop()
{
  
  rainbow(10);             // 彩虹灯

}

void rainbow(int wait) {
  // Hue of first pixel runs 5 complete loops through the color wheel.
  // Color wheel has a range of 65536 but it's OK if we roll over, so
  // just count from 0 to 5*65536. Adding 256 to firstPixelHue each time
  // means we'll make 5*65536/256 = 1280 passes through this loop:
  for(long firstPixelHue = 0; firstPixelHue < 5*65536; firstPixelHue += 256) {
    // strip.rainbow() can take a single argument (first pixel hue) or
    // optionally a few extras: number of rainbow repetitions (default 1),
    // saturation and value (brightness) (both 0-255, similar to the
    // ColorHSV() function, default 255), and a true/false flag for whether
    // to apply gamma correction to provide 'truer' colors (default true).
    pixels.rainbow(firstPixelHue);
    // Above line is equivalent to:
    // strip.rainbow(firstPixelHue, 1, 255, 255, true);
    pixels.show(); // Update strip with new contents
    delay(wait);  // Pause for a moment
  }
}

```

## 参考链接

https://www.sohu.com/a/153985016_796852