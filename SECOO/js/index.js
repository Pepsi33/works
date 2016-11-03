

$(function(){

	//alert(1)      55
	
	//加载主页商品(MALL楼层)数据
	$.getScript('js/MALL.js');

	//购物车商品数量的更新
	sc_cart()

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



	/*****焦点图部分*****/

	var index = 0;
	var $aBtn = $('#banner .control').children();	//大图下的小按钮
	var $aLi = $('#banner ul').children()			//获取li
	var timer = null;

	function autoPlay(){
		//console.log("timer:"+index)
		if(index==$aLi.length-1){

			index = 0;

		}else{

			index++;

		}

		move();

	}

	timer = setInterval(autoPlay,3000);
	

	function move(){

		var $aLi = $('#banner ul').children().eq(index);

		//还原位置
		$aLi.find('.bigImg').css('marginLeft','-445px');
		$aLi.find('.smImg').css('marginLeft','175px')

		$aBtn.eq(index).addClass('select').siblings().removeClass('select');

		//li的淡入淡出
		$aLi.stop().fadeIn().siblings().stop().fadeOut();
		
		//图片1和图片2的运动
		$aLi.find('.bigImg').stop().animate({

			marginLeft:'-430px'

		},800).siblings().stop().animate({

			marginLeft:'160px'

		},800);

	}
	//大图下的小按钮鼠标移入移出
	$aBtn.mouseenter(function() {

		clearInterval(timer);
		index = $(this).index();
		move();

	});

	$aBtn.mouseleave(function() {

		clearInterval(timer);
		timer = setInterval(autoPlay,3000);

	});

	//焦点图划入划出事件，划入左右按钮显示，划出隐藏
	$('#banner').hover(function() {

		clearInterval(timer);
		$(this).find('.moveBtn').fadeIn();

	}, function() {
		clearInterval(timer);
		timer = setInterval(autoPlay,3000);
		$(this).find('.moveBtn').fadeOut();
	});

	//左右按钮点击事件
	$('.move_left').click(function(){

		clearInterval(timer);

		if(index==0){
			index = $aLi.length-1;
		}else{
			index--;
		}

		move();

	})

	$('.move_right').click(function(){

		clearInterval(timer);

		if(index==$aLi.length-1){
			index = 0;
		}else{
			index++;
		}

		move();

	})

})

//隐藏的我的寺库和客户服务div
$(function(){

		$('#mySecoo').hover(function() {
			$(this).find('i').css('color','#463b7f');
			$(this).addClass('active')
			$('.mySecoo').slideDown(200);
			$('.Chead-Service').css('display','none')
		}, function() {
			$(this).find('i').css('color','#999');
			$(this).removeClass('active')
			$('.mySecoo').slideUp(200);
		});


		$('#Chead-Service').hover(function() {
			$(this).find('i').css('color','#463b7f');
			$(this).addClass('active')
			$('.Chead-Service').slideDown(200);
			$('.mySecoo').css('display','none')
		}, function() {
			$(this).find('i').css('color','#999');
			$(this).removeClass('active')
			$('.Chead-Service').slideUp(200);
		});


		//侧边栏dd显示与隐藏
		$('.showList').find('dl').mouseenter(function(event) {
			$(this).find('dd').css('display','block')
			$(this).siblings().find('dd').css('display','none')
		});
		$('.showList').mouseleave(function(event) {
			$(this).find('dd').css('display','none')
		});
	
})



//cookie存在客户登录状态
$(function(){

	if($.cookie('userName')){
		
		//console.log($.cookie('userName'))
		$('#userName').text($.cookie('userName'));

		$('#beforeLogin').hide();
		$('#afterLogin').show();		
		$('#mySecoo').show();	
	}else{

		$('#beforeLogin').show();
		$('#afterLogin').hide();
		$('#mySecoo').hide();
	}


	//退出按钮
	$('#del').click(function(){

		$('#beforeLogin').show();
		$('#afterLogin').hide();
		$('#mySecoo').hide();
		$.cookie('userName',null);
		$.cookie('userName',null,{path:'/'});

	})

})

/***brand-logo中的滑动效果***/
$(function(){

	$('.bd').find('a').hover(function() {
		$(this).children().eq(0).stop().animate({left:'-50px'}).next().stop().animate({right:'0'},300)
	}, function() {
		$(this).children().eq(0).stop().animate({left:'0'}).next().stop().animate({right:'-90px'},300)
	});

})


/****slide-m网页底部的轮播****/
$(function(){

	var oUl = $('.slide-con').get(0);
		oUl.innerHTML+=oUl.innerHTML;

	var l = -$('.slide-con').width()/2;
		$('.slide-con').css('left',l);

	var timer = null;

	var dir = '+=230px';

	timer = setInterval(function(){

		autoPlay(dir)

	},1000);

	function autoPlay(dir){

		if(parseInt($('.slide-con').css('left'))>=0){
			
			$('.slide-con').css('left',l);

		}else if(parseInt($('.slide-con').css('left'))<=l){
			$('.slide-con').css('left','0');
		}
		$('.slide-con').stop().animate({left:dir},'fast');
	}

	//li上鼠标移入移出事件
	$('.slide-con').children().hover(function() {

		clearInterval(timer);

	}, function() {

		timer = setInterval(function(){

		autoPlay(dir)
		
	},1000);

	});

	//向左按钮
	$('.prev').hover(function() {

		$(this).css('opacity','1');
		clearInterval(timer);
		$(this).click(function(){
			clearInterval(timer);
			dir = '-=230px';
			autoPlay(dir);
		})

	}, function() {

		$(this).css('opacity','0.5');
		timer = setInterval(function(){

			autoPlay(dir)
			
		},1000);

	});

	//向右按钮
	$('.next').hover(function() {

		$(this).css('opacity','1');
		clearInterval(timer);
		$(this).click(function(){
			clearInterval(timer);
			dir = '+=230px';
			autoPlay(dir);
		})

	}, function() {

		$(this).css('opacity','0.5');
		timer = setInterval(function(){

			autoPlay(dir)
			
		},1000);

	});
})


/*****楼层栏部分*****/
$(function(){

	$(window).scroll(function(){

		var top = $('body').scrollTop();
		//console.log(top)

		//右边楼梯层的显示与隐藏
		if((450<=top)&&(top<7200)){
			$('.toTop').fadeIn();
			change()
		}else{
			$('.toTop').fadeOut();
		}

		
		//console.log($('body').scrollTop())

		//悬浮的搜索框
		if(top>=550){
			$('#header').children().eq(2).addClass('fixedOn')
			.removeClass('searchBer').css('display','block')
		}else{
			$('#header').children().eq(2).addClass('searchBer')
			.removeClass('fixedOn')
		}


		//右边楼梯层
		var aLi = $('.togo').find('ul').children();

		aLi.hover(function() {

			$(this).addClass('act').siblings().removeClass('act')

			$(this).click(function(){

				var n = $(this).index();
				
				$('body').scrollTop($('.floor').not('.floor01').eq(n).offset().top-75);

			})
		}, function() {

			$(this).removeClass('act');

		});


		//backTop
		//返回顶部按钮的显示与隐藏
		if(top>=500){
			$('.backTop').show();
		}else{
			$('.backTop').hide();
		}

		$('.backTop').hover(function() {

			$(this).addClass('hover');
			$(this).click(function(){
				
				$('html,body').stop().animate({scrollTop:0},700);
				$(this).hide();
			})

		}, function() {

			$(this).removeClass('hover');

		});

	})

	function change(){
		var top = $('body').scrollTop();

		if((520<=top)&&(top<1300)){				//全球购
			$('.fs01').addClass('active').siblings().removeClass('active');
			
		}else if((1300<=top)&&(top<2000)){		//闪购
			$('.fs02').addClass('active').siblings().removeClass('active');
		}else if((2000<=top)&&(top<2400)){		//我拍我卖
			$('.fs03').addClass('active').siblings().removeClass('active');
		}else if((2400<=top)&&(top<2800)){		//包袋
			$('.fs04').addClass('active').siblings().removeClass('active');
		}else if((2800<=top)&&(top<3200)){		//腕表
			$('.fs05').addClass('active').siblings().removeClass('active');
		}else if((3200<=top)&&(top<3600)){		//服装
			$('.fs06').addClass('active').siblings().removeClass('active');
		}else if((3600<=top)&&(top<4000)){		//鞋靴
			$('.fs07').addClass('active').siblings().removeClass('active');
		}else if((4000<=top)&&(top<4400)){		//配饰
			$('.fs08').addClass('active').siblings().removeClass('active');
		}else if((4400<=top)&&(top<4800)){		//首饰
			$('.fs09').addClass('active').siblings().removeClass('active');
		}else if((4800<=top)&&(top<5200)){		//生活居家
			$('.fs10').addClass('active').siblings().removeClass('active');
		}else if((5200<=top)&&(top<5600)){		//户外运动
			$('.fs11').addClass('active').siblings().removeClass('active');
		}else if((5600<=top)&&(top<6000)){		//美妆成人
			$('.fs12').addClass('active').siblings().removeClass('active');
		}else if((6000<=top)&&(top<6400)){		//母婴玩具
			$('.fs13').addClass('active').siblings().removeClass('active');
		}else if((6400<=top)&&(top<6800)){		//中国精品
			$('.fs14').addClass('active').siblings().removeClass('active');
		}else if((6800<=top)&&(top<7300)){		//豪车
			$('.fs15').addClass('active').siblings().removeClass('active');
		}
		
	}


		



	setInterval(function(){

		//商品倒计时   2016-11-23 10:00:00
	
		var nowTime = new Date()
		var dataTime = new Date($('.time').eq(0).attr('data-time'))

		//alert(dataTime)  //2016,11,23,10,0,0

		var t = (dataTime-nowTime)/1000;
		//console.log(t)
		var day = toTwo(Math.floor(t/86400));
		var hour = toTwo(Math.floor(t%86400/3600));
		var min = toTwo(Math.floor(t%86400%3600/60));
		var s = toTwo(parseInt(t%60));

		$('.time').find('.day').text(day)
		$('.time').find('.hour').text(hour)
		$('.time').find('.minute').text(min)
		$('.time').find('.second').text(s)

	},1000)

	function toTwo(x){

		return x>9?x:'0'+x;
	}

})




$(function(){

	//设置商品层跳转的参数   
	$('.floor').find('a').click(function(){

		var str = $(this).attr('href');

		
			var n = str.indexOf('=')+1;
			var m = str.indexOf('&')+1;
			var p = str.substring(n,m-1);
			var q = str.substring(m+2);

			$.cookie('goodstype','[{p:"'+p+'",q:"'+q+'"}]',{expires:7,path:'/'});
		
	})

})



$(function(){
	//alert(1)
	if($.cookie('goods')){
		//用购买商品模拟最近浏览商品
		var goods = eval($.cookie('goods'));
		//console.log(goods)

		var html = '';

		for (var i = 0; i < goods.length; i++) {
			
			html +='<li><a href="#"><img src="'+goods[i].img+'" alt="" width="48px" height="48px"></a></li>'

		};

		$('.BroswerProduct').html(html)

	}

})