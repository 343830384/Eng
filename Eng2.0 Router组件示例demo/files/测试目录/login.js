Router.components.login=function(parentDom,data){
var css='#login{      width:400px;      height:240px;      top:10%;      background-color: aliceblue;      border-radius:10px;   }   #login span,input{      display:block;      width:80%;      height:30px;   }   #login button{      display:inline-block;      width:80px;      height:24px;      top:24px;   }      button:nth-last-child(2){      margin-left:20%;   }   button:nth-last-child(1){      float:right;      margin-right:20%;   }';
var html='<div id="login">            <br>            <span>用户名:</span>            <input type="text" placeholder="测试,无需输入" e-change="name">            <br>            <span>密码:</span>            <input type="text" placeholder="测试,无需输入" e-change="password">            <button e-event="onclick=reset">忘记密码</button>            <button e-event="onclick=submit">提交确认</button>      </div>';
var app=new Eng({
    id:'login',
    el:html,
    parent:parentDom,
    css:css,
    data:{
       name:'',
       password:'',
       value:'<style>123123</style>'
    },
    domEvent:{

         //重置 
         reset:function(){
               console.log('清除登录信息');
         },
         //登录
         submit:function(item,evt){
               console.log('登录 ~~~~~~~~~~~');
               Router.openArea('main','success',function(){
                     console.log('主区域打开')   
               });
         },

    },
    methods:{
         onInit:function(){
            
         },
         onCreated:function(){

         }
    }
}); return Eng.get(app);
};