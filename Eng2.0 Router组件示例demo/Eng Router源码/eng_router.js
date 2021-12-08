//uglifyjs eng_router.js -m -c -o eng_router_min.js 

new Eng({
     id:'Router',
     dataOnly:true,
     data:{
         //加载事件,
         load:{
             
         },
     },
     watcher:{

     },
     methods:{
         onCreated:function(){
             var t=this;
                 t.cfgInit();    //路由配置初始化 
                 window.Router=t;
                 //防止注册事件 无法响应
                 setTimeout(function(){
                    t.hashListen();
                 });
                 console.log('Eng  路由创建成功');
         },
         //阻止 openDefault 重复打开
         openZZ:false,
         //默认打开的区域
         openDefault:function(){
           var t=this,o=routerCfg,arr=o.default,i=-1,l=0;
                if(t.openZZ){
                    console.log('阻止');
                    return;
                };
               if(arr instanceof Array)l=arr.length;   
           var fun=function(){
               i++;
               if(i<l){
                  t.openArea(arr[i],null,function(err){
                       fun();
                  });
               }else{
                   fun=null;
                   t.openZZ=false;
               };
           };
           if(l){
               t.openZZ=true;
               fun();
           };        
         },
         //监听 URL的 hash变化
         hashListen:function(){  //location.hash
             var t=this,str=location.hash;
                 window.addEventListener('hashchange',function(){
                        str=location.hash;
                        str=str.replace(/^\#/,'');
                        // console.log('hashChange  => '+ decodeURI(str));
                        t.hashResolve(str);
                 });
                 str=str.replace(/^\#/,'');
                 t.hashResolve(str);
         },
         hashF:false,   //true  解析hash 地址时, 禁止 pathChange 和 hashResolve响应
         //hash解析
         hashResolve:function(str){
           var t=this,pd=t.pathData,o;
                 if(t.hashF)return; 
                 if(str!==''&&pd.pathStr===str){
                    //   console.log('相同~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                    return
                 };
                //  return;
                 t.hashF=true;
           var   str2=decodeURI(str).trim();
                 try {
                     if(str2)o=JSON.parse(str2);
                 }catch(err) {
                     o=null;
                 };
                 var step;
                     if(o)step=t.hashStep(o);

                     if(step){
                            t.stepToBuild(step,function(){
                                pd.pathStr=str;
                                pd.path=o;
                                t.hashF=false;
                            });
                     }else{
                            pd.pathStr='';
                            pd.path={};
                            t.hashF=false;
                            t.openDefault();
                     };
         },
         //根据创建步骤,创建
         stepToBuild:function(step,cb){
             var t=this,i=-1,l=step.length;
                //  console.log('step start  ~~~~~~~~~~~~~~ '); 
                //  step.forEach(function(v){
                //       console.log('step   ====>   '+ JSON.stringify(v) );
                //  });
             var fun=function(){
                        i++;
                        if(i<l){
                            var d=step[i],n=d[0],v=d[1],s=d[2];
                                if(n===0){       // area
                                    t.openArea(v,null,function(res){
                                        fun();
                                    });
                                }else if(n===1){ // 私有组件
                                    /* t.openComponent(v,null,function(res){
                                        fun();
                                    }); */
                                    t.openComponent(v);
                                    fun();
                                }else{           // 公共组件
                                    /* t.openComponent(v,null,function(res){
                                        fun();
                                    },s); */
                                    t.openComponent(v,null,null,s);
                                    fun();
                                };
                        }else{
                                fun=null;
                                cb();
                        };
              };
              fun();
         },
         //解析创建步骤
         hashStep:function(o,step){ 
           var t=this,i=0,l=0,v,k;
               if(!step)step=[];
               for(k in o){
                    v=o[k];
                    if(v===1){                    //  非默认打开的 私有组件
                        step.push([1,k]);
                    }else if(typeof(v)==='string'){// 非默认打开的 公共组件
                        step.push([2,k]);
                    }else{// area                  // 非默认打开的 area
                            step.push([0,k,v]);
                            t.hashStep(v,step);
                    }; 
               };
              return step.length?step:null;  
         },
         //记录当前路径
         pathData:{
             pathStr:'',  // 路径字符串,用于比对 
             step:[       // 记录每一步的操作 ,  不包含关联操作 以及涉及子元素的操作 
             ],     
             path:{       // 当前打开的区域路径,用于生产路径字符串
                 /* 
                  area:{
                      zjName0:1,            // 私有组件
                      zjName0:'填充位置',   // 公有组件
                  },
                 */
             },
         },
         /**
          * 当 区域和组件发生变化时
          * @param {*} obj      zjObj
          * @param {*} evt     'add':添加 , 'del':删除 
          * @param {*} areaTo   公共组件的 "area.位置" 添加位置
          */
         pathChange:function(obj,evt,areaTo){
             var t=this,pd=t.pathData,path=pd.path,arr=obj.path,i=0,l=arr.length,v;
                 if(t.hashF)return; 
             var type=obj.type,name=obj.name;
                    // console.log(type,name);
                    // debugger
                    if(type!=='public'){
                        while(i<l){
                                v=arr[i];                               // areaName
                                if(i===l-1&&evt==='del'&&type==='area'){// 删除区域
                                    delete path[v];
                                    break;
                                };
                                if(!path[v])path[v]={};
                                path=path[v];
                                i++;
                        };
                    }else{
                         if(areaTo){
                              obj.areaTo=areaTo;
                         }else{
                              areaTo=obj.areaTo;
                         };
                         if(!areaTo)return;   //没有指定的区域
                         v=areaTo.split('.')[0];
                         path=t.getPublicPath(path,v);// public 的父区域, 可能存在深度嵌套,因此需要此操作 
                         if(!path)return; //防止无意义报错
                    };
                    if(!path){
                        console.error('错误的路径 ==> evt = '+evt+' 组件 = '+name);
                        return;
                    }; 
               var aCfg=t.areaCfg,ac=aCfg[v];      
                     if(type==='private'){
                           if(ac&&ac.dfList[0].indexOf(name)>-1)return;  // 默认 打开的 公/私 组件不记录
                            if(evt==='add'){
                                 path[name]=1;
                            }else{
                                 delete path[name];
                            };
                     }else if(type==='public'){
                            if(ac&&ac.dfList[0].indexOf(name)>-1)return;  // 默认 打开的 公/私 组件不记录
                            if(evt==='add'){
                                 path[name]=areaTo;
                            }else{
                                 delete path[name];
                            };
                     }else{
                            if(ac&&ac.dfList[1].indexOf(name)>-1)return;  // 默认打开的 区域 不进行记录
                     };
                    //  console.log('pathChange   ==++++++++++++++++++++++++++++++++++>   '+JSON.stringify(pd.path));
                     //else  area 已经默认创建了
                     pd.pathStr=encodeURI(JSON.stringify(pd.path));
                     location.hash=pd.pathStr;
         },
         //获取公共组件的 path位置
         getPublicPath:function(obj,area){
             var t=this,k,v,d;
                 for(k in obj){
                     v=obj[k];
                     if(k===area)return v;
                     if(v!==1&&typeof(v)!=='string'){
                         d=t.getPublicPath(v,area);
                         if(d)return d;
                     };  
                 };
         },

         //解析后的配置数据
         areaCfg:{
             /*  'areaXXX':{
                      //比 routerCfg 多的属性
                      $_el:domNode,        // 区域dom节点本身
                      $_id:'',             // 区域组件idName 
                      children:{           // 子区域数据
                           '子区域Name':{....}
                      },
                      parent:'指向父区域数据',
                      commonElements: [] , // 当前区域的公共组件
                      activeElements: [] , // 当前区域的存活组件 
                      dfList:{             // 默认打开的组件或区域 列表
                          0:[],            // 默认组件 (私有+公共)
                          1:[],            // 默认区域 
                      }
                  },
             */
         },
         
         //所有已定义组件配置
         zjCfg:{
              /* 唯一
                '组件Name':{ 
                        type:'private',                   // private:私有组件 , public:公共组件 , area:区域组件
                        state:'none',                     // none:未加载, loading:加载中 ,  ok : 加载完成  
                        area:'',                          // 所属区域
                        pos:'left',                       // 区域位置
                        name:'组件Name',
                        attr:['mutex','destroy','cache'], //
                        obj:appobj ,                      // appObj 自身
                        private:[] ,                      // 指向 area.activeElements     用于查重删除
                        public:[]  ,                      // 指向 area.commonComponents , 用于 closeComponent 时 sleep公共组件, 而不是默认的休眠
                        parent:{                          // 展示位置
                            type:'',                
                            name:'',
                            // index:0
                        },
                        stop:false,                       // 当为 true 时,还处于 loading 阶段的话 , 加载完成后 ,不执行 
                        path:[],                          // 所属区域嵌套路径
                        areaTo:null, //公共组件特有 , 用于 删除时, 查找url路径
                },*/
         },
         //加载中的组件  (储存 zjCfg , 用于终止加载中的互斥组件执行)
         loadingList:[],      
         //储存活跃的公共组件  (用于统计)
         commonComponents:[],
         //所有存活的区域组件  (用于统计)
         areaComponents:[],
         //储存所有已加载组件  xxx.js 
         components:{
              //'zjName': f()  , 对应的方法   
         },
         Env:'',    //  dev:开发模式  (解析 h5页面)  prod:产品模式 (直接请求js)
         
         //配置解析
         cfgInit:function(){
             var t=this,o={},a=routerCfg,zj=t.zjCfg,b,c,d,e,f,g,k;
                 t.areaInit(a.areas,o,null,[]);
                 t.areaCfg=o; 
                 //处理公共活动组件
                 b=a.publicComponents;
                 for(c in b){
                     g=b[c];
                     zj[c]={
                            type:'public',
                            state:'none',
                            area:g[0],  //g[0] path 相当于area
                            pos:null,
                            name:c,
                            attr:g,
                            private:[],
                            public:t.commonComponents,
                            stop:false,
                            path:[],
                            parent:null,
                            areaTo:null, //公共组件特有 , 用于 删除时, 查找url路径
                     };
                 };
                 t.Env=a.env||'dev';
         },

         //加载依赖的js 列表 ,用于查重防止反复请求
         jsRequire:{

         },

         /**
          *储存 cache 数据  
          */
         saveData:function(name,data){
               var d='';
                   try {
                       d=JSON.stringify(data);
                       localStorage.setItem(name,d);
                   } catch (err) {
                       console.warn('组件 => '+name+'无法 JSON.stringify 转字符串 存储的对象');
                   };
         },

         /**
          * 获取数据 
          * @param {*} name 
          */
         getData:function(name){
             var d=localStorage.getItem(name);
                 if(d){
                     try {
                         d=JSON.parse(d);
                         return d;
                     } catch (err) {
                         console.error('组件 => '+name+' 缓存数据读取失败,(0:格式错误,不能被JSON.stringify,1:超出localStorage限制) \r\n'+err);
                         localStorage.removeItem(name);
                         return null;
                     };
                 }else{
                      return null;
                 };
         },

         //area 区域解析
         areaInit:function(d,o,p,arr){//d:区域数据, o:储存对象,p:父组件,arr:区域嵌套路径
             var t=this,zj=t.zjCfg,k,a,b,c,v,g,l,rq,x,n=0,zo,zq,sf,z;
             var pth,pAr// 
                 for(k in d){    // k ; 区域名
                        pth=arr.slice(); // 防止引用
                        pth.push(k);
                        v=d[k];  // 区域数据
                        
                        if(!v.openComponents)v.openComponents=[];         // 默认打开的私有组件
                        if(!v.closeComponents)v.closeComponents=[];       // 默认关闭的私有组件
                        if(!v.openPublicComments)v.openPublicComments=[]; // 默认打开的公共组件
                        if(!v.openAreas)v.openAreas=[];                   // 默认打开区域
                        if(!v.closeAreas)v.closeAreas=[];                 // 默认关闭区域  

                        v.commonElements=[]; // 储存公共组件,在当前区域 (存活的)
                        v.activeElements=[]; // 储存当前区域的固定组件  (存活的)

                        // 区域私有组件   
                        g=v.components; // 所有定义的区域组件

                        if(g){
                            rq=v.container;
                            for(x in g){
                                if(!rq){
                                        console.error('区域 '+k+'  未定义 区域容器 属性 ~~~~');
                                        return;
                                };
                                if(!zj[x]){
                                        zo=g[x]; //组件属性  ['位置','mutex','destroy','cache'],
                                        if(!zo){
                                              console.error('区域 '+k+' 私有组件 '+x+'  的属性未定义');
                                              return
                                        };
                                        zq=rq[zo[0]];// 位置属性
                                        if(!zq){
                                              console.error('区域 '+k+' 私有组件 '+x+'  的展示位置 配置属性 , 不存在 ~~~');
                                              return
                                        };
                                        
                                        zj[x]={
                                                type:'private',
                                                state:'none',
                                                pos:zo[0],
                                                area:k,
                                                name:x,
                                                attr:zo,
                                                private:v.activeElements,
                                                public:v.commonElements,
                                                parent:zq,
                                                path:pth,
                                                stop:false,
                                        };
                                }else{
                                        console.error('重复的组件 id  => '+x);
                                };
                            };
                        }else{
                             v.components={}; 
                        };
                        //自身是区域组件
                        sf=v.self;
                        if(sf){//
                               sf.name=k;
                                zj[k]={
                                        type:'area', 
                                        area:k,
                                        name:k,
                                        parent:sf.parent,
                                        attr:sf.default||'destroy',     // 默认区域关闭销毁
                                        path:pth,
                                        stop:false,
                                };
                                v.$_el=null;
                                v.$_id=k;
                                if(!sf.default)sf.default='destroy'; // 默认关闭销毁
                                if(p)v.parent=p;
                        };
                        o[k]=v;
                        a=v.childAreaes; //子区域组件
                        if(a){
                            v.children={}; //储存子区域组件
                            for(b in a){
                                //b
                                c=a[b];
                                v.children[b]=c;
                            };
                            t.areaInit(a,o,v,pth);
                        };
                        v.dfList={};
                        z=[];
                        z=z.concat(v.openComponents);
                        //默认公共组件结构不一样
                        pAr=v.openPublicComments;
                        if(pAr){
                            l=pAr.length;
                            while(l--){
                                z.push(pAr[l][0]);
                            }
                        };
                        v.dfList[0]=z;                  //所有默认打开的组件
                        z=[];
                        z=z.concat(v.openAreas);
                        v.dfList[1]=z;                  //所有默认打开的区域
                        z=null;
                        n++;
                 };
                 return o;
         },
        
         /**
          * 顺序执行 打开区域的 异步步骤
          * @param {*} arr  步骤 
          * @param {*} cb 
          */
         openArrExe:function(arr,cb){
             var t=this,i=-1,l=arr.length;
             var err=[];
             var fun=function(){
                    i++;   // -1 开始, 防止同步和异步 执行 i++的逻辑顺序不同
                    if(i<l){
                       var d=arr[i];
                           if(d.zj){
                                if(d.zj.stop){
                                    if(d.type==='area'){
                                         if(cb)cb(err);
                                         err=null;
                                         return;
                                    }else{
                                         fun();
                                         return;
                                    };
                                };
                                 if(d.type==='area'){   // 区域组件等待异步加载
                                        d.args[2]=function(res){
                                            err.push([d.zj.name+':'+res]);
                                            if(d.callBack)d.callBack(res);
                                            if(res==='err'){ //stop 不阻止
                                                fun=null,err=null,arr=null; 
                                                return; 
                                            };
                                            fun();
                                        };
                                        d.fun.apply(t,d.args);
                                        
                                 }else{                // 私有和公共组件一次性加载 (方便 建立阻止查找关系)
                                     d.fun.apply(t,d.args);
                                     fun();
                                 };  
                            }else{
                                fun();
                            };     
                    }else{
                            fun=null,arr=null;
                            if(cb)cb(err);
                            err=null;
                    };
             };
             fun();

         },

          /**
          * 打开区域     
          * @param {*} areaName         区域名称
          * @param {*} data             向组件传递的数据 静态json数据 (刷新页面不会丢失的数据)
          * @param {*} callBack(){      当区域/组件加载完成时的回调 , 返回默认      
          *            }
          */
         openArea:function(areaName,data,callBack){
            var t=this,cfg=t.areaCfg,d=cfg[areaName],a,b,c,e,f,g,i,l,self;
            var ed=t.evtData.area,oed=ed.open[areaName],ced=ed.created[areaName];
            var zjCfg=t.zjCfg;
            var orr=[];
                //判断 open 方法
                // console.log('打开区域  ~~~~~~~~~~       '+areaName);
                if(oed&&!oed()){//  oed() 返回 true:允许通过 , false:禁止通过
                    if(callBack)callBack('stop');
                    return;  
                };   
                if(d){
                        // 关闭默认区域   
                        a=d.closeAreas,i=0,l=a.length;
                        while(i<l){
                            t.closeAnalysis(0,a[i]);
                            i++;
                        };
                        self=zjCfg[d.self.name];
                        // 加载区域组件自身 
                        orr.push(
                              {
                                    type:'area',   
                                    zj:self,  
                                    fun:t.openComponent,
                                    args:[self.name,data],
                                    callBack:function(err){  //区域加载失败直接跳转default
                                          if(err==='err'||err==='stop'){ //err 和 stop
                                               if(err==='err')t.openDefault(); //加载错误才 执行defalut 
                                               if(ced)ced(err);          // 执行 注册的 created 方法
                                               if(callBack)callBack(err);
                                          };
                                    }
                              }
                        );
                         // 打开默认区域    
                         a=d.openAreas,i=0,l=a.length;
                         while(i<l){
                             orr.push(
                                {
                                    type:'area',  
                                    zj:zjCfg[a[i]],  
                                    fun:t.openComponent,
                                    args:[d.self.name,null],
                                    // callBack:callBack, 
                                }
                             );
                             i++;
                         };
                         // 关闭指定组件元素 
                         a=d.closeComponents,i=0,l=a.length;
                         while(i<l){
                             t.closeComponent(a[i]);
                             i++;
                         };
                         // 打开公共组件    
                         a=d.openPublicComments,i=0,l=a.length;
                         while(i<l){
                             orr.push(
                                {
                                    type:'public',   
                                    zj:zjCfg[a[i][0]],  
                                    fun:t.openComponent,
                                    args:[a[i][0],null,null,a[i][1]],
                                    // callBack:callBack, 
                                }
                             );
                             i++;
                         };
                         // 加载 默认打开组件
                         a=d.openComponents,i=0,l=a.length;
                         while(i<l){
                            orr.push(
                               {
                                   type:'private',   
                                   zj:zjCfg[a[i]],  
                                   fun:t.openComponent,
                                   args:[a[i],null],
                                //    callBack:callBack,
                               }
                            );
                            i++;
                        };
                         // 执行所有步骤
                         t.openArrExe(orr,function(info){
                                console.log('%c 区域加载信息 => '+info.join(' ; '),'color:#E4B102');
                                if(ced)ced();          // 执行 注册的 created 方法
                                if(callBack)callBack();
                         });
                }else{
                        console.error('无法打开 未正确定义的 区域  =>  '+areaName);
                        if(callBack)callBack();
                        t.openDefault();
                };
         },

         /**
          * 打开组件
          * @param {*} zjName 
          * @param {*} data             向组件传递的数据 静态json数据 (刷新页面不会丢失的数据)
          * @param {*} callBack(zjObj){   当组件加载完成时的回调  
          * @param {*} toArea           指定区域容器, 用于公共组件添加   'area.位置' 
          *            }
          */
         openComponent:function(name,data,callBack,toArea){
            var t=this,o=t.zjCfg,c=o[name],d,area,pCfg,parent,appObj,toArr,pDom,attr;
                // console.log('打开 组件 =>  '+name);
                if(c){
                        attr=c.attr;
                        //0. 私有组件互斥关系检查 ,阻止和删除互斥组件继续执行  (会第一时间删除互斥组件 ,不管加载 成功与否)
                        t.relevanceCheck(c); //
                        if(attr instanceof Array){
                            if(attr[3]==='cache'){
                                    if(data){
                                        t.saveData(name,data);
                                    }else{
                                        data=t.getData(name,data);
                                    };
                            };  
                            //0. 混合区域互斥关系检查
                            t.closeAnalysis(1,attr[5]);
                        };

                        if(c.stop)c.stop=false; //因 再次打开, 恢复执行

                        if(c.state==='loading'){
                             if(callBack)callBack('loading');
                             return; //加载中无需判断
                        };
                        
                        //1. 查找父元素  填充位置
                        if(toArea){ //添加到指定区域
                                toArr=toArea.split('.');
                                if(toArr.length===2){
                                        area=t.areaCfg[toArr[0]];
                                        if(area){
                                            pCfg=area.container[toArr[1]];
                                        }else{
                                            console.error(' 区域不存在  '+toArea+'   [0] = '+toArr[0]);
                                            if(callBack)callBack('err');
                                            return;
                                        };
                                }else{
                                        console.error(' 指定区域错误 => '+ toArea);
                                        if(callBack)callBack('err');
                                        return;
                                };
                        }else{
                                pCfg=c.parent;   //位置容器配置
                                area=t.areaCfg[c.area];
                        };

                        if(area&&pCfg){ //填充区域
                                d=pCfg;
                                if(c.type!=='area'){   //私有或公共组件
                                    pDom=area.$_el;
                                    if(!pDom){
                                        console.error(' 该区域组件 尚未启用 , 无法添加  区域 = '+area.$_id+'  组件 = '+name);
                                        if(callBack)callBack('err');
                                        return;
                                    }; 
                                }else if(c.type==='area'){//区域组件
                                    if(area.parent){// 存在父区域时, 是父区域的$_el 否则 就是 body
                                        pDom=area.parent.$_el;
                                        if(!pDom){
                                            console.error(' 该区域组件 尚未启用 , 无法添加  区域 = '+area.$_id+'  组件 = '+name);
                                            if(callBack)callBack('err');
                                            return;
                                        }; 
                                    }else{
                                        pDom=document; //最父级的 容器通常为body  
                                    }; 
                                };
                                
                                if(d.type==='id'){           // id              
                                        parent=document.getElementById(d.name);        //组件容器
                                }else if(d.type==='class'){  // class
                                        parent=pDom.getElementsByClassName(d.name)[d.index||0];
                                }else{                       // tag
                                        parent=pDom.getElementsByTagName(d.name)[d.index||0];
                                };
                                if(!parent){
                                        console.error(' 区域容器不存在 可能的原因:0:未定义,1:区域未打开 ....');
                                        if(callBack)callBack('err');
                                        return;
                                };
                        }else{
                                    console.error(' 没有定义对应的区域容器 , 若是 公共组件的话请使用 openElementToArea ');
                                    if(callBack)callBack('err');
                                return; 
                        };

                        //2.组件加载 和调用
                  var zdyFun=function(){
                                t.zjRequest(c,function(zFun){
                                    //当 填充区域不存在时, 意味着该组件被阻止了
                                    if(c.type!=='area'&&!area.$_el){
                                            if(callBack)callBack('stop');
                                            return;
                                    };
                                    if(c.stop){ //加载期被阻止执行了
                                            c.stop=false;
                                            if(callBack)callBack('stop');
                                            return;
                                    }; 
                                    if(zFun){
                                            if(!c.obj){// 新打开
                                                    appObj=zFun(parent,data); // 
                                                    c.obj=appObj;
                                                    if(c.type==='private'){      // 私有组件
                                                        area.activeElements.push(appObj);
                                                    }else if(c.type==='public'){ // 公共组件
                                                        t.commonComponents.push(appObj),
                                                        area.commonElements.push(appObj); 
                                                    }else{                       // 区域组件
                                                        area.$_el=appObj.el;  
                                                        t.areaComponents.push(appObj)
                                                    };
                                            }else{ // 重复打开  执行 awake 操作 ( 有可能是 换位置 ,当parent 不同时)
                                                   if(c.obj.el.parentNode!==parent)c.obj.awake(parent);
                                            };
                                             
                                            if(callBack)callBack();
                                            t.pathChange(c,'add',toArea);
                                    }else{
                                        if(callBack)callBack('err');
                                    };   
                                });
                       };      

                        //0. 加载依赖列表
                        if(attr&&attr[4] instanceof Array){
                                t.requireLoad(c.attr[4],function(){
                                      zdyFun();
                                      zdyFun=null;   
                                });
                        }else{
                                zdyFun();
                                zdyFun=null;  
                        };
                }else{
                      console.error('未定义的组件 => '+name);
                      if(callBack)callBack('err');
                };
         },

         //加载组件依赖的JS列表
         requireLoad:function(arr,cb){
             var i=0,l=arr.length,dom;
             var err=[];
             var fun=function(){
                    var dom,src=''; 
                        if(i<l){
                                src=arr[i]
                                dom=document.createElement('script');
                                dom.onload=function(){
                                    fun();
                                };
                                dom.onerror=function(){
                                    err.push(src);
                                    fun();
                                };
                                dom.src=src;
                                document.body.appendChild(dom);
                                dom=null;
                       }else{
                           if(err.length){
                               console.err('组件依赖 js 列表加载失败项目  =>  '+err.toString())
                           };
                           if(cb)cb();
                       };
                       i++;
                };
                fun();
         },

         //组件请求
         zjRequest:function(zj,callBack){
             var t=this,ldArr=t.loadingList,a=t.components,zFun=a[zj.name],dom,n;
                 if(zFun){
                    if(callBack)callBack(zFun);
                    return true;
                 };
                 ldArr.push(zj);
                 zj.state='loading';  //组件状态加载中
                 dom=document.createElement('script');
                 dom.onload=function(){
                     zj.state='ok';
                     n=ldArr.indexOf(zj);
                     if(n>-1)ldArr.splice(n,1);  //已加载完成删除
                     if(callBack)callBack(a[zj.name]);
                 };
                 dom.onerror=function(err){
                      zj.state='none';
                     if(callBack)callBack();
                     throw err;
                 };
                 dom.src='./?'+t.Env+'-'+zj.area+'-'+zj.name;
                 document.body.appendChild(dom);
         },

         /**
          * 关闭区域
          * @param {*} areaName 
          * @param {boolean} force =true 强制删除区域(设为sleep的区域)
          */
         closeArea:function(areaName,force){
            var t=this,cfg=t.areaCfg,d=cfg[areaName],zj=t.zjCfg,v,o,k,app,zo,i,arr;
            var ed=t.evtData.area.close,cfun=ed[areaName];
                if(d){
                       zo=zj[d.$_id];;// 区域组件自身
                       if(zo){
                            if(t.preventLoad(zj[d.$_id]))return; //阻止,还未生效需要关闭的当前组件
                            if(zo.obj){    
                                if(d.self.default==='destroy'||force){ //销毁
                                            // 关闭子区域组件
                                            o=d.children;
                                            for(k in o){
                                                t.closeArea(k);
                                            };
                                            // sleep 当前区域公共组件 (已打开的)
                                            v=d.commonElements,l=v.length;
                                            while(l--){
                                                t.closeComponent(v[l].id,force);
                                            };
                                            // 关闭当前区域私有组件   (已打开的)
                                            v=d.activeElements,l=v.length;
                                            while(l--){
                                                t.closeComponent(v[l].id,force);
                                            };
                                            // 关闭区域自身          
                                            arr=t.areaComponents;
                                            i=arr.indexOf(zo.obj);
                                            if(i>-1)arr.splice(i,1);
                                            if(zo.obj.state!=='die')zo.obj.destroy();
                                            zo.obj=null;
                                            d.$_el=null; //组件dom 引用置空
                                            if(cfun)cfun('close');
                                            t.pathChange(zo,'del');
                                            
                                }else{//sleep
                                        if(zo.obj.state!=='die'&&zo.obj.state!=='sleep')zo.obj.sleep();
                                        if(cfun)cfun('sleep');
                                        t.pathChange(zo,'del');       
                                };
                            }else{
                                console.warn('区域未启用  area  = '+areaName);
                                if(cfun)cfun('close');
                            };//if(zo.obj) END  
                    }else{
                         console.error('区域自身组件无效   area  = '+areaName+'     component = '+d.id);
                         if(cfun)cfun('err');
                    };//if(zo) END  
                }else{
                      console.error('不存在的  area  = '+areaName);
                      if(cfun)cfun('err');
                };//if(d) END
                 
         },
        /**
         * 
         * @param {*} type    value 值得类型 0: areaString, 1:混合 [ [areaString,... ], []  ]  
         * @param {*} value 
         */
          closeAnalysis:function(type,value){
              var t=this,a,b,c,d,e,f,g,i=0,l=0;
                  if(type===0&&value){
                      a=value.split('.');
                      if(a.length===2){//关闭区域的某个部分
                          t.closeAreaParts(a);
                      }else{//关闭整个区域
                           t.closeArea(value);
                      };
                  }else if(type===1&&value instanceof Array){ //打开 混合位置 组件时 的附属操作 
                        a=value[0];
                        //关闭区域
                        if(a instanceof Array){
                            l=a.length;
                            while(i<l){
                                b=a[i];
                                c=b.split('.');
                                if(c.length===2){
                                    t.closeAreaParts(c);
                                }else{
                                    t.closeArea(b);
                                };
                                i++;
                            };
                        };
                        //关闭组件
                        d=value[1];
                        if(d instanceof Array){
                             i=0,l=d.length;
                             while(i<l){
                                 t.closeComponent(d[i]);
                                i++;
                             };
                        }; 
                  };
          },

          /**
           * 关闭区域的 指定位置的所有组件
           * @param {*} arr  = [areaName, areaPos ]
           */
          closeAreaParts:function(arr){
               var t=this,ao=t.areaCfg[arr[0]],pos=arr[1],o,k,v;
                   if(ao){
                        o=ao.components;
                        for(k in o){
                            v=o[k];
                            if(v[0]===pos){//位置匹配
                                  t.closeComponent(k); //关闭
                            };
                        }

                   };
          },

          /**
           * 判断当前组件 与 添加区域位置 的其它组件的关系 (包含loading中还未生效的组件)  (主要为互斥关系)
           * @param {*} zjCfg 
           * @returns 
           */
          relevanceCheck:function(zjCfg){
                  if(zjCfg.type!=='private')return; 
              var t=this,ldArr=t.loadingList,name=zjCfg.name,pos=zjCfg.pos,arr=zjCfg.private,area=t.areaCfg[zjCfg.area],o=area.components,k,v,app,i=0,l=arr.length,zo;
                 
                    while(i<l){
                        app=arr[i];
                        if(app){
                            k=arr[i].id;  //zjName
                            if(k!==name){//非自身
                                    v=o[k];//['位置','mutex', 'destroy', 'cache'];
                                    if(v&&pos===v[0]){// 相同位置
                                            if(v[1]==='mutex'){       // 互斥
                                                if(v[2]==='sleep'){   // sleep
                                                    // app=Eng.get(k);
                                                    if(app)app.sleep();
                                                }else{                // destroy
                                                    t.closeComponent(k);  
                                                };
                                            };
                                    };
                            };
                        };
                        i++;
                    };
                    //判断其它加载中的 是否为互斥组件
                    i=0,l=ldArr.length;
                    while(i<l){
                        zo=ldArr[i];
                        k=zo.name;
                        if(k!==name){
                             v=o[k];
                             if(v&&pos===v[0]){// 相同位置
                                    if(v[1]==='mutex'){       // 互斥
                                         zo.stop=true;        // 加载完成也不会被执行           
                                    };
                             }; 
                        };
                        i++;
                    };


          },

          /**
           * 阻止加载中的 插件在加载完成后执行
           * @param {*} zjCfg  参考插件
           * @param {*} flag   true:阻止自身 , false:阻止互斥的
           * @returns 
           */
          preventLoad:function(zjCfg){
                var t=this,name=zjCfg.name,ldArr=t.loadingList,i=0,l=ldArr.length,v;
                    while(i<l){
                        v=ldArr[i];
                        if(v.name===name){
                            v.stop=true;
                            return true;
                        };
                        i++;
                    };
          },

          /**
          * 关闭组件  
          * @param {*} zjName 
          * @param {boolean} force =true  强制删除  公共组件默认是 sleep  , 或者 设为sleep的区域组件
          */
           closeComponent:function(zjName,force){
               var t=this,zjCfg=t.zjCfg,o,arr,i,app,attr;
                   o=zjCfg[zjName];
                   if(o){
                       if(t.preventLoad(o))return; //阻止还未生效 处于加载中 , 却需要关闭的当前组件
                        app=o.obj;
                        attr=o.attr;
                        if(app){//使用中的组件
                               if(o.type==='private'){     // 私有组件
                                        arr=o.private;
                                        i=arr.indexOf(app);
                                        if(i>-1)arr.splice(i,1);
                                        if(app.state!=='die')app.destroy();
                                        o.obj=null;
                                        t.pathChange(o,'del');
                               }else if(o.type==='public'){// 公共组件
                                        arr=o.public;
                                        i=arr.indexOf(app);
                                        if(i>-1)arr.splice(i,1);
                                        if(force||attr[2]==='destroy'){//强制删除
                                            if(app.state!=='die')app.destroy();
                                            o.obj=null;
                                        }else{
                                            if(app.state!=='die'&&app.state!=='sleep')app.sleep();
                                        };
                                        t.pathChange(o,'del');
                               }else{                      // area组件
                                        t.closeArea(o.area,force);
                               };

                        }else if(o.state==='loading'){
                                o.stop=true; //阻止执行
                                // console.warn('已关闭的组件 => '+zjName);
                        };
                   }else{
                         console.error('未定义的 组件');
                   };
           },

          /**
           * 打开组件 并 添加 到 指定区域
           * @param {*} zjName         组件Name
           * @param {*} areaTo         区域.位置  例: 'area0.top'
           * @param {*} data           向组件传递的数据 静态json数据 (刷新页面不会丢失的数据)
           * @param {*} callBack(obj)  当组件加载完成时的回调 , 参上
           */
          openElementToArea:function(zjName,areaTo,data,callBack){
               var t=this;
                   t.openComponent(zjName,data,function(appObj){
                          callBack(appObj);
                   },areaTo)
          },

          /**
           * 获取全部存活组件
           */
          getAllLives:function(){
              var t=this,arr=[],d=t.areaCfg,a=t.commonComponents,k,c,i,l,n=0,m,o,v,arr;
              var obj={
                        total:n,  // 总数
                        public:{  // 公共组件
                            length:0,
                            sleep:[],
                            active:[],
                        },
                        private:{   // 固定组件
                            length:0,
                            sleep:[],
                            active:[],
                        },
                        area:{
                            length:0,
                            sleep:[],
                            active:[],
                        },
                  }; 
                  //区域组件
                  arr=t.areaComponents;
                  i=0,l=arr.length;
                  o=obj.area;
                  o.length=l;
                  obj.total+=l;
                  while(i<l){
                      v=arr[i];
                      if(v.state=='sleep'){
                          o.sleep.push(v);
                      }else{
                          o.active.push(v);
                      };
                      i++;
                  };
                  //公共组件 
                  i=0,l=a.length;
                  obj.total+=l;
                  o=obj.public;
                  o.length=l;
                  while(i<l){
                    //   arr.push(a[i]);
                      v=a[i];
                      if(v.state=='sleep'){
                          o.sleep.push(v);
                      }else{
                          o.active.push(v);
                      };
                      i++;
                  };
                  //(区域)固定组件
                  o=obj.private;
                  for(k in d){
                      c=d[k];
                      m=c.activeElements;
                      i=0,l=m.length;
                      n+=l;
                      while(i<l){
                          v=m[i];
                          if(v.state=='sleep'){
                              o.sleep.push(v);
                          }else{
                              o.active.push(v);
                          };
                          i++;
                      };
                  };
                  o.length=n;
                  obj.total+=n;
                 return obj

          },

          //储存事件
          evtData:{
               area:{open:{},created:{},close:{}},
               /* public:{open:{},created:{},close:{}},    // 不需要 ,组件自身有 onInit onCreated, onDestroy 方法
               private:{open:{},created:{},close:{}} */
          },

          /**
           * 监听 区域 open  created 和 close
           * @param {*} cfg ={
                                name:'main',                  //  组件 或 区域名称
                                evt:'open',                   //  open:打开时, created: 完成时 ,close:关闭时
                                callBack:function(){
                                       return boolean;        //  true:允许 打开, false:禁止    (注意 , 仅支持 open事件)
                                },
                        },
           */
          
          addAreaListener:function(cfg){
              var t=this,ed=t.evtData;
              var et=cfg.evt,en=cfg.name,o;
              var str='Router.addEventListener的  ';
                  o=ed.area;
                  o=o[et];
                  if(o){   //组件类型匹配
                        if(en){  //事件类型
                            if(cfg.callBack){
                                o[en]=cfg.callBack;
                            }else{
                                console.error(str+'callBack 回调方法 为必须'); 
                            };
                        }else{
                            console.error(str+'name参数 非法');
                        };
                  }else{
                        console.error(str+'evt参数, 仅支持 open 和 created ,close两种事件类型')
                  };
                  
          },
     }
});


/* 
测试 跨区域 添加
 
Router.openElementToArea('test1','main.left',null,function(){ console.log(11111)});

*/