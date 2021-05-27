<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
   
    <el-menu-item index="homepage" ><svg-icon id="logo" icon-class="login-mall" style="color: #409EFF"></svg-icon></el-menu-item>
    <el-menu-item index="homepage">首页</el-menu-item>
    <el-menu-item index="product">商品</el-menu-item>
    <el-menu-item index="login" v-show="loginVisable">登录/注册</el-menu-item>
    <el-submenu index="my" v-show="myVisable">
      <template slot="title">我的</template>
      <el-menu-item class="submenu" index="order">订单</el-menu-item>
      <el-menu-item class="submenu" index="shopcart">购物车</el-menu-item>
      <el-menu-item class="submenu" index="myinfo">我的信息</el-menu-item>
    </el-submenu>
        <el-submenu index="admin" v-show="notUserLevel">
      <template slot="title">管理</template>
      <el-menu-item class="submenu" index="mysale">销售</el-menu-item>
      <el-menu-item class="submenu" index="myproduct">我的商品</el-menu-item>
    </el-submenu>
    <el-menu-item index="exit" v-show="myVisable">退出</el-menu-item>
    <el-menu-item index="search">
      <el-input placeholder="请输入内容" v-model="searchInput" clearable></el-input>
      <el-button type="primary" @click="search()">搜索</el-button>
    </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    inject:['reload'],
    created(){
        let username=this.$cookieStore.getCookie("username");
        if(username!=""){
            this.myVisable=true;
            this.loginVisable=false;
        }else{
            this.myVisable=false;
            this.loginVisable=true;
            // console.log("asdasd")
        }
        let level=this.$cookieStore.getCookie("level")
        if(level=="user" || level==""){
          this.notUserLevel=false;
        }else{
          this.notUserLevel=true;
        }
    },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      myVisable:false,
      loginVisable:true,
      searchInput:"",
      notUserLevel:false,
    };
  },
  methods: {
    handleSelect(key,keyPath) {
      if(key=="search" || key=="my"){
        return
      }
      if(key=="product"){
        this.$router.push({path:"search",query:{type:"key",searchKey:"",searchName:""}})
        return
      }
      if(key=="exit"){
        this.$cookieStore.delCookie("username");
        this.$cookieStore.delCookie("level")
        this.$http.get("/exit").then((response) =>{});
        this.reload();
        this.$router.push("/homepage");
        return
      }
      // console.log("/"+keyPath.join("/"));
      this.$router.push("/"+key);
    },
    search(){
      // console.log(this.searchInput);
      // this.$router.push({name:"search",params:{type:"key",searchKey:this.searchInput,searchName:this.searchInput}})
      this.$router.push({path:"search",query:{type:"key",searchKey:this.searchInput,searchName:this.searchInput}})
    }
  },
};
</script>

<style>
#logo {
  margin-top: 8px;
  width: 45px;
  height: 45px;
  left:200px;
}
.el-menu{
  margin:0 10px;
}
.header {
  display: flex;
  width: 100%;
}
</style>