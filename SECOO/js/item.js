/****

		---商品详情页JS部分---
		
****/


//请求从index.html(主页)加载网页头部和尾部以及头部js

$(function(){

	
	
	$('.headerWarp').load('index.html #header',function(){

		$.getScript('js/headerConment.js');

	});
	
	$('.footerWarp').load('index.html .footer');

})



$(function(){
	//放大镜部分
	$('#imgshow dt').hover(function() {

		$('.zoomspan').show();
		$('.zoomdiv').show();

		$(this).mousemove(function(event){
			
			var l = event.pageX-$(this).offset().left-$('.zoomspan').width()/2;
			var t = event.pageY-$(this).offset().top-$('.zoomspan').height()/2;

			if(l<0){
				l=0;
			}

			if(l>$('#imgshow dt').width()-$('.zoomspan').width()){
				l = $('#imgshow dt').width()-$('.zoomspan').width()
			}

			if(t<0){
				t = 0;
			}

			if(t>$('#imgshow dt').height()-$('.zoomspan').height()){
				t = $('#imgshow dt').height()-$('.zoomspan').height()
			}

			//console.log(l+" "+t)
			$('.zoomspan').css({
				"left":l,
				"top":t
			})

			var x = -Math.round(l*($('.zoomdiv .bigImg').width()-$('.zoomdiv').width())/($('#imgshow dt').width()-$('.zoomspan').width()))
			var y = -Math.round(t*($('.zoomdiv .bigImg').height()-$('.zoomdiv').height())/($('#imgshow dt').height()-$('.zoomspan').height()))


			//console.log(x+" "+y)

			$('.bigImg').css({
				"left":x,
				"top":y
			})

		})

	}, function() {
		$('.zoomspan').hide();
		$('.zoomdiv').hide();
	});

})


$(function(){

	//$('sr-nav ul').children().not('li:has('.toCart')')
	//商品详情区的导航条
	var aLi = $('.sr-nav ul').children().not("li:has('.toCart')")

	aLi.hover(function() {
		$(this).css('background','#7f69b3')
	}, function() {
		$(this).css('background','#333')
	});
	aLi.click(function(){

		$(this).addClass('select').siblings().removeClass('select')

	})

	//评论区的导航
	$('.dc-title ul').children().click(function(){

		$(this).addClass('on').siblings().removeClass('on')

	})


	//商品详情区的导航条
	$(window).scroll(function(){

		//console.log($(document).scrollTop())

		var top = $(document).scrollTop();

		if(top>=770&&top<=4100){

			$('.sr-nav').addClass('onFixed')

		}else{
			$('.sr-nav').removeClass('onFixed')
		}

		if(top>=4100&&top<=4100+$('.dc-bd').height()){

			$('.dc-title').addClass('onFixed')

		}else{

			$('.dc-title').removeClass('onFixed')
		}

		//返回顶部按钮的隐藏和显示
		if(top>=800){
			$('.fsFixedTop').show()
		}else{
			$('.fsFixedTop').hide()
		}

	})

	//二维码
	$('.fsFixedTop .app').hover(function() {

		$(this).find('span').show();

	}, function() {

		$(this).find('span').hide();

	});

	//回到顶部
	$('.fsFixedTop .backtop').click(function(){

		$('body').animate({scrollTop:0},700);

		$('.fsFixedTop').hide();

	})


})

//加载商品详情
$(function(){

	//读取商品信息
	if($.cookie('GoodsMsg')){

		var str = $.cookie('GoodsMsg');
		var obj = JSON.parse(str);

		console.log(obj)				//55
		document.title=obj.name

		var html = '';

		//模拟一下商品的小图
		smallPic()
		function smallPic(){

			for (var i = 0; i < 4; i++) {
			
				html+='<a href="javascript:;" class="smpic"><img src="'+obj.imgSrc+'" style="width: 80px;height: 80px;" /><i></i></a>'

			};

			$('#imgshow dd').append(html);

			$('.smpic').hover(function() {
				$(this).addClass('on').siblings().removeClass('on')
				$('#imgshow dt').find('img').attr('src',$(this).attr('src'))
			}, function() {
				$('.smpic').removeClass('on')
			});

		}


		$('#imgshow').find('img').attr('src',obj.imgSrc);	//商品图片路径
		$('.proName h2').text(obj.name);					//商品名
		$('.Dprice').text(obj.price);
		$('.proName').attr('data-id',obj.id);						//价格
		$('.num').text(obj.num)						
										

	}

	

	//详情栏图片
	$('.moudle-detail p').find('img').attr({

		'src':obj.imgSrc,
		'width':'500'

	})

})

//购物车操作
$(function(){

	regulation();				//选择商品数量执行函数
	
	$('#addCarInfo').on('click',buyGoods)			//购物车按钮绑定添加购物车事件
	$('.addToCart').on('click',buyGoods)

	function buyGoods(){

		var num = parseInt($('.numInp').val());		//添加购物车前选择的商品数目

		var same = false;
		var first = $.cookie('goods')==null?true:false;		//判断是否有cookie进行添加
		console.log(first)
		var obj = {									//当前商品数据

			img:$('#imgshow').find('img').attr('src'),
			count:parseInt($('.numInp').val()),
			id:$('.proName').attr('data-id'),   	
			num:$('.num').text(),
			name:$('.proName h2').text(),
			price:$('.Dprice').text()

		}

		console.log(obj)   //55

		
		if(first){

			
			var arr= [];
			arr.push(obj);
			var cookieStr = JSON.stringify(arr);
			$.cookie('goods',cookieStr);
			console.log(eval($.cookie('goods'))) 

		}else{

			var cookieArr = eval($.cookie('goods'));

			for(var attr in cookieArr){
				//遍历所有对象。如果id相同，让该商品数量递增 ;
				if(cookieArr[attr].id==obj.id){			

					cookieArr[attr].count = parseInt(cookieArr[attr].count)+parseInt(obj.count);
					if(cookieArr[attr].count>cookieArr[attr].num){
						cookieArr[attr].count = cookieArr[attr].num;
					}
					var CookieStr = JSON.stringify(cookieArr);
					$.cookie('goods',CookieStr);
					same = true;
				}
			}

			//如果id不同，则直接加入购物车数组中;
			if(!same){

				var cookieArr = eval($.cookie('goods'));

				cookieArr.push(obj);
				var CookieStr = JSON.stringify(cookieArr);
				$.cookie('goods',CookieStr);
			}

		}

		sc_cart();		//购物车商品数量的更新	

		$('.shbox').show();
		//console.log(eval($.cookie('goods')))    //55
		
	}

})


function regulation(){

	//商品数量加减
	var num = parseInt($('.numInp').val());
	var maxNum = parseInt($('.num').text())

	$('.up').click(function(){
		
		if(num>=maxNum){
			num=maxNum
		}else{
			num++;
		}
		$('.numInp').val(num)
	})
	
	$('.down').click(function(){

		if(num<=1){
			num=1
		}else{
			num--
		}
		$('.numInp').val(num)
	})


	$('.numInp').blur(function(){

		if(parseInt($(this).val())>maxNum){

			$(this).val(maxNum)
		}else if(parseInt($(this).val())<=0){
			$(this).val('1')
		}

	})
}

//购物车商品数量的更新
function  sc_cart(){

	var sc_str = $.cookie('goods');
		if(sc_str){					//如果购物车$.cookie('goods')不为空。
			var sc_obj = eval(sc_str);
			var sc_num = 0 ; 
			for(var i in sc_obj){

				sc_num = Number(sc_obj[i].count) + sc_num;
			}

			$('.carNum').html('('+sc_num+')');
		}

}


$(function(){

	//添加购物车成功的弹出层关闭
	$('.shbox .closebox').click(function(){

		$('.shbox').hide();

	})
	//收藏成功的弹出层关闭
	$('.clbox .closebox').click(function(){

		$('.clbox').hide();

	})

})