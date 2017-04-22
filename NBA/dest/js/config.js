require.config({
  //dest/js/
  baseUrl : "js/",
  paths : {
    jquery : "jquery-1.11.3"
  },
  shim : {
    jquery :{
      deps : [],
      exports : "window.jQuery"
    }
  }
})
/*	//指定静态文件跟目录
	baseUrl : "js/",
	//别名
	//给一个模块定义别名
	paths : {
		//会在  baseUrl 下面去查找
		jquery : "jquery.min"
	},
	//兼容   把非模块化的js文件模块化
	//把不是以 define 格式的 js 做兼容处理
	shim:{
		jquery:{
			deps:[], //循环依赖，先不管
			//返回 jquery 暴露的全局对象
			exports:"window.jQuery"
		}
	}
});
aa40dac885725ffcd3c6531d42c12c81e19c750c*/
