new Eng({id:"Router",dataOnly:!0,data:{load:{}},watcher:{},methods:{onCreated:function(){var e=this;e.cfgInit(),window.Router=e,setTimeout(function(){e.hashListen()}),console.log("Eng  路由创建成功")},openZZ:!1,openDefault:function(){var n,e=this,t=routerCfg.default,o=-1,a=0;e.openZZ?console.log("阻止"):(t instanceof Array&&(a=t.length),n=function(){++o<a?e.openArea(t[o],null,function(e){n()}):(n=null,e.openZZ=!1)},a&&(e.openZZ=!0,n()))},hashListen:function(){var e=this,n=location.hash;window.addEventListener("hashchange",function(){n=(n=location.hash).replace(/^\#/,""),e.hashResolve(n)}),n=n.replace(/^\#/,""),e.hashResolve(n)},hashF:!1,hashResolve:function(e){var n,t=this,o=t.pathData;if(!t.hashF&&(""===e||o.pathStr!==e)){t.hashF=!0;var a,r=decodeURI(e).trim();try{r&&(n=JSON.parse(r))}catch(e){n=null}(a=n?t.hashStep(n):a)?t.stepToBuild(a,function(){o.pathStr=e,o.path=n,t.hashF=!1}):(o.pathStr="",o.path={},t.hashF=!1,t.openDefault())}},stepToBuild:function(o,a){var r=this,l=-1,s=o.length,i=function(){var e,n,t;++l<s?(e=(t=o[l])[0],n=t[1],t=t[2],0===e?r.openArea(n,null,function(e){i()}):(1===e?r.openComponent(n):r.openComponent(n,null,null,t),i())):(i=null,a())};i()},hashStep:function(e,n){var t,o;for(o in n=n||[],e)1===(t=e[o])?n.push([1,o]):"string"==typeof t?n.push([2,o]):(n.push([0,o,t]),this.hashStep(t,n));return n.length?n:null},pathData:{pathStr:"",step:[],path:{}},pathChange:function(e,n,t){var o,a=this,r=a.pathData,l=r.path,s=e.path,i=0,p=s.length;if(!a.hashF){var c=e.type,f=e.name;if("public"!==c)for(;i<p;){if(o=s[i],i===p-1&&"del"===n&&"area"===c){delete l[o];break}l[o]||(l[o]={}),l=l[o],i++}else{if(t?e.areaTo=t:t=e.areaTo,!t)return;if(o=t.split(".")[0],!(l=a.getPublicPath(l,o)))return}if(l){a=a.areaCfg[o];if("private"===c){if(a&&-1<a.dfList[0].indexOf(f))return;"add"===n?l[f]=1:delete l[f]}else if("public"===c){if(a&&-1<a.dfList[0].indexOf(f))return;"add"===n?l[f]=t:delete l[f]}else if(a&&-1<a.dfList[1].indexOf(f))return;r.pathStr=encodeURI(JSON.stringify(r.path)),location.hash=r.pathStr}else console.error("错误的路径 ==> evt = "+n+" 组件 = "+f)}},getPublicPath:function(e,n){var t,o,a;for(t in e){if(o=e[t],t===n)return o;if(1!==o&&"string"!=typeof o&&(a=this.getPublicPath(o,n)))return a}},areaCfg:{},zjCfg:{},loadingList:[],commonComponents:[],areaComponents:[],components:{},Env:"",cfgInit:function(){var e,n,t,o=this,a={},r=routerCfg,l=o.zjCfg;for(n in o.areaInit(r.areas,a,null,[]),o.areaCfg=a,e=r.publicComponents)t=e[n],l[n]={type:"public",state:"none",area:t[0],pos:null,name:n,attr:t,private:[],public:o.commonComponents,stop:!1,path:[],parent:null,areaTo:null};o.Env=r.env||"dev"},jsRequire:{},saveData:function(n,e){var t;try{t=JSON.stringify(e),localStorage.setItem(n,t)}catch(e){console.warn("组件 => "+n+"无法 JSON.stringify 转字符串 存储的对象")}},getData:function(n){var e=localStorage.getItem(n);if(!e)return null;try{return JSON.parse(e)}catch(e){return console.error("组件 => "+n+" 缓存数据读取失败,(0:格式错误,不能被JSON.stringify,1:超出localStorage限制) \r\n"+e),localStorage.removeItem(n),null}},areaInit:function(e,n,t,o){var a,r,l,s,i,p,c,f,u,h,d,m,g,v,C,y=this.zjCfg;for(a in e){if((v=o.slice()).push(a),(i=e[a]).openComponents||(i.openComponents=[]),i.closeComponents||(i.closeComponents=[]),i.openPublicComments||(i.openPublicComments=[]),i.openAreas||(i.openAreas=[]),i.closeAreas||(i.closeAreas=[]),i.commonElements=[],i.activeElements=[],p=i.components)for(u in f=i.container,p){if(!f)return void console.error("区域 "+a+"  未定义 区域容器 属性 ~~~~");if(y[u])console.error("重复的组件 id  => "+u);else{if(!(h=p[u]))return void console.error("区域 "+a+" 私有组件 "+u+"  的属性未定义");if(!(d=f[h[0]]))return void console.error("区域 "+a+" 私有组件 "+u+"  的展示位置 配置属性 , 不存在 ~~~");y[u]={type:"private",state:"none",pos:h[0],area:a,name:u,attr:h,private:i.activeElements,public:i.commonElements,parent:d,path:v,stop:!1}}}else i.components={};if((m=i.self)&&(y[m.name=a]={type:"area",area:a,name:a,parent:m.parent,attr:m.default||"destroy",path:v,stop:!1},i.$_el=null,i.$_id=a,m.default||(m.default="destroy"),t&&(i.parent=t)),r=(n[a]=i).childAreaes){for(l in i.children={},r)s=r[l],i.children[l]=s;this.areaInit(r,n,i,v)}if(i.dfList={},g=(g=[]).concat(i.openComponents),C=i.openPublicComments)for(c=C.length;c--;)g.push(C[c][0]);i.dfList[0]=g,g=(g=[]).concat(i.openAreas),i.dfList[1]=g,g=null,0}return n},openArrExe:function(t,e){var o=this,a=-1,r=t.length,l=[],s=function(){if(++a<r){var n=t[a];if(n.zj){if(n.zj.stop)return"area"===n.type?(e&&e(l),void(l=null)):void s();"area"===n.type?(n.args[2]=function(e){l.push([n.zj.name+":"+e]),n.callBack&&n.callBack(e),"err"!==e?s():t=l=s=null},n.fun.apply(o,n.args)):(n.fun.apply(o,n.args),s())}else s()}else t=s=null,e&&e(l),l=null};s()},openArea:function(e,n,t){var o,a,r,l=this,s=l.areaCfg[e],i=l.evtData.area,p=i.open[e],c=i.created[e],f=l.zjCfg,u=[];if(!p||p())if(s){for(a=0,r=(o=s.closeAreas).length;a<r;)l.closeAnalysis(0,o[a]),a++;for(p=f[s.self.name],u.push({type:"area",zj:p,fun:l.openComponent,args:[p.name,n],callBack:function(e){"err"!==e&&"stop"!==e||("err"===e&&l.openDefault(),c&&c(e),t&&t(e))}}),a=0,r=(o=s.openAreas).length;a<r;)u.push({type:"area",zj:f[o[a]],fun:l.openComponent,args:[s.self.name,null]}),a++;for(a=0,r=(o=s.closeComponents).length;a<r;)l.closeComponent(o[a]),a++;for(a=0,r=(o=s.openPublicComments).length;a<r;)u.push({type:"public",zj:f[o[a][0]],fun:l.openComponent,args:[o[a][0],null,null,o[a][1]]}),a++;for(a=0,r=(o=s.openComponents).length;a<r;)u.push({type:"private",zj:f[o[a]],fun:l.openComponent,args:[o[a],null]}),a++;l.openArrExe(u,function(e){console.log("%c 区域加载信息 => "+e.join(" ; "),"color:#E4B102"),c&&c(),t&&t()})}else console.error("无法打开 未正确定义的 区域  =>  "+e),t&&t(),l.openDefault();else t&&t("stop")},openComponent:function(e,n,t,o){var a,r,l,s,i,p,c=this,f=c.zjCfg[e];if(f){if(p=f.attr,c.relevanceCheck(f),p instanceof Array&&("cache"===p[3]&&(n?c.saveData(e,n):n=c.getData(e,n)),c.closeAnalysis(1,p[5])),f.stop&&(f.stop=!1),"loading"===f.state)return void(t&&t("loading"));if(o){if(2!==(s=o.split(".")).length)return console.error(" 指定区域错误 => "+o),void(t&&t("err"));if(!(a=c.areaCfg[s[0]]))return console.error(" 区域不存在  "+o+"   [0] = "+s[0]),void(t&&t("err"));s=a.container[s[1]]}else s=f.parent,a=c.areaCfg[f.area];if(!a||!s)return console.error(" 没有定义对应的区域容器 , 若是 公共组件的话请使用 openElementToArea "),void(t&&t("err"));if(s=s,"area"!==f.type){if(!(i=a.$_el))return console.error(" 该区域组件 尚未启用 , 无法添加  区域 = "+a.$_id+"  组件 = "+e),void(t&&t("err"))}else if("area"===f.type)if(a.parent){if(!(i=a.parent.$_el))return console.error(" 该区域组件 尚未启用 , 无法添加  区域 = "+a.$_id+"  组件 = "+e),void(t&&t("err"))}else i=document;if(!(r="id"===s.type?document.getElementById(s.name):("class"===s.type?i.getElementsByClassName(s.name):i.getElementsByTagName(s.name))[s.index||0]))return console.error(" 区域容器不存在 可能的原因:0:未定义,1:区域未打开 ...."),void(t&&t("err"));var u=function(){c.zjRequest(f,function(e){return"area"===f.type||a.$_el?f.stop?(f.stop=!1,void(t&&t("stop"))):void(e?(f.obj?f.obj.el.parentNode!==r&&f.obj.awake(r):(l=e(r,n),f.obj=l,"private"===f.type?a.activeElements.push(l):"public"===f.type?(c.commonComponents.push(l),a.commonElements.push(l)):(a.$_el=l.el,c.areaComponents.push(l))),t&&t(),c.pathChange(f,"add",o)):t&&t("err")):void(t&&t("stop"))})};p&&p[4]instanceof Array?c.requireLoad(f.attr[4],function(){u(),u=null}):(u(),u=null)}else console.error("未定义的组件 => "+e),t&&t("err")},requireLoad:function(t,o){function a(){var e,n;r<l?(n=t[r],(e=document.createElement("script")).onload=function(){a()},e.onerror=function(){s.push(n),a()},e.src=n,document.body.appendChild(e),e=null):(s.length&&console.err("组件依赖 js 列表加载失败项目  =>  "+s.toString()),o&&o()),r++}var r=0,l=t.length,s=[];a()},zjRequest:function(n,t){var e,o=this.loadingList,a=this.components,r=a[n.name];if(r)return t&&t(r),!0;o.push(n),n.state="loading",(r=document.createElement("script")).onload=function(){n.state="ok",-1<(e=o.indexOf(n))&&o.splice(e,1),t&&t(a[n.name])},r.onerror=function(e){throw n.state="none",t&&t(),e},r.src="./?"+this.Env+"-"+n.area+"-"+n.name,document.body.appendChild(r)},closeArea:function(e,n){var t,o,a,r,s=this,i=s.areaCfg[e],p=s.zjCfg,c=s.evtData.area.close[e];if(i)if(a=p[i.$_id]){if(s.preventLoad(p[i.$_id]))return;if(a.obj)if("destroy"===i.self.default||n){for(o in i.children)s.closeArea(o);for(t=i.commonElements,l=t.length;l--;)s.closeComponent(t[l].id,n);for(t=i.activeElements,l=t.length;l--;)s.closeComponent(t[l].id,n);-1<(p=(r=s.areaComponents).indexOf(a.obj))&&r.splice(p,1),"die"!==a.obj.state&&a.obj.destroy(),a.obj=null,i.$_el=null,c&&c("close"),s.pathChange(a,"del")}else"die"!==a.obj.state&&"sleep"!==a.obj.state&&a.obj.sleep(),c&&c("sleep"),s.pathChange(a,"del");else console.warn("区域未启用  area  = "+e),c&&c("close")}else console.error("区域自身组件无效   area  = "+e+"     component = "+i.id),c&&c("err");else console.error("不存在的  area  = "+e),c&&c("err")},closeAnalysis:function(e,n){var t,o,a,r,l=this,s=0,i=0;if(0===e&&n)2===(t=n.split(".")).length?l.closeAreaParts(t):l.closeArea(n);else if(1===e&&n instanceof Array){if((t=n[0])instanceof Array)for(i=t.length;s<i;)2===(a=(o=t[s]).split(".")).length?l.closeAreaParts(a):l.closeArea(o),s++;if((r=n[1])instanceof Array)for(s=0,i=r.length;s<i;)l.closeComponent(r[s]),s++}},closeAreaParts:function(e){var n,t,o=this.areaCfg[e[0]],a=e[1];if(o)for(t in n=o.components)n[t][0]===a&&this.closeComponent(t)},relevanceCheck:function(e){if("private"===e.type){for(var n,t,o,a,r=this.loadingList,l=e.name,s=e.pos,i=e.private,p=this.areaCfg[e.area].components,c=0,f=i.length;c<f;)(o=i[c])&&(n=i[c].id)!==l&&(t=p[n])&&s===t[0]&&"mutex"===t[1]&&("sleep"===t[2]?o&&o.sleep():this.closeComponent(n)),c++;for(c=0,f=r.length;c<f;)(n=(a=r[c]).name)!==l&&(t=p[n])&&s===t[0]&&"mutex"===t[1]&&(a.stop=!0),c++}},preventLoad:function(e){for(var n,t=e.name,o=this.loadingList,a=0,r=o.length;a<r;){if((n=o[a]).name===t)return n.stop=!0;a++}},closeComponent:function(e,n){var t,o,a,r=this,l=r.zjCfg[e];if(l){if(r.preventLoad(l))return;a=l.obj,e=l.attr,a?"private"===l.type?(-1<(o=(t=l.private).indexOf(a))&&t.splice(o,1),"die"!==a.state&&a.destroy(),l.obj=null,r.pathChange(l,"del")):"public"===l.type?(-1<(o=(t=l.public).indexOf(a))&&t.splice(o,1),n||"destroy"===e[2]?("die"!==a.state&&a.destroy(),l.obj=null):"die"!==a.state&&"sleep"!==a.state&&a.sleep(),r.pathChange(l,"del")):r.closeArea(l.area,n):"loading"===l.state&&(l.stop=!0)}else console.error("未定义的 组件")},openElementToArea:function(e,n,t,o){this.openComponent(e,t,function(e){o(e)},n)},getAllLives:function(){var e,n,t,o,a,r=this.areaCfg,l=this.commonComponents,s=0,i={total:s,public:{length:0,sleep:[],active:[]},private:{length:0,sleep:[],active:[]},area:{length:0,sleep:[],active:[]}},p=0,c=(a=this.areaComponents).length;for((t=i.area).length=c,i.total+=c;p<c;)("sleep"==(o=a[p]).state?t.sleep:t.active).push(o),p++;for(p=0,c=l.length,i.total+=c,(t=i.public).length=c;p<c;)("sleep"==(o=l[p]).state?t.sleep:t.active).push(o),p++;for(e in t=i.private,r)for(p=0,s+=c=(n=r[e].activeElements).length;p<c;)("sleep"==(o=n[p]).state?t.sleep:t.active).push(o),p++;return t.length=s,i.total+=s,i},evtData:{area:{open:{},created:{},close:{}}},addAreaListener:function(e){var n=this.evtData,t=e.evt,o=e.name,a="Router.addEventListener的  ",n=n.area;(n=n[t])?o?e.callBack?n[o]=e.callBack:console.error(a+"callBack 回调方法 为必须"):console.error(a+"name参数 非法"):console.error(a+"evt参数, 仅支持 open 和 created ,close两种事件类型")}}});