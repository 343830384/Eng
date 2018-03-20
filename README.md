<div align=center><img width="65" height="65" src="https://github.com/343830384/Eng/blob/master/img/80.png"/></div>
<br>
<div align=center><img width="774" height="73" src="https://github.com/343830384/Eng/blob/master/img/JR.jpg"/></div>
<br>

## [API测试地址/API Test Link](www.engjs.cn)
<br>

# ENG

   * Eng 是组件化数据渲染 构建用户界面的 JS 插件/库 
   * Eng 拥有最简明 , 最少的API 却可以更容易的实现达成同类工具的高阶功能
   * Eng 具有同类js工具中最优异的性能,和12Kb的体积, 并且仅有8个基本指令 ,7个方法 
   * Eng 支持单双向绑定,列表,响应,普通数据处理
   * Eng 支持列表数据过滤处理,数据过滤时允许单独对全局任意数据建立响应关系
   * Eng 支持组件扩展 
   * Eng 支持组件循环通信 以及 组件群发循环通信  , 没有watch 回调噩梦
   * Eng 使用的数据结构, 就是页面DOM的嵌套结构 , 互为骨骼数据视图;

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

