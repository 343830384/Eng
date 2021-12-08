
//路由基本配置
var routerCfg={
  env:'dev',         // dev:开发模式  (解析 h5页面)  test:测试模式 (直接请求h5页面的 js文件 , 需要先 build)
  default:['login'], // 必须是根区域, 基于body 或 页面默认存在的dom节点) 
  //公共/活动 组件 , 一般用于公共组件 , 不默认属于任何area  , 
  publicComponents:{
        /* 
           '组件Name':['path',null,'sleep','cache'],   
                    //  0: 公共组件的 所属 名义上的区域, 用于后端配置分类请求路径 , 仅对后端有意义 
        */
       foot:['public',null,'sleep','no-cache']
  },
  //页面区域 布局
  areas:{
       //参考区域

       //定义区域组件 , (所有组件类型 命名 全局唯一)
       '区域idName':{
              // 定义 子组件/区域 的父容器  
              container:{
                   //位置  (子组件/区域 的父容器位置 , 一个区域可以有很多个 位置)
                   top:{
                       type:'id',      // name的类型=> id:domId , tag:tag, class:class
                       name:'right',  
                      //index:0,       // 默认0 , 当type = tag 或 class 时  , 指向具体index , 基于组件查找 ,非全局
                   },
                  // left:{ ... }     
              },

              // 区域自身 
              self:{
                   parent:{            // 自身的父容器
                       type:'id',      
                       name:'right',
                       //index:0,      
                   },
                   default:'destroy',   // destroy : 关闭销毁(默认) , sleep : 放入内存
              },
              //打开 公共组件
              openPublicComments:[
                     ['公共组件Name','区域.位置'],      //  "区域.位置" :  公共活动组件的指定添加  区域.位置
              ],
              // 默认打开的组件             
              openComponents: ['组件Name0','组件Name1'], // 打开时不支持  "区域.位置"

              // 默认关闭的组件元素 
              closeComponents:['组件Name0','组件Name1'],

              // 默认打开的其它区域     
              openAreas:      ['区域Name0','区域Name1'],   

              // 默认关闭的其它区域
              closeAreas:     ['区域Name0','区域1.位置'],//  "区域1.位置" : 关闭该区域下某个位置的组件 , 而非区域本身  ; 如: area.left : 关闭area区域下container.left 位置的组件

               // 定义本区域的 私有组件 ( 必须先定义 , 后使用 )
              components:{
              //'私有组件0': ['top','mutex','destroy','cache', [...] , [[...],[...]] ],
                            /*  0 =>  container 中设置的父元素位置
                                1 =>  mutex: 互斥 (每个位置的 组件, 只允许存在一个) ;  coexist: 每个位置的组件可以同时共存 , 按照创建先后顺序放置
                                2 =>  当  mutex 时 , 互斥组件的处理方式  destroy : 销毁其它的 , sleep : 其它暂时放入内存(高频使用,暂时无需销毁的组件) 
                                3 =>  cache: 创建时的 传参 储存  (F5刷新后有效),  no-cache:不储存创建时的传参  
                                4 =>  ['xxx0.js','xxx1.js'] 组件依赖的js 地址列表 
                                5 =>  [ [关闭区域列表...] , [关闭组件列表.....] ]  额外设置,当该私有组件打开时, 关闭其它区域 或 组件 (其中区域支持 , 区域.位置 )
                            */
              },
              //子区域 若有 (某个子组件自带的 )
              childAreaes:{
                  /*   '子区域':{
                            // 设置 参看父区域  
                       },
                  */
              },
       },
     
       //其它同级/同辈区域 .....   (通常设置为互斥关系) 
     
  },//layout End
  //
};