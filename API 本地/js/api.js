var $_eng_data = {
    "示例": {
        a: "<div id='app'><p>{{value}}</p></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{value:"Hello Eng"}});"//尝试在下方控制台修改app.value的值";"//例: app.value=\'Nice to meet Eng\' 回车执行";',
        c: "",
        d: 1,
    },
    "e-base": {
        a: "<div id='app'><div e-base='base1'><p>{{value}}</p><div e-base='base2'><p>{{value}}</p></div></div></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{base1:{value:"我是基于 base1 的value值",base2:{value:"我是基于 base2 的value值"}}}});"//尝试在下方控制台修改app的值";"//例如: app.base1.value=1234567 回车执行";',
        d: 1,
    },
    "e-attr": {
        a: "<div id='app'><div e-attr='class=v0'>txt</div><div e-attr='class=v1?(css1):(css2)'>txt</div><div e-attr='class=v2>=10?(css1):(css2)'>txt</div><div e-attr='class=v0;tittle=v3;atr=v2>=10?(css1):(css2)'> txt</div></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{v0:"css0",v1:true,v2:9,v3:"this is tittle"}});',
        d: 1,
    },
    "e-html": {
        a: "<div id='app'><div e-html='v'></div></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{v:"<p>DOM 文本</p>"}});',
        d: 1,
    },
    "e-id": {
        a: "<div id='app'>\r<button e-id='idName' >Click me</button>\r</div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{},created:function(items){"//idName = idName.";items.idName.onclick=function(){alert("click me")}}});',
        d: 1,
    },
    "e-for": {
        a: "<div id='app'><div><p e-for='for1'>index = {{$_index}}  value= {{$_value}}</p></div><br><eng><p e-for='for2'> index = {{$_index}} .... {{v}}</p></eng><br><eng><div e-for='for3'>{{v}}<div e-for='for4' style='margin-left: 30px'>{{v}}</div></div></eng></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{for1:["a","b"],for2:[{v:"a"},{v:"b"},],for3:[{v:"I\'m for3 0",for4:[{v:"I\'m for4 0"},{v:"I\'m for4 1"}]},{v:"I\'m for3 1",for4:[{v:"I\'m for4 2"},{v:"I\'m for4 3"}]}]}});',
        d: 1,
    },
    "watcher": {
        a: "<div id='app'><p>{{v1}}</p><div e-base='base'><p>{{v2}}</p></div></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{v1:123,base:{v2:456}},watcher:{"v1":function(oldValue,newValue,items,cache){if(newValue==123){items.$_value="v1 的值 ,被修改了"}},"base.v2":function(oldValue,newValue,items,cache){if(newValue==456){items.$_value="base.v2 的值 ,被修改了"}}}});',
        d: 1,
    },
    "watcherFor": {
        a: "<div id='app'><eng><p e-for='for1'>index = {{$_index}}   value = {{$_value}}</p></eng><br><eng><p e-for='for2'>index = {{$_index}}   value = {{v}}</p></eng></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{for1:[0,1,2,3,4,5],for2:[{v:0},{v:1},{v:2},{v:3},{v:4},{v:5}]},watcherFor:{for1:function(items,cache){if(items.$_data%2==0){items.$_allow=false}},for2:function(items,cache){if(items.$_data.v%2==1){items.$_allow=false}},},created:function(items,cache){}});',
        d: 1,
    },
    "$_watcher": {
        a: "<p id='app'>\r {{v}} \r</p>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{v:"在下方输入 app.v=123  点第二个 提交 试试 "},created:function(items,cache){items.$_watcher({"v":function(oldValue,newValue,items,cache){if(newValue==123){items.$_value="$_watcher注册的watcher,再次修该数据时,才生效"}}})}});',
        d: 1,
    },
    "$_watcherFor": {
        a: "<div id='app'><p e-for='for1'>{{$_value}}</p></div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{for1:[0,1,2,3,4,5,6,7,8]},created:function(items,cache){items.$_watcherFor({"for1":function(items,cache){if(items.$_data%2==1){items.$_allow=false}}})}});',
        d: 1,
    },
    "$_setToSelf": {
        a: "",
        b: 'var app=new Eng({el:null,data:{},created:function(items,cache){\r\r var data={v:"$_setToSelf是一次性的,不支持数据绑定"};\r\r var domOrStr=\'<div><p e-attr="title={{v}}"> {{v}} </p></div>\';\r\r var dom=items.$_setToSelf(data,domOrStr);\r\r document.getElementById("html").appendChild(dom)}});',
        d: 1,
    },
    "$_setToGlobal": {
        a: "",
        b: 'var app=new Eng({el:null,data:{},created:function(items,cache){var data={v:"$_setToGlobal不是一次性的,支持数据绑定"};var domOrStr=\'<div><p e-attr="title={{v}}"> {{v}} </p></div>\';var dom=items.$_setToGlobal({el:domOrStr,key:"base",data:data,base:"",});document.getElementById("html").appendChild(dom)}});',
        d: 1,
    },
    "e-input": {
        a: "<div id='app'><p>{{v}}</p>\r<input type='text' e-input='v'>\r</div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{v:"123"}});',
        d: 1,
    },
    "e-change": {
        a: "<div id='app'><p>{{v}}</p>\r<input type='text' e-change='v'>\r</div>",
        b: 'var app=new Eng({el:document.getElementById("app"),data:{v:"123"}});',
        d: 1,
    },
    "e-event": {
        a: '<div id="app"><div style="margin:20px"><p>x = {{x}}</p><button e-event="onclick:addition1">Click x++</button></div><div e-base="base" style="margin:20px"><p>y = {{y}}</p><button e-event="onclick:addition2">Click y+=2</button></div></div>',
        b: 'var app=new Eng({el:document.getElementById("app"),data:{x:0,base:{y:1}},event:{addition1:function(){this.$_data.x++},addition2:function(){this.$_data.y+=2}}});',
        d: 1
    },
};
// js CDN地址
var $_src = {
    count: 0,
    "0": {
        a: 0,
        b: "css",
        c: ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.min.css", "https://cdn.bootcss.com/codemirror/5.29.0/codemirror.min.css"]
    },
    "1": {
        a: 0,
        b: "css",
        c: ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/theme/monokai.min.css", "https://cdn.bootcss.com/codemirror/5.29.0/theme/monokai.min.css"]
    },
    "2": {
        a: 0,
        b: "js",
        c: ["https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.14/beautify.min.js", "https://cdn.bootcss.com/js-beautify/1.6.14/beautify.min.js"]
    },
    "3": {
        a: 0,
        b: "js",
        c: ["https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.6.14/beautify-html.min.js", "https://cdn.bootcss.com/js-beautify/1.6.14/beautify-html.min.js"]
    },
    "4": {
        a: 0,
        b: "js",
        c: ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.min.js", "https://cdn.bootcss.com/codemirror/5.29.0/codemirror.min.js"]
    }
};
var $_src2 = {
    "5": {
        a: 0,
        b: "js",
        c: ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/mode/javascript/javascript.min.js", "https://cdn.bootcss.com/codemirror/5.29.0/mode/javascript/javascript.min.js"]
    },
};
var pHead = document.getElementsByTagName("head")[0],
k;
var $_script = function(pHead, c, a, z) {
    var o, d;
    if (c[a].b == "js") {
        d = c[a].c[c[a].a];
        if (!d) {
            return
        }
        o = document.createElement("script");
        o.setAttribute("type", "text/javascript");
        o.setAttribute("src", d)
    } else {
        d = c[a].c[c[a].a];
        if (!d) {
            return
        }
        o = document.createElement("link");
        o.setAttribute("rel", "stylesheet");
        o.setAttribute("href", d)
    }
    c[a].a++;
    o.onerror = function() {
        pHead.removeChild(o);
        $_script(pHead, c, a)
    };
    o.onload = function() {
        var x = a != 5 ? c: z;
        x.count++;
        if (a == 4) {
            $_script(pHead, $_src2, 5, $_src)
        }
        if (x.count == 6) {
            $_inint()
        }
    };
    pHead.appendChild(o)
};
for (k in $_src) {
    if (k != "count") {
        $_script(pHead, $_src, k)
    }
}
var $_L0 = [

{
    m: "API",
    s: "display:block",
    c: ["示例", "e-base", "e-attr", "e-html", "e-id", "e-input", "e-change", "e-event", "e-for", "---------", "el", "watcher", "watcherFor", "$_watcher", "$_watcherFor", "$_setToSelf", "$_setToGlobal"]
}

];



var $_app = new Eng({
    el: document.getElementById("$_app"),
    data: {
        p: JSON.parse(JSON.stringify($_L0)),
    }
});
var $_set;

var $_inint = function() {
    var L = 2;
    var ddd = $_eng_data;
    var p = document.getElementsByClassName("ppp");
    var c = document.getElementsByClassName("cul");
    var btn = document.getElementsByClassName("btn");
    var htm = document.getElementsByClassName("hinput");

    L = p.length;
    while (L--) {
        p[L].index = L;
        if (L == 2) {
            p[L].openFlag = 1,
            p[L].style.color = "blue"
        }
        p[L].onclick = function() {
            var a, b, t = this;
            t.openFlag ? (a = "none", b = "black", t.openFlag = 0) : (a = "block", b = "blue", t.openFlag = 1);
            c[t.index].style.display = a;
            p[t.index].style.color = b
        };
        if (c[L]) {
            c[L].onclick = function(e) {
                var n = e.target.tagName,
                txt, a, b, c, d, f;
                if (n == "LI") {
                    txt = e.target.textContent.trim();
                    txt = ddd[txt];
                    if (!txt)return;
                    
                    clearTimeout($_set);

                    a = txt.a,
                    b = txt.b,
                    // c = txt.c,
                    d = txt.d,
                    f = txt.e;
                    editor[1].setValue(d == 1 ? html_beautify(a, {
                        indent_size: 2
                    }) : "");
                    editor[2].setValue(d == 1 ? js_beautify(b, {
                        indent_size: 2
                    }) : "");
                    s[2].value = "";
                    if (d == 1) {
                        btn[0].click()
                    }
                    if (e) {
                        editor[2].setValue(js_beautify(b, {
                            indent_size: 2
                        }))
                    }
                    if (d == 2) {
                        htm[0].innerHTML = a
                    }
                }
                e.stopPropagation()
            }
        }
    }
    var s = document.getElementsByClassName("r-r");
    var editor = [];
    var kF;
    L = 3;
    while (L--) {
        s[L].index = L;
        if (L > 0) {
            editor[L] = (CodeMirror.fromTextArea(s[0], {
                lineNumbers: true,
                theme: "monokai",
                lineWrapping: true
            }));
            editor[L].setSize("100%", "43%")
        }
        s[L].onfocus = function() {
            if (this.index == 2) {
                kF = 1;
                if (err) {
                    err = 0;
                    s[2].style.color = "white";
                    s[2].value = ""
                }
            }
        };
        s[L].onblur = function() {
            if (this.index == 2) {
                kF = 0
            }
        }
    }
    var cache, cache2, err;
    btn[0].onclick = function() {
        htm[0].innerHTML = editor[1].getValue().trim();
        if (cache) {
            cache.parentNode.removeChild(cache)
        }
        cache = document.createElement("script");
        cache.textContent = editor[2].getValue().trim();
        // debugger;
        document.body.appendChild(cache)
    };
     c[0].getElementsByTagName("li")[0].click();//for
    //  c[0].getElementsByTagName("li")[0].click();
    document.getElementById('btn2').onclick=function(){
        if (cache2) {
            cache2.parentNode.removeChild(cache2)
        }
        cache2 = document.createElement("script");
        cache2.textContent = s[2].value.trim();
        s[2].value = "";
        s[2].blur();
        document.body.appendChild(cache2)
    };
    window.onerror = function(m, u, l) {
        s[2].style.color = "#67FDDE";
        s[2].value = m.replace("Uncaught", "");
        err = 1
    }
};
