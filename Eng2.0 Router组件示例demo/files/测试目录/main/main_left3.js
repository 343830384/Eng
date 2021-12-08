Router.components.main_left3=function(parentDom,data){
var css='.left{        width:100%;        height:100%;        font-size:13px;        background-color:rgba(127,202,248,.8);    }    .left div{        width:80%;        height:24px;        line-height:24px;        margin-top:6px;        border-radius:6px;        padding-left:8px;        cursor:pointer;        background-color:#ECEFB8;    }    .left .bt{        color:white;        width:60%;        margin-left:10%;        background-color:#797A7F;    }';
var html='<div class="left">        <div class="bt">列表三 (特殊)</div>        <br>        <div e-for="list" e-event="onclick=changeRight" e-attr="title=title">{{txt}} {{$_index}}</div>  </div>';
var app=new Eng({
        el:html,
        parent:parentDom,
        id:'main_left3',
        css:css,
        data:{
            list:[
                {txt:'选项',src:'m_r_area'},
            ]
        },
        watcherFor:{
            list:function(item){
                var fd=item.forData;
                    fd.title='打开 子区域 '+fd.src;
            }
        },
        domEvent:{
            changeRight:function(item,evt){
                var src=item.forData.src;
                    Router.openArea(src)
                    // Router.openComponent(src);
            }
        },
    }); return Eng.get(app);
};