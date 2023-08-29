// index.js
// 获取应用实例
const app = getApp()
const j = require("../../utils/core");
Page({
  data: {
    itemlist:[
      {
        id:1,
        name:"商品1"
      },
      {
        id:2,
        name:"商品2"
      }
    ]
  
  },
  scrollend(a,b,c){
    console.log(a,b,c);
    var asd = new Promise();
    wx.showToast({
      title: '飞翔',
      icon:"none",
      mask:true
    });
  },
  onShow(){
    // var promise = j.delay(3000);
    // promise.notify(a=>console.log(a))
    // .then(a=>{
    //   console.log(a);
    // });
    j.post("https://iem.aiibill.cn/Login/Login",{
      password: "13711111111",
      username: "13711111111",
      validationcode: "0000",
    })
    .notify(res=>{
      console.log(res);
      if(!res.cookies || res.cookies.length<=0){
        return;
      }
      app.globalData.cookie=res.cookies.map(a=>{
        return a.substring(0,a.indexOf(";"));
      }).join(";");
    })
    .catch(res=>console.log(res))
    .then(res=>{
      console.log(res);
      return j.get("https://iem.aiibill.cn/Flowinstances/Load",{limit:1,page:1});
    })
    .then(res=>{
      console.log(res);
    });
    
  }
})
