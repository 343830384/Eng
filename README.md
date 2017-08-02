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
>```
#CN:
  e-base={{baseName}}指令所在父标签下所有子元素的值, 都是基于当前 baseName,
  {{baseName.value}} 这种写法是在Eng 中任何地方都是非法且不允许的, 今后也永远不会支持.
  作者认为这是散漫又不严谨的数据结构设计行为.不符合Eng '惯性逻辑思维' 的思想
  (数据结构 与 dom树结构 完全匹配 )
>```
***
