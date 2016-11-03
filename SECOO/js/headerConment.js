/****

		
		主页头部js部分，供其他页面通过Ajax加载


*****/

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
	
})



//cookie存在 客户则为登录状态  以及  更新头部购物车里的商品数量
$(function(){

	//更新头部购物车里的商品数量
	sc_cart()

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


	//退出按钮删除cookie 隐藏登录信息
	$('#del').click(function(){

		$('#beforeLogin').show();
		$('#afterLogin').hide();
		$('#mySecoo').hide();
		$.cookie('userName',null);
		$.cookie('userName',null,{path:'/'});

	})


	//侧边商品栏的显示与隐藏函数	
	$('.showList').css('display','none');

	$('.all').mouseenter(function(event) {
		$('.showList').css('display','block')
		$('.showList').find('dl').hover(function() {
			$(this).find('dd').css('display','block')
		}, function() {
			$(this).find('dd').css('display','none')
		});
	});
	$('#floatList').mouseleave(function(event) {
		$('.showList').css('display','none')
	});


	//通过地址后的参数跳转 goodstype=>0~11 	

	$('.head_nav').find('a').click(function(){
		
		getArg()

	})

	//侧边栏的跳转
	$('.floatList').find('a').click(function(){

		getArg()

	})


	
})


	//获取a链接地址后的参数
	function getArg(){
		
		var str = $(this).attr('href');
		var n = str.indexOf('=')+1;
		var m = str.indexOf('&')+1;
		var p = str.substring(n,m-1);
		var q = str.substring(m+2);

		$.cookie('goodstype','[{p:"'+p+'",q:"'+q+'"}]',{expires:7,path:'/'});
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



