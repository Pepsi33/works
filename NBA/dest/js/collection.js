
require(["jquery","setFontSize"],function($,setFontSize){

	$.get("/api",{
			//向服务器发送的数据
			url : "http://op.juhe.cn/onebox/basketball/nba",
			key : "e93c19dfd95e99af00f8d1ba555b6349",
			dtype:"json"
		},function(data){
			var yesterdayData = data.result.list[0];
			var todayData = data.result.list[1];
			var tomorrowData = data.result.list[2];

			create(yesterdayData)
			create(todayData)
			create(tomorrowData)

		},"json");


		$('.wrap').on('click','.review',function(){

			console.log($(this).data('src'));
			$(".main").css('display','none');
			$(".link").css('display','block');

			$(".link").find('iframe').attr('src',$(this).data('src'));
			$.getScript('js/iframe.js');

			$('.goBack').click(function(){

				$(".main").css('display','block');
				$(".link").css('display','none')

			})

		})

		//页面滚动标题栏悬浮顶部
		$(window).scroll(function() {
			if($('body').scrollTop()!=0){
				$('.main header').addClass('active');
			}else{
				$('.main header').removeClass('active');
			}
		});


})

function create(dayData){

	var html = '<secontion><h2 class="list-time">'+dayData["title"]+'</h2>';

			dayData["tr"].forEach(function(item,i){
				//console.log(item)
				html +='<div class="list"><p class="time">'+item.time+'</p><div class="bd"><ul><li><a href="'+item.player1url+'"><img src="'+item.player1logo+'" alt="'+item.player1+'"><span>'+item.player1+'</span></a></li><li><div class="li-bd"><p class="score">'+item.score+'</p><a href="javascript:;" data-src="'+item.link1url+'" title="集锦" class="review"><span>'+item.link1text+'</span></a></div></li><li><a href="'+item.player2url+'"><img src="'+item.player2logo+'" alt="'+item.player2+'"><span>'+item.player2+'</span></a></li></ul></div></div>'

			})
			html +='</secontion>';
			var $html = $(html)
			$(".wrap").append($html)

}
/*<secontion>
			<h2 class="list-time">10\17 06:00</h2>
			<div class="list">
				<p class="time">10\17 06:00</p>
				<div class="bd">
					<ul>
						<li>
							<a href="#">
								<img src="http:\/\/p9.qhmsg.com\/t015e29cacbb39ab2ea.png?size=78x78" alt="老鹰">
								<span>老鹰</span>
							</a>
						</li>
						<li>
							<div class="li-bd">
								<p class="score">100 - 97</p>
								<a href="#" title="集锦" class="review">
									<span>集锦</span>
								</a>
							</div>
						</li>
						<li>
							<a href="#">
								<img src="http:\/\/p9.qhmsg.com\/t015a91103bd3713d72.png?size=78x78" alt="魔术">
								<span>魔术</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</secontion>*/
