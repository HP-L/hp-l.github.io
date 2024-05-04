---
title: friends
menu_id: friends
date: 2021-04-24 20:48:20
layout: friends
---

朋友们

{% friends blog_friends %}

{% friends api:https://api.github.com/repos/HP-L/blog_friends/issues %}

添加友链可以下方留言

```json
{
"title": "test",
"url": "https://test.cn",
"avatar": "https://test.png",
"screenshot": "https://test64ea32a1115f1.png",
"description": ""
}
```