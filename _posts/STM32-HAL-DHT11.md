---
title: STM32 HAL DHT11
cover: /headimg/headimg/headimg_6.jpg
banner: /headimg/headimg/headimg_6.jpg
thumbnail: /headimg/headimg/headimg_6.jpg
index_img: /headimg/headimg/headimg_6.jpg
banner_img: /headimg/headimg/headimg_6.jpg
tags:
  - dht11
  - stm32
  - cubeide
categories:
  - 应用
date: 2024-03-22 20:12:32
---

# 记录一次CUBEIDE的DHT11代码调试

> 文末有贴代码，亲测可用

## STM32CUBEIDE

首先本文是基于STM32官方出品的CUBEIDE进行代码编写和调试的

![1.png](1.png)

## 环境搭建

官网下载之后安转完成（软件安装后可能需要登录才可以下载相关库文件）

新建工程网上已经有很多博主写了，直接略过。关于DHT11除了一些基本配置（如外部晶振、调试接口等）需要使用的一些配置如下图：

注意生成代码记得勾选`Generate peripheral initialization as a pair of'.c/.h' files per peripheral`

![9.png](9.png)

### Tim配置

本文选择`Tim3`，配置如图：

![2.png](2.png)

### USART配置

本文选择`Uart3`，配置如图：

![4.png](4.png)

![3.png](3.png)

### GPIO配置

本文选择`GPIOB12`，配置如图：

![5.png](5.png)

## 配置完成保存生成代码

手动添加代码如下

导入h文件，添加变量

![6.png](6.png)

打开串口中断初始化DHT11

![7.png](7.png)

获取DHT11数据以及数据类型转换和串口发送

![8.png](8.png)

下图可以看出获取到的温度数据
![10.png](10.png)

## 程序集合

### 需要修改项

1. 在文件`dht11.h`搜索`#define DHT11_DATA_OUT_Pin GPIO_PIN_12`、`#define DHT11_DATA_OUT_GPIO_Port GPIOA`换成自己定义的GPIO。
2. 在文件`dht11.c`搜索`htim3`，换成自己想要的定时器。
3. `main.c` 函数中需要先定义初始化`dht11`，之后进行读温度湿度、注意`DHT11`是`5V`供电
4. 如需添加串口中断函数可以直接添加在`main.c`中的`/* USER CODE BEGIN 4 */`位置


### DHT11.c

```c
#include "DHT11.h"
#include "tim.h"


#define DHT11_DQ_IN HAL_GPIO_WritePin(DHT11_GPIO_Port, DHT11_Pin, GPIO_PIN_SET)	  //输入

void DelayUs(uint32_t nus)
{
    uint16_t  differ = 0xffff - nus - 5;
    //设置定时器2的技术初始值
    __HAL_TIM_SetCounter(&htim3, differ);
    //开启定时器
    HAL_TIM_Base_Start(&htim3);

    while( differ < 0xffff - 5)
    {
        differ = __HAL_TIM_GetCounter(&htim3);
    };

//关闭定时器
    HAL_TIM_Base_Stop(&htim3);
}

void DelayXms(unsigned char t)
{
    HAL_Delay(t);
}

//初始化DHT11，同时检测是否连接上DHT11，PA11初始化

uint8_t DHT11_Init(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    /* GPIO Ports Clock Enable */
    __HAL_RCC_GPIOA_CLK_ENABLE();


    /*Configure GPIO pin Output Level */
    HAL_GPIO_WritePin(GPIOA, DHT11_DATA_OUT_Pin, GPIO_PIN_SET);

    /*Configure GPIO pin : PtPin */
    GPIO_InitStruct.Pin = DHT11_DATA_OUT_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_PULLDOWN;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(DHT11_DATA_OUT_GPIO_Port, &GPIO_InitStruct);

    DHT11_Rst();
    return DHT11_Check();
}
//复位DHT11
void DHT11_Rst(void)
{
    DHT11_IO_OUT(); 	//SET OUTPUT
    HAL_GPIO_WritePin(GPIOA, DHT11_DATA_OUT_Pin, GPIO_PIN_RESET); 	//拉低
    DelayXms(20);    	//拉低延时至少18ms
    HAL_GPIO_WritePin(GPIOA, DHT11_DATA_OUT_Pin, GPIO_PIN_SET); 	//DQ=1，拉高
    DelayUs(30);     	//拉高延时至少20~40us
}

//检测回应
//返回1：检测错误
//返回0：检测成功
uint8_t DHT11_Check(void)
{
    uint8_t retry = 0;
    DHT11_IO_IN();//SET INPUT

    while (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12) && retry < 100) //DHT11拉低40~80us
    {
        retry++;
        DelayUs(12);
    };

    if(retry >= 100)return 1;
    else retry = 0;

    while (!HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12) && retry < 100) //DHT11再次拉高40~80us
    {
        retry++;
        DelayUs(1);
    };

    if(retry >= 100)return 1;

    return 0;
}

//读取一个位Bit
//返回1或0
uint8_t DHT11_Read_Bit(void)
{
    uint8_t retry = 0;

    while(HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12) && retry < 100) //等待变低电平
    {
        retry++;
        DelayUs(1);
    }

    retry = 0;

    while(!HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12) && retry < 100) //等待变高电平
    {
        retry++;
        DelayUs(1);
    }

    DelayUs(40);//等待40us

    if(HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_12))return 1;
    else return 0;
}

//读取一个字节
//返回读到的数据
uint8_t DHT11_Read_Byte(void)
{
    uint8_t i, dat;
    dat = 0;

    for (i = 0; i < 8; i++)
    {
        dat <<= 1;
        dat |= DHT11_Read_Bit();
    }

    return dat;
}

//DHT11读取一次数据
//temp:温度(范围:0~50°)
//humi:湿度(范围:20%~90%)
//tem：温度小数位
//hum：湿度小数位
uint8_t DHT11_Read_Data(uint8_t *temp, uint8_t *humi, uint8_t *tem, uint8_t *hum)
{
    uint8_t buf[5];
    uint8_t i;
    DHT11_Rst();

    if(DHT11_Check() == 0)
    {
        for(i = 0; i < 5; i++) //读取40位字节
        {
            buf[i] = DHT11_Read_Byte();
        }

        if((buf[0] + buf[1] + buf[2] + buf[3]) == buf[4])
        {
            *humi = buf[0];
            *hum = buf[1];
            *temp = buf[2];
            *tem = buf[3];
        }
    }
    else return 1;

    return 0;
}


//DHT11输出模式配置
void DHT11_IO_OUT()
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    /* GPIO Ports Clock Enable */
    __HAL_RCC_GPIOA_CLK_ENABLE();


    /*Configure GPIO pin Output Level */
    HAL_GPIO_WritePin(GPIOA, DHT11_DATA_OUT_Pin, GPIO_PIN_SET);

    /*Configure GPIO pin : PtPin */
    GPIO_InitStruct.Pin = DHT11_DATA_OUT_Pin;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_PULLDOWN;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(DHT11_DATA_OUT_GPIO_Port, &GPIO_InitStruct);
}

//DHT11输入模式配置
void DHT11_IO_IN(void)
{
    GPIO_InitTypeDef GPIO_InitStruct = {0};

    /* GPIO Ports Clock Enable */
    __HAL_RCC_GPIOA_CLK_ENABLE();
    /*Configure GPIO pin : PC0 */
    GPIO_InitStruct.Pin = GPIO_PIN_12;
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
}

```

### DHT11.h
```h
#ifndef _DHT11_H_
#define _DHT11_H_
#include "main.h"
#include "stdlib.h"
#define DHT11_DATA_OUT_Pin GPIO_PIN_12
#define DHT11_DATA_OUT_GPIO_Port GPIOA

void DHT11_Rst(void);
uint8_t DHT11_Check(void);
uint8_t DHT11_Read_Bit(void);
uint8_t DHT11_Read_Byte(void);
uint8_t DHT11_Read_Data(uint8_t *temp,uint8_t *humi,uint8_t *tem,uint8_t *hum);
uint8_t DHT11_Init(void);
void DHT11_IO_IN(void);
void DHT11_IO_OUT(void);

#endif

```

### 串口中断函数


```c
/* USER CODE BEGIN 4 */
/**
  * @brief  Interrupt_UARTX_接收
  * @retval None
  */

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{

    /* 串口 3 中断 */
    if(huart == (&huart3))
    {
    	//接收字符
    	HAL_UART_Transmit(&huart3, &kRxBuffer,  10, 100);
    	//�??启中�??
        HAL_UART_Transmit_IT(&huart3, &kRxBuffer, 100);
        /* z */
    }
}

/**
  * @brief  Interrupt_UARTX_发�??
  * @retval None
  */

void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{

    /* 串口�?????? */
    if(huart == (&huart3))
    {
    	//发�?�数�??
    	HAL_UART_Receive(&huart3, &kRxBuffer, 10, 100);
    	//打开中断
        HAL_UART_Receive_IT(&huart3, &kRxBuffer, 100);
//        HAL_GPIO_TogglePin(LED_GPIO_Port, LED_Pin);
    }

}
/* USER CODE END 4 */
```

<!-- 
Category：

理论：理论知识技能，技术
应用：应用笔记，实操
折腾：折腾折腾折腾折腾！(其实属于应用，但就是玩！)
方法：方法论（经验谈），如工程方法
工具：针对具体工具的介绍、使用方法、分析适用场景等；使用工具如何如何解决具体问题，应该放在「应用」里
作品：自己的作品（成品）、个人项目日志等
杂谈：生活碎碎念
自然科学：物理，化学，数学
其他：没法分类的东西

Tags

细分领域：机器之脉络(硬件),机器之魂魄(嵌入式软件,机器学习，算法等),机器之骨骼(结构),
形式：日志
具体内容：个人作品、方法论、随笔
语言：python C C# Java Html micropython 微信小程序
IDE：Arduino CUBEIDE Vscode
自然科学：代数 几何 概率 黑洞 白矮星 四维空间...
IC OR IDE : STM32 ESP32 ESP8266 C51 树莓派 RK3399 野火开发版 MIQI
模组：ws2812b
系统：Linux Windows macOS openwrt Docker   termux
游戏：MC
博客：hexo 主题 魔改
折腾系类：黑苹果，整服务器，termux

 -->


