/******

		此页面(list.html)为商品列表（可直接购买)的JS部分

	
*****/



//请求从index.html(主页)加载网页头部和尾部以及头部js

$(function(){

	$('.headerWarp').load('index.html #header',function(){
		$.getScript('js/headerConment.js');
	});
	$('.footerWarp').load('index.html .footer');

})


$(function(){

	//alert(1)    55

	//logo栏显示更多
	$('.logo_dl').find('.choice').click(function(){

		$('.logo_dl').find('.smallList').hide();
		$('.logo_dl').find('.bigList').show();
		$('.logo_dl').find('.brandChoice').show();


		//logo栏多选按钮  =>多选框和确定取消按钮出现
		$('.logo_dl').find('.brandmore').click(function(){

			$('.logo_dl').find('.search_brand_in').show();
			$('.logo_dl').find('.search_brand_btn').show();


			//ul中的li（logo）被选中
			$('.showlogo').children().click(function(){

				$('.logo_dl').find('.brand_sub').css({
					"cursor":"pointer",
					"background":"red",
					"color":"#fff"
				})

				var html = '';

				html = '<label><input class="the_select_val" type="checkbox" checked="">ARMANI COLLEZIONI</label>';
				var logoText = $(html);

				$(logoText).insertBefore($('.logo_dl').find('.brand_empty'))

			})

			//清空多选
			$('.logo_dl').find('.brand_empty').click(function(){

				$('.logo_dl').find('label').remove()

			})

			$('.logo_dl').find('.brand_can').click(function(){

				$('.logo_dl').find('.smallList').show();
				$('.logo_dl').find('.bigList').hide();
				$('.logo_dl').find('.brandChoice').hide();
				$('.logo_dl').find('.search_brand_in').hide();
				$('.logo_dl').find('.search_brand_btn').hide();

			})

		})

		$('.logo_dl').find('.brandChoice').click(function(){

				$('.bigList').hide();
				$('.smallList').show();
				$('.logo_dl').find('.search_brand_in').hide();
				$(this).hide();

			})

	})

	//control更多按钮
	$('.control').find('.open').click(function(){

		$(this).hide().siblings().show();


		$('.nonCritical').show();
		$('.nonCritical').find('.more').click(function(){

			$('.nonCritical').find('.search_brand_in').show();
			$('.nonCritical').find('.search_brand_btn').show();

			$('.nonCritical').find('.smallList').children().click(function(){

				$('.nonCritical').find('.brand_sub').css({
					"cursor":"pointer",
					"background":"red",
					"color":"#fff"
				});


				var html = '';

				html = '<label><input class="the_select_val" type="checkbox" checked="">'+$(this).text()+'</label>';
				var logoText = $(html);

				$(logoText).insertBefore($('.nonCritical').find('.brand_empty'))

			})

			//清空选择
			$('.nonCritical').find('.brand_empty').click(function(){

				$('.nonCritical').find('label').remove()

			})

		})

		$('.nonCritical').find('.brand_can').click(function(){

				
				$('.nonCritical').hide();
				$('.control').find('.open').show().siblings().hide();


				$('.nonCritical').find('.search_brand_in').hide();
				$('.nonCritical').find('.search_brand_btn').hide();

			})

	})

	//收起按钮
	$('.control').find('.put').click(function(){

		$(this).hide().siblings().show();
		$('.nonCritical').hide();
		$('.nonCritical').find('.search_brand_in').hide();
		$('.nonCritical').find('.search_brand_btn').hide();

	})

	//logo选中加黑色边框
	$('.showlogo').children().click(function(){

		$('.showlogo').children().find('a').removeClass('on');
		$(this).find('a').addClass('on')

	})


	//.product-control .btn ul li a（商品排序）选中样式控制
	$('.btn ul').children().click(function(){

		$('.btn ul').children().find('a').removeClass('on');
		$(this).find('a').addClass('on')

	})

	//.product-control .price（价格区间）鼠标移入移出
	$('.price').hover(function() {

		$(this).find('div').addClass('on');
	}, function() {

		$(this).find('div').removeClass('on');
	});


	//.product-control .search input搜索框
	$('.search input').focus(function(){

		if($(this).val()=='在结果中搜索'){

			$(this).val('')
		}	
	}).blur(function() {
		if($(this).val()==''){

			$(this).val('在结果中搜索')
		}
	});


	//价格区间搜索两个输入框的获得焦点和失去焦点事件
	$('.price input').focus(function(){

		$(this).addClass('customPr')
	}).blur(function() {

		if($(this).val()==''){
			$(this).removeClass('customPr')
		}else{
			$(this).addClass('customPr')
		}
	});

	//悬浮的控制栏
	$(window).scroll(function(){

		var top = $('body').scrollTop();
		//console.log(top)
		if(top>=800){

			$('.product-control').addClass('active')

		}else{
			$('.product-control').removeClass('active')
		}

		//回到顶部按钮的显示隐藏
		if(top>=400){
			$('.goTop').show()
		}else{
			$('.goTop').hide()
		}

		//回到顶部
		$('.goTop').click(function(){

			$('html,body').stop().animate({scrollTop:0},700);

		})

	})

	//商城和拍卖按钮的切换
	$('.product-tips').children().click(function(){

		$(this).addClass('on').siblings().removeClass('on')

	})

})


//最近浏览和畅销排行榜
$(function(){

	$.ajax({
		url:'data/goodsList.json',
		type:'get',
		datatype:'json',
		success:function(data){

			//初始化
			moreProduct(data,0,6)

			$('.product-more dt').children().mouseenter(function() {

				$(this).addClass('hover').siblings().removeClass('hover');
				
				if($(this).index()==0){

					moreProduct(data,0,6);
					
				}else{

					moreProduct(data,24,30);

				}

			});

		}
	})

	function moreProduct(data,n,m){

		var html = '';
		for (var i = n; i < m; i++) {
						
			html += '<li id="'+i+'"><div class="img"><a href="#"><img src="'+data[i].src+'"></a></div><div class="name"><a href="#">'+data[i].name+'</a></div><div class="price"><span><i>￥</i>'+data[i].price+'</span></div></li>'
		};

		$('.product-more dd ul').html(html)
	}

	//关闭底部评价
	$('.feed-close').click(function(){

		$('.bt-feed').hide();

	})

})



//加载商品并分页
$(function(){

	//读取cookie中参数
	var str = $.cookie('goodstype');

	//console.log(str)     
	var obj = eval(str)
	//console.log(obj)
	var p = obj[0].p;
	var q = obj[0].q;

	//console.log(p+"------"+q)

	//参数为all时加载全部
	if(p&&p=='all'){

			$.ajax({
			url:'data/goodsList.json',
			type:'get',
			datatype:'json',
			success:function(data){

				//console.log(data)   //55
				document.title='奢侈品【官网 正品 价格 图片】 - 寺库网'

				var showNum = 40;
				var pagNum = Math.ceil(data.length/showNum)

				$('.pagelist').pagination(3061,{
	                num_edge_entries: 1, //边缘页数
	                num_display_entries: 5, //主体页数
	                items_per_page: 1, //每页显示1项
	                prev_show_always:false,
	                next_show_always:true,
	                prev_text: "上一页",
	                next_text: "下一页",
	                callback:function(index){

	                	var index = index;   		//翻页的下标

	                	//翻页输入框的值跟随更新
	                	$('.page span b').text(index+1);	
	                	$('.assignPage').val(index+1);

	                	//console.log(index)

	                	create();

	                	function create(){

	                		var html = '';

		                	for(var i=index*showNum;i<(index+1)*showNum;i++){
					            if(i<data.length){
					                html+='<dl id="'+i+'"><dt><a href="item.html?id='+data[i]["ID"]+'" target="_blank" class="goItem"><img src="'+data[i]["src"]+'"></a></dt><dd class="dl_tips"><span class="s2">直降</span><span class="s2">NEW</span></dd><dd class="dl_name"><a href="item.html?id='+data[i]["ID"]+'" data-id="'+data[i]["ID"]+'" target="_blank" class="goItem">'+data[i]["name"]+'</a></dd><dd class="dl_price"><span><i>¥</i>'+data[i]["price"]+'</span></dd><dd class="add_cart"><a href="javascript:;" class="add-cart" index="'+i+'">加入购物车</a><span class="deal-cnt">仅剩'+data[i]["num"]+'件</span><span class="like"><i>收藏</i></span></dd></dl>'
					            }
					        }

					        $('.goodsList').html(html);
	                	};


						//.product-control框的翻页（向左）
						$('.page .prev').click(function(){

							//console.log(index)
							if(index==0){
								return false;
							}else{
								index--;
								create()
							}
							$('.page span b').text(index+1)

						});

						//.product-control框的翻页（向右）
						$('.page .next').click(function(){

							if(index==pagNum-1){
								return false;
							}else{
								index++;
								create();
							}
							console.log(index)
							$('.page span b').text(index+1)

						});

						//页数输入跳转
						$('.assign').click(function(){

							var num = parseInt($('.assignPage').val());
							console.log(typeof num)
							if((0<=num)&&(num<=pagNum)){

								index = num;
								create();

							}

						});

						//加入购物车--收藏按钮等的显示隐藏
						btnShowOrHide();

						//商品跳转详情页（item.html）设置cookie存储商品信息
						$('.goodsList').find('dl').on('click',setGoodsMsg);
						//购物车商品
						$('.goodsList .add_cart').on('click','.add-cart',buyGoods);
	                }

	            })
			}

		})

	}else if(p&&q==''){			//只有参数p(大类别)时加载

		$.ajax({
			url:'data/goodsData.json',  		//goodsData.json=>按大类别分
			type:'get',
			dataType:'json',
			success:function(data){

				//console.log(data[p])
				
				createTypeName()				//创建商品导航栏的类别名称

				function createTypeName(){

					var html = '<a href="#" target="_blank" class="type"><h1>'+data[p].type+'</h1><i></i></a>'

					$('.pageTitle').append(html)

				}

				typelisthover()			//鼠标移入移出隐藏的typelist显示与隐藏

				document.title="寺库网 -  "+data[p].type;

				var showNum = 40;
				var pagNum = Math.ceil(data[p]["list"].length/showNum)

				$('.pagelist').pagination(pagNum,{
	                num_edge_entries: 1, //边缘页数
	                num_display_entries: 5, //主体页数
	                items_per_page: 1, //每页显示1项
	                prev_show_always:false,
	                next_show_always:true,
	                prev_text: "上一页",
	                next_text: "下一页",
	                callback:function(index){

	                	var index = index;

	                	$('.page span b').text(index+1);
	                	$('.assignPage').val(index+1);

	                	//console.log(index)

	                	create();
	                	function create(){

	                		var html = '';
							for (var j = showNum*index; j <showNum*(index+1); j++) {

								if(j<data[p]["list"].length){

									html+='<dl id="'+j+'"><dt><a href="item.html?id='+data[p]["list"][j]["ID"]+'" target="_blank" class="goItem"><img src="'+data[p]["list"][j]["src"]+'"></a></dt><dd class="dl_tips"><span class="s2">直降</span><span class="s2">NEW</span></dd><dd class="dl_name"><a href="item.html?id='+data[p]["list"][j]["ID"]+'" data-id="'+data[p]["list"][j]["ID"]+'" target="_blank" class="goItem">'+data[p]["list"][j]["name"]+'</a></dd><dd class="dl_price"><span><i>¥</i>'+data[p]["list"][j]["price"]+'</span></dd><dd class="add_cart"><a href="javascript:;" class="add-cart" index="'+j+'">加入购物车</a><span class="deal-cnt">仅剩'+data[p]["list"][j]["num"]+'件</span><span class="like"><i>收藏</i></span></dd></dl>'
								}
							}

							$('.goodsList').html(html);
	                	}

	                	//.product-control框的翻页（向左）
						$('.page .prev').click(function(){

							console.log(index)
							if(index==0){
								return false;
							}else{
								index--;
								create()
							}
							$('.page span b').text(index+1)

						})
						//.product-control框的翻页（向右）
						$('.page .next').click(function(){

							if(index==pagNum-1){
								return false;
							}else{
								index++;
								create();
							}
							console.log(index)
							$('.page span b').text(index+1)


						})

						//页数输入跳转
						$('.assign').click(function(){

							var num = parseInt($('.assignPage').val());
							console.log(typeof num)
							if((0<=num)&&(num<=pagNum)){

								index = num;
								create();

							}

						})

						//加入购物车--收藏按钮等的显示隐藏
						btnShowOrHide();


						//商品跳转详情页（item.html）设置cookie存储商品信息
						$('.goodsList').find('dl').on('click',setGoodsMsg);
						//购物车商品
						$('.goodsList .add_cart').on('click','.add-cart',buyGoods);

	                }

	            })

			}
		})	

	}else if(p&&q){			//p(大类别=>如包袋)和q(大类别中的小类别=>LV)均存在加载

		$.ajax({
			url:'data/goodstype.json',   //goodstype.json   =>细分至每一种小类别
			type:'get',
			dataType:'json',
			success:function(data){

				//console.log(data[p][q])

				createTypeName()		//创建商品导航栏的类别名称

				function createTypeName(){

					var html = '<a href="#" target="_blank" class="type"><h1>'+data[p].type+'</h1><i></i></a><a href="#">'+q+'<span>&nbsp;></span></a>'

					$('.pageTitle').append(html)

				}

				typelisthover()			//鼠标移入移出隐藏的typelist显示与隐藏

				document.title="寺库网 -  "+data[p].type+" - "+q;

				var showNum = 40;
				var pagNum = Math.ceil(data[p][q].length/showNum)

				$('.pagelist').pagination(pagNum,{
	                num_edge_entries: 1, //边缘页数
	                num_display_entries: 5, //主体页数
	                items_per_page: 1, //每页显示1项
	                prev_show_always:false,
	                next_show_always:true,
	                prev_text: "上一页",
	                next_text: "下一页",
	                callback:function(index){

	                	var index = index;

	                	$('.page span b').text(index+1);
	                	$('.assignPage').val(index+1);

	                	create();
	                	//创建商品列表
	                	function create(){

	                		var html = '';
							for (var j = showNum*index; j <showNum*(index+1); j++) {

								if(j<data[p][q].length){

									html+='<dl id="'+j+'"><dt><a href="item.html?id='+data[p][q][j]["ID"]+'" target="_blank" class="goItem"><img src="'+data[p][q][j]["src"]+'"></a></dt><dd class="dl_tips"><span class="s2">直降</span><span class="s2">NEW</span></dd><dd class="dl_name"><a href="item.html?id='+data[p][q][j]["ID"]+'" data-id="'+data[p][q][j]["ID"]+'" target="_blank" class="goItem">'+data[p][q][j]["name"]+'</a></dd><dd class="dl_price"><span><i>¥</i>'+data[p][q][j]["price"]+'</span></dd><dd class="add_cart"><a href="javascript:;" class="add-cart" index="'+j+'">加入购物车</a><span class="deal-cnt">仅剩'+data[p][q][j]["num"]+'件</span><span class="like"><i>收藏</i></span></dd></dl>'
								}
							}

							$('.goodsList').html(html);
	                	}

	                	//.product-control框的翻页（向左）
						$('.page .prev').click(function(){

							console.log(index)
							if(index==0){
								return false;
							}else{
								index--;
								create()
							}
							$('.page span b').text(index+1)

						})

						//.product-control框的翻页（向右）
						$('.page .next').click(function(){

							if(index==pagNum-1){
								return false;
							}else{
								index++;
								create();
							}
							console.log(index)
							$('.page span b').text(index+1)


						})

						//页数输入跳转
						$('.assign').click(function(){

							var num = parseInt($('.assignPage').val());
							
							if((0<=num)&&(num<=pagNum)){

								index = num;
								create();

							}
						})

						//加入购物车--收藏按钮等的显示隐藏
						btnShowOrHide();

						//商品跳转详情页（item.html）设置cookie存储商品信息
						$('.goodsList').find('dl').on('click',setGoodsMsg);
						//购物车商品
						$('.goodsList .add_cart').on('click','.add-cart',buyGoods);


	                }

	            })

			}
		})

	}	
	
})


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

function buyGoods(){
	
	var same = false;
	var first = $.cookie('goods')==null?true:false;		//判断是否有cookie进行添加
	var dl = $('.goodsList dl').eq($(this).attr('index'))

	var obj = {

		img:dl.find('.goItem img').attr('src'),
		count:"1",
		id:dl.find('.dl_name .goItem').attr('data-id'),    	
		num:(dl.find('.deal-cnt').text()).charAt(2),
		name:dl.find('.dl_name .goItem').text(),
		price:(dl.find('.dl_price span').text()).substring(1)

	}
	//console.log(obj)   55

	if(first){

		var arr= [];
		arr.push(obj);
		var cookieStr = JSON.stringify(arr);
		$.cookie('goods',cookieStr);
		//console.log(eval($.cookie('goods'))) 

	}else{

		var cookieArr = eval($.cookie('goods'));

		for(var attr in cookieArr){
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			if(cookieArr[attr].id==obj.id){			

				cookieArr[attr].count = parseInt(cookieArr[attr].count)+1;
				if(cookieArr[attr].count>cookieArr[attr].num){
					alert("库存不足");
					return;
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
	//console.log(eval($.cookie('goods')))    55

	$('.shbox').show()
	
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


			/****

					设置商品信息的cookie 点击跳转详情页（item.html）

					cookie名 => GoodsMsg   商品信息

			****/

//商品跳转详情页（item.html）设置cookie存储商品信息
function setGoodsMsg(){				//设置cookie函数

	var img = $(this).find('.goItem img').attr('src');
	var count = 1;
	var id = $(this).find('.dl_name .goItem').attr('data-id');    	
	var num = ($(this).find('.deal-cnt').text()).charAt(2);
	var name = $(this).find('.dl_name .goItem').text();
	var price = ($(this).find('.dl_price span').text()).substring(1);

	//console.log(img+" "+num+" "+name+" "+price)     //55

	var str = '{"imgSrc":"'+img+'","num":"'+num+'","name":"'+name+'","price":"'+price+'","id":"'+id+'","count":"'+count+'"}';
	$.cookie('GoodsMsg',str,{expires:7,path:'/'})
	
	//console.log(JSON.parse($.cookie('GoodsMsg')));

}











//鼠标移入移出隐藏的typelist显示与隐藏
function typelisthover(){

	$('.type').hover(function() {

		$(this).addClass('act')
		$('.typelist').show();

	}, function() {
		$(this).removeClass('act')
		$('.typelist').hide();

	});

	$('.typelist').hover(function() {
		$(this).show()
		$('.type').addClass('act')
	}, function() {
		$(this).hide();
		$('.type').removeClass('act')
	});
}


 //加入购物车--收藏操作按钮等的显示隐藏
function btnShowOrHide(){

	$('.goodsList dl').hover(function() {
		$(this).find('.add_cart').show()
	}, function() {
		$(this).find('.add_cart').hide()
	});

}