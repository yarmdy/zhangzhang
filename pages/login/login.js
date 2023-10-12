// pages/login/login.js
let j=require("../../utils/core")
let bll=require("../../utils/bll")
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  onLoginTap(){
    let loginPromise=new Promise((resolve,reject)=>{
      wx.login({
        success: (res) => {
          if(!res.code){
            reject(res);
            return;
          }
          resolve(res);
        }
      });
    });
    let userInfoPromise = wx.getUserProfile({
      desc: '会员注册',
    });
    Promise.all([loginPromise,userInfoPromise]).then(ress=>{
      return bll.user.createuser(ress[0].code,ress[1]).notify(a=>{
          if(!a.cookies || a.cookies.length<=0){
            return;
          }
          app.globalData.cookie=a.cookies.map(a=>{
            return a.substring(0,a.indexOf(";"));
          }).join(";");
      });
    },errs=>{
      
    }).then(json=>{
      app.globalData.userInfo=json.data;
      wx.switchTab({
        url: '/pages/index/index',
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})