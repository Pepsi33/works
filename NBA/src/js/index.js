require(["jquery","data","playtime"],function($,data,playtime){
  setTimeout(function(){
    function setFontSize(){
      // 设计稿 640px
      var width = document.documentElement.clientWidth;
      //使用设计稿与设备宽度的比例计算 font size
      var fontSize = (width / 320) * 100;
      document.getElementsByTagName("html")[0].style.fontSize = fontSize + "px";
    }
    //监听 resize 变化
    $(window).on("resize",setFontSize);
    //立即执行 计算 font size
    setFontSize();
  },0)


  data.getData("nba",function(res){
    var resAppointment = res.result['list'][2]['tr'];
    console.log(res);
    var titleH6 = res['result'].title;
    titleH6 = titleH6.substring(0,titleH6.indexOf('_'));
    // .appointment 下的 NBA 季前赛或季后赛
    $('h6',$('.appointment')).html(titleH6);
    //获取比赛时间
    var time = [resAppointment[1].time,resAppointment[2].time]
    time = playtime.getPlaytime(time);
    console.log(time);
    // .aptconten下的内容
    var html = ['<span data-url="'+resAppointment[1].player1url+'"><img src="'+resAppointment[1]['player1logo']+'" alt="">'+resAppointment[1]['player1']+'</span><span><b>'+time[0][0]+'</b><a href="#">'+time[0][1]+'</a></span><span data-url="'+resAppointment[1].player2url+'"><img src="'+resAppointment[1]['player2logo']+'" alt="">'+resAppointment[1]['player2']+'</span>','<span data-url="'+resAppointment[2].player1url+'"><img src="'+resAppointment[2]['player1logo']+'" alt="">'+resAppointment[2]['player1']+'</span><span><b>'+time[1][0]+'</b><a href="#">'+time[1][1]+'</a></span><span data-url="'+resAppointment[2].player2url+'"><img src="'+resAppointment[2]['player2logo']+'" alt="">'+resAppointment[2]['player2']+'</span>'];
    $('.aptconten', $('.apt-left')).html(html[0]);
    $('.aptconten', $('.apt-right')).html(html[1]);

    // 比赛资讯
    var yesterday = res.result['list'][0]['tr'];
    html = null;
    html = '';
    yesterday.forEach(function(item,i){
      html += '<div class="col-bottom"><div class="col-bot-top"><span data-url="'+item.player1url+'"><img src="'+item.player1logo+'" alt="">'+item.player1+'</span><span>VS</span><span  data-url="'+item.player2url+'"><img src="'+item.player2logo+'" alt="">'+item.player2+'</span></div><div class="col-bot-bot"><span>'+(item.score.substring(0,item.score.indexOf('-')))+'</span><span>:</span><span>'+(item.score.substring(item.score.indexOf('-')+1))+'</span></div></div>';
    });


    $('.collection').append(html);

    $('#wrapper').on('click','span',function(){
      if($(this).attr('data-url').length){
        console.log($(this));
        var url = $(this).data('url');
        console.log(url);
        $('#iframe').get(0).src = url;
        $('#iframe').css('display','block');
        $('#wrapper').css('display','none');
        $('span',$('header')).css('display','flex');
      }
    });
    $('span',$('header')).on('click',function(){
        $('#iframe').css('display','none');
        $('#wrapper').css('display','block');
        $('span',$('header')).css('display','none');
    })

  });

  var $width = 3.20;

	var index = 0;
	var timer = setInterval(function(){
		if(index >= 3){
			$('.btn-banner',$('.banner')).find('li').eq(0).addClass('active').siblings().removeClass('active');
			index = 1;
			$('.img-banner',$('.banner')).css('left','0');
		}else{
			index++;
		$('.btn-banner',$('.banner')).find('li').eq(index).addClass('active').siblings().removeClass('active');
		}

		$('.img-banner',$('.banner')).animate({"left":(-$width*index+"rem")});
	},2000);

	$('.btn-banner',$('.banner')).on('click','li',function(){
		clearInterval(timer);
		index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.img-banner',$('.banner')).css('left',(-$width*index+"rem"));
		console.log($(this).index());

	})

})// /require
