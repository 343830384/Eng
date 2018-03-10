<div align=center><img width="65" height="65" src="https://github.com/343830384/Eng/blob/master/img/80.png"/></div>
<br>
<div align=center><img width="774" height="73" src="https://github.com/343830384/Eng/blob/master/img/JR.jpg"/></div>
<br>

## [API测试地址/API Test Link](http://59.110.153.171)
<br>

# ENG

   * Eng 是组件化数据渲染 构建用户界面的 JS 插件/库 
   * Eng 拥有最简明 , 最少的API 却可以更容易的实现达成同类工具的高阶功能
   * Eng 具有同类js工具中最优异的性能,和12Kb的体积, 并且仅有8个基本指令 ,7个方法 
   * Eng 支持单双向绑定,列表,响应,普通数据处理
   * Eng 支持列表数据过滤处理,数据过滤时允许单独对全局任意数据建立响应关系
   * Eng 支持组件扩展追加 , 所以没有父子兄弟组件通信的概念  , 完全的不同的组件间通信 ,可使用组件融合并联通信,  或者根据watcher方法 和数据过滤 条件约定 ( 当然你想把所有组件扩展追加成一个超大组件也没问题  , 或者合理使用组件融合技巧 );
   * Eng 所有方法内都能轻易的建立与全局任意位置数据的约束响应关系
   * Eng 使用的数据结构, 就是页面DOM的嵌套结构 . 同理 , 页面DOM {{*}}数据的定义, 决定了数据结构的走向 , 互为骨骼数据视图;

### 声明

   * Eng 致力于精简所有同类工具中的技术玄学 ,  用最 简明、简易和最少的API实现同类工具的核心部分 ,摒除一切冗余的学习内容,无谓的蹉跎,并达成同样的目的.
   * Eng 需理解 watcherFor 才可大成 , 自能实现Excel的函数, 实现复杂的交互逻辑 ,其它只需看看
   * 对于单纯页面渲染 , 用jquery等其它js攻击操作 ,部分页面有SEO需求 和 对极致性能追求的项目, 请参考 [Eng-NOS](https://github.com/343830384/Eng-NOS) 和 [Eng-Drive](https://github.com/343830384/Eng-Drive) 并只用看e-base、e-attr、e-html、e-for 四个指令
   * Eng 最终不会超过20kb , 该有的核心的都会有 不会变成庞然大物 , 不会有又长又臭的Api .....(1.1 版本功能预言不会超过15kb ,关于部分人反映担心的承诺回应)

### 技巧指导
   
   *  ---  以下为Eng 的组件应用特性 , 非API , 基于底层实现逻辑架构
   *  Eng  组件扩展追加 与 组件融合并联通信 ( 说明链接编写ing.....) 

### 版本进度说明

   * 0.9.0  (当前) 版本..
   * 0.9.2  (当前) 修改 watcher注册的观察对象 只能通过自身条件判断自我销毁的弊端 , 现在只要再次注册为空 . 例: items.$_watcher({ 'xxx':null }) 就可销毁 , 和 watcherFor 销毁用法一样 
   * 0.9.3  (当前) 增加对组件融合并联通信的支持 (特性 ),新增 id 参数配命名 , 以区分不同的组件配合前者  , 修改所有已知bug (参看0.9.3更新说明) ......
   * 1.0.0  将增加跨页面数据状态管理, 更易用浅显傻大白的组件通信
   * 1.0.0  将增加组件Active行为,和上条 做为 [Eng-Drive](https://github.com/343830384/Eng-Drive) 1.0的配套更新
   * 1.0.0  修缮API手册
   * 1.0.0  (2018-03 月底前上线)
   * 1.1.0  鉴于 watcherFor 部分人实现excel列表逻辑困难 , 1.1 版本列表渲染将支持套用Excel语法

### 作者吐槽
   
   * ................
## License

[![License](http://img.shields.io/badge/license-APACHE2-blue.svg)](LICENSE.txt)

