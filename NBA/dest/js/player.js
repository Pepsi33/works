require(['jquery','data'],function($,data){

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


  data.getData('nba',function(res){
    console.log(res);
    var src = res.result.list[0].bottomlink
    var html = '<li data-src="'+src[1].url+'" class="active">球队排名</li><li data-src="'+src[2].url+'">球员排名</li><li data-src="./playerInfo.html">球队信息</li>'
    $('ul',$('.nav')).html(html);
    $('#iframe').get(0).src = src[1].url;

    $('ul',$('.nav')).on('click','li',function(){
      var src = $(this).data('src');
      $('#iframe').get(0).src = src;
      $('#iframe').append('<script type="text/javascript"></script>');
      $(this).addClass('active').siblings().removeClass('active');
    })
  })
})
