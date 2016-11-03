
/**
	注册页面表单验证
**/
$(function(){
		//alert(1) 		yz55
		var flag1=flag2=flag3=flag4=false;
		/***用户名验证***/
		checkUserName();

		function checkUserName(){

			var userName = $('.userNameInput')
			var regUserName = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
			var Tips = userName.parentsUntil('ul').find('.regtips').children().eq(1);	//提示信息

			//alert(regUserName.test(userName))
			userName.focus(function(){

				$(this).css('borderColor','#9d003f');
				$('.msaTips').hide();					//提交时的提示信息
				Tips.show().text('请输入您的手机号');		//再次获得焦点时还原text

			}).blur(function(){
				//console.log(regUserName.test($(this).val()))
				if(regUserName.test($(this).val())){

					$(this).css('borderColor','#dedede');
					Tips.hide();
					flag1 = true;

				}else if($(this).val()==''){

					$(this).css('borderColor','red');
					Tips.css({
						'color':'red',
						'fontWeight':'bold'
					}).text('请输入用户名');

				}else{

					$(this).css('borderColor','red');
					Tips.css({
						'color':'red',
						'fontWeight':'bold'
					}).text('请输入正确的手机号');
				}
				//console.log(flag1+'----flag1')
			})
		}

		/***验证码***/
		checkCode();

		function checkCode(){

			var code = $('.codeInput');			//验证码输入框

			code.focus(function(){

				$(this).css('borderColor','#9d003f');
				$('.msaTips').hide();					//提交时的提示信息

			}).focusout(function(){

				if($(this).val()==$(this).next().text()){

					$(this).css('borderColor','#dedede');
					flag2 = true;

				}else{

					$(this).css('borderColor','red');
				}

				//console.log(flag2+'----flag2')	
			})
		}

		//获取随机字母数字（验证码）
		yzm()
		function yzm(){
	        var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
	        var str = '';
	        for(var i = 0 ; i < 4 ; i ++ )
	            str += ''+arr[Math.floor(Math.random() * arr.length)];
	        $('.codeImg').text(str);
	    }

	    //点击更换验证码
	    $('.cgBtn').click(function(){
	    	$('.codeInput').val('');
	    	yzm();
	    })


	    /***短信验证码***/
	    checkMsg();
	    function checkMsg(){

	    	var msg = $('.dxCodeInput');			//获取输入框
	    			
	    	msg.focus(function(){

				$(this).css('borderColor','#9d003f');
				$('.msaTips').hide();					//提交时的提示信息

			}).focusout(function(){
				
				if($(this).val()!=''){

					$(this).css('borderColor','#dedede');

				}else{

					$(this).css('borderColor','red');
				}
			})

	    }

	    /***密码***/
	    checkPassWord();

	    function checkPassWord(){

	    	var passWord = $('.passWordInput');		//获取密码输入框
	    	var regPassWord = /[a-zA-Z0-9]{6,16}/;
	    	var Tips = passWord.parentsUntil('ul').find('.regtips').children().eq(1);	//提示信息

			passWord.focus(function(){

				$(this).css('borderColor','#9d003f');
				$('.msaTips').hide();					//提交时的提示信息
				Tips.show().text('请输入密码');		//再次获得焦点时还原text

			}).blur(function(){
				
				if(regPassWord.test($(this).val())){

					$(this).css('borderColor','#dedede');
					Tips.hide();
					flag3 = true;

				}else{

					$(this).css('borderColor','red');
					Tips.css({
						'color':'red',
						'fontWeight':'bold'
					}).text('密码长度为6~16位');
				}
				//console.log(flag3+'----flag3')
			})
	    }


	    /***核对密码***/
	    rCheckPassWord()
	    function rCheckPassWord(){

	    	var rPassWord = $('.cheakPassWord');		//获取输入框	
	    	var Tips = rPassWord.parentsUntil('ul').find('.regtips').children().eq(1);	//提示信息

			rPassWord.focus(function(){

				$(this).css('borderColor','#9d003f');
				$('.msaTips').hide();					//提交时的提示信息
				Tips.show().text('请输入确认密码');		//再次获得焦点时还原text

			}).blur(function(){
				
				if(($(this).val()==$('.passWordInput').val())&&$('.passWordInput').val()!=''){
					
					$(this).css('borderColor','#dedede');
					Tips.hide();
					flag4 = true;

				}else if($(this).val()==''){
					$(this).css('borderColor','red');
					Tips.css({
						'color':'red',
						'fontWeight':'bold'
					});
					
				}else{

					$(this).css('borderColor','red');
					Tips.css({
						'color':'red',
						'fontWeight':'bold'
					}).text('两次密码不一致，请重新输入');
				}
				//console.log(flag4+'----flag4')
			})
	    }


	    /***贵宾邀请码***/
	    $('.guibin').click(function(){
	    	
	    	if(!$('.guibin').attr('checked')){

	    		$('.guibinCodeInput').show();
	    		$('.guibin').attr('checked','checked');

	    	}else{

	    		$('.guibinCodeInput').hide();
	    		$('.guibin').removeAttr('checked');
	    	}
	    })

	    $('.guibinCodeInput').focus(function(){

	    	$(this).css('borderColor','#9d003f');
	    }).blur(function() {
	    	$(this).css('borderColor','#dedede');
	    });


	    /***服务条款***/
	     $('#readProtocol').click(function(){
	    	
	    	if($('#readProtocol').attr('checked')){

	    		$('.tk').show();
	    		$('#readProtocol').removeAttr('checked');

	    	}else{

	    		$('.tk').hide();
	    		$('#readProtocol').attr('checked','checked');

	    	}
	    })
	     //console.log($('#readProtocol').attr('checked'))
	     //console.log($('#readProtocol').attr('checked')=='checked')

	    //提交部分	
 		$('#registerBtn').click(function(){
 			var tof = flag1&&flag2&&flag3&&flag4&&($('#readProtocol').attr('checked')=='checked');
 			//console.log(tof)
 			if(tof){ 
 				var ID = $('.userNameInput').val();
 				var password = $('.passWordInput').val();

 			/*******

 				用户注册： http://datainfo.duapp.com/shopdata/userinfo.php
				参数			返回值
				status:register	用户名重名：0
				userID:用户名	注册成功：1
				password:密码	数据库报错：2

			*******/
 				$.ajax({
 					url:'http://datainfo.duapp.com/shopdata/userinfo.php',
 					type:'post',
 					data:{
 						status:"register",
						userID:ID,
						password:password
 					},
 					success:function(res){
 						//alert(res)		//55  res=>0 用户重名 1 成功 2 数据库报错
 						switch(res){
						case "0":$('.msaTips').show().text('此手机号已经被注册了').css({
								'color':'red',
								'fontWeight':'bold'
							});
							$('.codeImg').text(yzm());
							break;
						case "1":$('.msaTips').hide();
								alert('恭喜，注册成功！');
								window.location.href='login.html'
								break;
						case "2":alert('我们的数据库出现一点小故障暂时不能注册，抱歉！');break;
						default:$('.msaTips').hide();break;
						}
 					}
 				})
 			}else{
 				$('.msaTips').show().text('请完善信息！').css({
					'color':'red',
					'fontWeight':'bold'
				});
			}
 		})

	    

})//window.onload		



	