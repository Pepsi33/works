define(['jquery'],function($){
  return {
    getPlaytime : function(time){
      var date = new Date();
      years = date.getFullYear();
      thisDay = date.getDate();
      time.forEach(function(item,i){
        time[i] = new Date(years+'/'+item+":00");
        if(time[i].getDate() > thisDay){
          time[i] = ["明"+item.split(' ')[1],"预约"];
        }else{
          time[i] = [item.split(' ')[1],"直播"];
        }
      });
      //console.log(time);
      return time;
    }

  }
})
