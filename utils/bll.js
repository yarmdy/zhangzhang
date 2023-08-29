const istest=true;
const domain="https://iem.aiibill.cn";
const j = require("core");
const curl=(url="")=>{
  url=url.toLowerCase().trim();
  if(url.indexOf("http")==0){
    return url;
  }
  return domain+url;
};
const urls={
  item:{
    add:"/item/add",
    edit:"/item/edit",
    del:"/item/del",
    list:"/item/list"
  },
  record:{
    info:"/record/info"
  },
  stock:{
    info:"/stock/info"
  },
  out:{
    add:"/out/add",
    edit:"/out/edit",
    del:"/out/del",
    list:"/out/list"
  },
  in:{
    add:"/in/add",
    edit:"/in/edit",
    del:"/in/del",
    list:"/in/list"
  },
  user:{
    login:"/user/login",
  }
};
const bll={
  item:{
    add:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.item.add),obj);
    },
    edit:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.item.edit),obj);
    },
    del:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.item.del),obj);
    },
    list:(ids=[])=>{
      let obj={};
      obj.ids=ids;
      obj.rnd=Math.random();
      return j.get(curl(urls.item.add),obj);
    }
  },
  record:{
    info:(obj={})=>{
      obj.rnd=Math.random();
      return j.get(curl(urls.record.info),obj);
    }
  },
  stock:{
    info:(obj={})=>{
      obj.rnd=Math.random();
      return j.get(curl(urls.stock.info),obj);
    }
  },
  out:{
    add:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.out.add),obj);
    },
    edit:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.out.edit),obj);
    },
    del:(ids=[])=>{
      let obj={};
      obj.ids=ids;
      obj.rnd=Math.random();
      return j.post(curl(urls.out.del),obj);
    },
    list:(obj={})=>{
      obj.rnd=Math.random();
      return j.get(curl(urls.out.list),obj);
    },
  },
  in:{
    add:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.in.add),obj);
    },
    edit:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.in.edit),obj);
    },
    del:(obj={})=>{
      obj.rnd=Math.random();
      return j.post(curl(urls.in.del),obj);
    },
    list:(ids=[])=>{
      let obj={};
      obj.ids=ids;
      obj.rnd=Math.random();
      return j.post(curl(urls.in.list),obj);
    }
  }
};
module.exports = bll;