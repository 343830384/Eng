
//路由基本配置
var routerCfg={
  // env:'dev',      // dev:开发模式  (解析 h5页面)  test:测试模式 (直接请求h5页面的 js文件 , 需要先 build)
  env:'dev',
  default:['login'], // 默认打开区域 ,同辈区域才能同时打开多个 
  //公共/活动 组件 , 一般用于公共组件 , 不默认属于任何area  , 
  publicComponents:{
        /* 
           '组件Name':['path',null,'sleep','cache'],   
                    //  0: 公共组件 Path ,   相当于 区域 文件夹路径, 用于后台请求地址 
        */
       foot:['public',null,'sleep','no-cache']
  },
  //页面区域 布局
  areas:{
       
       //登录页
       'login':{
              container:{
                  foot:{
                      type:'class',
                      name:'foot',
                  }
              },
              self:{
                  parent:{
                      type:'tag', name:'body',
                  },
              },
              closeAreas:['main'],
              openPublicComments:[
                    ['foot','login.foot']
               ],
       },//login End ~~~~~~~~~~~

       //主区域 
       main:{
              container:{
                   left:{
                       type:'class',
                       name:'left'
                   },
                   right:{
                       type:'class',
                       name:'right',
                   },
                   foot:{
                       type:'class',
                       name:'foot',
                   }
              },
              self:{
                  parent:{
                      type:'tag',     
                      name:'body'
                  },
              },
              openComponents:['main_left1','main_right1'],
              openPublicComments:[
                  ['foot','main.foot']
              ],
              closeAreas:['login'],
              components:{
                   'main_left1':['left','mutex','destroy','cache'],
                   'main_left2':['left','mutex','destroy','cache'],
                   'main_left3':['left','mutex','destroy','cache'],
                   'main_right1':['right','mutex','destroy','cache',null,[['m_r_area'],null]],
                   'main_right2':['right','mutex','destroy','cache',null,[['m_r_area'],null]],
              },
              childAreaes:{
                    m_r_area:{
                          self:{
                              parent:{
                                  type:'class',     
                                  name:'right'
                              },
                          },
                          closeAreas:['main.right']
                    },

              },
       },
  },//layout End
  //
};