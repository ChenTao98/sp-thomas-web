<template>
  <div id="app">
    <navigator v-if="isNavigator"/>
    <el-container>
      <left-nav v-if="isLeftNav"/>
       <router-view :key="$route.fullPath"/>
    </el-container>
    <!-- <el-container>
      <el-header>
        <navigator v-if="isNavigator"/></el-header>
      <el-aside><left-nav v-if="isLeftNav"/></el-aside>
    <el-main><router-view/></el-main>
    </el-container> -->
  </div>
</template>

<script>
import navigator from './views/navigator/Navigator'
import LeftNav from './views/navigator/LeftNav.vue'


export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isNavigator:true,
      isLeftNav:true,
      isRoute:true,
    }},
    provide(){
      return{
        reload:this.reload,
        isLogin:this.isLogin,
      }
    },
    methods:{
      reload(){
        this.isNavigator=false;
        this.$nextTick(()=>(this.isNavigator=true))
      },
      isLogin(){
        let username=this.$cookieStore.getCookie("username");
        if(username==""){
          return false;
        }else{
          return true;
        }
      },
    },
  components: { navigator,LeftNav,},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body,html{
  height: 100%;
}
</style>
