---
title: 初识k8s
banner: /headimg/headimg/headimg_23.png
cover: /headimg/headimg/headimg_23.png
thumbnail: /headimg/headimg/headimg_23.png
index_img: /headimg/headimg/headimg_23.png
banner_img: /headimg/headimg/headimg_23.png
date: 2024-02-19 17:14:28
tags: 
    - k8s
    - 服务器
categories: 应用
---

# Kubernetes能做什么

Kubernetes（简称K8S）是一款开源的容器编排平台，主要用于自动化部署、管理和扩展容器化应用。以下是Kubernetes的主要功能和用途：

1. **自动化部署**：Kubernetes可以自动化部署容器化应用，包括应用的创建、启动、停止和重启等操作。

2. **负载均衡**：Kubernetes可以为容器提供负载均衡服务，使得不同容器之间的请求能够均匀分配，提高应用的整体性能。

3. **扩展和缩减**：Kubernetes可以根据应用的需求自动扩展或缩减容器的数量，以满足应用的不同负载需求。

4. **故障恢复**：当某个容器出现故障时，Kubernetes可以自动替换这个容器，保证应用的高可用性。

5. **服务发现**：Kubernetes可以为每个容器提供唯一的网络标识，使得其他容器可以通过这个标识找到并访问该容器。

6. **存储管理**：Kubernetes支持多种类型的存储系统，可以为容器提供持久化的存储服务。

7. **安全保障**：Kubernetes提供了丰富的安全策略和工具，可以帮助开发者更好地保护他们的应用。

8. **批处理**：除了服务外，Kubernetes还可以管理批处理和CI（持续集成）工作负载，如有需要，可以替换失败的容器。

9. **水平扩缩**：使用简单的命令、用户界面或根据CPU使用率自动对你的应用进行扩缩。

10. **IPv4/IPv6双栈**：为Pod（容器组）和Service（服务）分配IPv4和IPv6地址。

11. **为可扩展性设计**：在不改变上游源代码的情况下为你的Kubernetes集群添加功能。

总的来说，Kubernetes提供了一种高效、灵活的方式来管理容器化应用，使得开发者可以更加专注于应用本身，而不需要关心基础设施的问题。

# 他是如何实现多个硬件共同运行一个程序的

Kubernetes通过以下方式实现多个硬件共同运行一个程序：

1. **Pods**：在Kubernetes中，最小的工作单位是Pod，一个Pod可以包含一个或多个容器，这些容器共享存储、网络和其他资源。这意味着，在一个硬件设备（Node）上可以运行多个Pod，每个Pod都可以是一个独立的应用程序或服务。

2. **ReplicaSets**：为了确保高可用性，Kubernetes可以使用ReplicaSet来复制Pod的实例，并在多个硬件设备（Node）上运行这些实例。这样即使某个硬件设备发生故障，也不会影响到整个应用的运行。

3. **Services**：Kubernetes中的Service是一种抽象，它可以暴露一组Pod的接口，并将请求路由到这些Pod。这意味着，无论Pod在哪个硬件设备上运行，只要它们属于同一个Service，外部就可以通过这个Service来访问它们。

4. **Storage Management**：Kubernetes还提供了存储管理功能，可以将数据持久化存储在云存储或其他存储系统中，这样即使硬件设备发生故障，数据也不会丢失。

5. **Load Balancing**：Kubernetes还内置了负载均衡功能，可以将请求分发给多个Pod，从而充分利用硬件资源，提高应用性能。

以上就是Kubernetes如何实现多个硬件共同运行一个程序的基本原理。具体实现过程可能会因具体的应用场景和需求有所不同。

# Kubernetes 架构

Kubernetes 最初源于谷歌内部的 Borg，提供了面向应用的容器集群部署和管理系统。Kubernetes 的目标旨在消除编排物理 / 虚拟计算，网络和存储基础设施的负担，并使应用程序运营商和开发人员完全将重点放在以容器为中心的原语上进行自助运营。Kubernetes 也提供稳定、兼容的基础（平台），用于构建定制化的 workflows 和更高级的自动化任务。 Kubernetes 具备完善的集群管理能力，包括多层次的安全防护和准入机制、多租户应用支撑能力、透明的服务注册和服务发现机制、内建负载均衡器、故障发现和自我修复能力、服务滚动升级和在线扩容、可扩展的资源自动调度机制、多粒度的资源配额管理能力。Kubernetes 还提供完善的管理工具，涵盖开发、部署测试、运维监控等各个环节。

Kubernetes 借鉴了 Borg 的设计理念，比如 Pod、Service、Label 和单 Pod 单 IP 等。Kubernetes 的整体架构跟 Borg 非常像。

![架构](./1.jpg)

## 分层架构

![架构](./2.png)

- 核心层：Kubernetes 最核心的功能，对外提供 API 构建高层的应用，对内提供插件式应用执行环境
- 应用层：部署（无状态应用、有状态应用、批处理任务、集群应用等）和路由（服务发现、DNS 解析等）、Service Mesh（部分位于应用层）
- 管理层：系统度量（如基础设施、容器和网络的度量），自动化（如自动扩展、动态 Provision 等）以及策略管理（RBAC、Quota、PSP、NetworkPolicy 等）、Service Mesh（部分位于管理层）
- 接口层：kubectl 命令行工具、客户端 SDK 以及集群联邦
- 生态系统：在接口层之上的庞大容器集群管理调度的生态系统，可以划分为两个范畴
- Kubernetes 外部：日志、监控、配置管理、CI/CD、Workflow、FaaS、OTS 应用、ChatOps、GitOps、SecOps 等
- Kubernetes 内部：CRI、CNI、CSI、镜像仓库、Cloud Provider、集群自身的配置和管理等

# 参考链接

[架构](https://jimmysong.io/kubernetes-handbook/concepts/)
[部署](https://jimmysong.io/kubernetes-handbook/practice/install-kubernetes-on-centos.html)

