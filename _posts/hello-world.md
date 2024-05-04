---
title: Hello World
banner: /gallery/55.jpeg
cover: /gallery/55.jpeg
thumbnail: /gallery/55.jpeg
index_img: /gallery/55.jpeg
banner_img: /gallery/55.jpeg
categories: main
pin: true
---

Welcome to my Blog!

## Git 

### git config命令预先配置好相关的用户信息

```shell
git config --global user.name "你的名字或昵称"
git config --global user.email "你的邮箱"
```

### 常用的命令

```shell
git branch -a #查看当前分支
git checkout master #切换到想要操作的分支master
git add . #将当前目录所有文件添加到git暂存区
git commit -m $(date +%Y-%m-%d-%H:%M:%S) #提交并备注提交信息
git push origin master #将本地提交推送到远程仓库想要的分支master
```

## Quick Start

### 安装的插件

#### 网址转拼音插件

##### 安装

```shell
npm i hexo-permalink-pinyin --save
```

##### 配置及使用

在根目录中的_config.yml中国添加

```yml
# 网站 文字转拼音
permalink_pinyin:
  enable: true
  separator: "_" # default: '-'
```

#### hexo-electric-clock 电子时钟插件

##### 安装

```shell
npm i hexo-electric-clock --save
```

##### 配置及使用

不是主题的yml文件

```yml
electric_clock:
  priority: 5
  enable: true
  enable_page: all
  layout:
    type: class
    name: sticky_layout
    index: 0
  temple_html: '
  <div class="card-widget card-clock">
    <!-- 挂载容器 -->
    <div class="card-glass">
      <div class="card-background">
        <div class="card-content">
          <div id="hexo_electric_clock">
            <img
              id="card-clock-loading"
              src="https://cdn.jsdelivr.net/gh/Zfour/Butterfly-clock/clock/images/weather/loading.gif"
              style="height: 120px; width: 100%;"
              data-ll-status="loading"
              class="entered loading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>'

```





#### Chart动态图标插件

##### 安装

```shell
npm install hexo-tag-chart --save
```


##### 配置及使用


```markdown
<!--fontColor:数据颜色-->
<!--padding:上下左右填充-->
<!--suggestedMin:最小值-->
{% p center logo large, Hello😜 %}

***

{% p center h1, 一个用JS开发的硬件工程师 😋 %}

{% p center small, 雷达图看不到刷新刷新就好啦 %}

{% chart 100% 300 %}
{
  type: 'radar',
  data: {
    labels: ['C', 'Python', 'HTML', 'micropython', 'ESP8266', 'ESP32', 'STM32', 'SCT15', '微信小程序'],
    datasets: [{
    label: '值',
    backgroundColor: '#9400D377',
    borderColor: '#9400D3',
    data: [20, 50, 40, 80, 40, 80, 55, 55, 10],
    lineTension: 0.2,
    pointStyle: 'rectRounded',
    pointHoverBackgroundColor: '#FFFFFF'
    }]
  },
  options: {
    legend: {
        labels: {
            fontColor: '#9400D3', <!--数据颜色-->
            fontSize: 12,
            FontFamily: ''
        }
    },
    layout: {
      padding: { <!--上下左右填充-->
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    responsive: true,
    title: {
      display: true,
      text: 'My dataset'
    },
    scale: {
        angleLines: {
            display: true
        },
        ticks: {
            suggestedMin: 0,    <!--最小值-->
            suggestedMax: 80  <!--最大值-->
        }
    }
  }
}
{% endchart %}


```

#### Hexo-neat插件优化提升访问效率

##### 安装
```bash
npm install hexo-neat --save
```


博客根目录文件`_config.yml`文末添加如下

```yaml
# hexo-neat
# md博文压缩
neat_enable: true
# 压缩html（ejs，swig等也属于html格式片段）
neat_html:
  enable: true
  exclude:
# 压缩css  
neat_css:
  enable: true
  exclude:
# 压缩js
neat_js:
  enable: true
  mangle: true #打印日志
  output:
  compress:
  exclude: #排除文件
```