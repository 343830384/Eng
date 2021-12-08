Router.components.m_r_area=function(parentDom,data){
var css='h1{  width:fit-content;}';
var html='<div>   <h1>m_r_area</h1></div>';
var app=new Eng({
      id:'m_r_area',
      el:html,
      parent:parentDom,
      css:css,
      data:{
          
      }
}); return Eng.get(app);
};