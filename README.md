###Eng  API 补充ing 补充ing补充ing补充ing补充ing







>####<font color='blue'>关于Eng:</font>
<font style="color: #107663;font-weight: bolder;">
Eng 取自engine 的缩写,寓意可以向引擎一样快而简的将数据结构 与dom结构 紧密的契合驱动, 
以惯性思维的方式,在大多数场景下化繁就简的处理数据及dom交互.
</font>
>####<font color='blue'>Eng的由来:</font>
<font style="color: #107663;font-weight: bolder;">
    作者本人主要从事js交互及特效编写,时间并不长.</br>
心得认为:大部分插件的编写,如果能够发现其内在的逻辑规律,
并设计相应的dom结构,将会极大的简化编写复杂程度并提升效率..</br>
作者偶然在同事那里接触到Vue,粗略了解了一下react及angular,对于Vue的简明用法非常赞赏,
但随着深入,似乎与作者理解和认为的前端有所差异......</br>
这就是Eng的由来 , 所以Eng的出现与Vue,react和angular的本质区别是思想方式之争
</font>
>####<font color='blue'>Eng的思想:</font>
<font style="color: #107663;font-weight: bolder;">
刚有提到 '惯性思维',何谓'惯性思维'?<br>
惯性思维是根据已有的经验,在接触到另一个不同但类似地场景,想当然的认为就应该这么做;<br>
Eng中所有的行为均围绕着一个 基础/base ,这也是网页dom 树的结构,  Eng 完全遵守dom渲染逻辑规则;<br>
Eng使用的只有基本的5个指令和4个选项方法,未来可能会有所补充,但不会是核心需要特别学习的;</br>
Eng中数据结构与dom分级结构完全匹配 , (数据中,所有Array和json对象的key值 ,皆为base);<br>
Eng的'惯性思维'基于严格规律逻辑,也就是后续所有升级新特性的支持,将会one-take.<br>
&#12288;&#12288;不会出现全家桶等额外插件,仅有与本地端和sever端两个文件
</font>
<br>
<br>
<font style="color:red;font-weight: bolder;">
特别声明: Eng 数据中  $_  是 Eng的专属数据命名域,请勿以 $_ 开头命名数据 <br>
目前即将放出的是Eng 的0.8 beta版, <br>
未来将补充支持的特性或方法,将在APi 结尾 版本前瞻中说明
</font>
>#API
>##基本案例
>####<font color='blue'>示例</font>
>#####html:
>```
   <div id="app">
	  <p>{{value}}</p>
   </div>   
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{	
		            value:'Hello Eng'
		          }
  });
>```
>#####输出:
>```
  <div id="app">
	   <p>Hello Eng</p>
  </div>
>```
***
##指令
<br>
>####<font color='blue'>e-base</font>
>#####html:
>```
  <div id="app">
			  <div e-base='base1'>
			      <p>{{value}}</p>
			      <div e-base='base2'>
			         <p>{{value}}</p>
			      </div>
			  </div>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{
		          base1:{
		                value:'我是基于 base1 的value值',
		                base2:{
		                      value:'我是基于 base2 的value值'
		                      }
		                }	
		         }
  });
>```
>#####输出:
>```
  <div id="app">
			    <div>
		          <p>我是基于 base1 的value值</p>
			      <div>
			         <p>我是基于 base2 的value值</p>
			      </div>
			   </div>
   </div>
>```
.......
>#####<font color='red'>注意:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
  e-base={{baseName}}指令所在父标签下所有子元素的值, 都是基于当前 baseName,
  {{baseName.value}} 这种写法是在Eng 中任何地方都是非法且不允许的, 今后也永远不会支持.
  作者认为这是散漫又不严谨的数据结构设计行为.不符合Eng '惯性逻辑思维' 的思想
  (数据结构 与 dom树结构 完全匹配 )
>```
</font>
***
<br>
<br>
>####<font color='blue'>e-attr</font>
>#####html:
>```
  <div id="app">
       <div e-attr='class={{v0}}'> ...
       </div>
       <div e-attr='class={{v1}}?(css0):(css1)'> ... 
       </div>
       <div e-attr='class={{v2}}>=10?(css0):(css1)'> ...
       </div>
       <div e-attr='class={{v0}};tittle={{v3}}'>  ...
       </div>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{
		          v0:'css',
		          v1:true,
		          v2:9,
		          v3:'this is tittle'	
		         }
  });
>```
>#####输出:
>```
 <div id="app">
       <div class='css'> ...
       </div>
       <div class='css0'> ...
       </div>
       <div class='css1'> ...
       </div>
       <div class='css' tittle='this is tittle'> ...
       </div>
  </div>
>```
.......

>#####<font color='red'>注意:</font>
<font style="color:red;font-weight: bolder;">
>```
 当前版本中 () 内多余的  ; 号会干扰eng的判断,产生错误结果.
>```
</font>
***
<br>
<br>
>####<font color='blue'>e-html</font>
>#####html:
>```
  <div id="app">
       <div e-html='{{v}}'>
       </div>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{	
		         v:'<p>DOM 文本</p>'
		         }
  });
>```
>#####输出:
>```
  <div id="app">
       <div>
          <p>DOM 文本</p>
       </div>
  </div>
>```
.......
>#####<font color='red'>注意:</font>
>```

>```
***
<br>
<br>
>####<font color='blue'>e-for</font>
>#####html:
>```
  <div id="app">
       <div>
          <p e-for='for1'>
             index = {{$_index}} value= {{$_value}}
          </p>
       </div>
       <eng>
           <p e-for='for2'>
             index = {{$_index}} .... {{v}}
           </p>
       </eng>
       <eng>
           <div e-for='for3'>
                {{v}}
                <div e-for='for4'>
                    {{v}}
                </div>
           </div>
       </eng>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{	
		          for1:['a','b'],
		          for2:[
		                {v:'a'},
		                {v:'b'},
		               ],
		          for3:[
		                {
		                 v:"I'm for3 0",
		                 for4:[
		                       {v:"I'm for4 0"},
		                       {v:"I'm for4 1"}
		                      ]
		                },
		                {
		                 v:"I'm for3 1",
		                 for4:[
		                       {v:"I'm for4 2"},
		                       {v:"I'm for4 3"}
		                     ]
		                },
		               ]     
		         }
  });
>```
>#####输出:
>```
  <div id="app">
       <div>
          <p> index = 0 value = a </p>
          <p> index = 1 value = b </p>
       </div>
       <eng>
           <p> index = 0 .... a </p>
           <p> index = 1 .... b </p>
       </eng>
       <eng>
           <div>
              I'm for3 0
              <div> I'm for4 0 </div>
              <div> I'm for4 1 </div>
           <div>
           <div>
              I'm for3 1
              <div> I'm for4 2 </div>
              <div> I'm for4 3 </div>
           <div>
       </eng>
  </div>
>```
>#####<font color='red'>注意:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN: 
  Eng 为适应动态的 DOM 变化交互场景, 所有for元素的填充依赖其父元素进行定位, 
  所以在没有确定的父标签包裹该元素,又需要确定的填充位置,
  建议统一使用 <eng>...</eng>做为父标签包裹,同理也可以作为e-base的base父元素
 ...
  e-for={{name}}, 如果您打算使用 watcherFor:{...} 过滤器的话,为了方便快速定位for对象
  name命名在所有e-for 对象中必须具有 唯一性 . 不打算的话,则所有合法的命名均适用 
>```
</font>
***
<br>
<br>
>####<font color='blue'>watcher( oldValue , newValue , eng )     方法使用说明</font>
>#####html:
>```
  <div id="app">
       <p>{{v1}}</p>
      <div e-base='base'>
            <p>{{v2}}</p>
      </div>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{	
		          v1:123,
		          base:{
		               v2:456
		               }
		        },
		     watcher:{
		          'v1':function(oldValue,newValue,eng){
		                 if(newValue==123){
		                  eng.$_value=' 值为123 ,被修改了';
		                 }
		               },
		           'base.v2':function(oldValue,newValue,eng){
		                if(newValue==456){
		                  eng.$_value=' 值为456 ,被修改了';
		                 }
		           }       
		     }
  });
>```
>#####输出:
>```
 <div id="app">
       <p> 值为123 ,被修改了</p>
      <div>
          <p> 值为456 ,被修改了</p>
      </div>
  </div>
>```
>#####<font color='red'>注意:</font>
<font style="color:red;font-weight: bolder;">
>```
    eng.$_value         //如果需要修改输出值的话
    eng.$_destroy=true; //用于销毁该watcher
>```
</font>
***
<br>
<br>
>####<font color='blue'>watcherFor:{ .... } (for循环 过滤器/filter)使用说明</font>
>#####html:
>```
  <div id="app">
        <eng>
           <p e-for='for1'>
             index = {{$_index}}   value = {{$_value}}
           </p>
        </eng>
        <hr>
        <eng>
           <p e-for='for2'>
             index = {{$_index}}   value = {{v}}
           </p>
        </eng>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{	
		         for1:[0,1,2,3,4,5],
		         for2:[
		               {v:0},
		               {v:1},
		               {v:2},
		               {v:3},
		               {v:4},
		               {v:5}
		              ]
		    },
		    watcherFor:{
		             for1:function(eng){
			                if(eng.$_data % 2 == 0){
			                   eng.$_allow=false;
			                };
		             },
		             for2:function(eng){
			                if(eng.$_data.v % 2 == 1){
			                   eng.$_allow=false;
			                };
		             },
		    }    
  });
>```
>#####输出:
>```
 <div id="app">
        <eng>
           <p> index = 0   value = 1  </p>
           <p> index = 1   value = 3  </p>
           <p> index = 2   value = 5  </p>
        </eng>
        <eng>
           <p> index = 0   value = 0  </p>
           <p> index = 1   value = 2  </p>
           <p> index = 2   value = 4  </p>
        </eng>
  </div>
>```
>#####<font color='red'>注意:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
   之前提到过如果要使用该过滤器 ,为了便于快速定位该对象 ,e-for 对象 的命名必须具有唯一性,
   eng.$_data   为当前的过滤对象的 值
   eng.$_allow  是否允许当前数据对象通过 ,默认为true;
>```
</font>
***
<br>
<br>
><div style='width:100%;height:10px;background-color: #2E8B57;'></div>
<br>
###<font color='red'>以下全被为:<br>
####created : function( eng ) 方法内  &#12288; eng 参数使用说明示例
</font>
>```javascript
var app=new Eng({
		     el:...,
		     data:...,
		     created:function(eng){
		                     eng.idName;        //e-id
		                     eng.$_watcher();   //等同于watcher
		                     eng.$_watcherFor();//等同于watcherFor
		                     eng.$_setToSelf();
		                     eng.$_setToGlobal();
			    }
			 });
			    
>```
***
<br>
<br>
>####<font color='blue'>e-id</font>
>#####html:
>```html
  <div id="app">
      <button e-id='{{btn}}' >Click</button>
  </div>
>```
>#####js:
>```javascript
   var app=new Eng({
		     el:document.getElementById('app'),
		     data:{},
		     created:function(eng){
		         eng.btn.onclick=function(){
		           alert('click');
		         };
		     }    
  });
>``` 
>#####<font color='red'>说明:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
   e-id=... 不支持在e-for 循环 ,以及$_setToSelf()和$_setToGlobal()中使用;
   e-id={{name}} name命名具有唯一性
>```
*** 
</font>
<br>
<br>
>####<font color='blue'>eng.$_watcher(...)</font>
>#####js:
>```javascript
   var app=new Eng({
		     el:...,
		     data:{
		         v:...
		     },
		     created:function(eng){
		         eng.$_watcher({
		                        'v':function(oldValue,newValue,eng){
		                               .....
		                            }
		                      })
		     }
  });
>```

>#####<font color='red'>说明:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
   eng.$_watcher() 用法等同于watcher ,再修改数据时生效
>```
</font>
***
<br>
<br>
>####<font color='blue'>eng.$_watchFor(...)</font>
>#####js:
>```javascript
   var app=new Eng({
		     el:...,
		     data:{
		         v:...
		     },
		     created:function(eng){
		                      eng.$_watcherFor({
		                            'forNames':function(eng){
		                                    ....
		                                    }
		                      })
		     }
  });
>```

>#####<font color='red'>说明:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
   eng.$_watcherFor() 用法等同于watcherFor ,再修改数据时生效
>```
***
</font>
<br>
<br>
>####<font color='blue'>eng.$_setToSelf(...)</font>
>#####js:
>```javascript
   var app=new Eng({
		     el:null,
		     data:{},
		     created:function(eng){
		             var data={ v : "I'm one-time" };
		             var domOrStr="<p e-attr='title={{v}}'> {{v}} </p>";
		             var dom=eng.$_setToSelf( data , domOrStr);
		                 doucment.body.appendChild(dom);     
		     }
  });
  console.log(app);
>```
>#####输出:
>```
   <p title="I'm one-time">
       I'm one-time
   </p>
>```
>#####<font color='red'>说明:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
    data: 合法的json数据
    domOrStr: dom 节点或dom文本 ,不支持写入e-id 和e-for 指令,其它均支持
    app.v; // undefined 数据为一次性的,不能数据响应修改
>```
</font>
***
<br>
<br>
>####<font color='blue'>eng.$_setToGlobal(...)</font>
>#####js:
>```javascript
   var app=new Eng({
		     el:null,
		     data:{},
		     created:function(eng){
		             var data={v:"I'm not one-time"};
		             var domOrStr="<p e-attr='title={{v}}'> {{v}} </p>";
		             var dom=eng.$_setToGlobal({
					     	         	     el:domOrStr,
					     	         	     key:'base',
					     	         	     data:data,
					     	         	     base:'',
					     	        });
		                 doucment.body.appendChild(dom);     
		     }
  });
  console.log(app);
>```
>#####输出:
>```
   <p title="I'm not one-time">
       I'm not one-time
   </p>
>```
>#####<font color='red'>说明:</font>
<font style="color:red;font-weight: bolder;">
>```
#CN:
    el:   dom 节点或dom文本 ,不支持写入e-id 和e-for 指令,其它均支持;
    data: 合法的json数据;
    key:  data的key值命名
    base: 数据存储的位置 ,忽略则添加到数据的结构根目录 
    //重点:  base,key,data 的三者的关系 等价于:   app.base.key=data; 
    app.base.key.v; //I'm not one-time  该方法写入的数据支持数据修改响应 
>```
</font>
***
>####<font color='blue'>版本前瞻:</font>
<font color='blue'>
>```
1.版本稳定后,推出开发版
2.后续版本中,将会提供一个sever端的插件,支持将dom文本压缩成 Eng 可以识别的json对象
  减少网络数据传输量,Eng中的所有el对象都将支持该json对象 ,加速eng的dom和数据渲染操作
3.未来将支持 '组件自行为', 允许单独在页面内定义组件对象, Eng 会向服务器 请求该对象
  的所有素材,渲染填充.
4.下个版本将支持数据分页.
5.$_setToGlobal()和 $_setToSelf 将有可能将支持 写入e-id 和e-for 指令,如果有必要的话
6.下个版本将支持 预请求 操作,大概示例:
     var app=new Eng({
          el:...,
          preLoad:{
                  js:....,
                  css:...,
                  data:....,
                  created:function(..){
                            .....
                        }
                  }
     })  ;
7.下个版本有可能支持数据操作 撤销 前进操作, 允许记录一定步数的数据操作
8.下个或未来版本 将支持 数据比对,仅提交已修改的数据,减少服务器端计算
>```
</font>