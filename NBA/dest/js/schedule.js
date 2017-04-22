define(['jquery'],function(){
	return {
		getData : function(callback,obj){
			$.ajax({
				url:'/api',
				type:'get',
				data:obj,
				dataType:"json",
				success:function(res){
					callback(res)
					}
			})
		}
	}
})