define(["jquery"],function($){
  return {
    getData : function(addr,callback){
      $.get("/api",{
        "url" : "http://op.juhe.cn/onebox/basketball/"+ addr,
        "dtype" : "json",
        "key" : "bf157e2b5e53b38fad5e7b28256fa87d"
      },function(res){
        callback(res);
        // return res;
      },"json");
    },
    setData : function(){
      return this.getData;
    }
  }
})
