<template>
<div style="width:100%">
  <div style="width:100%">
  <h3 style="text-align:left">热门商品</h3>
  <el-carousel :interval="4000" type="card" style="width:80%">
    <el-carousel-item v-for="item in hotList" :key="item.productId">
      <img style="cursor:pointer" :src="item.img" height="90%" width="98%" @click="goToProductDetail(item.productId)">
      <span style="text-align:left">{{item.name.substring(0,10)}} </span>
      <span style="text-align:left;color:red">{{"&nbsp&nbsp&nbsp ￥"+(item.price*item.priceMul).toFixed(2)}}</span>
    </el-carousel-item>
  </el-carousel>
  </div>
  <div style="width:100%">
    <el-divider><i class="el-icon-grape"></i></el-divider>
    <h3 style="text-align:left">特价商品</h3>
    <el-col :span="24" v-for="image_row in Math.ceil(discountList.length/row_num)" :key="image_row" class="block">
    <el-col :span="3" v-for="image_col in Math.min(row_num,discountList.length-row_num*(image_row-1))" :key="image_col+row_num*image_row" >
      <div style="height:300px" @click="goToProductDetail(discountList[image_col+row_num*(image_row-1)-1].productId)">
      <el-image :src="discountList[image_col+row_num*(image_row-1)-1].img" style="width:98%;height:70%;cursor:pointer" >
      <div slot="error" class="image-slot" >
        <i class="el-icon-picture-outline" style="height:200px;width:200px"></i>
        </div>
      </el-image>
      <p style="text-align:left;cursor:pointer">{{discountList[image_col+row_num*(image_row-1)-1].name.substring(0,10)}} </p>
      <p style="text-align:left;color:red">{{"￥"+(discountList[image_col+row_num*(image_row-1)-1].price*discountList[image_col+row_num*(image_row-1)-1].priceMul).toFixed(2)}}</p>
      </div>
      </el-col>

    </el-col>
  </div>
</div>

</template>
<script>
  export default {
    created(){
        this.$http.get("product/hot")
        .then((response)=>{
            this.hotList=response["data"].data;
        });
        this.$http.get("product/discount")
        .then((response)=>{
            this.discountList=response["data"].data;
            this.row_num=6
            console.log(this.discountList);
            console.log(this.discountList[1].img);
            console.log(this.discountListLength);
        });
    },
    data(){
        return{
            hotList:[],
            discountList:[],
            discountListLength:0,
            row_num:6,
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
      },
      handleOpen(key, keyPath) {
        console.log(key);
      },
      goToProductDetail(id){
        console.log(id)
        this.$router.push({path:"/product",query:{productId:id}})
      }
    }
  }
</script>
<style>
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>