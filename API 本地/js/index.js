   //<small style='color:#CB2B09'>基本指令</small>
   var listUl=document.getElementById('ul'); 
   var count=100;   
 new Eng({
       el:listUl,
       data:{
          m:[
            {
             v:'Eng 相关',
             c:[{a:'',b:'Eng-NOS'},{a:'',b:'Eng-Drive'}]
            },
            {
             v:'版本说明'
            },
            {
             a:'#must', 
             v:"<small style='color:#CB2B09'>须知(必看)</small>",    
            }, 
            {
             v:"<small style='color:#CB2B09'>基本指令</small>",
             c:[{a:'',b:'e-base'},{a:'',b:'e-html'},{a:'',b:'e-attr'},{a:'',b:'e-id'},{a:'',b:'e-event'},{a:'',b:'e-input'},{a:'',b:'e-change'},{a:'',b:'e-for'}]
            },
            {
             v:"<small style='color:#CB2B09'>参数 & 方法</small>",
             c:[{a:'',b:'el'},{a:'',b:'id'},{a:'',b:'cache'},{a:'',b:'relate'},{a:'',b:'require'},{a:'',b:'showStage'},{a:'',b:'template'},{a:'',b:'data'},{a:'',b:'watcher'},{a:'',b:'watcherFor'},{a:'',b:'created'},{a:'',b:'$_setToSelf'},{a:'',b:'$_setToGlobal'},{a:'',b:'ajax'}]
            },
            {
             v:"<small style='color:#CB2B09'>items & cache</small>",
            },
            {
             v:"<small style='color:#CB2B09'>组件封装</small>",
            },
            {
             v:"<small style='color:#CB2B09'>数据状态共享</small>",
             c:[{a:'',b:'<=>'},{a:'',b:'=>'},{a:'',b:'='},{a:'',b:'<?>'},{a:'',b:'?>'},{a:'',b:'?='}]
            },
            {
              v:'结语'
             }     
          ]
       },
       watcherFor:{
              c:function(items){
                items.$_data.a='#'+items.$_data.b;
              },
              m:function(items){
                items.$_data.a='#'+count;
                count++;
              }
       }
   
   });
   var  h=listUl.scrollHeight;
        document.getElementById('right').style.height=h+'px';
   
        var mtxt=document.getElementById('mtxt').value;
        var converter = new showdown.Converter();
        var  html = converter.makeHtml(mtxt);
             document.getElementById('content').innerHTML=html;
        //  demo-input
        // document.getElementById('right').scrollTop=document.getElementById('left').scrollTop;
        new Eng({
            el:'demo-input',
            data:{
               value:'修改我试试'
            }
        });
        new Eng({
          el:'demo-change',
          data:{
             value:'修改我试试'
          }
        });
      var test111=document.getElementById('test'); 
      var ff=1; 
      document.getElementById('click').onclick=function(){
           
        //  test111.style.display=ff?'block':'none';
        test111.style.visibility=ff?'visible':'hidden';
         ff?ff=0:ff=1;
        //  test.style.width='1100px';
        //  test.style.height='800px';
      }
