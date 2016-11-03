///getStyle
/* obj-对象 attr-属性 */
	function getStyle(obj,attr){
		return obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}

	
//getByClass 
/*  用法与ByTagName一样 */
	function getByClassName(parent,className){
		var aTmp=parent.getElementsByTagName('*')
		var arr=[]
		for(var i=0;i<aTmp.length;i++){
			if(aTmp[i].className==className){
			
			arr.push(aTmp[i])
			}          
		}
		return arr;  
	}	
	


//完美运动框架
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;		//这一次运动结束--所有值都到达了
		for(var attr in json){

			//取当前值
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100)
			}else{
				iCur=parseInt(getStyle(obj, attr));
			}

			//算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//检测停止
			if(iCur!=json[attr]){
				bStop=false;
			}

			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}

		if(bStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30)
}


function Ajax(url,fnSucc){
	var xhr='';
	//创建Ajax对象
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveObject('Microsoft.XMLHTTP');
	}
	//连接服务器
	xhr.open('GET',url,true);
	//发送请求
	xhr.send(null);
	//接收返回
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			fnSucc(xhr.responseText);
		}
	}
}

