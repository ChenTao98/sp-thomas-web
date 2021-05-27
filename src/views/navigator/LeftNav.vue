<template>
  <el-col :span="5" style="heigth:100%">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="heigth:100%;">
      
      <el-submenu v-for="class_cur in classList" v-bind:key="class_cur.id" :index="class_cur.id+''" >
        <template slot="title">
          <i @click="search(class_cur.id,class_cur.className)" class="el-icon-menu"></i>
          <span @click="search(class_cur.id,class_cur.className)">{{class_cur.className}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="search(child_class_cur.id,child_class_cur.className)" v-for="child_class_cur in class_cur.child" v-bind:key="child_class_cur.id" :index="''+child_class_cur.id">{{child_class_cur.className}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
  export default {
    created(){
        this.$http.get("product/class")
        .then((response)=>{
            let data=response["data"].data
            this.classList=data
        })
    },
    data(){
        return{
            classList:[],
        }
    },
    methods: {
      // handleSelect(key, keyPath) {
      //   console.log(key);
      // },
      // handleOpen(key, keyPath) {
      //   console.log(key,keyPath);
      // },
      search(classid,searchInput){
      // console.log(classid,searchInput);
      // this.$router.push({name:"search",params:{type:"key",searchKey:this.searchInput,searchName:this.searchInput}})
      this.$router.push({path:"search",query:{type:"classid",searchKey:classid,searchName:searchInput}})
    }
    }
  }
</script>
<style >
.leftNav{
    min-height: 100vh;
}
</style>