<div align=center><img width="65" height="65" src="https://github.com/343830384/Eng/blob/master/img/80.png"/></div>
<br>
<div align=center><img width="774" height="73" src="https://github.com/343830384/Eng/blob/master/img/JR.jpg"/></div>
<br>

## [API测试地址/API Test Link](http://www.engjs.cn/)
<br>

# ENG

  * Eng 是一款 MVVM 模式超 轻量级的 组件化数据渲染 JS 本地插件 ， 仅有16kb 。
但却支持 React 、 Vue 、 Angular 全家桶套餐的主要核心功能 ， 因此是这三类工具外另一种更
轻量级的实现方式 ， 具有所有此类工具中 ， 最少 最简洁 最易的 学习曲线;

  * Eng 在大多数情况下与后台 99 %解耦 ， 按照 Eng 规则封装的Eng组件 ， 具有一次编写 ， 处处部署的特点 。
后台仅仅只需配置数据的请求接口 。 在使用本地数据的特殊情况下 ， 后台对前端工作的参与度近乎为 0 ;

  * Eng 主要特性：数据多向绑定 、组件闭包通信（动态）、 组件群发循环通信 、数据状态共享（跨页面模式下：跨组件，多向控制）、
组件require（自动按需加载js，css）、组件自请求数据、支持列表数据过滤 ，实现Excel数据统计计算、 组件方法自缓存复用

  * Eng 相较于同类工具：  更少更简易的指令/方法实现同样的操作 ， 没有任何组件通信障碍 ， 后台无需专门复杂的路由控制器(1个ID1个接口) ，数据状态共享仅需简短的声明 ， 组件是完整闭包的全功能自动独立运作体。
  
  * Eng 的数据结构与dom层次划分， 互为结构视图 。 在深度开发下 ，提供异常明晰的规律逻辑思考模式 与 例推效应； 

### 致歉

   * 非常抱歉由于未做完整用例测试 , 造成的一些使用中才能发现的特殊bug , 源于作者改版仅看API 是否正常显示的2B行为 , 0.9.4中一并解决

### 理念

   * Eng 做 精、简、小而强大 的 js 组件化渲染 插件/库
   * Eng 需理解 watcherFor 才可大成 , 自能实现Excel的函数, 实现复杂的交互逻辑 ,其它只需看看
   * 对于单纯页面渲染 , 采用其它js工具操作 ,部分页面有SEO需求 或 需要实现全浏览器兼容 组件化渲染的项目, 请参考 [Eng-NOS](https://github.com/343830384/Eng-NOS) 和 [Eng-Drive](https://github.com/343830384/Eng-Drive) 并只用看e-base、e-attr、e-html、e-for 四个指令
   * Eng 最终不会超过20kb , 仅保有对核心功能的支持

### 技巧指导
   
   *  0.9.4  [组件循环通信响应 --- (底层解决watch噩梦 群发循环响应难题 )的简单应用实现 ](https://juejin.im/post/5aa7961b518825555c1d532c)

### 版本进度说明

   * 0.9.0  (当前) 版本..
   * 0.9.2  (当前) 修改 watcher注册的观察对象 只能通过自身条件判断自我销毁的弊端 , 现在只要再次注册为空 . 例: items.$_watcher({ 'xxx':null }) 就可销毁 , 和 watcherFor 销毁用法一样 
   * 0.9.3  (当前) 增加对组件融合并联通信的特性支持 , 新增 id 传入命名参数 , 以区分不同的组件配合前者  , 修改所有已知bug (参看0.9.3更新说明) ......
   * 0.9.4  新特性:组件循环通信响应  , 解决watch噩梦群发响应难题 以及部分底层特性的修改 , 所有已知bug的修缮
   * 1.0.0  将增加跨页面数据状态管理, 更易用浅显傻大白的组件通信
   * 1.0.0  将增加组件Active行为,和上条 做为 [Eng-Drive](https://github.com/343830384/Eng-Drive) 1.0的配套更新
   * 1.0.0  修缮API手册
   * 1.0.0  (2018-03 月底前上线)
   * 1.1.0  鉴于 watcherFor 部分人实现excel列表逻辑困难 , 1.1 版本列表渲染将支持套用Excel语法


## License

[![License](http://img.shields.io/badge/license-APACHE2-blue.svg)](LICENSE.txt)

