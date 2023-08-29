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
        if(res.statusCode!=200){
          def.reject(res);
          return;
        }
        def.resolve(res.data);
      },
      fail:err=>{
        j.error(err);
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

module.exports = j;