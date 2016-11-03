
/***登录页面js部分***/


$(function(){
	//alert(1);		//55
	
	if($.cookie('userName')){
		$('#userName').prev().hide();
		$('#userName').val($.cookie('userName'));
	}else{
		$('#userName').val('');
	}
	
	/*****

		用户登录： http://datainfo.duapp.com/shopdata/userinfo.php
		参数	返回值
		status:login	登陆成功：返回json对象{code:'',userID:'',password:'', userimg_url:'', sex:''}
		userID用户名	用户名不存在：0
		password:密码	用户名密码不符：2

	*****/

	var flag = false;

	//用户名框的获得焦点和失去焦点事件
	$('#userName').focus(function(){
		$(this).css('borderColor','rgb(255, 173, 119');
		$(this).prev().hide();							//label标签隐藏
		$(this).next().addClass('picUser');				//i标签背景图变换
		$('.error_msg').hide();						//提交时的提示信息
	}).blur(function(){
		if($(this).val()==''){
			$(this).css('borderColor','#dedede');
			$(this).prev().show();							//label标签显示
			$(this).next().removeClass('picUser');			//i标签背景图变换
		}else{
			$(this).css({
				"borderColor":"#dedede",
				"background":"#faffbd"
			});
			$(this).prev().hide();							//label标签显示
			$(this).next().addClass('picUser');	
		}
	})

	//密码框的获得焦点和失去焦点事件
	$('#password').focus(function(){
		$(this).css('borderColor','rgb(255, 173, 119');
		$(this).prev().hide();							//label标签隐藏
		$(this).next().addClass('picPassword');				//i标签背景图变换
		$('.error_msg').hide();						//提交时的提示信息

	}).blur(function(){
		if($(this).val()==''){
			$(this).css('borderColor','#dedede');
			$(this).prev().show();							//label标签显示
			$(this).next().removeClass('picPassword');			//i标签背景图变换
			$('.error_msg').hide();						//提交时的提示信息
		}else{
			$(this).css({
				"borderColor":"#dedede",
				"background":"#faffbd"
			});
			$(this).prev().hide();							//label标签显示
			$(this).next().addClass('picPassword');	
		}
	})

	/***验证码***/
	checkCode();

	function checkCode(){

		var code = $('.codeInput');			//验证码输入框

		code.focus(function(){

			$(this).css('borderColor','rgb(255, 173, 119');
			$('.error_msg').hide();					//提交时的提示信息
			
		}).focusout(function(){

			if($(this).val()==$(this).next().text()){

				$(this).css('borderColor','#dedede');
				flag = true;

			}else{
				$('.error_msg').show().text("验证码错误！");
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
    	yzm()
    })

    //回车键提交
    $(window).keydown(function(event){

    	//alert(event.keyCode)

    	if(event.keyCode==13){

    		loading(flag); 

    	}
    })

    //登录按钮
    $('#LoginBtn').click(function(){

    	loading(flag);

    })
    	
    	//加载网页尾部
    	$('.footerWarp').load('register.html .footer')

})



//登录函数
function loading(flag){
	
	//console.log(flag)
	if(flag){
		var userID = $('#userName').val()    	//用户名
		var password = $('#password').val()		//密码

		//console.log(userID+" "+password)		//yz 55

		$.ajax({
			url:'http://datainfo.duapp.com/shopdata/userinfo.php',
			type:'post',
			data:{
				status:'login',
				userID:userID,
				password:password
			},
			success:function(res){
				//console.log(res)
				data = JSON.parse(res);
				switch(res){
					case "0":$('.error_msg').show().text("用户名不存在！");
					break;
					case "2":$('.error_msg').show().text("用户名密码不符!");
					break;
					default:$('.error_msg').hide();
							//判断记住密码复选框是否checked选择是否记住用户名密码cookie设置
							$.cookie('userName',data.userID,{expires:7,path:'/'});
							if($('#remberUser').is(':checked')){
								//$.cookie('password',data.password,{expires:7})
						    	$.cookie('userName',data.userID,{expires:7})
						    }
							//alert('登陆成功');
							window.location.href='index.html';		//跳转主页
					break;
				}
			}
		})
	}else{
		$('.error_msg').show().text("请正确填写信息！");
	}

}