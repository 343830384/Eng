Router.components.main_right1=function(parentDom,data){
var css='h1{  width:fit-content;}';
var html='<div>   <h1>main_right1</h1></div>';
var app=new Eng({
      id:'main_right1',
      el:html,
      parent:parentDom,
      css:css,
      data:{
          
      }
}); return Eng.get(app);
};