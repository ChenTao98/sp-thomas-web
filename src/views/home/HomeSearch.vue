<template>
<div style="width:100%">
  <h3 style="text-align:left">{{"商品："+searchName}}</h3>
  <h3 style="text-align:left" v-if="productList.length==0">没有符合条件的商品</h3>
  <div v-if="productList.length!=0" style="width:100%">
    <!-- <router-view :key="$route.fullPath"></router-view> -->
    
    <el-col :span="24" v-for="image_row in Math.ceil(productList.length/row_num)" :key="image_row" class="block">
    <el-col :span="3" v-for="image_col in Math.min(row_num,productList.length-row_num*(image_row-1))" :key="image_col+row_num*image_row" >
      <div style="height:300px" @click="goToProductDetail(productList[image_col+row_num*(image_row-1)-1].productId)">
      <el-image :src="productList[image_col+row_num*(image_row-1)-1].img" style="width:98%;height:70%;" >
      <div slot="error" class="image-slot" >
        <i class="el-icon-picture-outline" style="height:200px;width:200px"></i>
        </div>
      </el-image>
      <p style="text-align:left">{{productList[image_col+row_num*(image_row-1)-1].name.substring(0,10)}} </p>
      <p style="text-align:left;color:red">{{"￥"+(productList[image_col+row_num*(image_row-1)-1].price*productList[image_col+row_num*(image_row-1)-1].priceMul).toFixed(2)}}</p>
      </div>
      </el-col>

    </el-col>
  </div>
</div>

</template>
<script>
  export default {
    created(){
      let type=this.$route.query.type;
      let searchKey=this.$route.query.searchKey;
      this.searchName=this.$route.query.searchName;
      if(type=="key"){
        console.log(type, searchKey,this.searchName)
        if(searchKey==""){
          this.searchName="所有商品"
          this.$http.get("product/all",{headers:{ 'Content-Type':'application/json' }})
          .then((response)=>{
            this.productList=response["data"].data;
            this.row_num=6
        });
        }else{
      let data={"searchKey":searchKey};
      this.$http.post("product/searchByKey",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
      .then((response)=>{
            this.productList=response["data"].data;
            this.row_num=6
        });
        }
      }else if(type=="classid"){
        // console.log(type, searchKey,this.searchName)
        let data={"productClassId":parseInt(searchKey)};
      this.$http.post("product/searchByClassId",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
      .then((response)=>{
            this.productList=response["data"].data;
            this.row_num=6
        });
      }
    },
    data(){
        return{
            hotList:[],
            productList:[],
            productListLength:0,
            row_num:6,
            searchName:"",
        }
    },
    methods: {
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