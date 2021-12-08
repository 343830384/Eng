/* 
Eng web服务 ############################################################################################################# 
*/
var cmd=process.argv;                // 请求参数   [... , ... , ...]
// var path=process.cwd()+'/files/'; // 请求base路径
var port=cmd[2]||80;                 // 端口号 默认80
    console.log('127.0.0.1',port);
var http=require('http');
var _url = require('url');
var fs=require('fs');
var cfg=null;
var path='';
var list=null;

//http Server ############################################################################################################################################
var start=function(){
        var server= http.createServer(function(req,res){
            var url;
                try {
                    url=decodeURI(req.url);
                } catch (error) {
                    url=decodeURI(req.url.replace(/%/g, '%25')); ;// % 特殊符号转义   decodeURI无法正确识别时
                };
                url=_url.parse(url);
            var pathName=url.pathname; //请求路径
                if(pathName=='/')pathName='/index.html'; //默认路径,若无指定目录
                pathName=decodeURI(pathName);

            var query=url.query;//?后的请求  命令
                if(query){
                      if(query=='dev-null-foot')debugger;
                    var arr=query.split('-');
                        if(arr.length===3&&(arr[0]==='dev'||arr[0]==='test')){
                            ajaxReq(req,res,'engComponents',arr);
                            return;
                        };
                };
            // 获得文件类型   
            var suffix= pathName.split('.').pop();
                if(suffix)suffix=suffix.toLocaleLowerCase(); //转小写
            // 获得支持的文件对应的 MIME 类型
            var type=head[suffix]; 
                // console.log(path+pathName);
                fs.readFile(path+pathName,function(err,data){
                        try {
                                if(err)throw err;
                        }catch (error) {
                                console.log(error);
                                res.writeHead(404);
                                res.end();
                            return;
                        };
                        res.writeHead(200,{'Content-Type':type});
                        if(data!==undefined)res.write(data);
                        res.end();
                });   

        });
        server.on('error',function(err){
                        throw err;
        });
        server.listen(port,'0.0.0.0');
};

// ajax 请求 #################################################################################################################################
// ajax请求
var ajaxReq=function(req,res,query,zdy){  //zdy:自定义数据
	var i=0,arr=[];
       //ajax请求数据接受 
		req.on('data',function(d){
				arr[i]=Buffer.from(d);
				i++;
		});
       //ajax 请求数据接收完成 , 执行对应 query 方法 
		req.on('end',function(){
			var	str=Buffer.concat(arr);
				str=str.toString();
			var d=null;
                if(str){
                     try {
                         d=JSON.parse(str);  //前端发送的所有数据    
                     }catch(err) {
                         throw err;
                     };
                };
			    ajaxFun[query](res,d,zdy);
		});	
};

// ajax query 请求对应的方法
var ajaxFun={
      'engComponents':function(res,d,zdy){
          var v=list[zdy[1]],a=zdy[0],p,pth='',n,end;
               //zdy[ 'dev||','区域名','组件名']
               //v: 区域路径 
              if(v){//有对应数据
                   n=a==='dev'?0:1;
                   end=n===0?'.html':'.js';    //dev: 开发模式 读取的是原始.html文件 ,  prod: 生产模式读取的是.js (解析html后生成的静态文件)
                   p=v[n]; // 生产 或 产品 文件路径
                   pth+=path+'/'+p+'/'+zdy[2]+end;
                   fs.readFile(pth,function(err,data){
                        if(err){
                            res.writeHead(404);
                            res.end();
                            throw err;
                        };
                        if(n===0){// 解析 源文件 .html
                            var js=htmlParsing(data,zdy);
                                res.writeHead(200,{'Content-Type':'text/javascript'});
                                res.write(js);
                                res.end();
                                return;
                        }else{   // 读取.js
                            res.writeHead(200,{'Content-Type':'text/javascript'});
                            res.write(data);
                            res.end();
                        };     
                        
                   }); 
              }else{
                   
                    res.writeHead(404);
                    res.end();
              };
      },
};

//此处 可对 css , html , js 进行 二次处理 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//将 html 文件解析合并成 .js文件
var htmlParsing=function(data,zdy){
    var str=data.toString().trim();
    var arr=str.match(/<style(([\s\S])*?)<\/style>/g),i=0,l=0,q=-1,v,m=0,css='',html='',sct='',
        str2=`Router.components.${zdy[2]}=function(parentDom,data){\r\n`;
        //css
        if(arr){
            l=arr.length;   
            while(i<l){
                v=arr[i]; 
                if(v.length>m){
                     q=i , m=v.length;               
                };
                i++;
            };
            css=arr[q];
            if(css){
                str=str.replace(css,'').trim();
                css=css.match(/<style>([\s\S]*?)<\/style>/)[1].trim();
                css=css.replace(/(\r|\n)/g,'');
                css=css.replace(/\'/g,'"');
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!css  此处 可对css 进行处理   less 或 sass  , 自己 引入包调用 , 用同步方法
                css='var css=\''+css+'\';\r\n';
            }   
        }else{
            css='var css=""';
        };
        //html
        arr=str.match(/<html(([\s\S])*?)<\/html>/g);
        i=0,l=0,q=-1,v,m=0;
        if(arr){
            l=arr.length;
            while(i<l){
                v=arr[i]; 
                if(v.length>m){
                     q=i , m=v.length;
                };
                i++;
            };
            html=arr[q];
            if(html){
                str=str.replace(html,'').trim();
                html=html.match(/<html>([\s\S]*?)<\/html>/)[1].trim();
                html=html.replace(/(\r|\n)/g,'');
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!html  此处 可对 html 进行处理  自己 引入包调用 , 用同步方法
                html=`var html=${ JSON.stringify(html) };\r\n`;
            };
        }else{
            html='var html=""';
        };
        //script
        arr=str.match(/<script(([\s\S])*?)<\/script>/g);
        i=0,q=-1,v,m=0;
        if(arr){
            l=arr.length;
            while(i<l){
                v=arr[i]; 
                if(v.length>m){
                     q=i , m=v.length;
                };
                i++;
            };
            sct=arr[q];
            if(sct){
                str=str.replace(sct,'').trim();
                sct=sct.match(/<script>([\s\S]*?)<\/script>/)[1].trim();
            }else{
                console.error(`区域 = ${zdy[1]} _ 组件 = ${zdy[2]}  js 内容读取失败`);
            }
        };
        str2+=css+html+sct+'\r\n return Eng.get(app);\r\n};';
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!str2  此处 可对 JS  进行压缩处理  , 引入包调用 , 用同步方法
        return str2;
};

// init 读取配置信息  ##############################################################################################################################

fs.readFile('./eng_server_cfg.txt',function(err,data){
     if(err)throw err; //相关文件不存在 
     var str=data.toString('utf8');
         cfg=eval('('+str+')');
         path=cfg.path;
         list=cfg.areaPathList;
         console.log(cfg);
         if(port!=='build'){
             start();
         }else{
             build0()
         };
});

// build 开发目录所有文件整合成 单Js 文件 到 生产目录 ################################################################################################################

//0-创建build 基础目录
var build0=function(){
    var o=list,k,arr=[],v,i=-1,l=0;
       for(k in o){
            v=o[k];
            arr.push(
                  [path+'/'+v[0],path+'/'+v[1]]     //  [区域源目录, 测试输出目录]
            );
       };
       l=arr.length;
       if(l>0){
            var fun=function(){
                    i++;
                    if(i<l){
                        build1(arr[i],function(){
                            fun();
                        })
                    }else{
                        fun=null;
                    };
            };
            fun();
       };
};

//1-检查 源目录和 输出目录 
var build1=function(arr,callBack){  // [源目录 , 输出目录 ]
    var n=0, a=false,b=false;
    var fun=function(){
                if(a&&b){
                        build3(arr,function(){
                            callBack();
                        });
                }else if(a){
                        // 测试目录不存在 
                        build2(arr[1],function(){
                            build3(arr,function(){
                                callBack();
                            });
                        });
                }else{
                        callBack(); 
                }; 
                fun=null;
        };
        fs.access(arr[0], fs.constants.F_OK, function(err) {
                n++;
                if(err){
                    console.error('源目录   => '+arr[0]+'   获取失败') 
                }else{
                    a=true; 
                };
                if(n==2)fun();
        });
        fs.access(arr[1], fs.constants.F_OK, function(err) {
                n++;
                if(err){  // 测试目录不存在

                }else{    
                    b=true;
                };
                if(n==2)fun();
        });
};

//2-创建测试输出目录
var build2=function(path,callBack){
     fs.mkdir(path, { recursive: true }, (err) => {
           if (err){
               console.error('测试输出目录 => '+pth+'   创建失败!!!!')
           }else{
               callBack();
           };
      });
};

//3:读取文件 源目录文件 .html 文件 , 解析成js文件 写入 测试目录
var build3=function(arr,callBack){
      fs.readdir(arr[0],function(err,files){
              if(err){
                   callBack()
                   throw err;
              };
              build4(files,arr,function(){
                    callBack();
              });

      });
};

//4. 读取源文件 解析 并 写入
var build4=function(files,pArr,callBack){
     var i=-1,l=files.length;
     var reg=/(.html)$/;
     var fun=function(){
           i++;
           if(i<l){
               var fName=files[i]; //组件名.html
                   if(reg.test(fName)){
                        var name=fName.replace(reg,''); //组件名
                            fs.readFile(pArr[0]+'/'+fName,function(err,data){
                                if(err){
                                    fun();
                                    throw err;
                                };
                                var str=htmlParsing(data,[null,null,name]);
                                    if(str){
                                        fs.writeFile(pArr[1]+'/'+name+'.js',str,function(err){
                                            if(err){
                                                fun();
                                                throw err;
                                            }else{
                                                fun();
                                            };
                                        })
                                   }else{
                                       fun();
                                   };
                            });
                   }else{
                        fun();
                   };
           }else{
                fun=null;
                callBack();
           };
     };
     if(l)fun();

};

// webSocket ################################################################################################################################
// 不需要

// MIME  数据类型 #####################################################################################################################################

var head={
    "html":"text/html",
    "htm":"text/html",
    "css": "text/css",
    "gif": "image/gif",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    'bmp':"image/bmp",
    'webp':"image/webp",
    "json": "application/json",
    // "json": "text/javascript",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    //  "map": "text/plain", //自定义 ,  获取地图数据的 (通过script标签)
    //  "map": "text/javascript",
    'mp3':'audio/mpeg',
    'm4a':'audio/mp4',
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "wasm":"application/wasm",
    "7z":"application/octet-stream",
    "rar":"application/octet-stream",
    "zip":"application/octet-stream",
}; 
