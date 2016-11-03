

	/*herader*/ 
	var oHeader=document.getElementById('header');
	var oNav=getByClassName(oHeader,'nav')[0];
	var aNavLi=getByClassName(oNav,'nav-item');

	for (var i = 1; i < aNavLi.length; i++) {
		if(i==1||i==3||i==6){
			continue;
		}
		aNavLi[i].onmouseover=function(){
			var a=this.getElementsByTagName('a')[0];
			this.style.background='#2d2d2d';
			a.style.color='#fff';
		}
		aNavLi[i].onmouseout=function(){
			var a=this.getElementsByTagName('a')[0];
			this.style.background='#ffb000';
			a.style.color='#000';
		}
	};

	/*作品栏*/
	aNavLi[1].onmouseover=function(){
		var a=this.getElementsByTagName('a')[0];
		var i=this.getElementsByTagName('i')[0];
		this.style.background='#2d2d2d';
		a.style.color='#fff';
		i.style.color='#ababab';
		this.children[1].style.display='block';
	}
	aNavLi[1].onmouseout=function(){
		var a=this.getElementsByTagName('a')[0];
		var i=this.getElementsByTagName('i')[0];
		this.style.background='#ffb000';
		a.style.color='#000';
		i.style.color='#8c6000';
		this.children[1].style.display='none';
	}

	aNavLi[3].onmouseover=function(){
			var a=this.getElementsByTagName('a')[0];
			var i=this.getElementsByTagName('i')[0];
			this.style.background='#2d2d2d';
			a.style.color='#fff';
			i.style.color='#ababab';
			this.children[1].style.display='block';
		}
	aNavLi[3].onmouseout=function(){
		var a=this.getElementsByTagName('a')[0];
		var i=this.getElementsByTagName('i')[0];
		this.style.background='#ffb000';
		a.style.color='#000';
		i.style.color='#8c6000';
		this.children[1].style.display='none';
	}

	aNavLi[6].onmouseover=function(){
			var a=this.getElementsByTagName('a')[0];
			var i=this.getElementsByTagName('i')[0];
			this.style.background='#2d2d2d';
			a.style.color='#fff';
			i.style.color='#ababab';
			this.children[1].style.display='block';
		}
	aNavLi[6].onmouseout=function(){
		var a=this.getElementsByTagName('a')[0];
		var i=this.getElementsByTagName('i')[0];
		this.style.background='#ffb000';
		a.style.color='#000';
		i.style.color='#8c6000';
		this.children[1].style.display='none';
	}
		
	/*搜索栏*/
	var oSearchList=getByClassName(oHeader,'list')[0];
	var oInp=getByClassName(oHeader,'inp')[0];

	oInp.onmouseover=function(){
		oSearchList.style.display='block';
	}

	oInp.onmouseout=function(){
		oSearchList.style.display='none';
	}

	/*banner图部分*/
	var oDiv=document.getElementById('banner');
	var oShow=getByClassName(oDiv,'show')[0];
	var aLi=oShow.getElementsByTagName('li');
	var oPrev=oDiv.getElementsByTagName('a')[0];
	var oNext=oDiv.getElementsByTagName('a')[1];
	var timer=null;

	autoPlay();

	var index=0;
	var z_Index=1;

	function autoPlay(){
		timer=setInterval(function(){
			if(index==aLi.length-1){
				index=0;
			}else{
				index++;
			}

			z_Index++;
			aLi[index].style.zIndex=z_Index;
			aLi[index].style.opacity=0;
			startMove(aLi[index],{'opacity':100});  
		},1000);
	}

	oPrev.onclick=function(){
		clearInterval(timer);
		if(index==0){
			index=aLi.length-1;
		}else{
			index--;
		}

		z_Index++;
		aLi[index].style.zIndex=z_Index;
		aLi[index].style.opacity=0;
		startMove(aLi[index],{'opacity':100});

		autoPlay();
	}

	oNext.onclick=function(){
		clearInterval(timer);
		if(index==aLi.length-1){
			index=0;
		}else{
			index++;
		}

		z_Index++;
		aLi[index].style.zIndex=z_Index;
		aLi[index].style.opacity=0;
		startMove(aLi[index],{'opacity':100});  
		
		autoPlay();
	}

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover=function(){
			clearInterval(timer);
		}
		aLi[i].onmouseout=function(){
			autoPlay();
		}
	};


	/*footerSearch 隐藏的下拉框*/
	var oFtSearch=document.getElementById('footerSearch');
	var oFtChoose=getByClassName(oFtSearch,'ftChoose')[0];  //span
	var oFtChoosePop=getByClassName(oFtSearch,'ftChoosePop')[0];  //隐藏的下拉框

	oFtChoose.onmouseover=function(){
		oFtChoosePop.style.display='block';
	}
	oFtChoose.onmouseout=function(){
		oFtChoosePop.style.display='none';
	}

	/*微信图片显示*/
	var oWxin = document.getElementById('footer').getElementsByTagName('dl')[3].getElementsByTagName('dd')[3];
	var oWxinImg = oWxin.children[0];

	oWxin.onmouseover=function(){
		oWxinImg.style.display='block';
	}
	oWxin.onmouseout=function(){
		oWxinImg.style.display='none';
	}

	/*原创推荐列表*/
    /*var data;       //这个是全局变量，属于原创推荐列表部分数据
    var num=0;

	var xhr='';
	//创建Ajax对象
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveObject('Microsoft.XMLHTTP');
	}
	//连接服务器
	xhr.open('GET','data/dllist.json',true);
	//发送请求
	xhr.send(null);
	//接收返回
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){

			data=eval(xhr.responseText)
            //console.log(data)
			fnSucc();

			//创建li 翻页的num
			var oPageList=document.getElementById('page').getElementsByTagName('ul')[0];

			for (var i = 0; i <data.length/24 ; i++) {     //data.length/24
				var oLi=document.createElement('li');
					oLi.innerHTML=i+1;

				oPageList.appendChild(oLi);
				if(i==0){
					oLi.className='active';
				}   
			}

			//单个页数跳转按钮
			var aList=oPageList.children;
			for (var j = 0; j < aList.length; j++) {
				aList[j].index=j;
					
				aList[j].onclick=function(){
					num=this.index;
					console.log(this.index+" "+num)
					//console.log(this.index)
					fnSucc();
					for (var i = 0; i < aList.length; i++) {
						aList[i].className='';
					};
					this.className='active';

                    //oPrev的隐藏与显示(n=0时隐藏)
					if(num!=0){
                        oPrev.style.display = 'block';
                    }else{
                        oPrev.style.display = 'none';
                    }
				}
			};
		}
	}

	//上一页和下一页按钮
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
    //oPrev初始化隐藏
	oPrev.style.display = 'none';
	oPrev.onclick=function(){
        console.log("oPrev:"+num)
		if(num==0){
            oPrev.style.display = 'none';    
			return false;
		}else{
			num--;
		}

		fnSucc();
		classNameChange();
		
	}

	oNext.onclick=function(){
        oPrev.style.display = 'block';
		var page = Math.ceil(data.length/24);
        console.log("oNext:"+num)
		if(num==page-1){
			return false;
		}else{
			num++;
		}

		fnSucc();
		classNameChange();
	}

    function fnSucc(){

        //console.log(data.length);    //数据无误

        var html='';

        for(var i=num*24;i<(num+1)*24;i++){
            if(i<data.length){
                html+='<dl><dt><img src="'+data[i].url+'" alt=""></dt><dd><div class="msg"><h4 class="title">'+data[i].title+'</h4><p class="type"><strong>'+data[i].classify+'</strong><span>'+data[i].sort+'</span></p><p class="time">'+data[i].time+'</p><p class="moods"><span><i>'+data[i].tip_moods+'</i>/人气</span><span><i>'+data[i].tip_comment+'</i>/评论</span><span><i>'+data[i].tip_recom+'</i>/推荐</span></p><p class="author"><a href="#" class="name">'+data[i].name+'</a><img src="'+data[i].src+'" alt=""></p></div></dd></dl>'
            }
        }

        var oBox = document.getElementById('list');
        var oListBox = getByClassName(oBox,'list')[0];
        //console.log(html)

        oListBox.innerHTML=html;
    }

    function classNameChange(){
        var aList=document.getElementById('page').getElementsByTagName('ul')[0].children;
        for (var i = 0; i < aList.length; i++) {
            aList[i].className='';
        };
        aList[num].className='active';
    }*/



	/*designer部分数据加载*/
	Ajax('data/designer.json',function(str){
		var data=eval(str);
		//console.log(data);    //数据无误

		var html ='';

		for(var i=0;i<data.length;i++){
				html+='<li><a href="#" class="left"><img src="'+data[i].src+'" alt=""></a><p class="right"><a href="#">'+data[i].name+'</a><br>'+data[i].about+'<br>粉丝：'+data[i].moods+' / 作品：'+data[i].work+'</p></li>'
			
		}

		var oIndexDownBox = document.getElementById('indexDownBox');
		var oListUl = oIndexDownBox.getElementsByTagName('ul');
		var oReDesigner = oListUl[0];
		var oAcDesigner = oListUl[1];

		//console.log(html)

		oReDesigner.innerHTML=html;
		oAcDesigner.innerHTML=html;
	});

	/*jobIndex数据加载*/
	Ajax('data/jobIndex.json',function(str){
		var data=eval(str);
		//console.log(data);    //数据无误

		var html ='';

		for(var i=0;i<16;i++){
				html+='<li><a href="#">'+data[i].job+'</a></li>'
			
		}

		var oIndexDownBox = document.getElementById('indexDownBox');
		var oJobMsg = getByClassName(oIndexDownBox,'jobIndex')[0];

		//console.log(html)

		oJobMsg.innerHTML=html;
		
	});

	/*goTop*/
	var oGoTop=document.getElementById('goTop');
	
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop=document.body.scrollTop;

		if(scrollTop==0){
			oGoTop.style.display='none';
		}else{
			oGoTop.style.display='block';
		}

		oGoTop.onclick=function(){

			document.documentElement.scrollTop=document.body.scrollTop=0;
		}
	}


$(function(){
	//alert(1)			//55

	$.ajax({
		url:'data/test2.json',
		type:'get',
		datatype:'json',
		success:function(data){
			
			console.log(data.length)
			var showNum = 24;
			var pagNum = Math.ceil(data.length/showNum)

			$('.pageList').pagination(100,{
                num_edge_entries: 2, //边缘页数
                num_display_entries: 5, //主体页数
                items_per_page: 1, //每页显示1项
                prev_show_always:false,
                next_show_always:false,
                prev_text: "<",
                next_text: ">",
                callback:function(index){
           
                	var html = '';


                	for(var i=index*showNum;i<(index+1)*showNum;i++){
			            if(i<data.length){
			                html+='<dl><dt><img src="'+data[i].url+'" alt=""></dt><dd><div class="msg"><h4 class="title">'+data[i].title+'</h4><p class="type"><strong>'+data[i].classify+'</strong><span>'+data[i].sort+'</span></p><p class="time">'+data[i].time+'</p><p class="moods"><span><i>'+data[i].tip_moods+'</i>/人气</span><span><i>'+data[i].tip_comment+'</i>/评论</span><span><i>'+data[i].tip_recom+'</i>/推荐</span></p><p class="author"><a href="#" class="name">'+data[i].name+'</a><img src="'+data[i].src+'" alt=""></p></div></dd></dl>'
			            }
			        }
			        //console.log(html)
			       $('#list .list').html(html)
                }
            })
		}
	})
})

	
	function fnSucc(){

        //console.log(data.length);    //数据无误

        var html='';

        for(var i=num*24;i<(num+1)*24;i++){
            if(i<data.length){
                html+='<dl><dt><img src="'+data[i].url+'" alt=""></dt><dd><div class="msg"><h4 class="title">'+data[i].title+'</h4><p class="type"><strong>'+data[i].classify+'</strong><span>'+data[i].sort+'</span></p><p class="time">'+data[i].time+'</p><p class="moods"><span><i>'+data[i].tip_moods+'</i>/人气</span><span><i>'+data[i].tip_comment+'</i>/评论</span><span><i>'+data[i].tip_recom+'</i>/推荐</span></p><p class="author"><a href="#" class="name">'+data[i].name+'</a><img src="'+data[i].src+'" alt=""></p></div></dd></dl>'
            }
        }

        var oBox = document.getElementById('list');
        var oListBox = getByClassName(oBox,'list')[0];
        //console.log(html)

        oListBox.innerHTML=html;
    }


