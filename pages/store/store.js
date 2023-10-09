// index.js
// 获取应用实例
const app = getApp()
const j = require("../../utils/core");
const bll = require("../../utils/bll");
Page({
  data: {
    slideButtons:[
      {
        text: '删除',
        type:'warn',
      }
    ],
    itemlist:[
      {
        id:1,
        name:"商品1"
      },
      {
        id:2,
        name:"商品2"
      }
    ],
    loading:false,
    loaded:false
  },
  scrollend(a,b,c){
    console.log(a,b,c);
    wx.showToast({
      title: '飞翔',
      icon:"none",
      mask:true
    });
  },
  onShow(){
    
  },
  async add(){
    let res = await wx.scanCode({scanType:['barCode']}).catch(err=>{
      wx.navigateTo({
        url: '/pages/item/edit/edit',
      });
    });
    if(!res){
      return;
    }
    let code=res.result;
    let json = await bll.item.bycode(code).fail(err=>j.error("查询失败"));
    if(json.data==null){
      wx.navigateTo({
        url: '/pages/item/edit/edit?code='+code,
      });
    }else{
      wx.navigateTo({
        url: '/pages/item/edit/edit?id='+json.data.id,
      });
    }
    
  }
})
