const istest=true;
const domain="http://192.168.0.11:5062";
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
    list:"/item/list",
    bycode:"/item/bycode",
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
    login:"/Account/GetCookie",
    setuserinfo:"/Account/SetUserInfo",
    createuser:"/Account/CreateUser",
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
    },
    bycode:(code)=>{
      return j.get(curl(urls.item.bycode)+"?code="+code,{});
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
  },
  user:{
    login:(code)=>{
      let obj={};
      obj.rnd=Math.random();
      return j.post(curl(urls.user.login)+"?code="+code,obj);
    },
    setuserinfo:(data)=>{
      data=data||{};
      data.rnd=Math.random();
      return j.post(curl(urls.user.setuserinfo),data);
    },
    createuser:(code,data)=>{
      data=data||{};
      data.rnd=Math.random();
      return j.post(curl(urls.user.createuser)+"?code="+code,data);
    }
  }
};
module.exports = bll;