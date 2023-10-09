// app.js
const j = require("/utils/core");
const bll = require("/utils/bll");
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        bll.user.login(res.code).fail(json=>{
          if(json.code==-2){
            wx.navigateTo({
              url: '/pages/login/login',
            })
            return;
          }
        }).then(json=>{
          this.globalData.userInfo=json.data;
          this.globalData.cookie = json.data2.cookie;
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    cookie:null,
  }
})
j.app=getApp();