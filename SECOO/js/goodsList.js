/*****

		商品列表页(goodsList)部分js
	
*****/

//请求从index.html(主页)加载网页头部和尾部以及头部js

$(function(){

	
	
	$('.headerWarp').load('index.html #header',function(){
		$.getScript('js/headerConment.js');
	});
	$('.footerWarp').load('index.html .footer');

})






/*****

		商品列表页加载对应的数据

*****/

$(function(){
	

if($.cookie('gdtype')){

	//读取参数（gdtype）并加载对应商品   0~11
	var index = $.cookie('gdtype');

	//console.log(index);    55

	$.ajax({

		url:'data/goodsData.json',
		type:'get',
		success:function(res){

			//console.log(res);   		//cs  55

			document.title = '寺库-'+res[index].title;			//页面标题修改

			var list = '';
			/***
				data-id作为商品唯一标识
				<input type="hidden"/>中的val存商品剩余数量
			**/
			for (var j = 0; j <res[index]["list"].length; j++) {
						
				list += '<li><div class="img-box"><a href="item.html?id='+res[index]["list"][j]["ID"]+'" target="_blank" class="goItem"><img src="'+res[index]["list"][j]["src"]+'"></a><span><img src="images/sold.png"></span></div><p class="name-box"><a href="item.html?id='+res[index]["list"][j]["ID"]+'" target="_blank" class="goItem" data-id="'+res[index]["list"][j]["ID"]+'">'+res[index]["list"][j]["name"]+'</a></p><p class="price-box clearfix"><span class="price1"><i>¥</i>'+res[index]["list"][j]["price"]+'</span><span class="price2"></span></p><input type="hidden" name="num" value="'+res[index]["list"][j]["num"]+'"></li>'

			};

		var	html = '<div class="data"><div class="m-tit" id="tit0"><i class="l-suq"></i><i class="r-suq"></i><span><i class="l-suq"></i><b class="tit">'+res[index].title+'</b><i class="r-suq"></i></span></div><div class="goodsList"><ul class="clearfix">'+list+'</ul></div></div>';

			//var oDiv = $(html)
			//console.log(html)
			$('.main2').html(html);




			//console.log($('.goItem'))
			/****

					设置商品信息的cookie 点击跳转详情页（item.html）

					cookie名 => GoodsMsg   商品信息

			****/
			$('.goodsList').find('li').on('click',setGoodsMsg)

			function setGoodsMsg(){

				var img = $(this).find('.goItem img').attr('src');
				var count = 1; 
				var id = $(this).find('.name-box .goItem').attr('data-id');	
				var num = $(this).find('input').val();
				var name = $(this).find('.name-box .goItem').text();
				var price = $(this).find('.price-box .price1').text()
					price = price.substring(1);
				//console.log(img+" "+num+" "+name+" "+price)     55

				var str = '{"imgSrc":"'+img+'","num":"'+num+'","name":"'+name+'","price":"'+price+'","id":"'+id+'","count":"'+count+'"}'

				//console.log(str)
				$.cookie('GoodsMsg',str,{expires:7,path:'/'});
				//console.log(JSON.parse($.cookie('GoodsMsg')))
			}



		}
	})
}

})





//backTop
$(function(){

	$(window).scroll(function(){

		var top = $('body').scrollTop();
		//console.log(top)

		if(top>=600){
			$('.backTop').show();
		}else{
			$('.backTop').hide();
		}

		$('.backTop').hover(function() {

			$(this).addClass('hover');
			$(this).click(function(){

				$('html,body').stop().animate({scrollTop:0},700)
				$('.backTop').hide();

			})
		}, function() {

			$(this).removeClass('hover');

		});

	})

})

