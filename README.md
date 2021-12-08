<div align=center><img width="65" height="65" src="https://s4.ax1x.com/2021/12/08/o2iYvj.png"/></div>
<br>
<div align=center><img width="774" height="73" src="https://s4.ax1x.com/2021/12/08/o2iJ2Q.png"/></div>
<br>

## [EngJs官网]() 已停!请下载使用 本地API
<br>

# Eng

  * Eng 是一款 MVVM 模式超 轻量级的 组件化数据渲染 JS 本地插件 ， 仅有16kb 。
但却支持 React 、 Vue 、 Angular 全家桶套餐的主要核心功能 ， 因此是这三类工具外另一种更
轻量级的实现方式 ， 具有所有此类工具中 ， 最少 最简洁 最易的 学习曲线;
 
 >  轻量: Eng + Router组件 + eng_server.js(单文件)  min版总共不超过 40KB 

>  精简: 仅10个行内指令 +  5个基本区域方法 +  基本对象操作方法 ,  即可完成所有组件化数据渲染   (对Eng 1.0 大副删减)

>  与原生 JS 紧密契合 , 不在原生JS 基础上 二次创造发明创造 新名词 新概念 , 基础知识复用,  类似JQuery 仅是插件, 提供基础便利 , 不凌驾代替原生JavaScript

>  Eng 和 路由插件 向下兼容到 IE9

>  可与其它插件组件库混用 ,  如vue(需 理解 vue的v-pre 和 Eng的e-stop 知识点) ,  注意其它组/插件的销毁方法!

>  支持 单页面路由! 提供一个基于Eng 的组件化的路由插件 , 配套基本后端服务 , 路由配置浅显易懂 (一目了然) , 无其它插件额外学习成本, 二次开发会调接口即可 (灵活自定义修改)  


> Eng 的数据结构与dom层次划分， 互为结构视图 。 在深度开发下 ，提供异常明晰的规律逻辑思考模式 与 例推效应；
 
>  不提供全家桶! Eng只是灵活的纯插件 , 满足基本需求 , 不参与 , 不谋求 制定行业  %0 代号-35 流水线工业标准

### 当前进展

  * (已修复)着手解决IE 下数据共享无法正确工作
  * 封装方法缓存复用问题

### 理念

   * Eng 做 精、简、小而强大 的 js 组件化渲染 插件/库
   
   * Eng 最终不会超过20kb , 仅保有对核心功能的支持

### 技巧指导
   
   *  0.9.4  [组件循环通信响应 --- (底层解决watch噩梦 群发循环响应难题 )的简单应用实现 ](https://juejin.im/post/5aa7961b518825555c1d532c)

### 版本进度说明

   * 0.9.0  版本..
   * 1.0.0  
   * 1.1.0  修复数据共享 IE 下不能工作
   * 1.1.1  修复 e-event  事件对象 this.$_gData 获取错误 和 AJAX post 请求错误 
   * 1.2.1  修复array数据错误 , 数据类型错误 以及watcher 失效的 bug


## License

[![License](http://img.shields.io/badge/license-APACHE2-blue.svg)](LICENSE.txt)

