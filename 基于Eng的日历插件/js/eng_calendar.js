	var Eng_position=function(obj){
		   var t,l,h,w,wh,ww,sh,sl,bd=document.body;
		       t=obj.offsetTop,l=obj.offsetLeft,h=obj.offsetHeight,w=obj.offsetWidth,wh=window.innerHeight,ww=window.innerWidth,sh=bd.scrollTop,sl=bd.scrollLeft;
		     return [t,l,h,w,wh,ww,sh,sl];   
	};
var Eng_Calendar=function(data){
	       this.data=data;
				    this.date=[];
				    this.obj={};
				    this.inint();
				    this.Event();
				    this.End();
        return {open:this.open,close:this.close};
};
Eng_Calendar.prototype.inint=function(){
	 var th=this,n=new Date();
	     th.toDate=[n.getFullYear(),n.getMonth()]
};
//注册日历的 open() 和close 方法
Eng_Calendar.prototype.End=function(){
	var th=this,obj=th.obj.obj;
			  th.open=function(config,fun){
			  	   th.inint();
		       th.el=config.el;
		       th.date=[];
		       th.Position();
		 	  	  th.start=config.start;
		       th.end=config.end;
		 	  	  config.init?(th.getNow(config.init[0],config.init[1]-1),this.date[2]=config.init[2]):th.getNow(th.toDate[0],th.toDate[1]);
		 	  	  th.addPretreatment(),th.addDate();
		 	  	  th.callBack=fun;
		 	  	  th.el.onblur=function(){
		 	  	  	 if(!th.focusFlag)th.data.calendar.style.display='none';
		 	  	  }
			  };
			  th.close=function(){
			  	 th.data.calendar.style.display='none';
			  	 if(th.callBack)th.callBack(th.date);
			  };
};
// 根据 el: 传入dom对象 定位 日历窗口位置
Eng_Calendar.prototype.Position=function(){
	   	 var th=this,p=Eng_position(th.el),obj=th.data.calendar,w,h,t,l;
	   	     obj.style.display='block';
	   	     w=obj.offsetWidth,h=obj.offsetHeight;
          (p[0]-p[6]+p[2]/2)<p[4]/2?t=p[0]+p[2]:t=p[0]-h;
          l+w>p[5]?l=p[5]-w:l=p[1];
          obj.style.left=l+'px';
          obj.style.top=t+'px';
	   };
	// 检查日历 open()的日历窗口,是否设置有日期约束条件   
Eng_Calendar.prototype.check=function(y,m){
	     var th=this,d=th.date1,start=th.start,end=th.end,flag;
          start?(y<start[0]?y=start[0]:null):null;
          end?(y>end[0]?y=end[0]:null):null;
          start?(y==start[0]&&m<start[1]?m=start[1]-1:null):null;
          end?(y==end[0]&&m>=end[1]?m=end[1]-1:null):null;
          if(th.toDate)th.toDate[0]==y&&th.toDate[1]==m?flag=true:null;
          return [y,m,flag];
};
//获取当前日历时间的 相关参照时间
Eng_Calendar.prototype.getNow=function(y,m){
	    var s= this.check(y,m);
	        y=s[0],m=s[1];
 	   var th=this,f,n,d,d2,h,x,x2;
 	       y?(n=new Date(y,m,1)):(n=new Date(),f=1);
 	       y=n.getFullYear(); //年 
         m=n.getMonth()+1; //月   
         d=new Date(y,m,0).getDate();//本月总天数  
         d2=new Date(y,m-1,0).getDate();//上个月总天数  
         s[2]?h=new Date().getDate():h=-1;
         x=n.getDay();     //当前周几  
         x2=new Date(y,m-1,1).getDay();//上个鱼1号是周几  
         th.date1=[y,m,d,d2,h,x,x2];
         th.date[0]=y,th.date[1]=m;
         th.data.year.innerHTML=y;
         th.data.month.innerHTML=m;
};
//根据 参照时间,获得数据关系
Eng_Calendar.prototype.addPretreatment=function(){ 
	      var th=this;
	      var d=th.date1,start=th.start,end=th.end;
	          th.addDD={d:[],c:[]};
	          th.addDD.t=d[4]==-1?-1:d[4]+d[6]-1;
	          th.addDD.d[0]=[0,d[6],d[3]-d[6]+1];
	          th.addDD.d[1]=[d[6],d[2]+d[6],1];
	          th.addDD.d[2]=[d[2]+d[6],42,1];
	          th.addDD.c[1]=[];
           if(start){
           	  start[0]==d[0]&&start[1]==d[1]?th.addDD.c[0]=[0,d[6]+start[2]-1]:th.addDD.c[0]=[0,d[6]];
           	  th.addDD.c[1][0]=th.addDD.c[0][1];
           }else{
           	  th.addDD.c[0]=[0,d[6]],th.addDD.c[1][0]=th.addDD.c[0][1];
           };
           if(end){
           	  end[0]==d[0]&&end[1]==d[1]?th.addDD.c[2]=[end[2]+d[6],42]:th.addDD.c[2]=[d[2]+d[6],42];
           	  th.addDD.c[1][1]=th.addDD.c[2][0];
           }else{
           	  th.addDD.c[2]=[d[2]+d[6],42],th.addDD.c[1][1]=th.addDD.c[2][0];
           };
};
// 写入生成的日期数据
Eng_Calendar.prototype.addDate=function(){
 	   var th=this,span=th.obj.span,L=42,i=0,s=th.addDD.d,d0=s[0][2],d1=s[1][2],d2=s[2][2];
 	   var c=th.addDD.c,t=th.addDD.t;
 	   var arr=[],arrL=42;
 	        while(arrL--){
 	        	arr[arrL]={};
 	        };
 	     while(i<L){
             i<s[0][1]?(arr[i].v=d0,d0++):null;
             i>=s[1][0]&&i<s[1][1]?(arr[i].v=d1,d1++):null;
             i>=s[2][0]&&i<s[2][1]?(arr[i].v=d2,d2++):null;
             i<c[0][1]?arr[i].cls='':null;
             i>=c[1][0]&&i<c[1][1]?arr[i].cls='c_allow':null;
             i>=c[2][0]&&i<c[2][1]?arr[i].cls='':null;
       	     i++;
       };
        t!=-1?arr[t].cls='c_today':null;
        th.data.$_data.day=arr;
};
//重复操作
Eng_Calendar.prototype.repetition=function(){
	        this.addPretreatment();
	     	  this.addDate();
};
//相关 节点的操作事件
Eng_Calendar.prototype.Event=function(){
	var th=this;
	     th.data.prevYear.onclick=function(){
	     	  th.getNow(th.date1[0]-1,th.date1[1]-1);
	     	  th.repetition();
	     };
	     th.data.prevMonth.onclick=function(){
	     	  th.getNow(th.date1[0],th.date1[1]-2);
	     	  th.repetition();
	     };
	     th.data.nextYear.onclick=function(){
	     	  th.getNow(th.date1[0]+1,th.date1[1]-1);
	     	  th.repetition();
	     };
	     th.data.nextMonth.onclick=function(){
	     	  th.getNow(th.date1[0],th.date1[1]);
	     	  th.repetition();
	     };
	     th.data.table.onclick=function(e){
	     	  var d,target=e.target,clas=target.className.trim();
	     	      if(clas=='c_today'||clas=='c_allow'){
    	      	   if(th.selected)th.selected.className=th.selected.className.replace('c_select','');
    	      	   d=target.textContent.trim();
    	      	   th.date[2]=Number(d);
    	      	   target.className=clas+' '+'c_select';
    	      	   th.selected=target;
    	      	   th.data.calendar.style.display='none';
    	      	   if(th.callBack)th.callBack(th.date.slice());
    	      };
    };
    th.data.today.onclick=function(){
    	  th.getNow(th.toDate[0],th.toDate[1]),th.addPretreatment(),th.addDate();
    };
    th.data.calendar.onmouseenter=function(){
    	 th.focusFlag=1;
    };
    th.data.calendar.onmouseleave=function(){
    	 th.focusFlag=0;
    };
    
};