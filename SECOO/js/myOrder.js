/*****

		此文件为myCart(我的订单)页面的JS部分

*****/

//请求从index.html(主页)加载网页头部和尾部以及头部js
$(function(){

	$('.headerWarp').load('index.html #header',function(){
		$.getScript('js/headerConment.js');
	});
	$('.footerWarp').load('index.html .footer');

})

$(function(){

	//网站订单和门站订单的Tab切换
	$('.orederTabs').children().click(function(event) {

		$(this).addClass('on').siblings().removeClass('on');
		
	});

	//select-box下的ul显示与隐藏
	$('.select-box').hover(function() {

		$(this).find('.select_x').addClass('on');
		$(this).find('.select_c').stop().slideDown();

		//li的选中赋值给.select_x
		var aLi = $(this).find('.select_c').children();
		aLi.click(function(event) {

			$(this).parent().prev().text($(this).text());
			$(this).parent().hide();

		});
	}, function() {

		$(this).find('.select_x').removeClass('on');
		$(this).find('.select_c').stop().slideUp();

	});


	$('.dd-select').click(function(event) {
		if($(this).attr('class').indexOf('on')!=-1){

			$(this).removeClass('on');
			$('.order-info-cx').hide();

		}else{

			$(this).addClass('on');
			$('.order-info-cx').show();

		}
	});

	$('.left').find('dd').click(function(){

		$(this).addClass('on').siblings().removeClass('on')

	})
	

})
