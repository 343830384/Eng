/* 
代码 测试区域   
<!--  -->
e-base
e-attr
e-style
e-input
e-change
e-html
e-id
e-for
e-stop
watcher
watcherFor
*/

var list2=[
//e-base  
{
txt:'e-base',
html:`
<div id="app">
        <div>{{v0}}</div>

        <div e-base='base1'>
             <span>{{v0}}</span><br>
             <span>{{$_parent.v0}}</span>  
        </div>

        <div e-base='base2.base3'>
             <span>{{v0}}</span><br>
             <span>{{$_parent.$_parent.v0}}</span>  
        </div>

          <div e-base='base2.$_parent'>
             <span>{{v0}}</span><br>
        </div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
        v0:'根域下 下的 v0 ',
        base1:{
            v0:'base1 域下的 v0'
        },
        base2:{
            base3:{
                v0:'base3 域下的 v0',
            }
        },
    },
});
`,
},
//e-attr
{
txt:'e-attr',
html:`
<div id="app">
        <br><br>
        <div e-attr='class=class'>
              行内属性
        <div>
        <div e-attr='class=class1?red:blue'>
              行内属性
        <div>
        <div e-attr='class=class2>10?red:blue'>
              行内属性
        <div>
        <div e-attr='class=class3==10?red:blue'>
              行内属性
        <div>
</div>
`,
code:`
app=new Eng({
  el:elDom,
  id:'app',
  data:{
      class:'yellow',
      class1:true,
      class2:6,
      class3:10,
    },
});
/* 下方尝试修改以下属性 
app.class='chartreuse';
app.class1=false;  
app.class2=11;  
app.class3=20;  
*/
`,
},
//e-style
{
txt:'e-style',
html:`
<div id="app">
    <br><br>
    <div e-style='width=width;backgroundColor=color'>
      测试 e-style
    <div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
         width:'200px',
         color:'red'   
      },
});
/* 
尝试在下方修改
app.width='100px';
app.color='yellowgreen';
*/
`
},
//e-input
{
txt:'e-input',
html:`
<div id="app">
       <br><br>
       <span>{{value}}</span>
       <input e-input='value' type='text' >
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
            value:' 修改我 '          
      },
});
`
},
//e-change
{
txt:'e-change',
html:`
<div id="app">
       <br><br>
       <span>{{value}}</span>
       <input e-change='value' type='text' >
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
         value:' 修改我 '          
      },
});
`
},
//e-event
{
txt:'e-event',
html:`
<div id="app">
        <br><br><br><br>
        <span>点击次数 = {{count}}</span>
        <button e-event='onclick=click'>点击我</button>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
            count:0,
      },
      domEvent:{
            click:function(item,evt){
                       item.data.count++;
               /* 或   this.$_data.count++; */
            }
      }
});
`
},
//e-html
{
txt:'e-html',
html:`
<div id="app">
        <br><br>
        <div>{{html}}<div>
        <br>
        <div e-html='html'>{{txt}}<div>
        
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
           txt:'我不会被解析 并 渲染', 
           html:"<span> html文本 </span> " 
      },
});
`
},
//e-id
{
txt:'e-id',
html:`
<div id="app">
        <br><br>
        <button e-id='btn' e-event='onclick=click'> 
           点击我 
        </button>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{

      },
      domEvent:{
            click:function(item,evt){
                     console.log(item.idDoms.btn);
                  /* 
                     或          this.$_idDoms.btn
                     在浏览器 控制台内查看
                  */

            }, 
      }
});
`
},
//e-for
{
txt:'e-for',
html:`
<div id="app">
      <br><br>
      <div e-for='for0'>
        <br>
        <span>
            for0 -- index = {{$_indx}} --- {{v}}
        </span>
        <span e-for='for1'>
            for1 -- index = {{$_index}} --- {{$_value}}
        </span>
      <div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
           for0:[
               {
                  v:11111, 
                  for1:[0,1,2,3]  
               },
               {
                  v:22222, 
                  for1:[3,2,1,0]  
               },  
           ] 
      },
});
//
`
},
//e-stop
{
txt:'e-stop',
html:`
<div id="app">
            <br><br>
        <div e-stop>
            {{value}}不会被解析
        <div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
           value:'123123123' 
      },
});
`
},
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//watcher
{
txt:'watcher',
html:`
<div id="app">
            <br><br>
         <span>{{v0}}</span>
         <div e-base='base'>
                {{v0}}
         </div>
         <div e-base='base2'>
                <span>{{v0}}</span>
                <span>{{v1}}</span>
         </div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
           v0:10,
           base:{
                v0:3  
           },
           base2:{
               v0:3,
               v1:333  
          },  
      },
      watcher:{
        'v0':function(oldValue,newValue,item){
            if(newValue==10)return '当v0=10时 显示此句';
         },
         'base.v0':function(oldV,newV,item){
              return 'base.v0 = '+newV;  
         },
         /* 或者这种写法 */
         base2:{
             v0:function(o,n,i){
                return '另一种写法 =>  base2.v0 = '+n; 
             },
             v1:function(o,n,i){
                return '另一种写法 =>  base2.v1 = '+n; 
             },
         },
      }
});
/* 
尝试修改 app 数据
*/
`
},
//watcherFor
{
txt:'watcherFor',
html:`
<div id="app">
       <br><br>
       <div>
          <span e-for='for'>
              index = {{$_index}}__value={{value}}
          </span>
       </div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
          for:[
              {value:123},{value:456},{value:789},      
          ]
      },
      watcherFor:{
            for:function(item){
                  var  fd=item.forData;
                       fd.value=' watcherFor =>'+fd.value;
                      
            }
      }
});
`
},



]; 

/* 

//e-
{
txt:'e-',
html:`
<div id="app">
        <br><br>
        <div></div>
</div>
`,
code:`
app=new Eng({
      el:elDom,
      id:'app',
      data:{
      },
});
`
},


*/