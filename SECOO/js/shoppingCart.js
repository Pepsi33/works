/****

		---购物车页面（shoppingCart.html）JS---
	
****/

$(function(){

	//用户为登录状态加载用户名
	if($.cookie('userName')){

		$('.navLogin').show();
		$('.noLogin').hide();
		$('.userName').text($.cookie('userName'))

	}else{

		$('.navLogin').hide();

	}

	//退出删除用户名cookie  跳转登录页面
	$('.laout').click(function(){

		$.cookie('userName',null);
		$.cookie('userName',null,{path:'/'});
		window.location.href='login.html';

	})


	if($.cookie('goods')){

		//console.log(eval($.cookie('goods')))

		var goodsArr = eval($.cookie('goods'));

		var html = '';

		for (var i = 0; i < goodsArr.length; i++) {
			var n = parseInt(goodsArr[i].count)
			var price = parseInt(goodsArr[i].price)
			//console.log(typeof n)
			html +='<tr id="'+goodsArr[i].id+'" class="gdCode"><td><input type="checkbox" id="choseItem" class="checkBox" index="'+i+'"></td><td width="97" valign="top"><div class="cartPic fl"><a href="#" target="_blank"><img src="'+goodsArr[i].img+'" width="80" height="80"></a></div></td><td valign="top"><div class="cartName"><a href="#" target="_blank">'+goodsArr[i].name+'</a><p style="color: #999;">颜色：蓝色</p></div></td><td valign="top">中国大陆</td><td valign="top"><span class="rmb">￥</span>'+goodsArr[i].price+'</td><td valign="top"><div class="countNum"><a href="javascript:;" class="down fl" index="'+i+'">-</a><input type="text" value="'+goodsArr[i].count+'" class="num fl" index="'+i+'"><a href="javascript:;" class="up fl" index="'+i+'">+</a></div></td><td valign="top"><strong><span class="rmb">￥</span>'+n*price+'</strong><div>返利<i class="kb">'+5*goodsArr[i].count+'</i>库币</div></td><td valign="top"><a href="javascript:;" class="del">删除</a></td></tr>'
		};

		$('tbody').html(html);

		regulation()
		function regulation(){

			//商品数量加减
			var sc_num = parseInt($('.num').val())

			//商品数量加
			$('.cartTable').on('click','.up',function(){
				var id = $(this).parents('.gdCode').attr('id');
				var priceStr = $(this).parents('.gdCode').children('td').eq(4).text();
				priceStr = priceStr.replace('￥','');
				//console.log("id",id)
				//获取cookie
				var goods = eval($.cookie('goods'));
				var n = parseInt($(this).siblings('.num').val());
				var price = parseInt(priceStr);
				var priceSum = 0;
				//console.log(price)

				for(var key in goods){
					if(goods[key]['id']==id){
						if(goods[key]['num']<=n){
							n = goods[key]['num'];
						}else{
							n++;
						}
						$(this).siblings('.num').val(n);
						goods[key]['count'] = n;
						priceSum = price*n;			//点击金额小计和库币的更新
						$(this).parents('.gdCode').children('td').eq(6).children('div').html('返利<i class="kb">'+5*n+'</i>库币');
						$(this).parents('.gdCode').children('td').eq(6).children('strong').html('<span class="rmb">￥</span>'+priceSum);
					}
				}
				var cookieStr = JSON.stringify(goods);
				$.cookie('goods',cookieStr);
				sumPrice()   	//更新总价格
				sunNum();		//计算商品数量及库币
			});			

			//商品数量减
			$('.cartTable').on('click','.down',function(){
				var id = $(this).parents('.gdCode').attr('id');
				var priceStr = $(this).parents('.gdCode').children('td').eq(4).text();
				priceStr = priceStr.replace('￥','');
				//console.log("id",id)
				//获取cookie
				var goods = eval($.cookie('goods'));
				var n = parseInt($(this).siblings('.num').val());
				var price = parseInt(priceStr);
				var priceSum = 0;
				//console.log(price)

				for(var key in goods){
					if(goods[key]['id']==id){
						if(n<=1){
							n = 1;
						}else{
							n--;
						}
						$(this).siblings('.num').val(n);
						goods[key]['count'] = n;
						priceSum = price*n;			//点击金额小计和库币的更新
						$(this).parents('.gdCode').children('td').eq(6).children('div').html('返利<i class="kb">'+5*n+'</i>库币');
						$(this).parents('.gdCode').children('td').eq(6).children('strong').html('<span class="rmb">￥</span>'+priceSum);
					}
				}
				var cookieStr = JSON.stringify(goods);
				$.cookie('goods',cookieStr);
				sumPrice();				//计算总价格
				sunNum();				//计算商品数量及库币
			});

			//商品删除按钮
			$('.cartTable').on('click','.del',function(){
				//
				var id = $(this).parents('.gdCode').attr('id');
				var goods = eval($.cookie('goods'));
				for(var i=0; i<goods.length; i++){
					if(goods[i]['id']==id){
						goods.splice(i,1);
						$(this).parents('.gdCode').remove();
					}
				}
				var cookieStr = JSON.stringify(goods);
				$.cookie('goods',cookieStr);
			
				sumPrice();				//计算总价格
				sunNum();				//计算商品数量及库币
				nullCart();				//购物车是否为空
			});
		}

		//$('.choseAll').attr('checked',false);
		//单个选框绑定点击事件
		$('.cartTable').on('click','.checkBox',function(){

			//alert(1);

			check($(this));				//判断单选框是否全部选上（全部选中时复选框选中）

			sumPrice();					//计算总价格
			sunNum();					//计算商品数量及库币
			tdBgChange()				//被选中的商品栏的背景颜色变化
			styleChange()
	
		})

		//全选
		$('.choseAll').click(function(){
			//console.log($(this).is(':checked'))       55

			if($(this).is(':checked')){
				$('.choseAll').prop('checked',true)
				$('.checkBox').prop('checked',true)
				//$('.delSp').show();

			}else{
				$('.choseAll').prop('checked',false)
				$('.checkBox').prop('checked',false)
				//$('.delSp').hide();

			}

			sumPrice();					//计算总价格
			sunNum();					//计算商品数量及库币
			tdBgChange();				//被选中的商品栏的背景颜色变化
			styleChange()				//结算按钮的样式变化（可点击与不可点击） 删除选中商品选中商品按钮显示与隐藏
		})

		//删除选中商品
		$('.delSp').click(function(){

			$('.cartPop01').show();		//删除弹出层显示
			$('.cartPop01').find('.cbtn01').click(function(){	//确定按钮

				$('.cartPop01').hide();		//删除弹出层隐藏
				$('.delSp').hide();
				delGoods();					//删除选中的商品
				sumPrice();					//计算总价格
				sunNum();					//计算商品数量及库币
				nullCart();					//购物车是否为空
				

			})

			$('.cartPop01').find('.close').click(function(){	//取消按钮

				$('.cartPop01').hide();		//删除弹出层隐藏

			})
			

		})
	}

	nullCart();							//购物车是否为空
	
})


//计算所有商品总价格
function sumPrice(){
	
	var goods = eval($.cookie('goods'));
	var totalPrice = $('.totalPrice').find('strong');

	var ck = $('.checkBox');
	var sum = 0;				//总价格

	for (var i = 0; i < ck.length; i++) {
		
		if(ck.eq(i).is(':checked')){

			//allGoodsNum = 
			sum += goods[i].count*goods[i].price;
			

		}
		totalPrice.text(sum);

	};
}


//计算商品数量及库币
function sunNum(){
	var trNum = $('.gdCode');
	var num = 0;
	var kb = 0;
	//alert(trNum.length)
	for(var i=0; i<trNum.length; i++){
		//商品数量
		if(trNum.eq(i).find('.checkBox').is(':checked')){
			//alert(1);
			num += parseInt(trNum.eq(i).find('.num').val());
		}
		if(trNum.eq(i).find('.checkBox').is(':checked')){
			kb += parseInt(trNum.eq(i).find('.kb').text());
			console.log(parseInt(trNum.eq(i).find('.kb').text()))
		}
	}
	//console.log(kb);
	$('.cartPrice').find('p').eq(2).text('返利库币：'+kb+'库币')
	$('.cartPrice').find('p').eq(0).text('商品数量总计：'+num+'件');
}

//判断单选框是否全部选上（全部选中时复选框选中）
function check($this){
	
	var ck = $('.checkBox')
	var ckThis = $this.is(':checked');
	var checkAll = $('.choseAll')
	var ckAll = $('.choseAll').is(':checked');
	console.log(ckThis)
	console.log(ckAll)
	if(ckThis&&!ckAll){
		
		for (var i = 0; i < ck.length; i++) {

			if(!ck.eq(i).is(':checked')){

				checkAll.prop('checked',false); break;
			}

			if(i==ck.length-1){

				checkAll.prop('checked',true);

			}	
		}
	}else{

		checkAll.prop('checked',false);


	}
	
}

//删除选中的商品
function delGoods(){

	var ck = $('.checkBox');
	var goods = eval($.cookie('goods'));

	for (var i = 0; i < ck.length; i++) {
		if(ck.eq(i).is(':checked')){

			//ck.eq(i).parents('.gdCode').remove();
			//console.log(ck.eq(i).parents('.gdCode').attr('id'))

			for(var key in goods){

				if(goods[key].id==ck.eq(i).parents('.gdCode').attr('id')){
					goods.splice(key,1);
					ck.eq(i).parents('.gdCode').remove();
					//console.log(goods[key])

				}

			}

		}
	};
	var cookieStr = JSON.stringify(goods);
	$.cookie('goods',cookieStr);
	console.log(eval($.cookie('goods')))
}


//	被选中的商品栏的背景颜色变化 
function tdBgChange(){

	var ck = $('.checkBox')
	for (var i = 0; i < ck.length; i++) {
		if(ck.eq(i).is(':checked')){
			
			ck.eq(i).parents('.gdCode').addClass('checked');

		}else{
			
			ck.eq(i).parents('.gdCode').removeClass('checked');
		}
	};

}

/*结算按钮的样式变化（可点击与不可点击）
 删除选中商品选中商品按钮显示与隐藏*/
function styleChange(){
	var ck = $('.checkBox')
	for (var i = 0; i < ck.length; i++) {

		if(ck.eq(i).is(':checked')){

			$('.delSp').show();				//删除选中商品选中商品按钮显示
			$('.settle').removeClass('a02dis');break;

		}else{

			$('.delSp').hide();				//删除选中商品选中商品按钮隐藏
			$('.settle').addClass('a02dis')

		}
	}

}

//购物车是否为空=> nullCart与cart的显示与隐藏
function nullCart(){

	if(($('.gdCode').length==0)||(eval($.cookie('goods')).length==0)){

		$('.nullCart').show();
		$('.cart').hide();

	}else{

		$('.cart').show();
		$('.nullCart').hide()

	}

}





$(function(){

	//加载猜你喜欢部分的数据
	$.ajax({

		url:'data/goodsList.json',
		type:'get',
		datatype:'json',
		success:function(res){

			//console.log(res)     55
			moreProduct(res,56,71)

		}

	})

	
	$('.snext').click(function(){
		var l = parseInt($('.carousel01 ul').css('left'))
		
		$('.carousel01 ul').stop().animate({
			left:'-=920px'
		})
		$('.sprev').show()
		if(l<=-920){
			$(this).hide();
		}
	})

	$('.sprev').click(function(){

		var l = parseInt($('.carousel01 ul').css('left'))
		
		$('.carousel01 ul').stop().animate({
			left:'+=920px'
		})

		$('.snext').show()			

		if(l>=-920){
			$(this).hide()	
		}

	})


	$(window).scroll(function(){

		var top = $(document).scrollTop();

		if(top>70){

			$('.backTop').show();

		}else{

			$('.backTop').hide();

		}

		$('.backTop').click(function(){

			$('html body').stop().animate({scrollTop:0},500)

		})

	})

})


function moreProduct(data,n,m){

		var html = '';
		for (var i = n; i < m; i++) {
						
			html += '<li><div class="spic"><a href="#"><img src="'+data[i].src+'" alt=""></a></div><div class="sname"><a href="#">'+data[i].name+'</a></div><div class="sprice"><p><strong>'+data[i].price+'</strong>元</p></div></li>'
		};

		$('.list01 ul').html(html)
	}