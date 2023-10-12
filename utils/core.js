const app = getApp();

const j={
  app:app,
  Deferred:()=>{
    let status=0,def={},notifyFunc,failFunc,thenFunc;
    function progress(data){
      if(typeof notifyFunc=="function"){
        notifyFunc(data);
        status=status==0?1:status;
      }
      return def;
    }
    function reject(data){
      if(typeof failFunc=="function"){
        failFunc(data);
        status=-1;
      }
      return def;
    }
    function resolve(data){
      if(typeof thenFunc=="function"){
        thenFunc(data);
        status=2;
      }
      return def;
    }
    function notify(func){
      notifyFunc=func;
      return promise();
    }
    function fail(func){
      failFunc=func;
      return promise();
    }
    function done(func){
      thenFunc=func;
      return promise();
    }
    function then(func){
      thenFunc=func;
      let res=j.Deferred();
      def.done(function(data){
        let newres = (typeof func=="function")&&func(data);
        if(newres&&typeof newres.promise=="function"){
          newres.promise().done(res.resolve).fail(res.reject).notify(res.progress);
          return;
        }
        res.resolve(newres);
      });
      return res.promise();
    }
    function promise(){
      let rrv,rrj;
      let p=new Promise((rv,rj)=>{
        rrv=rv;
        rrj=rj;
      });
      // let res={
      //   fail:fail,
      //   then:then,
      //   notify:notify,
      //   done:done,
      //   promise:promise
      // };
      p.fail=fail;
      p.then=then;
      p.notify=notify;
      p.done=done;
      p.promise=promise;
      p.catch=fail;
      return p;
    }
    def.promise=promise;
    def.fail=fail;
    def.then=then;
    def.done=done;
    def.reject=reject;
    def.resolve=resolve;
    def.notify=notify;
    def.progress=progress;
    return def;
  },
  
  ajax:(method,url,data)=>{
    j.load();
    var def = j.Deferred();
    var req = wx.request({
      url: url,
      //data:method=="POST"?JSON.stringify(data):data,
      data:data,
      method:method,
      dataType:"json",
      header:{
        //"Content-Type":method=="POST"? "application/x-www-form-urlencoded":"json",
        //"Content-Type":"application/json",
        "Content-Type":method=="POST"? "application/json":"json",
        "Cookie":j.app.globalData.cookie,
      },
      success:res=>{
        if(res.statusCode!=200){
          res.code=-1;
          res.msg=res.errMsg;
          j.error(""+res.statusCode);
          def.reject(res);
          return;
        }
        if(res.data.code<0){
          j.msg(res.data.msg);
          def.reject(res.data);
          return;
        }
        def.resolve(res.data);
      },
      fail:err=>{
        err.code=-1;
        err.msg=err.errMsg;
        j.msg(err.errMsg);
        
        def.reject(err);
      },
      complete:()=>{
        j.hideload();
      }
    });
    req.onHeadersReceived(function(res) {
      res.tag="header";
      def.progress(res);
    });
    return def.promise();
  },
  post:(url,data)=>{
    return j.ajax("POST",url,data);
  },
  get:(url,data)=>{
    return j.ajax("GET",url,data);
  },
  success:(msg)=>{
    wx.showToast({
      title: msg,
      icon:"success",
      mask:true
    });
  },
  error:(msg)=>{
    wx.showToast({
      title: msg,
      icon:"error",
      mask:true
    });
  },
  msg:(msg)=>{
    wx.showToast({
      title: msg+"",
      icon:"none",
    });
  },
  load:()=>{
    wx.showLoading({
      title: '加载中',
      mask:true
    })
  },
  hideload:()=>{
    wx.hideLoading();
  }
};

//仿 linq sum方法
Array.prototype.sum = function (func) {
  var res = 0;
  this.forEach(function (a,i) {
      var o = a;
      if (typeof func === "function") {
          o = func(i, a);
      }
      if (!o || isNaN(o)) {
          return;
      }
      res += parseFloat(o);
  });
  return res;
}
//循环正则替换 高级
String.prototype.replaceEach = function (reg, callback, tag) {
  var res = this;
  if (!(reg instanceof RegExp) || typeof callback !== "function") {
      return res;
  }
  var internalIndex = 0;
  while (reg.test(res)) {
      reg.lastIndex = 0;
      var regExec = reg.exec(res);
      reg.lastIndex = 0;
      regExec.runIndex = internalIndex++;
      res = res.replace(reg, callback(regExec));
      reg.lastIndex = 0;
  }
  return res;
}
//padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function (length, char) {
      var len = length - this.length;
      if (len <= 0) return this;
      return new Array(len + 1).join(char).substring(0, len) + this;
  }
}
//仿.net 日期格式化    
Date.prototype.format = function (fmt) {
  fmt = fmt || "yyyy-MM-dd HH:mm:ss";
  let dic = {
      y: this.getFullYear() + "",
      M: (this.getMonth() + 1) + "",
      d: (this.getDate()) + "",
      H: (this.getHours()) + "",
      h: (this.getHours() % 12 || 12) + "",
      m: (this.getMinutes()) + "",
      s: (this.getSeconds()) + "",
      f: (this.getMilliseconds()) + ""
  };
  Object.keys(dic).forEach(function (i) {
    let a = dic[i];
      fmt = fmt.replaceEach(new RegExp(i + "+", "s"), function (exec) {
          var r = dic[i].padStart(exec[0].length, '0');
          switch (i) {
              case "y":
                  {
                      r = r.substr(r.length - exec[0].length || 0);
                  } break;
          }

          return r;
      }, "s");
  });

  return fmt + "";
}
Number.prototype.toMoneyString = function () {
  var exec = /^(.*?)(?:\.(.*))?$/.exec((Math.round(this*100)/100).toLocaleString());
  var z = exec[1];
  var x = exec[2] || "";
  if (x.length > 2) {
      x = x.substring(0,2);
  }
  x = x.padEnd(2, '0');
  return z + "." + x;
}
j.firstValue=function(obj){
  const keys = Object.keys(obj||{});
  if(keys.length<=0) return;
  return obj[keys[0]];
}

module.exports = j;