/*****

	 -------MALL商城数据加载--------
   --------加载到goodsList页面--------

*****/


$(function(){

	$.ajax({
		url:'data/MALL.json',
		type:'get',
		dataType:'json',
		success:function(data){

			//console.log(data);		55

			for (var i = 0; i < data.length; i++) {
				create(i,data)
			};

			//console.log($('.goods-list').find('item-first'))

			$('.goods-list').find('.item-first').click(function(){

				//alert(1)				cs 55

				//goodstype = $(this).parent().attr('id');

				//以gdstype作为加载json的index  (0~11)

				$.cookie('gdtype',$(this).parent().attr('id'),{expires:7,path:'/'});
				
				if($.cookie('gdtype')){

					open('goodsList.html','_blank');

				}	
			})	
			
				
		}
	})

})

$(function(){


	/***
		-----goodsData.json-----
	***/

	/*
			0 => 包袋
			1 => 腕表
			2 => 服装
			3 => 鞋靴
			4 => 配饰
			5 => 首饰
			6 => 生活居家
			7 => 户外运动
			8 => 美妆成人
			9 => 母婴玩具
			10 => 中国精品
			11 => 豪车
	*/

	//通过地址后的参数跳转 goodstype=>0~11

	$('.head_nav').find('a').click(function(){

		var str = $(this).attr('href');
		var n = str.indexOf('=')+1;
		var m = str.indexOf('&')+1;
		var p = str.substring(n,m-1);
		var q = str.substring(m+2);

		$.cookie('goodstype','[{p:"'+p+'",q:"'+q+'"}]',{expires:7,path:'/'});
		
	})

	//侧边栏的跳转
	$('.floatList').find('a').click(function(){

		var str = $(this).attr('href');
		var n = str.indexOf('=')+1;
		var m = str.indexOf('&')+1;
		var p = str.substring(n,m-1);
		var q = str.substring(m+2);

		$.cookie('goodstype','[{p:"'+p+'",q:"'+q+'"}]',{expires:7,path:'/'});

	})



})
	
	//获取a链接地址后的参数
	function getArg(){

		var str = $(this).attr('href');
		var n = str.indexOf('=')+1;
		var m = str.indexOf('&')+1;
		var p = str.substring(n,m-1);
		var q = str.substring(m+2);
		alert(1)
		$.cookie('goodstype','[{p:"'+p+'",q:"'+q+'"}]',{expires:7,path:'/'});
	}

	function create(i,data){
		var html = '';

		html = '<div class="section"><ul class="goods-list clearfix" id="'+data[i].ID+'"><li class="item-first"><a href="javascript:;" target="_blank"><img src="'+data[i].imgsrc[0]+'"/><div class="text-con"><h2>'+data[i].textcon[0].tit+'</h2><span>'+data[i].textcon[0].msg+'</span></div></a></li><li class="item-big"><a href="'+data[i].textcon[1].link+'" target="_blank" class="small"><div class="text-con"><h3>'+data[i].textcon[1].tit+'</h3><p>'+data[i].textcon[1].msg+'</p></div><img src="'+data[i].imgsrc[1]+'"/></a></li><li><a href="'+data[i].textcon[2].link+'" target="_blank" class="small"><div class="text-con"><h3>'+data[i].textcon[2].tit+'</h3><p>'+data[i].textcon[2].msg+'</p></div><img src="'+data[i].imgsrc[2]+'"/></a></li><li><a href="'+data[i].textcon[3].link+'" target="_blank" class="small"><div class="text-con"><h3>'+data[i].textcon[3].tit+'</h3><p>'+data[i].textcon[3].msg+'</p></div><img src="'+data[i].imgsrc[3]+'"/></a></li><li class="item-t"><a href="'+data[i].textcon[4].link+'" target="_blank" class="small"><div class="text-con"><h3>'+data[i].textcon[4].tit+'</h3><p>'+data[i].textcon[4].msg+'</p></div><img src="'+data[i].imgsrc[4]+'"/></a></li><li class="item-t"><a href="'+data[i].textcon[5].link+'" target="_blank" class="small"><div class="text-con"><h3>'+data[i].textcon[5].tit+'</h3><p>'+data[i].textcon[5].msg+'</p></div><img src="'+data[i].imgsrc[5]+'"/></a></li></ul></div></div>'; 

		var oFloor = $(html);
		$('.mall').eq(data[i].ID).append(oFloor)

		//商品楼层
		$('.mall li').find('a').click(function(){

			var str = $(this).attr('href');
			var n = str.indexOf('=')+1;
			var m = str.indexOf('&')+1;
			var p = str.substring(n,m-1);
			var q = str.substring(m+2);
		
			$.cookie('goodstype','[{p:"'+p+'",q:"'+q+'"}]',{expires:7,path:'/'});
			
		})
	}





