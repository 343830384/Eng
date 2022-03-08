/* API 说明文档 */

/* 
%0注意%r                 
%0 = <span class="c_r">    // 红色
%1 = <span class='b_b'>    // 蓝色

%r = </span>               // 结尾

img(./xx.png)img   <img class='img' src='./xx.png'>

img()img

ƒ (...)

//
{
bt:'',    
str:`
%1

>
%r
`
},

*/
var list=[
//概括 ############################################################################################################# 

{
bt:'概括',
},        
   
//概述    
{
bt:'概述',
str:`
●  Eng 是一款 MVVM 模式超 轻量级的 组件化数据渲染 JS 插件 ,是 React 、 Vue 、 Angular 全家桶套工具外另一种更轻量级的 纯插件 实现方式 ， 具有所有此类工具中 ， 最少 最简洁 最易的 学习曲线;

●  轻量: Eng + Router组件 + eng_server.js(单文件) min版总共不超过 40KB

●  精简: 仅10个行内指令 + 5个基本区域方法 + 基本对象操作方法 , 即可完成所有组件化数据渲染 (对Eng 1.0 大副删减)

●  与原生 JS 紧密契合 , 不在原生JS 基础上 二次发明创造 新名词 新概念 , 基础知识复用, 类似JQuery 仅是插件 , 提供基础便利 , 不凌驾代替套壳原生JavaScript

●  Eng 和 Router组件 向下兼容到 IE9

●  可与其它插件组件库混用 , 如vue(需 理解 vue的v-pre 和 Eng的e-stop 知识点) , 注意其它组/插件的销毁方法!

●  支持 单页面路由! 提供一个基于Eng 的组件化的路由插件 , 配套基本后端服务 , 路由配置浅显易懂 (一目了然) , 无其它插件额外学习成本, 二次开发会调接口即可 (灵活自定义修改)

●  Eng 的数据结构与dom层次划分， 互为结构视图 。 在深度开发下 ，提供异常明晰的规律逻辑思考模式 与 例推效应；

●  不提供全家桶! Eng只是灵活的纯插件 , 满足基本需求 , 仅规定了基于 Router组件和eng_server.js的基本范式 (可自行修改), 在此基础上二次自由开发

`,
},

//开发原因
{
bt:'开发原因',    
str:`
●  主流前端的数据渲染和交互开发 以 vue 和 react 生态圈为主 ， 做为与后端紧密配合 ， 提供大量现成可用组件 ， 快速迭代产品的前后端工具， 其有着优渥的便捷性 ， 在这点上必须予以肯定。

●  但对于纯粹的基础前端开发而言 ， 此二者的生态圈过于繁杂 ， 大量冗余累赘不可抛弃的历史包袱， 以及对原生JS和web环境破坏严重 。 大量凌驾僭越于原生web 环境的规则束缚，魔法字符串 ， 新规则 ， 新概念 ， 会造成不同程度的束缚和掣肘。

●  且对基于两者的新手开发 ， 为了便捷而便捷 ， 大量引用三方甚至多个重量级插件， 不仅会造成项目臃肿烦杂， 并因过份远离基础， 离开其生态圈则丧失基础开发能力。

●  因此 ，EngJS与原生 JS 紧密契合 , 不在原生JS 基础上 二次发明创造 新名词 新概念 , 基础知识复用。  类似JQuery 仅是插件 ,  提供基础便利 , 不凌驾代替套壳原生JavaScript，仅提供基础的 数据渲染和组件支持 ，精简易用 （对于基础开发而言），且能与现有生态的混合使用。
`
},
//设计思想
{
bt:'设计思想',    
str:`
●  强调数据视图结构 ， web端大量涉及视觉结构的数据逻辑和交互呈现，  因此Eng 的数据结构与dom层次划分， 互为结构视图 。 在深度开发下 ，提供异常明晰的规律逻辑思考模式 与 例推效应。（参图）。 Router组件，也是基于此结构逻辑实现， 一脉相承， 

img(https://s4.ax1x.com/2021/12/13/oOQEdO.png)img
`
},
//数据渲染 与 交互功能 开发
{
bt:'数据渲染 与 交互功能 开发',    
str:`
●  精简: 仅10个行内指令 +  5个基本区域方法 +  基本组件对象操作方法 ,  即可完成所有组件化数据渲染   (参下案例)  
●  组件对象特点 ，灵活易用，仅 destroy，sleep，awake 三个基本状态，就可实现在页面的销毁，隐藏，以及位置变换。

例1：图表类， echarts折线图等理论上基于此也较容易实现
img(https://s4.ax1x.com/2021/12/13/oOmm7Q.png)img

例2：css3 3D盒模型城市场景编辑器
img(https://s4.ax1x.com/2021/12/13/oOmKts.png)img

例3：canvas2d 的骨骼动画编辑器
img(https://s4.ax1x.com/2021/12/13/oOme0g.png)img

例4：canvas2d 地图场景编辑器
img(https://s4.ax1x.com/2021/12/13/oOmukj.png)img

●  综上旨在证明，Eng具备同类工具的 核心基础开发能力，而非泛泛……
`
},
//Router组件
{
bt:'Router组件',    
str:`
●  基于如下常见页面结构，使用JSON结构表述不同组件的关系
●  以区域area划分功能不同的单页面  （参下图）
●  对于简单页面不建议使用，完全没必要
●  对于特殊需求，因Eng组件的灵活易用性， 可尝试自行实现并构建基于项目规则需求的Router组件 

img(https://s4.ax1x.com/2021/12/13/oOQVoD.png)img

得出如下 Router组件 的设计结构 （参考范式)

img(https://s4.ax1x.com/2021/12/13/oOQAeK.md.png)img
`
},
//创建属性 ############################################################################################
//分割
{
  bt:'创建属性/参数 new Eng({ ... })',
},
//创建一个Eng实例  
{
bt:'创建一个 Eng实例 (含所有基本方法 )',
str:`

    <div id='app'>...</div>
---------------------------------
var appData=new Eng({
    id:      '',           // string : 唯一 , 用于通过 appId 获取Eng实例 对象
    el:      'app',        // #id , domNode 或  html文本
    css:     '',           // 当前实例的 专属css样式文本   ===  <style>标签内容
    parent:  '',           // 实例 dom 对象的 填充父容器 , 用于指定/切换/变更 展示位置
    dataOnly:'',           // 默认false ,  true 时仅作为数据响应器使用 , 不再判断解析 el 
    data:      { ... },         
    watcher:   { ... },
    watcherFor:{ ... },
    domEvent:  { ... },
    methods:{
        //默认方法
        onInit    : ƒ ()
        onCreated : ƒ ()
        onAwake   : ƒ ()
        onSleep   : ƒ ()
        onDestroy : ƒ ()
        //自定义属性\\方法
        ..... 
    },
    timer:{ ... },
});  
`,
},
//id
{
bt:'id',
str:`
%1●  string : 唯一 , 用于标记获取 Eng实例 对象  ;   通过Eng.get( appId || appData ) 的方式
%r
~
`,
},
//el
{
bt:'el',
str:`
%1●  domID , domNode 或  html文本 , 后者多用于 封装组件
●  %0注意%r: html文本  根节点必须是唯一且闭合的
%r
~
`,
},
//css
{
bt:'css',
str:`
%1●  当前APP实例的 专属作用域css样式文本  ==== <style>标签内容 , 多用于封装组件 ,避免样式污染
%r
`,
},
//parent
{
bt:'parent',
str:`
%1●  domId 或 domNode : app实例 el 节点 的 父容器,  多用于封装组件的, 显示在页面的指定位置(基于父元素)
%r
`,
},
//dataOnly
{
bt:'dataOnly',
str:`
%1●  默认false: 当为true时 , 仅对纯数据响应, 不再处理el 节点  
●  这里推荐 作为 router 路由使用, 在Eng中 路由的实现 , 操作成本及其简单 ,  仅作为实现思路范例提供 
%r
~
`,
},
//data
{
bt:'data : {...}',
str:`
%1数据{...}
%0注意:%r 数据中 所有 {...} json对象都是 e-base, 所有 [...] 数组对象都是 e-for
%r
`,
},
//watcher
{
bt:'watcher : {...}',
index:10,
str:`
%1
●  注册观察 指定数据 的变化 , 并进行相应处理
示例:
%r
appData=new Eng({
      el:...
      data:{
        v:123,
        base0:{
            v:123
        },
        base1:{
            v0:11111
            v1:22222
        }
      },
      watcher:{
          v:function(oldValue,newValue,items){
                /*
                  items={ 
                      data:   ==== this.$_data === appData
                      el: ...
                      id: "...."
                      idDoms:  {...}    //所有e-id标记的dom节点
                      methods: {...}
                  }                 
                */
                //this === methods
                //return  xxxx;  // 根据 newValue 判断返回要修改的结果值 (若有必要修改) 
          },
          'base0.v': ƒ (...),
          //第二种写法
           base1:{
               v0:ƒ (...),
               v1:ƒ (...) 
           }
      }
}); 
`,
},
//watcherFor
{
bt:'wactherFor : {...}',
index:11,
str:`
%1
●  用于处理每一个被循环的子元素数据 (当数组发生变化时)
●  %0注意%r 被循环数据的 键 命名 在 appData 中具有唯一性 (相同命名时 , 仅处理逻辑顺序的最后一个)
●  %0注意%r watcherFor 中可以 向被循环元素数据 写入其它字段数据, 方便逻辑运算 , 以%0$_%r开头的key可避免被复制,污染数据 
示例:
%r
html='
  <div id='app'>
      <div>
          <span e-for='for'>
              index = {{$_index}}__value={{value}}
          </span>
       </div>
  </div>
';
appData=new Eng({
  el:elDom,
  id:'app',
  data:{
      for:[
          {value:123},{value:456},{value:789},      
      ]
  },
  watcherFor:{
        for:function(item){
              /* 
                item={
                    addWatcher: ƒ (e)                         //基于当前for循环前置数据路径, 注册watcher方法 (当单独建立数据响应关系时)
                    parent: ƒ(deep)                           //用于循环嵌套时的子循环向上查找父循环元素数据, 默认deep=1, 当父循环不存在时 返回 undefined
                    pos:[]                                    //从根循环到子循环的index路径 ,  如果当前元素的index=2 ,父循环元素的index=1 , 则此时 pos=[1,2] 
                    data: {…}                                 //全局数据 
                    forData: {txt: "hahaha", for2: Array(1)}  //被循环元素数据
                    forDataAll: [{…}]                         //被循环数组数组
                    forDom: div                               //循环创建的dom节点 
                    id: "app"                                 //
                    index: 0,                                 //被循环元素的index 
                    
                }
            */

        }
  }
});
`,
},
//domEvent
{
bt:'domEvent : {...}',
str:`
%1
●  注册对应dom的事件方法
●  %0注意%r  e-event='onclick=click' 等价于 domNode.onclick=click(){...}  === 与 原生js 节点事件绑定方式 完全一致
示例:
%r
html='
    <button e-event='onclick=click;ondblclick=dblclick'> 按钮 </button>
';
appData=new Eng({
      ...
      domEvent:{
          // 单击
          click:function(items,evt){
              /* 
                items={
                    data: 
                    idDoms:  { ... }  // e-id 储存的dom
                    methods: { ... }
                    this:dom  ,       // 当前事件 dom 节点
                    baseData: ,       // 当前base 作用域数据 
                };
                evt  ===  event
                this ===  methods
                */
          },
          // 双击
          dblclick:function(items,evt){
              ...
          }
      }
});
`,
},
//mthods
{
bt:'methods : {...}',
str:`
%1
●  自定义(包含默认)属性方法域 , 实例中所有this均指向 methods
实例:
%r
new Eng({
    ...
    methods:{
        //默认方法       ~~~~~~
        onInit    : ƒ ()      //实例初始化时 
        onCreated : ƒ ()      //实例创建完成 , 并添加到页面指定位置时
        onAwake   : ƒ ()      //实例被唤醒时 , 从内存中添加到页面 
        onSleep   : ƒ ()      //实例休眠时  , 从页面中暂时删除 , 暂存于内存中 , timer计时器停止运行 , 仍可正常访问 (部分页面交互功能受限) 
        onDestroy : ƒ ()      //实例完全销毁时 , 
        //自定义属性\方法 ~~~~~
        value0:123,
        value1:456,
        fun0:function(){
            console.log(this.value0); // 123
            console.log(this.value1); // 456
        },
        fun1:function(){
        }
        .....  
    }
});
`,
},
//timer
{
bt:'timer : {...}',
str:`
%1timer

●  用于 延迟或循环 计时 
●  示例:
%r
appData=new Eng({
  ...
  methods:{
        timer1:function(){
            /* 
                return true 可以提前结束计时器运行 , 
                            但当每次 awake() 唤醒后, 都会重新触发计时器运行 
                            若无必要 需加自定义属性 , 进行逻辑判断 
            */
        },
        timer2:function(){
            ....
        }
  },
  timer:{
        //计时器命名 必须与 methods 内的方法名 对应 
        time1:{
              type:'time' ,    // 按时间执行
              time:3000,       // 间隔
              loop:true,       // true:  循环调用 , false: 延迟 
        },
        time2:{
              type:'fps' ,     // 按帧执行
              fps:120,         // 多少帧调用一次 , 默认1
        }   
  },
});
  `
},

//行内属性 #############################################################################################
{
  bt:'行内属性/参数 <div  ....  >/div>',
},
//e-base
{
bt:'e-base',
index:0,
str:`
%1
☆  e-base='xxx' 当前数据的作用域 
%r
html='
  <div id='app'>
        <div>{{v0}}</div>
        <div e-base='base1'>
              <span>{{v0}}</span><br>
              <span>{{$_parent.v0}}</span>             //或者 $_p.v0  访问上级json域
        </div>
        <div e-base='base2.base3'>
              <span>{{v0}}</span><br>
              <span>{{$_parent.$_parent.v0}}</span>    //或者 $_p.v0  访问上级json域
        </div>
  </div>
';
app=new Eng({
    ...
    data:{
        v0:'根域下 下的 v0 ',
        base1:{
            v0:'base1 域下的 v0'
        },
        base2:{
            base3:{
                v0:'base3 域下的 v0',
            }
        },
    },
    ...
});
`,
},
//e-attr
{
bt:'e-attr',
index:1,
str:`
%1
☆  e-attr='class=class' || 'class=class1?red:blue' ||  'class=class2>10?red:blue' || 'class=class3==10?red:blue' 

●  支持所有 可以直接赋值的 行内属性 和 直接属性
●  以 ; 分割不同属性  例: xxx=xx;xxx2=xx
%r
appData=new Eng({
      ...
      data:{
          class:'yellow'
          clsss1:true,
          class2:6,
          class3:10,
      }
})
`,
},
//e-style
{
bt:'e-style',
index:2,
str:`
%1
☆  e-style="width=width;backgroundColor=color";

●  修改目标style样式, 
●  注意是 驼峰属性名  backgroundColor✔  background-color✖  (  === 原生js 的 dom.style.xxxx=xxx)
%r
~
`
},
//e-input
{
bt:'e-input',
index:3,
str:`
%1
☆  e-input='value'

●  用于所有支持 oninput 事件的 dom  例: <input text>  ...
%r
~
` 
},
//e-change
{
bt:'e-change',
index:4,
str:`
%1
☆  e-change='value'

●  用于所有支持 onchange 事件的 dom  例: <input text>  , <select>...
%r
~
` 
},
//e-event
{
bt:'e-event',
index:5,
str:`
%1
☆  e-event="onclick=click" || "onclick=click;onblur=blur"

●  等价于 domNode.onclick=click , 
●  %0注意%r : 数组循环内绑定的dom事件item参数 ,与数组外的有所区别 ,参下
%r
appData=new Eng({
      ...
      domEvent:{
          //普通dom事件 , 
          click:function(item,evt){
                    /*  item={
                            data: {...}     // 全局数据 
                            idDoms: {...}   // e-id 储存的dom
                            this:domNode,   // 事件dom节点
                            baseData:{...}, // 当前  base 域数据 
                            methods:{ …}    //
                        };
                        evt = domEvent
                        this = methods
                  */
                  
          },
          //数组循环内 绑定的 dom事件
          inForClick:function(item,evt){
                    /* 
                      item={
                            idDoms: {...}       //e-id 储存的dom 
                            data: {…}           //全局数据 
                            forData: {}         //被循环元素数据
                            forDataAll: [(...)] //被循环数组数据
                            index: 0            //被循环元素的index 
                            pos: (2) [0, 0],    //从根数组到当前数组元素的index路径 ,  如果当前元素的index=2 ,父循环元素的index=1 , 则此时 pos=[1,2] 
                            parent: ƒ(deep)     //用于循环嵌套时的子循环向上查找父循环元素数据, 默认deep=1, 当父循环不存在时 返回 undefined 
                            this:domNode,       //事件dom节点
                            methods: {...}}
                      };
                      evt = domEvent
                      this = methods
                    */
          },
          blur:function(){

          }
      },
      methods:{...}
})

~
` 
},
//e-html
{
bt:'e-html',
index:6,
str:`
%1
☆  e-html="string",

●  等价于  domNode.innerHTML  ,  因为是覆盖式写入 e-html 节点的子元素均不会被 解析
%r
~
`
},
//e-id
{
bt:'e-id',
index:7,
str:`
%1
☆  e-id='idName'

●  自定义节点名称(唯一) ,  通过 this.$_idDoms.idName  或  item.idDoms.idName 获取dom节点 
%r
~
`
},
//e-for
{
bt:'e-for',
index:8,
str:`
%1
☆  e-for='idForName'

●  当前路径被循环的数组数据
●  %0注意%r : 命名 唯一 (因 watcherFor 的需要)   
●  响应支持 'push','unshift','pop','shift','splice','sort','reverse','concat' 方法
●  被循环元素会添加到父元素的尾部, 所以 如果没有确定的父元素时, 会出现在同辈元素之后
●  {{$_index}} 输出被循环元素的 index ,  {{$_value}} 用于输出基本类型数组的数据
%r
html="
<div>
      <div e-for='for0'>
        <span>for0 -- index = {{$_indx}} --- {{v}}</span>
        <span e-for='for1'>
            for1 -- index = {{$_index}} --- {{$_value}}
        </span>
      <div>
</div>
"
appData=new Eng({
     ...
     data:{
        for0:[
            {
              v:1111,
              for1:[1,2,3,4]
            },
            {
              v:2222,
              for1:[4,3,2,1]
            }
        ]
     }
});

~
`
},
//e-stop
{
bt:'e-stop',
index:9,
str:`
%1
☆  e-stop

●  Eng 不会解析有 e-stop 行内属性的节点 , 及其子元素
%r

~
`
},

//methods  #############################################################################################

//获取操作Eng实例 ########################################################################################
{
bt:'获取操作Eng实例',
},
//获取实例 通过 Eng.get(..)
{
bt:'通过 Eng.get(..)',
str:`
%1
●  获取 Eng 实例 , 通过 appData  或  appName
%r
appData=new Eng({
     ...
     id:'appName'
     ...
});

appObj = Eng.get( appData ||  Eng.get('appName')


appObj={
      awake: ƒ ()        //  唤醒  (parentDom , args0,args1,....)  //parentDom:指定页面显示位置(基于父元素), 若无会基于创建时的父元素
      destroy: ƒ ()      //  销毁  (arg0,arg1....)
      sleep: ƒ ()        //  休眠 (arg0,arg1.....)
      methods: {…}       //  实例的自定义属性方法域
      state: '' ,        //  三种实例状态 => 'active':(在页面), 'sleep'(在内存), 'die':(已销毁),
      el:node,           //  实例的 el 节点,若有   
      data: {…}          //  可直接修改实例的引用数据
      setData: ƒ (data)  //  对实例进行全新完整的数据覆盖
}


~
`  
},
//通过this
{
bt:'通过实例 this 操作 ',
str:`
%1
●  除了可以通过 Eng.get 的方式 也 可以通过实例创建后传递  this  操作 (不建议, 用法上稍有区别 , 大同小异)
%r
appObj=null;

new Eng({
     '''
     methods:{
        onCreated:function(){
             appObj=this;
             /* 
             this = {
                  $_el: node                              // el节点
                  $_id: xxx                               // app  id
                  $_idDoms: { ... }                       // 储存 所有 e-id 的dom节点 
                  $_state:  "active"                      // app 实例状态  active:在页面显示 ; sleep:内存中不在页面 , die:销毁
                  $_data:   { ... }                       // 用于赋值修改数据 
                  $_awake:  (parentDom,[arg0,arg1,...])   // 唤醒 ,  备用不推荐, 通常使用 Eng.get('appId').awake()的方式
                  $_sleep:  (arg0,arg1...)                // 休眠 ,  所有timer相关方法暂停执行    
                  $_destroy: ƒ                            // 销毁   
             }
             */

        }
     }
});

`
},
//自定义组件封装 (参考范例)####################################################################################
{
bt:'自定义组件封装 ( 范例参考 )'
},
//参考范例
{
bt:'自定义组件范例',
str:`
%1
●  自定义组件方法名 , 使用 html文本, 私有css样式 通过传参 调用 

●  用途: 对于简单逻辑结构页面 没必要使用 前端路由 , 通过调用组件的 创建,销毁和休眠就可实现 等价 目标 (事实上 Eng的 Router组件 也是基于此 实现, 只是更复杂一点)  
%r
<script>

var component=function(parentDom,data){   //parentDom : 父元素,  data:组件数据 
     //html文本 (根标签必须闭合)
      var html="
          <div>
                ...
          </div>
      ";
      //私有样式
      var css="
          .xxx{
              width:300px;
              height:200px;
          }
          ...
      "
      //返回组件
      var app=new Eng({
            id:'app01'
            el:html,
            css:css,
            parent:parentDom,  //显示的位置, 基于父元素
            data:data
            ....
      });
      return Eng.get(app);
};



</script>

`
},
//Router(思路 与 routerCfg配置) ##################################################################################
{
bt:'Router组件 与 routerCfg配置 '
},
//实现思路
{
bt:'routerCfg 的思路架构',    
str:`
%1
●  正如Eng 的实现思路 : ( JSON数据结构 与 DOM 树的 结构几乎一致 , 彼此通过 路径匹配 映射,  进而数据关联 )  
     Eng 路由插件 就是 一个 new Eng() 组件对象 , 其实现思路也是 基于  JSON 结构  

●  基本逻辑思路结构参下:   
%r
%1
//1: 根据页面结构 , 将页面划分为不同区域 , 同级/辈区域 一般为互斥关系
//2: 每个区域 有自己的 私有组件位置的父容器
//3: 子区域 继承 1和2 的设定
//4: 所有组件name 命名必须唯一 (方便逻辑梳理)
//5: 如上 得出 如下的Eng路由配置 json 架构:
%r
routerCfg={
    '区域1':{
           ...  设置container 子组件/区域 容器.....
           ...  self 区域组件自身 ...
           .... 定义配置 默认行为 与其它区域,组件的关系 ....
           .... 定义配置 私有组件之间的关系 和 位置 .... 
           
           childAreaes:{
                 .... 子区域 继承 父区域的参数设置方式, 无限嵌套, 一脉相承 .....
           }
    },

    // 同级/辈 区域
    '区域2':....  
}
`
},
//Router 参数配置
{
bt:'routerCfg 参数配置说明',    
str:`
%1
☆  routerCfg 全参数配置说明  ()

●  区域组件: 用于容纳 私有组件 和 公共组件  ; 
●  私有组件: 每个区域事先定义的固有组件 ,  须先在每个区域定义 ; 
●  公共组件: 可以自由活动的组件 , 在不同区域间转移 , 共有  
%r

var routerCfg={
    env:'dev',         // dev:开发模式  (解析 h5页面)  test:测试模式 (直接请求h5页面的 js文件 , 需要先 build)
    default:['login'], // 默认打开区域  (必须是根区域, 基于body 或 页面默认存在的dom节点) 
    //公共/活动 组件 , 一般用于公共组件 , 不默认属于任何area  , 
    publicComponents:{
          /* 
             '组件Name':['areaPath',null,'sleep','cache'],   
                      %0//  0: 公共组件的 所属 名义上的区域, 用于后端配置分类请求路径 , 仅对后端有意义  %r
          */
         foot:['public',null,'sleep','no-cache']
    },
    //页面区域 布局
    areas:{
         //参考区域
  
         //定义区域组件 , (所有组件类型 命名 全局唯一)
         '区域name':{
                // 定义 子组件/区域 的父容器  
                container:{
                     //位置  (子组件/区域 的父容器位置 , 一个区域可以有很多个 位置)
                     top:{
                         type:'tag',      // name的类型=> id:domId , tag:tag, class:class
                         name:'body',  
                        //index:0,        // 默认0 , 当type = tag 或 class 时  , 指向具体index , 基于组件查找 ,非全局
                     },
                    // ...    
                },
  
                // 区域自身 
                self:{
                     parent:{              // 自身的父容器
                         type:'tag',       
                         name:'body',
                         //index:0,        
                     },
                     default:'destroy',    // destroy : 关闭销毁(默认) , sleep : 放入内存
                },

                // 默认打开的公共组件
                openPublicComments:[
                       ['公共组件Name','区域.位置'],      //  "区域.位置" :  公共活动组件的指定添加  区域.位置
                ],
                // 默认打开的私有组件             
                openComponents: ['组件Name0','组件Name1'],//  打开时不支持  "区域.位置"
  
                // 默认关闭的组件元素 
                closeComponents:['组件Name0','组件Name1'],
  
                // 默认打开的其它区域      
                openAreas:      ['区域Name0','区域Name1'],   
  
                // 默认关闭的其它区域
                closeAreas:     ['区域Name0','区域1.位置'],//  "区域1.位置" : 关闭该区域下某个位置的组件 , 而非区域本身  ; 如: area.left : 关闭area区域下container.left 位置的组件
  
                // 定义本区域的 私有组件 ( 必须先定义 , 后使用 )
                components:{
                //'私有组件0': ['top','mutex','destroy','cache',[]],
                            /*  0 =>  container 中设置的父元素位置
                                1 =>  mutex: 互斥 (每个位置的 组件, 只允许存在一个) ;  coexist: 每个位置的组件可以同时共存 , 按照创建先后顺序放置
                                2 =>  当  mutex 时 , 互斥组件的处理方式  destroy : 销毁其它的 , sleep : 其它暂时放入内存(高频使用,暂时无需销毁的组件) 
                                3 =>  cache: 创建时的 传参 储存  (F5刷新后有效),  no-cache:不储存创建时的传参  
                                4 =>  ['xxx0.js','xxx1.js']  依赖的js 地址列表
                                5 =>  [ [关闭区域列表...] , [关闭组件列表.....] ] ,  多用于混合区域  (如: 同一个父区域下 , 同一个位置 可能会 同时添加 私有组件 和 区域组件, 彼此互斥 ) 
                            */
                },
                //子区域 若有 (某个子组件自带的 )
                childAreaes:{
                     // '子区域': 配置参考父区域 
                },
         },
       
         //其它同级/同辈区域 .....   (通常设置为互斥关系) 
       
    },
};
`
},
// routerCfg简略配置范例
{
bt:'routerCfg 简略配置 (范例参考)',    
str:`
%1
●  步骤 1: 引入 eng.js  , 2: 配置路由 routerCfg  3:引入 eng_router.js 
%r

%1●  简略配置  %r
var routerCfg={
      //开发模式
      env:'dev',
      //默认打开 login区域
      default:['login'],
      //定义所有区域关系
      areas:{
            login:{
                self:{
                        parent:{type:'tag',name:'body'},
                },
                cloaseAreas:['workArea']
            }
            workArea:{
                container:{
                        left:{type:'class',name:'left'},
                        right:{type:'class',name:'left'},
                },
                self:{
                        parent:{type:'tag',name:'body'},
                },
                closeAreas:['login'],
                openComponents:['zj0','zj2'],
                components:{
                        'zj0':['left','mutex','destroy','cache'],
                        'zj1':['left','mutex','destroy','cache'],
                        'zj2':['right','mutex','destroy','cache'],
                        'zj3':['right','mutex','destroy','cache'],
                }
            }
      },
};

%1●  以上配置中可见 :默认打开 login 区域 ,  login 与 workArea 区域页面互斥 
                     workArea下默认显示 zj0 和 zj2 其下 zj0和1互斥, zj2和3互斥 
%r
`
},
//Router 项目结构与开发 ##################################################################################
{
bt:'Router 项目结构与开发',    
},
//项目结构
{
bt:'项目结构',    
str:`
%1
●  Router 提供一个 基于node 的基本后端服务文件  eng_server.js
%r
  node eng_server 80     (启动服务 端口号不设置 则默认80)

  node eng_server build  (初级打包 ,将 h5组件页面, 封装成js文件)
                           (有 less,sass 和 压缩 等其它需求的 , 自己引入相关 包 并修改 eng-server.js 进行二次开发!  
                            我不提供全家桶  Eng只是灵活的纯插件 , 满足基本需求 , 不参与 , 不谋求 制定行业 码农流水线 生产标准 ) 
                          

----------------
%1
●  后端配置文件 , 逻辑结构简单 , 一目了然 eng_server_cfg.txt        (为什么不是 .json ? 因为写注释要报错, 强迫症请自行修改!)
%r
{
    //项目根路径
    "path":"./files",
    //区域路径映射表    
    "areaPathList":{

        //每个区域组件的 idName 对应一个配置选项  分别为 dev : 开发目录 和  test: build输出目录 

        "public":['开发目录/public', "测试目录/public"],
        "login":['开发目录'      ,  '测试目录'],      
        "main" :['开发目录/main' ,  '测试目录/main'],
        "m_r_area":['开发目录/main/m_r_area','测试目录/main/m_r_area'],
        
    }
}  
`
},
//开发组件页面
{
bt:'开发组件页面', 
str:`
%1
●  Eng的组件开发页面 仍然是传统的 标准 html , 区别是删除了额外的标签干扰项
●  html的命名必须与组件id一致  (与Router 约定的格式  )
●  JS 部分定义一个固定格式     (与Router 约定的格式 )
%r
●  例: ------ test.html -------- 

        <style>
             ....
        <style>

        <html>
            <!-- <html>不是根标签  -->

        </html>

        <script>

            var app=new Eng({
                id:'test',
                el:html,
                parent:parentDom,
                css:css,
                //...
            });

        </script>
%1
●  页面只有 style , html 和 script标签 , 删除所有无关选项 ( eng_server.js 通过正则 分离合并)
●  html 不是根标签 , 不是组件本身
●  script 基本固定配置 必须如上所示, 因为这是与 Router 和 eng_server.js 约定好的解析格式 (当然你也可以自行修改)

●  以上部分最终会被合并解析为如下js 格式 返回前端
%r
●  ---------- test.js ---------

Router.components.test=function(parentDom,data){
  var css="....";
  var html="....";
  var app=new Eng({
        el:html,
        parent:parentDom,
        id:'main_left3',
        css:css,
        .... Your Code ....
      });
      return  Eng.get(app);   
};
%1
●  参数:
       parentDom : 就是组件的父元素位置 , 通过routerCfg配置指定
       data :      创建组件时传递给组件的数据
●  实际上就是约定规定了一个 方便解析处理的固定格式 , 合并为一个闭包组件函数  (二次开发 , 可自行修改)

%r
`
},
// Router 基本方法      ##################################################################################
{
bt:'Router 基本方法',    
},
// Router.openArea(areaName,data,callba)
{
bt:'Router.openArea(...) 打开指定区域',    
str:`
%1
☆  Router.openArea( areaName , data , callback)

●  areaName : 要打开的区域名          (注意: 会触发 routerCfg的默认配置, 该区域的父容器必须存在 )
●  data :     传递给组件的数据 ,      (注意: 只在首次创建时生效, 存活中的区域组件无效 )
●  callback:  完成时回调 , 参数 err   (注意: err= 'err'||'stop' , 前者加载失败, 后者被其它组件阻止) 

%r
`
},
//Router.closeArea(areaName,force)
{
bt:'Router.closeArea(...) 关闭指定区域',    
str:`
%1
☆  Router.closeArea( areaName , force)

●  areaName : 要关闭的区域名称
●  force    : true时, 强制销毁 设置为 sleep 的区域组件
%r
`
},
//Router.openComponent(..) 打开指定组件
{
bt:'Router.openComponent(...) 打开指定组件',    
str:`
%1
☆  Router.openComponent( name , data , callBack )

●  name :    要打开的组件名称
●  data :    传递给组件的数据 ,      (注意: 只在首次创建时生效, 存活中的区域组件无效 )
●  callBack: 完成时回调 , 参数 err   (注意: err= 'err'||'loading' , 前者加载失败, 后者重复加载 ) 
%r
`
},
//Router.closeComponent
{
bt:'Router.closeComponent(...) 关闭指定组件',    
str:`
%1
☆  Router.closeComponent( name , force)

●  name   :  要关闭的组件名称
●  force  :  true时, 强制销毁 设置为 sleep 的组件
%r
`
},
//openElementToArea
{
bt:'Router.openElementToArea(...) 将指定组件添加到指定的 区域.位置',    
str:`
%1
☆  Router.openElementToArea( name , areaPosition , data , callback)

●  主要用于公共活动组件的创建
●  name :     要打开的组件名称          (注意: 会触发 routerCfg的默认配置, 该区域的父容器必须存在 )
●  areaPosition: 要添加的 '区域.位置'   
●  data :     传递给组件的数据 ,        (注意: 只在首次创建时生效, 存活中的区域组件无效)
●  callback:  完成时回调 , 参数 err     (注意: err= 'err'||'stop' , 前者加载失败, 后者被其它组件阻止) 
%r
`
},
//Router.addAreaListener
{
bt:'Router.addAreaListener(...) 监听区域开关事件',    
str:`
☆  Router.addAreaListener({...})

示例:
    Router.addAreaListener({
        name:'name',
        evt:'open',
        callBack:function( err ){
            //.....
            return true;
        },
    });
%1
●  name : 区域名称
●  evt  : 事件类型 "open" , "created" , "close" ;  当监听"open"事件时, return true 才能打开,   注意:这里不支持异步
●  err  : 打开失败 (若为真) 
%r
`
},
// Router.openDefault
{
bt:'Router.openDefault() 打开默认区域',    
str:`
%1
●  打开默认区域 , 多用于首页 或 异常返回 

%r
`
},
//注意事项 与 使用技巧
{
bt:'注意事项 与 使用技巧',    
str:`
%1

●  可与绝大部分插件混用 , 但当组件关闭时, 要注意其它插件的及时销毁 , 在 methods.onDestroy 方法内销毁

●  可以与 vue 混用 , vue的 v-pre 指令 和 Eng 的 e-stop 指令的 子元素可以作为组件对象, 互不干扰   

%r
`
},

//该类插件的实现 ######################################################################################
{
bt:'该类插件的实现',
},

//核心思路
{
bt:'核心思路',
str:`
%1

Dom的结构事实上 是一个 json 树  , 与 josn 数据结构本身几乎一致

所以%0核心思路%r 是将 domJson  与 dataJson 的 数值路径 , 相互匹配映射,  利用 Object.defineProperty 的特性, 实现数据响应

如果 做到 这一步  , 就已经完成了 80%  , 剩下的20%以功能的支持 和 填各种零碎的小坑为主(但却最耗时)

是的! 这就是整个 Eng的核心 (%0想法与思路%r) , 而非代码本身! 我已经传授给你了!

当初 数据渲染刚火, 还未流行开来时, 了解到Object.defineProperty还有这个玩法 , 基于上面的想法和思路摸鱼2周完成了Eng1,0的核心.

所以 先有%0想法思路%r 后有代码 , 读完整源码并不见得对你有什么质帮助!!!!!! 基础知识点的掌握与应用才是根本 (刷题并不能提高你得开发能力, 除了面试)

PS: 时隔多年 , 因方便简化工作内容需要 , (当初认为, 会出现大量 专用碎片化, 但简单易用的数据渲染插件 , 但事与愿违 , 全家桶统一天下 ) 遂更新2.0 自用or分享  
   (期间拿Eng1.0 写的部分试验型轮子 , 参看github)

%r
`
},


];

//   %1   %r

/* 

//
{
bt:'',    
str:`
%1

>
%r
`
},


*/