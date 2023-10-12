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
    loaded:false,
    page:1,
    size:10
  },
  onReachBottom(){
    this.getList();
  },
  async onPullDownRefresh(){
    await this.getList(1);
    wx.stopPullDownRefresh();
  },
  scrollend(a,b,c){
    this.getList();
  },
  onLoad(){
    this.getList(1);
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
    
  },
  async getList(page,size){
    if(this.data.loaded && page!=1 || this.data.loading){
      return;
    }
    const $this=this;
    this.data.page = page||this.data.page;
    this.data.size = size||this.data.size;
    this.setData({loading:true});
    var json = await bll.item.list({page:this.data.page,size:this.data.size}).fail(function(error){
      $this.setData({loading:false});
    });
    this.data.loading=false;
    if(this.data.page==1){
      this.data.itemlist=json.data;
    }else{
      this.data.itemlist=this.data.itemlist.concat(json.data);
    }
    if(json.data.length<this.data.size){
      this.data.loaded=true;
    }else{
      this.data.loaded=false;
    }
    this.data.page++;
    this.setData(this.data);
  }
})
