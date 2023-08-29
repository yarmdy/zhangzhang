const app = getApp();
const j={
  deferred:()=>{
    let resolve,reject,notifyFunc,def;
    let promise = new Promise((resolvet,rejectt)=>{
      resolve=resolvet;
      reject=rejectt;
    });
    function notify(func) {
      notifyFunc=func;
      return promise;
    }
    function progress(obj){
      typeof notifyFunc=="function" && notifyFunc(obj);
    }
    promise.notify=notify;
    def={
      resolve:resolve,
      reject:reject,
      promise:promise,
      then:promise.then,
      catch:promise.catch,
      notify:notify,
      progress:progress,
    };
    return def;
  },
  delay:mi=>{
    var def = j.deferred();
    setTimeout(()=>{
      def.progress("倒计时结束预警");
      def.resolve(`${mi}毫秒倒计时结束`);
    },mi);
    return def.promise;
  },
  ajax:(method,url,data)=>{
    var def = j.deferred();
    var req = wx.request({
      url: url,
      data:data,
      method:method,
      dataType:"json",
      header:{
        "Content-Type":method=="POST"? "application/x-www-form-urlencoded":"json",
        "Cookie":app.globalData.cookie,
      },
      success:res=>{
        def.resolve(res.data);
      },
      fail:err=>{
        def.reject(err);
      }
    });
    req.onHeadersReceived(function(res) {
      res.tag="header";
      def.progress(res);
    });
    return def.promise;
  },
  post:(url,data)=>{
    return j.ajax("POST",url,data);
  },
  get:(url,data)=>{
    return j.ajax("GET",url,data);
  },
};
module.exports = j;