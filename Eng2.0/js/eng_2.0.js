/* 
备注 :   命名简短随意 (受不了长串字符) , 中文备注详尽 , 不习惯自行替换   


uglifyjs eng_2.0.js -m -c -o eng_2.0.min.js   //压缩 =>   混淆,压缩,输出
*/
(function(){
/*
//tree结构
tree={
    'key':[
          {  
              type:'attr', 
              dom : inex  ,            // 对应 domIndex.dom[index]   (for训话下的对应 根数据的 $_dom)
              attr:'attrName',         // 行内属性名
              data:[*0, *1,*2,*3,*4]   // *0=>0:直接赋值,  ( *1 三目对比值,  *2,*3 是后面三目运算的结果值 )  1: Boolean , '>':2 , '<':3, '>=':4, '<=':5, '==':6, '===':6, '!==':7, 
                                       // *4:是当attr=class 时,储存之前的值 ,方便替换操作  
          },  
          {  
              type:'txt',
              dom:index,             // 指向  domIndex.dom[index] 
              index:index ,          // 指向  domIndex[index] 下的  txtArray 
              pos:arrIndex,          // txtArr 所在的对应 数据 拼接位置  
          },
          {
              type:'html' , input, change
              dom:index 
          }
     ],
     base:{//下级数据目录
         $_parent:'指向父级base目录', 
     },
    'keyFor':[
         {//index
             $_dom:{
                  dom:[],
             },
             key:[],
             base:{},
             $_children:[],         // 储存子for 结构数据
             $_f_c:dom              // 若有 子循环, 那么这是它的父容器  ,   子循环指向 父 for 的$_f_c
         }
     ],
};


//缓存所有txtDom  不包含 for循环生成的
domIndex{
    dom:[], // 所有的ENG 使用到dom
    //对应 textcontent 所使用的dom  index指向dom:[]
    0:['', '',''],   // 拼接txtArr   (将  textContent 分割后,  标记{{}}的位置 , 进行拼接合并赋值  )  所在index对应dom 
};

//for循环 list 列表  

cloneTree={
     for1:{
          //for循环所在位置
          $_f_p:dom              //  根循环中是 父dom容器 ; 子循环中是 父 forIdName
                                 //  *1=>  当*0=0 时的固有dom ,非自循环生成     ;      当*0=1时 'key' 指向 父循环的forIdName =>  $_f_c=>dom 
          $_f_c:dom,             //  如果for1 是个父循环, 那么生成for1时 ,  $_f_c的值就是 子循环的相对dom容器   
          $_dom:{                //  text 文本不在domPath.dom 中查询 ,在for根数据中查询对应dom
              dom:[],
          },      
          $_f_id:'forIdName',    // for 循环的 id Name  (唯一 ,不允许与其它for重复,否则会覆盖)
          $_c_id:'forIdName'     // 子元素 forIdName 用于删除时向下删除 
          $_build:dom,            // 待解构 dom  (将for循环dom解构成数据)
          $_e_dom:[],             // e-event 事件对应的 domIndex 指向 $_dom
          $_e_fun:[],             // e-event dom 对应的 事件和方法 [ evName,evFun ],..... 
         
          $_parent:xx,            // 指向父数据对象  .子循环指向父循环

        //以下完全后生成   (上面个别部分混合)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          $_children:[],          // 储存子循环数据 ,当cloneF
          $_forDom:dom,           // forDom 
          $_items:{
               $_gData:[],          // 当前被循环的所有数据 []
               $_forData:[],        // 当前被循环的  数组数据  
               $_data:{},           // 当前被循环的  forItem 数据
               $_index:             // 索引
               $_pos:[],            // 在数组中的实际位置 包含父    例:[0,2]  父循环index=0数据位置, 下的子循环的index=2的位置 
          }, 
     };
};

//forDom 的结构数据 
buildTree={
      attr:[],                        // 行内属性      
      index: -1                       // 指向 cloneTree.$_dom.dom中的index ,创建后直接赋值这里
      name: "DIV"                     // nodeName
      txt: undefined                  // 文本内容
      children:[]                     // 后代元素   
};

*/
//   /\>\=|\<\=|\=\=|\=\=\=/g    //用于 正则 三目 运算符 
//   /(\{\{[^{}]+\}\})/,         //匹配 {{xxx}}
// 	/(\{\{[^{}]+\}\})/g,        //匹配 所有 {{xxxx}}  
// 	/({{|}})/g,                 //匹配 所有 {{ 或 }} 括号 

'use strict'
var obk=Object.defineProperty;
var doc=document,bod=doc.body;
var yxF=null;                //数组原型方法
var getById=function(id){
     return doc.getElementById(id)
};
/**
 * 根据字符串生成返回一个dom   (用于 templete 模板)
 * @param {*} str 
 */
var getDom=function(str){
     var a=doc.createElement('div');
         a.innerHTML=str;
         return a.children[0];
};
/* 
用于监控数组数据变化 
覆盖 部分 Array 原生方法 , 在forData中 直接使用   [Array].__proto_=newArray;  将其原型指向newArry 

*/
/**
 * 获取一个用于  [Array].__proto_= { obj};  的json对象 ,用于原型链 指向 Array的几个基本方法 参看函数内 支持arr列表    
 * @param {*} arrObj       匹配对应数组对象 的 index
 * @param {*} arrFun       根据index 匹配对应数据处理方法
 * @returns 
 */

/**
 * 使数组类型可以响应基本方法 
 * @param {*} V     原数组
 * @param {*} fun   数组对应处理方法
 * @returns 
 */
var abk=function(V){
     var a=['push','unshift','pop','shift','splice','sort','reverse','concat'];
     var o=[],f,p,y;
          if(!yxF){
                 y=Array.prototype;
                 yxF={};
                 f=true;
         };
         a.forEach(function(v){
                  if(f)yxF[v]=y[v];
                  o[v]=function(){
                     var t=this,m=arguments;  
                     var d=yxF[v].apply(t,m);
                         if(v==='concat'){ //因为 concat 不会改变原数组
                              var i=t.length,s=i,l=d.length;
                                   while(i<l){
                                        t[i]=d[i];
                                        i++
                                   };
                                   if(p)p(v,[s,l]);
                                   return t;
                         }; 
                         if(p)p(v,m);
                         return d;
                  };
                  obk(o,v,{enumerable:false,writable:false,configurable:false});
        });
        a=null;
        //自定义处理方法
        o.zdy=function(v){
             p=v;
             delete o.zdy;
        };
        obk(o,'zdy',{enumerable:false});
        o.concat(V);
     //   var i=0,l=V.length;   
     //       while(i<l){
     //            o[i]=V[i];
     //            i++;
     //       };
         return o ;     
};

//运算符
var operator={   //0:直接赋值 ,1:boolan
        '>':2,
        '<':3,
        '>=':4,
        '<=':5,
        '==':6,
        '===':6,
        '!==':7,
        '!=':7,    
}; 

/**
 * 删除节点  (通过查询父节点)
 */
var delDom=function(dom){
        if(!dom)return;
    var p=dom.parentNode;
        if(p)p.removeChild(dom);  
};

/**
 * 数据类型 判断
 * @param {any} x 
 * @returns  0:dom ,1:string,2:boolean,1:NaN(当string处理),3:number,4:array,5:json 
 */
 var typeLX = function (x) {
     var t = typeof (x), k,u,n=null;
          if(x===u||x===n)return 1;
          if(x instanceof HTMLElement)return 0;        // domNode   
          if (t == 'string') return 1;                 // string
          if (t == 'boolean') return 2;                // boolean
          if (t == 'number') {
               if(x!==x)return 1;                      // NaN 
               return 3;                               // number
          };    
          if (x instanceof Array) return 4;            // Array
          if( x.push && x.push instanceof Function)return 4;      //Array  原型链缘故 (自定义array类型) 
          if (t == 'object')
          if(!x.toString)return 0;
          if(x.toString()==="[object Object]") return 5; //json
          return 1;                                    // 不支持的类型 全当 string 处理 (错了是给数据人的问题,什么东西都往里带)
};

/**
 * 对 keyStr进行解析 定位数据位置   (可能的值  xxx.xxxx   或  $_parent.xxx.xxx     $_parent缩写 $_p  );        
 */
var keyAnalysis=function(keyStr,pTree){
    var a,b,c,d,e,f,i=0,l,o,p=pTree,u;
    var key={ //返回父数据
         '$_parent':true,
         '$_p':true,
         '$_P':true
        };   
        a=keyStr.split('.'); // 
        l=a.length;
        while(i<l){
            b=a[i];// 
            if(key[b]){//向上父级base
                 
                    o=p;
                    p=p.$_parent; //
                    if(!p)p=o;    // 改为继续向下  //  console.error('不可能存在的数据 位置    '+keyStr); 
                    if(o.$_dom)p=o; // for 的parent 只能是根目录
                
            }else{//向下
                c=p[b];
                if(!c){//不存在的 值 或 base 
                    if(l>1&&i!==l-1){ //base  向下创建 base路径
                         c={
                             $_parent:p  //父级base
                         };
                         p[b]=c;
                    }else{        //普通根值 非json 
                        c=[];
                        p[b]=c;
                    };
                };
                p=c;
            };
            if(i===l-1){//结尾了
               if(typeLX(p)!==4){//p 的结果值 类型应该为 []
                    console.error('未知的数据位置    '+keyStr); 
                    return false;
               };
               return p;
            };
           i++;
        };
};

/**
 * 克隆一个json 数据对象  
 * @param {*} o   目标对象 
 */
 var newJson=function(o,n){
     var k,v,t,u;
        if(n===u){
             t=typeLX(o);
             if(t===4){
                  n=[];
             }else if(t===5){
                  n={};
             }else{ // 基本类型, 或无法赋值对象
                  return o;
             };
        };    
        for(k in o){
             v=o[k];
             t=typeLX(v);
             if(t===5){     //json
                  n[k]={};
                 newJson(v,n[k]);
             }else if(t===4){//array
                 n[k]=[];
                 newJson(v,n[k]);
             }else if(t!==0){
                  n[k]=v;
             };
        };
        return n;
};

//所有支持的行内属性,对应的处理方法  e-base 不在此处理
var attr_Fun={
      //解析 e-attr   兼 e-style;
      'e-attr':function(str,dom,pTree,domIndex,items,forF,forD,evt,type){
           var arr,i=0,l,a,b,c,d,e,f,g,h,j,k,v,m,n, O, dArr, u;
               arr=str.split(';');//多少条attr 属性
               l=arr.length;
               O=forF?forD.$_dom:domIndex;
               dArr=O.dom;      //储存的dom
               while(i<l){
                  a=arr[i].replace('=','0_=_=');  // 将第一个 = 号替换为 0_=_= , 方便区分判断三目运算
                  b=a.split('0_=_=');             // 0:attrName, 1:valueName或 + 三目运算
                  if(b.length===2){
                       c=b[0];         //要赋值的行内属性名
                       d=b[1];         //键名 或 +  xx? xxx : xxx;
                       if(c!==''&&d!==''){ 
                            e=d.split('?');
                            g=[0];    //*0=> 0:直接赋值属性,  参看 operato
                                      //*1=> 比对值  
                                      // 2,3 当三目存在时两个结果值   
                            if(e.length>1){  // 有三目运算
                                     h=e[0].split(/(\=\=\=|\=\=|\>\=|\<\=|\>|\<)/); // [key ,'运算符' ,'比对值']
                                   // h=e[0].replace(f,''); //运算符  >=,<= ....
                                   v=e[1].split(':'); // 三目运算的两个结果值
                                   g[2]=v[0];
                                   g[3]=v[1];
                                   if(h.length===1){
                                        g[0]=1;   // boolean 类型 只判断值本身
                                        f=h[0];
                                   }else{// h=[key ,'运算符' ,'比对值']
                                        j=operator[h[1]];
                                        if(j!==u){
                                             g[0]=j;            // 三目运算类型
                                             g[1]=h[2];         // 三目比对值
                                             f=h[0];   // 键名 
                                        }else{
                                             console.error('不能识别的 运算符 =>  '+h);
                                             i++;
                                             continue;
                                        };
                                   };
                            }else{             // 
                                   f=d;        // 键名
                            };
                            k=keyAnalysis(f,pTree); //键 存储数据位置  结果=[]  
                            if(k){
                                   //储存非重复使用中的 dom ,通过index指向该位置
                                   n=dArr.indexOf(dom);
                                   if(n<0){
                                        dArr.push(dom);
                                        n=dArr.length-1;
                                   }; 
                                   k.push({
                                        type:type||'attr',  //style || attr
                                        dom:n, 
                                        attr:c,
                                        data:g        //  
                                   });
                                       
                            };
                       }else{
                             console.error('行内 属性名 或 键名 不能为空 '+ b.toString());
                       };
                  }else{
                             console.error(' 错误的 e-attr 属性设置 => '+ b.toString());
                  }; 
                  i++;
               };//while(i<l)  END  ~~~~~~~~~
      },
      'e-html':function(str,dom,pTree,domIndex,items,forF,forD){
              var arr,i=0,l,a,b,c,d,e,f,g,h,j,k,v,m,n, O, dArr, u;
                   k=keyAnalysis(str,pTree);
                   if(k){
                         O=forF?forD.$_dom:domIndex;
                         dArr=O.dom;         // 储存的dom
                         n=dArr.indexOf(dom);
                         if(n<0){
                              dArr.push(dom);
                              n=dArr.length-1;
                         };
                         k.push({
                              type:'html',   //   
                              dom:n, 
                         });
                   };
      },
      'e-input':function(str,dom,pTree,domIndex,items,forF,forD){
          var arr,i=0,l,a,b,c,d,e,f,g,h,j,k,v,m,n, O, dArr, u;
               k=keyAnalysis(str,pTree);
               if(k){
                     O=forF?forD.$_dom:domIndex;
                     dArr=O.dom;         // 储存的dom
                     n=dArr.indexOf(dom);
                     if(n<0){
                          dArr.push(dom);
                          n=dArr.length-1;
                     };
                     k.push({
                          type:'input',   //   
                          dom:n, 
                     });
               };
      },
      'e-change':function(str,dom,pTree,domIndex,items,forF,forD){
          var arr,i=0,l,a,b,c,d,e,f,g,h,j,k,v,m,n, O, dArr, u;
               k=keyAnalysis(str,pTree);
               if(k){
                     O=forF?forD.$_dom:domIndex;
                     dArr=O.dom;         // 储存的dom
                     n=dArr.indexOf(dom);
                     if(n<0){
                          dArr.push(dom);
                          n=dArr.length-1;
                     };
                     k.push({
                          type:'change',   //   
                          dom:n, 
                     });
               };
      },
      //储存idDom
      'e-id':function(str,dom,pTree,domIndex,items,forF){
           if(forF)return; //e-id 是唯一dom   ,for循环中不生效 
           items.$_idDoms[str]=dom;  //
      },
      //事件
      'e-event':function(str,dom,pTree,domIndex,items,forF,forD,evt,type,path){  //
               var arr,i=0,l,a,b,c,d,e,f,g,h,j,k,v,m,n,O,dArr,u;
                   arr=str.split(';');//多少条 event 属性
                   l=arr.length;
                   if(forF){//正在循环中 
                       c=forD.$_e_dom;
                       d=forD.$_e_fun;  
                   };
                   O=forF?forD.$_dom:domIndex;
                   dArr=O.dom;      //储存的dom
                   arr.forEach(function(str){
                              b=str.split(/\:|\=/);  //onXXXX:eventName;
                              // b=str.split(':'); 
                              if(b.length===2){
                                   n=dArr.indexOf(dom);
                                   if(n<0){
                                        dArr.push(dom);
                                        n=dArr.length-1;
                                   };
                                   if(forF){ //for 循环
                                        c.push(n);
                                        d.push(b);
                                   }else{
                                        var eName=b[0];
                                        var efun=evt[b[1]];
                                        var iv=items;
                                        var mf=iv.$_methods;
                                        if(efun===u){
                                             console.error('未知的 domEvent   =>  '+b[1]);
                                             return;
                                        }; 
                                        var data= iv.$_data; 
                                        dom[eName]=function(e){
                                             var dd={
                                                     data:data,
                                                     baseData:getBaseData(data,path),
                                                     methods:mf,
                                                     idDoms:iv.$_idDoms,
                                                     this:this,
                                                  };  
                                             efun.apply(mf,[dd,e]);
                                        };
                                   // 此处 dom 可绑定数据 之类的~~~~~~
                                   // dom.$_items=items
                                   };
                              }else{
                                   console.error('错误的 e-event  数据  => '+str);
                              };
                   });
               //     while(i<l){
                        
               //       i++;
               //     };
      },
      //非指令,处理textContent的 
      'txt':function(str,dom,pTree,domIndex,items,forF,forD){
           var a,b,c,d,e,f,g,h,i,j,k,l,m,n,O;
           var reg=/(\{\{[^{}]+\}\})/;
               // console.log(str);
               // debugger;
                c=forF?forD.$_dom:domIndex;
               //  dArr=O.dom;      //储存的dom
               if(reg.test(str)){ 
                   a=str.split(reg);  //进行分隔 以 {{ }} 进行分隔 
                   i=0,l=a.length;
                   while(i<l){
                      b=a[i];
                      if(reg.test(b)){ //符合 {{xxx}}
                          b=b.replace(/({{|}}|\s)/g,''); // 删除 键 的包围括号 和 空格
                          if(b!==''){
                              k=keyAnalysis(b,pTree); //获得pTree储存位置
                              if(k){
                                   d=c.dom; //
                                   n=d.indexOf(dom)
                                   if(n<0){// 未储存的dom  (只用添加一次 ,不同的key 指向一个 dom 时, dom只可能拥有一个 textCOntent (共用), )
                                        d.push(dom);
                                        n=d.length-1;  //index
                                        c[n]=a;        //拼接字符串     
                                   };
                                   a[i]=''; 
                                   k.push({
                                        type:'txt',
                                        dom:n,       //指向  domIndex.dom[]
                                        index:n,     //指向的 domIndex 的index 的字符串拼接 array
                                        pos:i,       //array 中拼接 的位置索引    
                                   });
                                   dom.textContent='';//清空
                             };
                          };   
                      };    
                      i++;
                   };

               };
      },
};

/* 
获取 baseData   event事件作用域内的 base数据
*/
var getBaseData=function(data,path){
   var  i=0,l=path.length,d=data,v, u;
       while(i<l){
           v=path[i];
           d=d[v];
           if(d===u)return d; 
          i++;
       };
       return d;
};

/**
 拆解 forDom 结构 
 dom: cloneTree.forXXx.$_build  = forDom
 arr: []  进行索引查询对比的 cloneTree.forXXx.$_dom.dom 的arr数据
 out: 返还引用数据
 */
var analyzeFor=function(dom,arr,out){
     var a=dom,b=dom.childNodes,i=0,l=b.length ,c,d,e,f,g,h,o,i,j,k,n,u;
          c=a.nodeName; //node Name
          d=a.attributes;
          if(l===0){
              e=a.textContent; //文本内容
              if(e==='')e=u;   //防止 '0'现象出现
          };
          n=arr.indexOf(dom)
          
          out.name=c,        // nodeName
          out.attr=d||[],    // attributes 行内属性
          out.txt=e,         // textCntent 文本内容 , 末端节点才有
          out.index=n;       // 对应所在创建位置
          if(l>0){//存在子元素
               out.children=[];
               while(i<l){
                    g=b[i]; //zDom
                    o={};
                    out.children[i]=o;
                    analyzeFor(g,arr,o);
                    i++;
               };              
          };     
};

/**
 * 克隆for循环的 domPath结构数据
 */
var refuse={//克隆属性 列表  0:特殊复制 1:直接赋值,2:禁止  其它深复制
     $_build:2,
     $_e_dom:1,
     $_e_fun:1,
     $_f_p:1,
     $_f_c:1,
     $_parent:2,
     $_dom:0,    // 
};

/**
 * 克隆 for循环的 tree数据结构
 * @param {*} data 
 * @param {*} out 
 * @returns 
 */
var cloneForTree=function(data,out){ //cloneTree.forName  , 返回clone数据
     var a,b,c,d,e,f,g,h,v,k,u;
     if(out===u)out={};
     for(k in data){
          f=true;  //允许向下复制
          v=data[k];
          a=refuse[k];
          if(a===1){
               out[k]=v;  
          }else if(a===0){//e_dom
               v.dom=[];
               out[k]=newJson(v); //防止数据引用
          }else if(a===u){
               b=typeLX(v);
               if(b===5){
                    out[k]={};
                    cloneForTree(v,out[k]);
               }else if(b===4){ //属性值,结构
                    out[k]=newJson(v)
               }else if(b!==0){
                    out[k]=v; 
               };
          };  
           //2 不需要复制 
          /* if(a!==2){
               out[k]=v;
          };
          if(k==='$_f_c'){//有子循环的for
               out.$_children=[]; // 提前建立一个储存子元素的 数组
          };
          if(k==='$_dom'){
               v.dom=[]; //清空dom
               out[k]=newJson(v); //防止数据引用
               f=false;
          };
          if(f&&a===u&&v.nodeName===u){// undefind 允许向下 深复制的数据  && dom不允许父
               b=typeLX(v);
               if(b===5||b===4){//json ,array
                    cloneForTree(v,out[k]);
               };
          };  */
     };
     return out;
};

/* 
 创建 forDom 同时匹配基于index匹配dom 
*/
var buildForDom=function(data,arr, parent){ //forDom 还原数据 ,  tree.$_dom.dom , 父dom元素
     var  attr=data.attr, name=data.name,txt=data.txt,index=data.index,children=data.children||[],dom,i=0,l,a,b,c,d,e,f,g,u;
           if(name!=='#text'){
                dom=doc.createElement(name);
           }else{
                dom=doc.createTextNode('');
           };
           if(parent)parent.appendChild(dom); //添加当前元素
           if(txt!==u){
                 dom.textContent=txt; 
           };
           if(index>-1)arr[index]=dom; //用于匹配dom
           i=0,l=attr.length;
           while(i<l){
               a=attr[i];
               dom.setAttribute(a.name,a.value);
              i++;  
           };
           i=0,l=children.length;
           while(i<l){
                b=children[i];
                buildForDom(b,arr,dom);
              i++;  
           };
           // 返回有检查是否有 $_f_c属性 
    return dom;
};

/**
 * 新创建的dom 对象 ,绑定 dom 事件  
 * @param {*} d        forTreeD
 * @param {*} drr      domArr
 * @param {*} evt      event
 * @param     it       app.items
 * @param     name     forIdName
 * @param     t        Eng实例this  
 */
var forEvent=function(d,drr,evt,items,name,t){
     var dv=d.$_e_dom,ev=d.$_e_fun;
          dv.forEach(function(n,i){
            var dom,eName,eFun,v,z=items,mf,u;   
                dom=drr[n];//对应事件的dom 
               if(dom){
                    v=ev[i];                // [evtName , funName]
                    eName=v[0];
                    eFun=evt[v[1]];
                    mf=z.$_methods;
                    if(eFun===u){
                         console.error('未知的 domEvent   =>  '+v[1]);
                         return;
                    }; 
                    dom[eName]=function(e){ //  e=event
                        var vv=d.$_items;
                        var dd={
                                data:   z.$_data,
                                forData:vv.forData,
                                forDataAll:vv.forDataAll,
                                index:  vv.index,
                                pos:    vv.pos,
                                idDoms:   z.$_idDoms,
                                methods:mf,
                                this:this,
                                parent:function(deep){
                                   var na=name,ps=vv.pos;
                                       deep=deep<<0||1;
                                       if(deep<1)deep=1;//至少查找深度为1 
                                       return t.getPdata(ps,na,deep);

                              },
                            };
                            eFun.apply(mf,[dd,e]);
                    };
               };
          });        
};


/**
 * timer 计时器相关 
 */
//动画事件队列  
var timeArr=[
     /* 
        [ //delay 延迟
               0,     0 = delay 延迟执行
               1,     loop   0:不循环,1:始终循环 (相当于setInterval)
               2,     延迟执行时间 间隔时间
               3,     储存当前时间
               4,     调用方法
               5,     this指向
        ],
        [
               0,      1= 按帧执行   
               1,         每次function 执行的帧 间隔 ,  默认1
               2,         储存当前 帧 
               3:null,
               4,         调用方法
               5,         this指向
        ]
     */
];
var startTime=0; //减少计算长度
var getTime=function(){
     return new Date().getTime()-startTime;
};
startTime=getTime();
(function(){
   var timer=window.requestAnimationFrame||0;
   var arr=timeArr;
   var fun=function(){
       var i=0,l=arr.length,a,j,rv,f;
           if(l>0){
               j=getTime();
               while(l--){
                    a=arr[l];
                    f=false;
                    if(a[0]===0){ //延迟 
                         if(j-a[3]>=a[2]){//触发执行
                                   rv=a[4].call(a[5]);  
                                   if(a[1]===1){ //循环执行, 更新存储时间, 进入下个计时循环
                                        a[3]=j;
                                   }else{ //删除
                                        f=true;// 周期结束 手动结束延迟调用
                                   };
                                   if(rv||f){
                                        arr.splice(l,1); //从事件队列中删除   
                                   };
                         };
                    }else{ //1帧  
                         a[2]++;
                         if(a[2]>=a[1]){ //满足执行条件
                              a[2]=0 ;   //置空
                              rv=a[4].call(a[5]); //执行
                              if(rv)arr.splice(l,1); //从事件队列中删除
                         };
                    };
               };
          };
           if(timer)timer(fun);
   };
       if(timer){
            timer(fun);
       }else{//  setInterval
            setInterval(fun,1000/60);
       };     
})();

/**
 * 
 * @param {*} str  css样式数据
 * @param {*} id   标记id
 */
var eId=-1;       //标记id 每次调用++;
var getStyle=function(str,id){
     var reg=/\/\*[\s\S]*?\*\//g;      // 块注释
     var reg0=/\/\/[\s\S]*(?=\r|\n|$)/g;// 行注释
     var reg1=/(\{[^{}]*\})/g;          // 匹配所有  {xx} 样式属性内容  
     var reg3=/\s+/g;                   // 分割后 所有 id 类名 标签的  大于2的间隔
     var css='',arr,i=0,l,v,sv='',cv='',ar,s=0,e=0,n;
     var pj='[eng_'+id+']';
         str=str.replace(reg,'').replace(reg0,'');    // 去除块和行注释
         str=str.trim();              // 去除两侧空格s
         css=str.replace(reg3,' ');   // 去除多余空格 (大于2个的空格)   (待匹配修改的纯净 css 文本)
     //     debugger
     //     str=css.replace(reg1,'_-|-_');    // 去除属性内容
     //     arr=str.split('_-|-_');         // 分割所有 id clas类 标签属性
         arr=css.split(reg1);   // 分割拼接,所有偶数位的是 id,class或tag
         l=arr.length;
         while(i<l){
               v=arr[i];
               v=v.trim();
               if(v!==''){
                  ar=v.split(reg3);
                  e=ar.length;
                  if(e>1){
                      sv='',s=0;
                      while(s<e){
                         cv=ar[s].trim();
                         if(cv!==''){
                             if(s>0)sv+=' '; 
                             n=cv.search('::');
                             if(n<0){
                                 sv+=cv+pj;
                             }else{
                                 if(n===0){ 
                                    sv+=pj+cv;
                                 }else{
                                    sv+=cv.replace('::',pj+'::');  
                                 };
                             };
                         };
                         s++;
                      };
                  }else{
                      n=v.search('::');
                      if(n<0){ 
                          sv= v+pj;
                      }else{
                         sv=v;  
                          if(n===0){ 
                             sv=pj+v;
                          }else{
                             sv=v.replace('::',pj+'::');  
                          };
                      };
                  }; 
                  arr[i]=sv; 
               };
            i+=2;   
        };
     var dom=doc.createElement('style');
         dom.innerText=arr.join('');
         bod.appendChild(dom);
         return dom;   
};

var APPS={
     /* 
       appName:{
            state:'sleep',   //sleep:休眠 (内存非页面)   active:使用中 ,  die:销毁 ( 原则上获取app时是 undefind||null ) ,
            self:appObj      //app 的 this 对象  
            el:appDom,       //app 的 dom  node对象 
            methods:         //app 的 methodS 方法
            data: ,          //app.$_data 
       }
     */
};

var ARR={
       a:[], //存储 app.data  用于匹配查找b 
       b:[], //储存 APPs 对象
}; //以数组索引方式储存 查找app

/** 
 *cfg={
 *    el:'',   节点 id 或 dom 本身  
 *    data:{}  数据对象       
 *}
*/

/* 
从 arguments  index=1 位置开始获取并返回番薯
*/
var getArgs=function(d){
     var i=1,l=d.length,arr=[];
         while(i<l){
              arr.push(d[i]);
            i++;
         };
         return arr;
};

window.Eng=function(cfg){
   var t=this ,el=null,data,dom,lx,dlF,u;
       dlF=cfg.dataOnly?true:false;
       t.dataOnly=dlF;  // true:仅做数据响应 ,不处理 dom
       dlF=!dlF;
     //   debugger
       if(dlF){
               el=cfg.el; //被循环遍历 数据dom 对象
               lx=typeLX(el);
               if(lx===1){
                    dom=getById(el); // domId
                    if(!dom)dom=getDom(el);          // htmlStr
                    el=dom;
               }else if(lx===5){//html Build 暂缺
                    //暂缺
               };
               if(!el){
                    console.error(' el  error    =>   '+cfg.el);
                    return;
               };
       };    
       t.el=el;
       if(cfg.css){
             eId++;
             t.cId=eId; //唯一 cssId
             t.css=getStyle(cfg.css,eId);
       };
   var mf=cfg.methods||{};
       t.id=cfg.id;
       t.watcher={};
       t.watcherFor=cfg.watcherFor||{}; // dom事件
       t.event=cfg.domEvent||{};        // 事件区域 
       data=newJson(cfg.data||{});
       //私有属性方法 内部全局访问
       t.items={
            $_el:t.el,
            $_id:t.id,              //组件 id    
            $_data:data,            //全部数据
            $_idDoms:{},            //储存所有 id Dom 
            $_methods:mf,           //自定义属性方法区域
       };
       t.timer=cfg.timer||{}; // 定时器相关方法  
   var items=t.items;
       mf.$_el=t.el;
       mf.$_idDoms=items.$_idDoms;
       mf.$_data=items.$_data;
       mf.$_id=items.$_id;
       mf.$_state='active';
       t.sleep=false;
       t.items.$_data=data;

       t.data=data;  
       t.extraInit();                        // 额外补充方法
      //执行init 方法 , 当组件还未 创建时
       if(mf.onInit)mf.onInit.apply(mf,getArgs(arguments));

      
       if(dlF)t.domInit(el);         // 解析appDom
     //   debugger
       t.forInit();                          // 生成forDom相关初始化 
       t.setInit();                          // 设置相关
       t.wcInit(null,cfg.watcher);           // 将watcher, 解析成 纯 键值对  
       t.dataInit(data);                     //

   var p=cfg.parent;
       if(dlF&&p){
            if(typeLX(p)===1)p=getById(p);
            p.appendChild(t.el); // 存在父容器
       };    
       //创建完成 方法  
       if(mf.onCreated)mf.onCreated();
       if(!t.sleep)t.onAwake();   // 执行,非默认状态时唤醒
   var ap={
               state:t.sleep?'sleep':'active',
               self:t,
               el:el,
               methods:mf,
               data:data,
               id:t.id,
        };  
       if(t.id!==u)APPS[t.id]=ap;
        
       ARR.a.push(data);
       ARR.b.push(ap);  
       return data;
};

//增加一个单独的数据绑定  响应 methods.$_data 的设置
Eng.prototype.setInit=function(){
     var t=this,$i=t.items,$f=$i.$_methods,data=$f.$_data,$w=t.watcher;
         /**
          * 对 method.$_data=xxxx 新设置的数据 进行处理 
          * (在不破坏引用数据关系的前提下做处理)
          * @param {*} o 新数据 
          */
         t.setNewData=function(o){
              var k,v,n;
                  //清除所有旧数据
                  for(k in data){
                       v=data[k];
                       n=typeLX(v);
                       if(n===4){//array
                           data[k]=[]
                       }else if(n===5){//json
                         //   data[k]={};
                       }else{
                           //普通值
                         //   data[k]='';
                       };
                         //   delete data[k];
                  };
                  //赋值新数据
                  for(k in o){
                       data[k]=o[k];
                  };
                  t.reSetData(data);
         };
         /**
          * 在 method 中 通过 method.$_data=xxxx 设置全部数据的 对应数据响应处理方法 
          * 
          */
         t.setDataBind=function(){
               obk($f,'$_data', {
                    enumerable:false,
                    set:function(s){
                         s=newJson(s); 
                         t.setNewData(s);
                    },
                    get:function(){
                         return data;
                    }
               });   
         };
         t.setDataBind();
         //for 循环内 添加watcher 的方法  
         t.addWatcher=function(pth,obj){ //pth:前置路径 , obj对应方法
              var k,v;
               //    for(k in obj){
               //         v=obj[k]; // 对应的方方法
               //         console.log(pth+k);
               //         t.watcher[pth+k]=v;
               //    };
               t.wcInit(pth,obj);
         };
         /**
          * 将 watcher 数据转换成 纯 键值对格式 ,赋值到 this.watcher
          * @param {*} kStr 
          * @param {*} obj 
          */
         t.wcInit=function(kStr,obj){
             var k,v,str;
                 if(!obj)return;
                 for(k in obj){
                      v=obj[k];
                       str=kStr!==null?kStr+'.'+k:k;
                      if(v instanceof Function){
                           $w[str]=v;
                      }else{
                           t.wcInit(str,v);  
                      };
                 };
         };         
};

/**
 * 遍历dom  所有 子节点 以及属性设置  
 * @param {*} DOM  最初始被循环的dom 对象 
 */
Eng.prototype.domInit=function(DOM){
   var t=this,tree={},domIndex={dom:[]} ,cloneTree={},buildTree={},mlArr,u;
   var tagMap={//不允许解析的 dom标签
          SCRIPT:1,
          STYLE:1,
          HEAD:1,
       };
       //tree:{}        储存所有 dom 数据 结构
       //domIndex:{}    储存所有 eng使用到的数据响应dom  和 txt 拼接索引  (不包含 for循环内的 )
       //cloneTree:{}   储存所有 for循环的dom 数据结构  forIdName  为Key   以及$_dom 同上  
       //buildTree:{}   储存所有 for循环的构建编译数据  forIdName  为key  

       //所有支持 行内指令   e-base , e-for  单独处理
       mlArr=['e-id','e-attr','e-style','e-event','e-input','e-change','e-html'];
       /**
        * 自循环遍历所有 dom 
        * @param {*} dom    被循环 dom
        * @param {*} pTree  父储存数据结构目录
        * @param {*} forF   遍历状态=>  true: for循环中, false:普通模式
        * @param {*} forD   被循环的for数据 根数据 
        */
       t.loopDom=function(dom,pTree,forF,forD,path){
            if(!dom)return;
             var i=0,l,arr,zDom,zChildren,zTree,res,f,forF2,forD2,pth;      //forF2,forD2 防止被同辈for 污染
                //arr:储存所有子节点
                if(!dom.length){
                  arr=[dom];          //基点本身
                }else{
                  arr=dom;            //所有子节点 包含 nodeName="#text"
                };
                l=arr.length;
                while(l--){  //倒着执行,防止正向删除的冗余逻辑判断 (可能有不可预期的结果)
                    f=false;
                         zDom=arr[l]; //子节点
                         // if(zDom!==u){ 
                              // 子节点的后代元素
                              zChildren=zDom.childNodes;
                              // 判断是否为根节点 (没有后代的 ,才检查 textContent)
                              if(zChildren&&zChildren.length>0)f=true;
                              // 对zDom进行解析
                              res=t.attrAnalysis(zDom,pTree,f,forF,forD,path); ;// []
                              if(res!==u){ //e-html 不在向下遍历子元素 (因为都会被覆盖)
                                   zTree =res[0];     //base 基础            
                                   forF2 =res[1];     //遍历状态
                                   forD2 =res[2];     // 循环中的for 根数据若有
                                   pth=res[3];        // 新的路径地址
                                   // if(res[4])i--;     // 有删除元素, 索引位置会退, 防止漏掉节点
                                   if(f){//存在后代元素
                                        t.loopDom(zChildren,zTree,forF2,forD2,pth);
                                   };
                              };
                    //     };
                    // i++;    
                };
       };

       /**
        * 获取 zTree 的 Ptree (向上查找,或向下创建)  并返回baseTree 和 baseName
        * @param {*} str 
        * @param {*} pTree 
        * @param {*} forF  e-for循环指令内传递而来的  true:父元素不记录子数据信息 (防止错误指向)
        */
       t.getNowTree=function(str,pTree,path,forF){
            var arr=str.split(/\./),i=0,l=arr.length,d,p=pTree,a;
            var key={'$_parent':true,'$_p':true,'$_P':true}; 
               while(i<l){
                     a=arr[i]; //路径名
                     if(!key[a]){//向下
                         d={
                            $_parent:p, //父级base数据
                         };
                         p[a]=d;
                         p=d;
                         path.push(a);
                     }else{ //向上查找父元素
                         d=p.$_parent;
                         if(!d)d=p;
                         p=d;
                         path.pop(); // 
                     };
                    i++;
               };
               if(forF)delete d.$_parent[a];// 子循环信息 不在 父循环pTree下记录, 否则不会判断指向 $_children
               return [d,a];   //pTree,key
       };

       /**
        * 对dom 元素的  行内属性进行解析 
        * @param {*}  dom 
        * @param {*}  tree 
        * @param (*)  root  => true:有子元素 false:根节点(判断textContent)   
        * @param {*}  forF  => true:处于for循环中
        * @param {*}  forD  => 父循环 treeD
        * @param {*}  path  => base路径   
        * @returns  未出现 e-base的情况下  返回父元素, 否则生成 返回 baseTree (zTree)
        */
       t.attrAnalysis=function(dom,pTree,root,forF,forD,path){
          var attrs=dom.attributes,i=0,l=mlArr.length,ml,atr,zTree,flag=true,delF=false,n,pp,zf,type;
          var nName=dom.nodeName;
          //    debugger
               if(tagMap[nName])return;// 禁止向下解析的 dom 类型 例如script 
                //注释 node  直接 删除 返还 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               if(nName==='#comment'){ 
                    delDom(dom);
                    return [pTree, forF , forD ,path,delF];    
               };  
              if(attrs){//有行内属性类型 类型
                        if(t.cId!==u)dom.setAttribute('eng_'+t.cId,'');
                        //e-stop 单独处理 (阻止向下判断dom) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ml='e-stop';
                        atr=attrs[ml];
                        if(atr!==u){// ''值 也有效 
                              dom.removeAttribute(atr.name);
                              return; 
                        };
                        //e-for  单独处理~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        ml='e-for';
                        atr=attrs[ml];
                        if(atr!==u){
                              dom.removeAttribute(atr.name);
                              atr=atr.value.replace(/\s/g,''); //消除字符串 所有空白
                              if(atr!==''){
                                   // debugger;
                                   path=[]; //基于for循环的根目录
                                   zf=t.getNowTree(atr,pTree,path,forF); //[ baseTree, baseName  ]
                                   zTree=zf[0];
                                   /* zTree={
                                        $_parent:pTree,   // 父级base数据 for循环中是 特殊的临时的
                                        $_build:dom,      // 待解构 dom  (将for循环dom解构成数据)
                                        $_f_id:atr,       // for循环idName
                                        $_dom:{dom:[] },  // 储存for循环中所有使用到的dom , 并储存txtArr所在索引对应的拼接数据
                                        $_e_dom:[],       // e-event 事件对应的 dom
                                        $_e_fun:[],       // e-event dom 对应的 事件 
                                   }; */
                                   zTree.$_build=dom,      // 待解构 dom  (将for循环dom解构成数据)
                                   zTree.$_f_id=zf[1],       // for循环idName
                                   zTree.$_dom={dom:[]},  // 储存for循环中所有使用到的dom , 并储存txtArr所在索引对应的拼接数据
                                   zTree.$_e_dom=[],       // e-event 事件对应的 dom
                                   zTree.$_e_fun=[],       // e-event dom 对应的 事件 
                                  
                                   pp=dom.parentNode;
                                   if(!forF){//根 父级 for 循环
                                        zTree.$_f_p=pp ;              // 根循环中 是 父dom 容器    
                                   }else{    //说明是 子循环的 for 
                                        zTree.$_parent=null;  
                                        zTree.$_f_p=forD.$_f_id;      // 子循环中指向 forIdName
                                        n=forD.$_dom.dom.indexOf(pp); // 子循环容器的位置
                                        if(n<0){
                                             forD.$_dom.dom.push(pp);
                                             n=forD.$_dom.dom.length-1;
                                        };
                                        forD.$_c_id=zf[1];          // 子循环idName
                                        forD.$_f_c=n;               // 父循环有子循环  记录子循环的相对容器dom ,指向 $_dom.dom[index]  (build后 更改为dom,若有)
                                   };
                                   delDom(dom);          // 从父dom 中 删除
                                   cloneTree[zf[1]]=zTree; // 根据forIdName   
                                   // pTree[atr]=zTree;  // tree 下层分支数据 for 要断开
                                   pTree=zTree;          // 更改当前 base 作用域
                                   forD=zTree;           // 被循环for数据的 根数据 
                                   forF=true;            // 进入for 循环状态 
                                   flag=false;           // for 和 base不能同级 
                                   delF=true;
                              };
                         };
                        //e-base 单独处理  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         if(flag){// for 和 base不能同级  (不能出现在同一级行内属性中 ,  因为for本身就是一个base )
                                   ml='e-base';
                                   atr=attrs[ml];
                                   if(atr!==u){
                                        dom.removeAttribute(atr.name);
                                        atr=atr.value.replace(/\s/g,''); //消除字符串 所有空白
                                        if(atr!==''){
                                             // debugger
                                             path=path.slice();
                                             pTree=t.getNowTree(atr,pTree,path)[0];
                                        };
                                   };
                          };  
                         //解析 'e-id'(非for内 未!!),'e-attr','e-event'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                         while(i<l){
                              ml=mlArr[i];     // e-?? 对应指令
                              atr=attrs[ml];
                              type=u;
                              if(atr!==u){ //有对应属性
                                   dom.removeAttribute(atr.name);
                                   atr=atr.value.replace(/\s/g,''); //消除字符串 所有空白
                                   if(atr!==''){//非空字符串 
                                        if(ml==='e-style')ml='e-attr',type='style';
                                        attr_Fun[ml](atr,dom,pTree,domIndex,t.items,forF,forD,t.event,type,path);     // 解析行内属性   
                                        if(ml==='e-html')return; // e-html 不在向下解析子元素 因为所有的子元素都将被覆盖 
                                   };
                              };
                              i++;
                         };
              };//if(attrs!==u) END ~~~~
               //解析 txt 单独处理 (只对根节点进行 判断 , )~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              if(!root){
                    atr=dom.textContent;
                    if(atr!==u)atr=atr.trim();
                    // if(atr=='base1.v1= {{v1}}')debugger;
                    // if(atr=='base1.base2.v1 = {{base2.v2}}')debugger;
                    if(atr!==u&&atr!==''){
                              attr_Fun.txt(atr,dom,pTree,domIndex,t.items,forF,forD);  // 解析
                    };
                    if(nName==="#text")if(atr==='')delDom(dom); //清除空的 #text 节点
              };
                return [pTree, forF , forD, path,delF];       
       };

       /**
        * 将forDom 编译成结构数据 ,同时 将tree.xxx.xx. forName= 改为 =[] 的数据路径结构
        */
       t.structFor=function(){
            var k,o=cloneTree,a=buildTree,b,c,d,e,p;
                for(k in o){ //k=forIdName
                    b=o[k];            //对应数据
                    p=b.$_parent;      //父数据目录
                    if(p===u)p=tree; // null 是子元素 , 父for 循环中 undefined意味着就在根目录
                    if(p)p[k]=[];  //改为 数据路径结构
                    c={};
                    analyzeFor(b.$_build,b.$_dom.dom,c); //对dom 进行数据结构化 拆解
                    a[k]=c;
                }; 
       };

       t.loopDom(DOM,tree,false,null,[]);
       t.structFor();
       t.tree=tree;           //
       t.domIndex=domIndex;
       t.cloneTree=cloneTree;
       t.buildTree=buildTree;
     //   console.log(tree)
     //   console.log(domIndex);
     //   console.log(cloneTree);
     //   console.log(buildTree);
};

/**
 * 数据绑定 
 */
Eng.prototype.dataInit=function(DATA){
   var t=this, tree=t.tree, domIndex=t.domIndex;
   var $W=t.watcher,items=t.items,$f=items.$_methods;
   var item={
          data:items.$_data,
          el:items.$_el,
          id:items.$_id,
          idDoms:items.$_idDoms,
          methods:$f
   };
   var limit={ //当数据类型不同时 , array , json 和 boolean 三种类型不允许类型覆盖
          1:true,     // string
          3:true,     // number
          2:true,     // boolean
          4:false,    // array
          5:false,    // json
       };
//   var Arr=[],Fun=[];          
//   var proto=getProto(Arr,Fun); //获得一个 用于 指向原型 的覆盖Array 的方法 用于触发响应
  var dlf=t.dataOnly;          //纯数据响应
          /**
           * 对数据进行循环
           * @param {*}  o      数据
           * @param {*}  path   key 数据路径 [ key, key]
           * @param {*}  flag   true: 当前进入了 for 循环状态
           * @param      indexF   当前是 [] 数组的index循环中,记录 index
           * @param      arrF     处于数组循环中 
           * @param {[]} pos    储存当前被循环所在循环的位置, [*,*,*,*] 长度代表当前被循环的深度
           * @param {}   del    true:清空当前所有数据
           */
          t.forData=function(o,path,indexF,arrF,pos,del){   
               var a,b,c,d,e,k,v,n,pth,wz,xhF=false,arF=arrF,jbF,lf,u;
                    for(k in o){
                         arrF=arF; //防止 for 内循环 覆盖(期间有个array 影响其它类型) 
                         // if(flag&&k==='_proto_')continue;  //因为重写了 array部分方法,所以这个参数无需判断  当时array时
                          wz=pos.slice(0); //防止数据引用
                          if(indexF){ //当前是 [] 数组的index循环中,记录 index
                               k=k*1;
                               if(k!==k)continue;// 防IE 遍历 "__proto__"
                               wz.push(k);    //记录索引位置 ,  push 是因为当前是 index循环,必然是全新的循环 ,不会出现覆盖
                          };
                          v=o[k];
                          n=typeLX(v);       // 1:string 2:boolean ,3:number 4:Array,5:json
                          pth=path.slice(0); // 防止数据引用
                          pth.push(k);
                          jbF=limit[n];      // true:基本数据类型 , false: 数组或json
                          t.bindKey(k,o,n,pth,wz,arrF,del,indexF&&jbF?true:false);  //进行数据绑定
                          if(n===4){//需要先创建 dom 和 配套数据结构
                                   // console.log(' 创建 Array ');
                                   xhF=true;     //  下个循环是 数组的 的index 循环 ,要记录index
                                   arrF=true;    //  之后的循环都是在 在数组中
                                   t.forBuild(k,0,v.length,pth,wz,2,v); //  创建forDom和forTree    2:多补少删
                          };
                          if(jbF===false){  //  json 和 array 进入子循环 
                                   t.forData(v,pth,xhF,arrF,wz,del);
                                   if(n===5&&arrF){//数组循环中绑定一个 $_index 索引 到json 类型
                                             k='$_index';
                                             delete v[k]; //防止排位引用
                                             v[k]=wz[wz.length-1];
                                             pth=pth.slice(0);
                                             pth.push(k);
                                             t.bindKey(k,v,3,pth,wz.slice(0),arrF,del,false);
                                   };
                          };
                          xhF=false;  //防止 同级子元素 类型覆盖    {arr:[],json:{} }这种 
                    };
          };

          //清空所有数组引用
         /*  t.forDataClear=function(o,path,indexF,arrF,pos,del){
               var a,b,c,d,e,k,v,n,pth,wz,xhF=false,u;
                    for(k in o){
                         // if(flag&&k==='_proto_')continue;  //因为重写了 array部分方法,所以这个参数无需判断  当时array时
                          wz=pos.slice(0); //防止数据引用
                          if(indexF){ //当前是 [] 数组的index循环中,记录 index
                              k=k*1
                              wz.push(k);    //记录索引位置 ,  push 是因为当前是 index循环,必然是全新的循环 ,不会出现覆盖
                          };
                          v=o[k];
                          delete o[k];
                          n=typeLX(v);  //1:string 2:boolean ,3:number 4:Array,5:json
                          pth=path.slice(0); //防止数据引用
                          pth.push(k);
                          if(n===4){//需要先创建 dom 和 配套数据结构
                                   v.clear();     //清除原型
                                   xhF=true;     //  下个循环是 数组的 的index 循环 ,要记录index
                                   arrF=true;    //  之后的循环都是在 在数组中
                                   t.forBuild(k,0,0,pth,wz,2); //  创建forDom和forTree
                          };
                          if(limit[n]===false){  //  json 和 array 进入子循环 
                                   t.forDataClear(v,pth,xhF,arrF,wz,del);
                          };
                           
                    };
          }; */
          
          /**
           * 数据匹配删除       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           * @param {*} oD   旧值
           * @param {*} nD   新值
           */ 
          t.dataClear=function(oD,nD){
               var k,v,n,nv,ol,nl,u;
                   if(nD===u)nD={}; // 用于全部 删除时的临时 空数据 , 防报错 
                   for(k in oD){
                        v=oD[k];           //  旧数据的值
                        nv=nD!==u?nD[k]:u; //  新数据的值 
                        n=typeLX(v);
                        if(n===5){ //json
                              t.dataClear(v,nv);
                        }else if(n===4){// Array
                              if(nv===u){
                                   nv=[];  
                                   nD[k]=[]; //空数据
                                   nl=0;
                              };
                              ol=v.length,nl=nv.length;
                              if(ol!==nl){ //当数据长度不匹配时
                                   if(ol>nl)v.splice(nl); // 旧数据删除     (超出不作处理)
                              };
                              v.clear();//清除原型链 
                              t.dataClear(v,nv);
                        }else{
                              // 普通值 不做处理 ,理应 新值覆盖 ,使用者的事, 我不越权处理   (否则会发生 数组 排序插入时, 会有不可预期的后果 ) ~~~~~
                        };
                   };
          };

          /**
           * 将数据进行绑定 进行绑定 
           * @param {*}  key 
           * @param {*}  obj 
           * @param {*}  type  类型
           * @param {*}  path  数据key路径 []
           * @param {[]} pos   当前数据所在的 循环位置,  [*...] 长度代表当前被循环的深度
           * @param      arrF  true: 当前处于 [] 循环中
           * @param      del   true: 擦除所有数据  
           * @param      jbF   true: 数组数据是基本类型 ,false 不是
           */
           t.bindKey=function(key,obj,type,path,pos,arrF,del,jbF){
              var value=obj[key],flag, nrr,treeD,domArr,keyStr=path.join('.'),reg=reg=/^\$\_/,wFun,reV,bF,rf,aF,u;
                    
                    // console.log(path)
                    // debugger
                   //wFun : 匹配的watcher方法
                   wFun=$W[keyStr];
                   if(!del&&wFun){ //判断 watcher关系 
                        delete $W[keyStr];
                        reV=wFun.apply($f,[u,value,item]); //返回值
                        if(reV!==u){
                             value=reV;
                             obj[key]=reV;
                        }; 
                   };    
                    // console.log(keyStr);
                    nrr=t.pathDest(path,arrF);   //   [treeValueD , domArr] 
                    treeD=nrr[0];                //   treeValueD  
                    domArr=nrr[1];
                    nrr=null;
                    flag=limit[type];            //  true:可直接赋值的数据 (string,number,boolean) ,  flase:路径数据 {},[]
                    if(treeD===u){
                         //console.warn('不存在的 tree数据路径 =>  '+path.toString());
                          flag=false;            //  (对于 没有对应 dom 赋值的数据  ,   作为响应数据使用 )
                          bF=true;               //  纯数据响应绑定,
                    }; 
                   //  console.log(path.toString());
                   //  可直接赋值的属性 
                   if(flag){
                    // if(del||value===u)value='';        //清空数据
                       if(jbF===false){ // 普通基本类型数据
                            t.valueToDom(treeD,value,domArr,key,obj);
                       }else{//基本类型数组数据                              //注意!!!!!   后期改成 name + pos 指向 index 和 value (因为要 支持数据过滤) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            if(treeD.$_index)t.valueToDom(treeD.$_index,key,domArr,key,obj);   //存在 $_index数据
                            if(treeD.$_value)t.valueToDom(treeD.$_value,value,domArr,key,obj); //存在 $_value数据 
                            if(del)return; //无需向下执行
                       };
                   };    
                   if(type===4){//Array 对象    del=true时,直接在其它地方删除了    !!!!!!!!!!
                              /* if(del){
                                   console.log('从未执行过 ,暂时注销 ~~~~~')
                                   value=[];
                                   obj[key]=value;
                                   return;
                              }; */
                              aF=function(keyF,args){
                                   //     debugger;
                                      t.specialBuild(key,value,path,pos,keyF,args);
                                      t.forData(value,path,true,true,pos,false);
                              };
                              value=abk(value);
                              obj[key]=value;
                              value.zdy(aF);   //数组方法绑定
                              // Arr.push(value); // 原型链操作 数组 对象
                              /**
                               * keyF=>     push,pop,splice,concat,... 执行的支持方法名称,  
                               * args=>[]   arguments (执行这些方法时的参数)
                               */
                              // Fun.push(function(keyF,args){   // 数据  push,pop 之类 改变数时触发的方法 
                              //           t.specialBuild(key,value,path,pos,keyF,args);
                              //           t.forData(value,path,true,true,pos,false);
                              // });
                              // value.__proto__=proto; // 新的原型指向
                   };
               var enFlag=!reg.test(key);      // 非 $_开头的可枚举 (自定义数据  )
                   if(key==='$_index')rf=true; // 不响应修改的数据  (外部设置无效)
                   obk(obj, key, {
                         enumerable:enFlag, //可枚举   false:不可枚举, true:可枚举  $_index 不可枚举
                         // configurable: false, //默认false    true时允许修改其它属性描述符 如enumerable , writable 但没必要
                         set:function(s){
                                   if(rf)return value;
                                  //数据响应绑定检查~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                   if($W[keyStr]!==u){
                                        wFun=$W[keyStr]
                                        delete $W[keyStr];
                                        reV=wFun.apply($f,[value,s,item]); //返回值
                                        if(reV!==u)s=reV;
                                   }else if(wFun!==u){
                                        reV=wFun.apply($f,[value,s,item]); //返回值
                                        if(reV!==u)s=reV;
                                   };  
                                  //纯数据响应~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                  if(bF===true){ 
                                       value=s;
                                       return
                                  };
                                  //类型 判断 ~~~~~~~~~~~~~~~~~~~~~~~~~
                              var type2= typeLX(s);
                                  if(flag&&value!==s&&limit[type2]){ //类型不匹配时 ,只有 1,2,3类型允许相互覆盖
                                        value=s; 
                                        t.valueToDom(treeD,value,domArr,key,obj);
                                  }else if(!flag&&type===type2){//类型相同     json 或array
                                        if(type==5){ //5   json 全新的覆盖数据
                                             //  t.dataClear(value,s);
                                              value=s;
                                              t.forData(value,path,false,arrF,pos,false);//重新绑定
                                        }else{       //4 - array 全新的 完全 覆盖数据
                                             //  t.dataClear(value,s);
                                             value=abk(s);
                                             value.zdy(aF); //数组方法绑定
                                              t.forBuild(key,0,value.length,path,pos,2,value);
                                              t.forData(value,path,true,true,pos,false);//重新绑定
                                        };
                                  }else{
                                        // console.error('错误的数据类型 覆盖  ');
                                  }; 
                         },
                         get:function(){
                                return value; 
                         }
                   });
           };
          /**
           * 通过path路径指向数据目录 并返回
           * @param {*} path  [key,key,key] 数据路径 指向 tree
           * @param     arrF  在数组循环中
           */ 
          t.pathDest=function(path,arrF){
                   if(dlf)return [];   //纯数据响应 
                   if(arrF)return this.pathDest2(path)
               var i=0,l=path.length,k,d=tree,u;
                   while(i<l){
                      k=path[i];
                      d=d[k];
                      if(d===u)return [];
                      i++;
                   }; 
               return [d,domIndex];
          };
          
           /**
           * 通过path路径指向 for数据目录 并返回
           * @param {*} path  [key , key , key] 数据路径 指向 tree
           */ 
          t.pathDest2=function(path){
              var i=0,l=path.length,k,d=tree,p,p2,domArr,u;
                   while(i<l){
                      k=path[i];
                      p=d;             //路径根元素
                      if(d.$_f_id)p2=d;//for 跟元素
                      d=d[k];
                      if(d===u){
                          if(p2&&p2.$_children){  //如果p2都不存在,说明页面里根本就没有数组对应的dom
                               d=p2.$_children;
                          }else{
                               return [];
                          };
                      }else{
                          if(d.$_dom)domArr=d.$_dom; 
                      };  
                      i++;
                   }; 
               return [d, domArr];   //0:treeD ,1:domArr
          };
          /**
           * 将数据结果值 写入 目标dom 
           * @param {*} data 
           * @param {*} value 
           */
          t.valueToDom=function(data,value,domArr,key,obj){
              var i=0,l=data.length,a,b,c,d;
                  while(i<l){
                         d=data[i];
                         a=d.type;
                         switch (a) {
                              case  'txt':
                                   t.txtDom(d,value,domArr);
                                   break;
                              case  'attr':
                                   t.attrDom(d,value,domArr)
                                   break;
                              case  'change':
                                   t.changeDom(d,value,domArr,key,obj)
                                   break;
                              case  'input':
                                   t.inputDom(d,value,domArr,key,obj)
                                   break;
                              case  'html':
                                   t.htmlDom(d,value,domArr)
                                   break;
                              case 'style':
                                   t.attrDom(d,value,domArr,true);
                                   break;                    
                         };
                     i++;
                  };  
          };

          /**
           * e-change
           * @param {*} data 
           * @param {*} value 
           * @param {*} domArr 
           * @param {*} key 
           * @param {*} obj 
           * @returns 
           */
          t.changeDom=function(data,value,domArr,key,obj){
               var a=domArr,dom,arr, b,c,d=data,e,u;
               //   注意 此处 for循环 的 domIndex不一样  ,需要特别处理 暂缺!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                   dom=a.dom[d.dom];
                   if(dom===u){
                         console.error('不存在的 dom 节点');  
                         return;
                   };
                   dom.value=value;
                   if(!dom.onchange){
                         dom.onchange=function(){
                              obj[key]=this.value;
                              this.value=obj[key];
                         };
                  };
          };

          /**
           * e-input
           * @param {*} data 
           * @param {*} value 
           * @param {*} domArr 
           * @param {*} key 
           * @param {*} obj 
           * @returns 
           */
          t.inputDom=function(data,value,domArr,key,obj){
               var a=domArr,dom,arr, b,c,d=data,e,u;
               //   注意 此处 for循环 的 domIndex不一样  ,需要特别处理 暂缺!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                   dom=a.dom[d.dom];
                   if(dom===u){
                         console.error('不存在的 dom 节点');  
                         return;
                   };
                   dom.value=value;
                   if(!dom.oninput){
                         dom.oninput=function(){
                               obj[key]=this.value;
                               this.value=obj[key];
                         };
                  };
          };

          /**
           * e-html
           * @param {*} data 
           * @param {*} value 
           * @param {*} domArr 
           * @returns 
           */
          t.htmlDom=function(data,value,domArr){
               var a=domArr,dom,arr, b,c,d=data,e,u;
               //   注意 此处 for循环 的 domIndex不一样  ,需要特别处理 暂缺!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                   dom=a.dom[d.dom];
                   if(dom===u){
                         console.error('不存在的 dom 节点');  
                         return;
                   };
                   dom.innerHTML=value;
          };
         
         /**
           * 写入textContent
           * @param {*} data 
           * @param {*} value 
           */
          t.txtDom=function(data,value,domArr){
               var a=domArr,dom,arr, b,c,d=data,e,u;
               //   注意 此处 for循环 的 domIndex不一样  ,需要特别处理 暂缺!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                   dom=a.dom[d.dom];
                   if(dom===u){
                         console.error('不存在的 dom 节点');  
                         return;
                   };
                   arr=a[d.index];
                   arr[d.pos]=value;
                   dom.textContent=arr.join('');
          };
          /**
           * 写入行内属性  e-attr 或 e-style
           * @param {*} data 
           * @param {*} value
           * @param {*} flag true:e-style  
           */
          t.attrDom=function(data,value,domArr,flag){
               var a=domArr,dom,b,c,d=data,e,m=value,v,j,k,n, u;
                   dom=a.dom[d.dom];
                   if(dom===u){
                       console.error('不存在的 dom 节点');  
                      return;
                  };
                  b=d.attr;  // 行内属性 attr   flag=true=> style属性
                  c=d.data;
                  e=c[0];    // 数值类型
                  // '>':2 , '<':3, '>=':4, '<=':5, '==':6, '===':6, '!==':7,  
                  switch(e){
                         case 0: //直接赋值
                         v=m;
                         break;  
                         case 1: //boolean
                         v=m?c[2]:c[3];
                         break; 
                         case 2: //>
                         v=m>c[1]?c[2]:c[3];
                         break; 
                         case 3: //<
                         v=m<c[1]?c[2]:c[3];
                         break; 
                         case 4: //>=
                         v=m>=c[1]?c[2]:c[3];
                         break; 
                         case 5: //<=
                         v=m<=c[1]?c[2]:c[3];
                         break;
                         case 6: //==  ,  ===
                         v=m==c[1]?c[2]:c[3];
                         break; 
                         case 7: //!== ,  !=
                         v=m!=c[1]?c[2]:c[3];
                         break;      
                  }; 
                  if(flag===true){ // e-style  设置样式属性
                      dom.style[b]=v; 
                      return;
                  };
                  if(b==='class'){//
                        j=dom.className.replace(/\s\s/g,' ');; //原本的className ,防止过多空格
                        j=j.replace(v,''); //防重复添加
                        if(c[4])j=j.replace(c[4],''); //清除上个使用的class值
                        if(e>0){ // class 相互替换状态 
                              k=v===c[2]?c[3]:c[2];  //另一个 class值
                              j=j.replace(k,''); //清除另一个class
                              dom.setAttribute(b,j+' '+v); 
                              c[4]=v;
                        }else{
                              dom.setAttribute(b,j+' '+v);
                              c[4]=v; 
                        };
                  }else if(dom[b]!==u){  //特殊行内属性  采用dom.xxx=xxx赋值
                        dom[b]=v; 
                  }else{
                        dom.setAttribute(b,v); 
                  };
          };

          /**
           * 重新设置 所有 数据 
           * @param {*} data 
           */
          t.reSetData=function(data){
               t.forData(data,[],false,false,[]);
          };
          //循环数据  (数据, [路径], 非循环中, 循环位置) 
          t.forData(DATA,[],false,false,[]);
};

/* 
生成 for 循环 dom 和  for 循环数据
*/
Eng.prototype.forInit=function(){
    var t=this,tree=t.tree,cTree=t.cloneTree,bTree=t.buildTree;
    var $W=t.watcherFor,$items=t.items,$f=$items.$_methods;   
    var dlF=t.dataOnly;
        if(dlF)tree={},cTree={};
    var pathMap={
         // forIdName:[xx,xx,xxx], //储存 每个forIdName的根路径
    };     
       //使用Array 的原生方法造成的数据变更修改
       /**
        * 该数据中的 任何 创建 都会 清除 子元素 数据 和dom 
        * @param {*} name  forIdName
        * @param {*} arr   forD  被循环的数组
        * @param {*} path
        * @param {*} pos
        * @param {*} key   操作类型
        * @param {*} args
        *  
        */
       t.specialBuild=function(name,arr,path,pos,key,args){
          var i,l,s,e, a,b,c,d,f,g,h,j,k,m,n,u;
              //当不存在 cTree 数据时,直接进行watcherFor 数据过滤
               if(dlF||cTree[name]===u){
                    t.forChange(arr,arr,pos,name,path,true);
                    return; 
               }; 
          var ppp=t.getTreeRq(name,path,pos);
               switch(key){
                    case 'push':   // 尾部添加
                    l=args.length; // 添加的数据长度
                    // s=ppp[0].length; // 原始长度  
                    t.forBuild(name,s,l,path,pos,0,arr); 
                    break;
                    case 'unshift':// 头部添加
                         l=args.length; // 添加的数据长度
                         t.forBuild(name,0,l,path,pos,1,arr);
                    break;
                    case 'pop':    // 删除队尾
                        l=arr.length;
                        t.delFor(l-1,1,ppp);
                        t.forChange(ppp[0],arr,pos,name,path);//重新排序
                    break;
                    case 'shift':  // 删除头部
                         t.delFor(0,1,ppp);
                         t.forChange(ppp[0],arr,pos,name,path);//重新排序
                    break;
                    case 'sort':   // 被重新排序  
                          e=arr.length; // 当前数据长度
                          t.forBuild(name,0,e,path,pos,2,arr);
                    break;
                    case 'reverse':// 反转顺序
                        t.forChange(ppp[0],arr,pos,name,path);//重新排序
                    break;     
                    case 'splice': // 插入或兼 删除操作   (放弃,直接做多补少删, dom排序没有意义, 理应做到全部数据响应(没有单独数据), 否则会有其它隐患)
                         e=arr.length; // 当前数据长度
                         t.forBuild(name,0,e,path,pos,2,arr);
                         // debugger
                         // return;
                         //  l=args.length;
                         //  a=args[0],b=args[1];
                         //  if(l===1){//纯删除操作 
                         //       t.delFor(a,null,ppp);
                         //  }else if(l===2){//删除指定长度
                         //       t.delFor(a,b,ppp);
                         //  }else if(l>2){
                         //       s=ppp[0].length; // 原始长度
                         //       e=arr.length;    // 当前长度
                         //       if(s===e)return; // 长度不变
                         //       if(s<e){//添加
                         //           t.forBuild(name,s,e,path,pos,0,arr);
                         //           return 
                         //       };
                         //       if(s>e){//删除多余
                         //           t.delFor(e,null,ppp);
                         //       };
                         //  };
                          //空操作不响应
                    break;
                    case 'concat': // 拼接操作, 远基础上拼接了新的array数据 ( 本身被改变, 此处不同于原始方法特性)
                         // debugger
                         s=args[0],e=args[1];   //数据拼接位置 
                         t.forBuild(name,s,e-s,path,pos,0,arr); //尾部添加
                    break;
               };
       };

       /**
        * 默认常规创建 forDom 方法 
        * 备注: 以后增减全部删除重创操作 , 防止dom数据污染 
        * @param {*} name  forIdName
        * @param {*} arrL  添加的长度
        * @param {*} path  数据路径  
        * @param {*} pos   []  当前被循环 arr数组 在父容器中的位置
        * @param     type=>  0: 尾部添加操作, 1:头部添加操作 ,  2:多补少删 (本想插入,后作废)
        * @param     forD 被循环的数组数据
        */
       t.forBuild=function(name,start,arrL,path,pos,type,forD){
            var i,l,z,u;
                if(!pathMap[name])pathMap[name]=path;//储存 每个forIdName的根路径
                 //当不存在 cTree 数据时,直接进行watcherFor 数据过滤
                if(dlF||cTree[name]===u){
                     t.forChange(forD,forD,pos,name,path,true);
                     return; 
                };     
               //  if(name==='for2')debugger;
             var ppp=t.getTreeRq(name,path,pos);  //[treeRq, pTree,pDom ]
                 if(ppp===u)return;
             var source=t.getReleated(name,pos); // treeY ,domY   
             var treeY=source[0],domY=source[1]; //克隆tree结构,  dom结构
                 z=ppp[0].length; // 原有数据长度
                 if(type===0){    // 尾部 添加指定 长度
                      i=z,l=z+arrL; 
                      while(i<l){
                         t.buildDom(treeY,domY,i,ppp,0,name);
                         i++;
                     };   
                 }else if(type===1){ //头部添加
                       l=arrL;
                       while(l--){
                           t.buildDom(treeY,domY,l,ppp,1,name);   
                       };
                 }else if(type===2){ //多补少删
                    // debugger
                       l=arrL;
                       if(l<z){ //少于删除
                             t.delFor(l,null,ppp);
                       }else if(l>z) {
                            l=l-z;
                            while(l--){//队尾添加
                                 t.buildDom(treeY,domY,l,ppp,0,name);
                            };
                       };
                 }; 
                 t.forChange(ppp[0],forD,pos,name,path);    
       };

       /**
        * 修正所有数据的 index  (每次当数据发生变化时)   注意后期会增加 数据过滤 ,不能完全按照长度来计算
        * treed 增加 $_data , $_gData,$_forData $_index  $_pos 字段_
        * 同时是执行 watcherFor的地方  
        * arr =  [treeD,.....]     ppp[0]
        * forD = 被循环的数组数据
        * pos
        * name  forIdName
        * path  数据路径
        * F    undefinde:arr储存的事 forTreeD ,需要向其赋值$_items  ;  true:时, 仅仅做数据过滤 , 此时 tree和cloneTree不存在
        */
        t.forChange=function(arr,forD,pos,name,path,F){
          var t=this,i=0,l=arr.length,a,b,c,d,wf,ptr=path.join('.'),u;
               wf=$W[name]; //匹配的watchFor方法 
               while(i<l){
                         a=arr[i]; //forTreeD
                         d={};
                         // d.id=$items.$_id;
                         d.forData=forD[i];
                         d.forDataAll=forD;
                         d.forDom=a.$_forDom;
                         d.data=$items.$_data;
                         d.index=i;
                         b=pos.slice(0);
                         b.push(i);
                         d.pos=b;
                         if(F===u)a.$_items=d;
                         if(wf!==u){
                              d.addWatcher=function(obj){
                                    var str=ptr+'.'+i+'.'; //前置路径
                                        t.addWatcher(str,obj);
                              };
                              /**
                               * 
                               * @param {*} deep  父元素的深度, 默认1
                               */
                              d.parent=function(deep){
                                   var na=name,ps=b,v;
                                   // debugger
                                       deep=deep<<0||1;
                                       if(deep<1)deep=1;//至少查找深度为1 
                                        return t.getPdata(ps,na,deep);
                                        // if(v===u)return d; //返回自身
                                        // return v; //父循环数据

                              };
                              wf.apply($f,[d,$f])
                         };
                    i++;
               };
        };
        /**
         * 
         * @param {*} pos
         * @param {*} name 
         * @param {*} deep 
         */
        t.getPdata=function(pos,name,deep){
             var arr=[],a=cTree,b=pathMap,d,v,o , l=pos.length,p=t.data,s=0,e,i=0,n,u;
                 pos=pos.slice(0,l-deep);
                 n=pos.length;
                 if(n===0)return; //已经是最根for元素了, 不允许向上
                //arr 倒序储存 pathMap  每行数据结尾 加上 pos 就是对应的值
                 while(true){
                      o=a[name];
                      if(o){
                           arr.push(b[name]);
                           v=o.$_f_p;//父循环 idName
                           if(typeLX(v)===1){ // 存在父元素 
                               name=v; 
                           }else{
                               //没有更上一级 
                              break;  
                           };
                      }else{ // 不存在的 数据  (理应存在  , 此处 防报错)
                          break;
                      };
                 };
                l=arr.length;
                
                while(l--){
                     if(i<n){
                         d=arr[l]; //数据路径
                         e=d.length;
                         while(s<e){
                              p=p[d[s]];
                              if(p===u)return;
                         s++;  
                         };
                         p=p[pos[i]],s++; // 路径中的 index 不为准 ,使用pos 的替代
                         if(p===u)return;
                    }else{
                         break;
                    };
                    i++;
                }; 
                return p; //上级for 元素数据 
        };

       /**
        * 获取 父元素rq  ~~~~~~~~~~~~~~~~
        * @param {*} name 
        * @param {*} path 
        * @param {*} pos 
        */
        t.getTreeRq=function(name,path,pos){
          var i=0,l=path.length,k,d=tree,pDom,m=pos.length,p,u;
                   while(i<l){
                      k=path[i];
                    //   p=d;
                      if(d.$_f_id)p=d;
                      d=d[k];
                      if(d===u){
                          if(p.$_children){
                               d=p.$_children;
                          }else{
                               console.error('不存在的子循环 数据结构 ~~~~~');
                               return ;
                          };
                      };
                      i++;
                   };
                   if(m>0){//子元素
                        pDom=p.$_f_c; //
                   }else{ //根元素
                        pDom=cTree[name].$_f_p;
                   };  
               return [d, p, pDom];   //0:treeRq ,1:pTree ,1:pDom
        };

        /**
         * 删除指定 范围的数据  ~~~~~~~~~~~~~
         * @param {*} name  forIdName
         * @param {*} start 
         * @param {*} end   注意,这里的end 是最后删除位置, 不是  .length
         * @param {*} pos 
         */
        t.delFor=function(start,end,ppp){
             var arr=ppp[0],i=0,l,a,b,c,d,e;
                 if(end!==null){
                    arr=arr.splice(start,end);  //被删除的数据  (从tree中)
                 }else{
                    arr=arr.splice(start); 
                 };
                 l=arr.length;
                 while(i<l){
                         a=arr[i];
                         delDom(a.$_forDom);
                    i++;
                 };
        };

       /**
        * 根据forIdName 返回 [ domD, treeD, ]  用于下一步 buildDom
        * @param {*} name 
        * @param {*} pos 
        * @returns [ forDom  forTree  ]
        */
        t.getReleated=function(name){
            var domD,treeD;
                domD=bTree[name];  // 用于生成 forDom
                treeD=cTree[name]; // 用于clone生成 置入 tree目录的结构数据
               return [treeD,domD];
        };

       /**
        * 生成返回  forDom forTreeD  并添加到页面
        * @param {*} domD    
        * @param {*} treeD 
        * @param {*} ppp=  [treeRq, pTree,pDom ]
        * @param {*} type=>  0:尾部添加 ,1:头部添加, ,插入  
        */
        t.buildDom=function(treeD,domD,index, ppp,type,name){
            var tre,dom,arr,n,u;  
            var rq=ppp[0],pDom=ppp[2],inDom;
               tre=cloneForTree(treeD);    //forTreeD
               arr=tre.$_dom.dom;          //domArr 
               dom=buildForDom(domD,arr);  //forDom
               n=tre.$_f_c;        // 子容器的 index 指向
               if(n!==u){
                    tre.$_f_c=arr[n]; // 子for元素 的 父容器
                    tre.$_children=[]; // 储存子元素的 forD
               };
               forEvent(tre,arr,t.event,t.items,name,t);   //捆绑 事件方法   
               tre.$_forDom=dom;         // 被循环的forDom
               tre.$_parent=ppp[1];      // 设置父元素

               rq.push(tre)              // tree  
               pDom.appendChild(dom);    // 插入页面
               /* if(type===0){     //尾部添加 
                    rq.push(tre)        // tree  
                    pDom.appendChild(dom);  // 插入页面
               }else if(type===1){//头部添加
                    if(rq[0]!==u){
                         pDom.insertBefore(dom,pDom.childNodes[0]);
                         rq.unshift(tre);
                    }else{// 空数组 直接 push
                         rq.push(tre)        // tree  
                         pDom.appendChild(dom);  // 插入页面
                    };
               }else{//
                     //  暂无  ~~~~~~~~~~~~
               }; */
        };
};

Eng.newJson=newJson;

/**
 * 额外的支持 方法
 */
Eng.prototype.extraInit=function(){
   var t=this,timer=t.timer,$i=t.items,$f=$i.$_methods;
   var arr=[];
   var pDom=null; //el 的 初始父元素 
        //转换成 可直接 push 到timeArr 队列的格式
        t.timerInit=function(){
             var k,o=timer,v,d;
                for(k in o){
                     v=o[k];
                     d=[];
                      if(v.type==='time'){
                           d[0]=0;            // 0  按时间执行
                           d[1]=v.loop?1:0;   // 是否循环执行 0否,1:是
                           d[2]=v.time||0;    // 延迟时间
                           d[3]=getTime();    // 初始时间
                      }else if(v.type==='fps'){//fps
                           d[0]=1;            //按帧执行
                           d[1]=v.fps||1;     //帧间隔
                           d[2]=0;            //初始帧 
                      }else{
                           return;
                      };
                      d[4]=$f[k];
                      d[5]=$f;
                      if(d[4] instanceof Function){
                           arr.push(d)
                      }else{
                           console.error( k+'    不是有效的 timer Function ');
                      };
                };
        };
        /**
         * 唤醒时, 推入 时间事件
         * dom :   添加入指定的dom
         */
        t.onAwake=function(dom,args){
             if(arr.length===0)t.timerInit();
             var l=arr.length,d;
                 while(l--){
                    d=arr[l];
                    if(d[0]===0){//重置时间
                         d[3]=getTime();
                    }else{       //重置初始帧
                         d[2]=0;
                    };  
                    timeArr.push(arr[l])
                 };
                 if(t.css)bod.appendChild(t.css); //添加 样式 dom
                 if(dom){
                      dom.appendChild(t.el);
                 }else if(pDom!==null&&t.el.parentNode===null){ //初始旧位置添加 
                      pDom.appendChild(t.el);
                 };   
                 t.sleep=false;
                 $f.$_state='active';
                 if($f.onAwake)$f.onAwake.apply($f,args);
        };
        /**
         * 休眠时 , 抽离所有 时间事件
         */
        t.onSleep=function(args){
                 t.timeClear();
                 pDom=t.el.parentNode;
                 delDom(t.el);
                 if(t.css)delDom(t.css); //从业面中删除style样式
                 t.sleep=true;
                 $f.$_state='sleep';
                 if($f.onSleep)$f.onSleep.apply($f,args);
        };

        /**
         * 清空定时器中 正在被循环执行的timer事件
         */
        t.timeClear=function(){
          var l=arr.length,v,n,o=timeArr;
               while(l--){
                    v=arr[l];
                    n=o.indexOf(v);
                    if(n>-1)o.splice(n,1);
               };
        };

        //从页面中删除 , 并彻底销毁 
        t.destroy=function(args){
               t.timeClear();
               if($f.onDestroy)$f.onDestroy.apply($f,args);
            var a=t.id,d=t.data,c=ARR,n,k,o,u;
                delDom(t.el);           //从页面删除el对象
                if(t.css)delDom(t.css); //从页面中删除style样式
                if(a!==u)delete APPS[a];
                n=c.a.indexOf(d);
                if(n>-1){
                     c.a.splice(n,1);
                     c.b.splice(n,1);
                }; 
                o=t.data;
                for(k in t){    // 清空实例方法
                     t[k]=null;
                }; 
                for(k in o){    // 清空t.data数据
                    delete o[k]
                };
                o=$f;
                for(k in o){    // 清空methods方法
                    o[k]=null;
                    delete o[k]
                };
                o.$_state='die';// 标记死亡
        };

        $f.$_sleep=t.onSleep;
        $f.$_awake=t.onAwake;
        $f.$_destroy=t.destroy;
};
/**
 * 事件触发器
 * @param emt =[0:(appIdName||appData),1:order, 2:(domId||dom)]   0:appIdName, 1:执行命令方法名, 2:唤醒时添加到指定的dom作为子元素
 * @param args =  传递给 methods 的参数
 */

/**
 * 获取一个 app对象
 * @param    appIdName || appData
 * @returns 
 */
Eng.get=function(name){
     var a=APPS[name],n;
         if(!a){
            n=ARR.a.indexOf(name);
            if(n>-1)a=ARR.b[n];  
         };
         if(!a)return null;//不存在

     return {
               //引用数据修设置
               data:a.data,
               //状态  active ,sleep, die,
               state:a.state,
               //elDom
               el:a.el,
               sleep:function(){
                    a.self.onSleep(arguments);
               },
               //dom 唤醒位置 (父元素 ,可以是 domId 或这为空)
               awake:function(dom){
                    if(dom)if(typeof dom==='string')dom=getById(dom); //唤醒位置 , 存储的父容器 (不存在时 会添加到初始父元素上,若有)
                    a.self.onAwake(dom,getArgs(arguments));
               },
               //销毁
               destroy:function(){
                    var o=this,k;
                        a.self.destroy(arguments);
                        for(k in o){
                             o[k]=null;
                             delete o[k];
                        };
                        o.state='die';
               },
               methods:a.methods,
               //设置全新数据
               setData:function(data){
                    a.methods.$_data=data;
               },
               id:a.methods.$_id,
         }; 
};

})();