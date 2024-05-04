---
title: STM32点亮LED
banner: /headimg/headimg/headimg_9.png
cover: /headimg/headimg/headimg_9.png
thumbnail: /headimg/headimg/headimg_9.png
index_img: /headimg/headimg/headimg_9.png
banner_img: /gallery/55.jpeg
tags:
  - STM32
  - C
  - CUBEIDE
categories: 应用
date: 2021-01-31 20:46:09
---

点灯就相当于 python 的`print("hello world")`

## 定义引脚

打开工程文件后，找到相应的引脚，单击选择`GPIO_Output`，再右键选择 Enter User Label，输入定义的名称。

![工程](./LED_1.png)


![LED_2](./LED_2.png)
![LED_3](./LED_3.png)
![LED_4](./LED_4.png)


点击生成代码

![点击生成代码](./CODE_1.png)
![等待生成代码](./CODE_2.png)


点灯代码如下

```c
    //点灯代码    LED1闪烁
	    HAL_GPIO_TogglePin(LED1_GPIO_Port, LED1_Pin);
	    HAL_Delay(300);
```

自动生成代码如下

```c
int main(void)
{
  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration----------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  /* USER CODE BEGIN 2 */

  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
    //点灯代码    LED1闪烁
	    HAL_GPIO_TogglePin(LED1_GPIO_Port, LED1_Pin);
	    HAL_Delay(300);
  }
  /* USER CODE END 3 */
}
```

连接开发板后点击RUN图标

{% image ./RUN.png, alt=RUN %}
{% image ./successfully.png, alt=successfully %}


, alt=successfully %}

