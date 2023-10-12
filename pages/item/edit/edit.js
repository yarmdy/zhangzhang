const bll = require("../../../utils/bll");
const j = require("../../../utils/core");

// pages/item/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"添加商品",
    item:{
      name:"",
      code:"",
      price:"",
      cost:""
    },
    rules:[
      {
        name:"id",
        rules:[
          
        ]
      },
      {
        name:"code",
        rules:[
          {
            required:true,
            message:"请输入产品编码"
          }
        ]
      },
      {
        name:"name",
        rules:[
          {
            required:true,
            message:"请输入产品名称"
          }
        ]
      },
      {
        name:"price",
        rules:[
          {
            required:true,
            message:"请输入单价"
          },
          {
            min:0,
            message:"不能小于0"
          }
        ]
      },
      {
        name:"cost",
        rules:[
          {
            required:true,
            message:"请输入成本"
          },
          {
            min:0,
            message:"不能小于0"
          }
        ]
      }
    ],
    isValid:true,
    errMsg:"错误"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    options=options||{};
    if((options.id||0)>0){
      this.data.title="修改商品";
    }
    this.data.item.code=options.code||"";
    this.data.item.id=options.id||0;
    if(options.id){
      let json = await bll.item.get(options.id);
      this.data.item = json.data;
    }
    this.setData(this.data);
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

  },
  closePage(){
    wx.switchTab({
      url: '/pages/store/store',
    });
  },
  valueChange(e){
    this.data.item[e.currentTarget.dataset.name]=e.detail.value;
    this.setData({item:this.data.item});
  },
  async submitForm(){
    const form = this.selectComponent("#form");
    const $this = this;
    const res = await form.validate();
    $this.setData({isValid:res.isValid,errMsg:(j.firstValue(res.errors)||{}).message||""});
    if(!res.isValid) return;
    let promise;
    if(this.data.item.id==0){
      promise=bll.item.add(this.data.item);
    }else{
      promise=bll.item.edit(this.data.item);
    }
    const json = await promise;
    
    wx.switchTab({
      url: '/pages/store/store',
    }).then(function(e){
      const page=getCurrentPages().pop();
      page.onLoad();
    });
    j.msg(json.msg);
  }
})