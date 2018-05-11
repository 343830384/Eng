<div align=center><img width="65" height="65" src="https://github.com/343830384/Eng/blob/master/img/80.png"/></div>
<br>
<div align=center><img width="774" height="73" src="https://github.com/343830384/Eng/blob/master/img/JR.jpg"/></div>
<br>

## [EngJs官网](http://www.engjs.cn/)
<br>

# Eng

  * Eng 是一款 MVVM 模式超 轻量级的 组件化数据渲染 JS 本地插件 ， 仅有16kb 。
但却支持 React 、 Vue 、 Angular 全家桶套餐的主要核心功能 ， 因此是这三类工具外另一种更
轻量级的实现方式 ， 具有所有此类工具中 ， 最少 最简洁 最易的 学习曲线;

  * Eng 在大多数情况下与后台 99 %解耦 ， 按照 Eng 规则封装的Eng组件 ， 具有一次编写 ， 处处部署的特点 。
后台仅仅只需配置数据的请求接口 。 在使用本地数据的特殊情况下 ， 后台对前端工作的参与度近乎为 0 ;

  * Eng 主要特性：数据多向绑定 、组件闭包通信（动态）、 组件群发循环通信 、数据状态共享（跨页面模式下：跨组件，多向控制）、
组件require（自动按需加载js，css）、组件自请求数据、支持列表数据过滤 ，实现Excel数据统计计算、 组件方法自缓存复用

  * Eng 相较于同类工具：  更少更简易的指令/方法实现同样的操作 ， 没有任何组件通信障碍 ， 后台无需专门复杂的路由控制器(1个ID1个接口) ，数据状态共享仅需简短的声明 ， 组件是完整闭包的全功能自动独立运作体。
  
  * Eng 的数据结构与dom层次划分， 互为结构视图 。 在深度开发下 ，提供异常明晰的规律逻辑思考模式 与 例推效应； 

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
   * 1.x.x 鉴于 watcherFor 部分人实现excel列表逻辑困难 , 1.1 版本考虑列表渲染将支持套用Excel语法


## License

[![License](http://img.shields.io/badge/license-APACHE2-blue.svg)](LICENSE.txt)

