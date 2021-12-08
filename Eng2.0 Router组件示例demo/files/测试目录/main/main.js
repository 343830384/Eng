Router.components.main=function(parentDom,data){
var css='#main{        width:100%;        height:100%;    }    .top{        width:100%;        height:60px;        user-select: none;        border:1px solid red;    }    .left{        float:left;        width:20%;        height:100%;        user-select: none;        border:1px solid blue;    }    .right{        float:right;        width:80%;        height:100%;        border:1px solid yellowgreen;    }    .top_0{        position:relative;        margin-left:40px;        margin-top:24px;        width:fit-content;        height:24px;        border-radius:6px;        background-color:#E1A6F8;    }    .top_0::after{        display:block;        position:absolute;        content:"点击切换左侧列表";        left:0;        top:-20px;        height:20px;        width:fit-content;        padding:0px 10px;        font-size:13px;        background-color:#DAFBD6;    }    .top_0 span{        float: left;        display:inline-block;        margin-left:20px;        width:fit-content;        height:24px;        line-height:24px;        text-align:center;        font-size:16px;        font-weight:bolder;        padding:0px 20px;        cursor:pointer;        /* border:1px solid red; */    }';
var html='<div id="main">          <!-- top ################################################################################################################################################-->          <div class="top">                 <div class="top_0">                      <span e-for="list" e-event="onclick=leftListChange" e-attr="title=title">{{txt}}</span>                 </div>          </div>                    <!-- left ################################################################################################################################################-->          <div class="left">          </div>          <!-- right ################################################################################################################################################-->            <div class="right">          </div>     </div>';
var app=new Eng({
        id:'main',
        el:html,
        parent:parentDom,
        css:css,
        data:{
            list:[
                {txt:'列表一',src:'main_left1'},{txt:'列表二',src:'main_left2'},{txt:'列表三',src:'main_left3'},
            ],
        },
        watcherFor:{
            list:function(item){
                var fd=item.forData;
                    fd.title='点击改变左侧列表';
            }
        },
        domEvent:{
            //改变左侧列表
            leftListChange:function(item,evt){
                 var src=item.forData.src;
                     Router.openComponent(src);
            },
            //
            //
        }
    }); return Eng.get(app);
};