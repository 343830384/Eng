var $_app=function(cfg){
    var template="<div id='demo'><p>a的值 :{{a}}</p><p>b的值 :{{b}}</p><input e-input='a' placeholder='修改a的值'> <input e-input='b' placeholder='修改b的值'></div>";
    var css="*{ margin:0 auto; padding:0;box-sizing:border-box;} #demo{ width:350px; height:200px; margin-top:40px; border:1px solid red;} #demo p{line-height:50px; padding-left:5px;} #demo input{display:block; font-size:20px; width:98%; height:50px;}";
        if(cfg.css)Eng.addStyle(css);  
        new Eng({
              el:cfg.el,
              id:cfg.id,
              template:cfg.template||template,
              data:{
                  a:'初始值',
                  b:'初始值'
              }
          })
  };