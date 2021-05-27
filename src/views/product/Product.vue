<template>
<el-container>
<h1 v-if="product==null">对不起，没有此商品</h1>
<el-col :span="24" v-if="product!=null">
<el-col :span="24">
    <h2 style="text-align:left">{{product.name}}</h2>
    <el-col :span="24">
        <el-divider><i class="el-icon-grape"></i></el-divider>
    <el-col :span="6">
    <img :src="product.img" width="100%" height="width">
    </el-col>
    <el-col :span="12" style="margin-left:20px">
    <p style="text-align:left">价格<span style="color:red;font-size:20px">{{"&nbsp&nbsp&nbsp ￥"+(product.price*product.priceMul).toFixed(2)}}</span></p>
    <p style="text-align:left">快递<span style="font-size:20px">{{"&nbsp&nbsp&nbsp 圆通快递"}}</span></p>
    <p style="text-align:left">已售<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+product.saleNum}}</span></p>
    <p style="text-align:left">库存<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+product.remainNum}}</span></p>
    <p style="text-align:left">数量<span style="color:red;font-size:20px">{{"&nbsp&nbsp&nbsp "}}<el-input-number v-model="num" :disabled="product.remainNum<=0" :min="1" :max="product.remainNum" label="描述文字"></el-input-number></span></p>
    <el-row style="text-align:left">
        <el-button type="primary" round :disabled="product.remainNum<=0" @click="shopBuy()">购买</el-button>
        <el-button type="success" round :disabled="product.remainNum<=0" @click="shopAdd()">加入购物车</el-button>
    </el-row>
    </el-col>
    </el-col>
</el-col>

<el-col :span="24">
    <el-divider><i class="el-icon-lollipop"></i></el-divider>
    <p style="text-align:left;font-size:20px">{{product.description}}</p>
</el-col>
</el-col>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span v-html="errorReport"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</el-container>

</template>
<script>
  export default {
    inject:['isLogin'],
    name:"Product",
    created(){
        let productId=this.$route.query.productId;
        this.$http.get("product/"+productId)
        .then((response)=>{
            this.product=response["data"].data;
            // console.log(this.product)
        });
    },
    data(){
        return{
            product:null,
            num:1,
            dialogVisible:false,
            errorReport:"",
            isAble:true,
        }
    },
    methods: {

      shopBuy(){
        let valid=this.isLogin();
        if(!valid){
          this.$router.push("/login/");
          return
        }
        // console.log(this.product.productId,this.num);
        let data={"productId":this.product.productId,"shopNum":this.num};
        this.$http.post("/shopcart/addShopCart",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
        .then((response)=>{
          console.log(response)
          let result=response.data;
          if(result.errorCode==0){
            this.errorReport="添加成功";
            this.dialogVisible=true;
            setTimeout(()=>{ this.$router.push("/shopcart"); }, 1000);

          }else{
            this.errorReport=response.data.message;
            this.dialogVisible=true;
            if(result.errorCode==666){
              setTimeout(()=>{ this.$router.push("/login"); }, 1000);
              return
            }
            return
          }
        })
        
      },
      shopAdd(){
        let valid=this.isLogin();
        // let valid=true;
        if(!valid){
          this.$router.push("/login/");
          return
        }
        console.log("add");
        // console.log(this.product.productId,this.num);
        let data={"productId":this.product.productId,"shopNum":this.num};
        this.$http.post("/shopcart/addShopCart",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
        .then((response)=>{
          console.log(response)
          let result=response.data;
          if(result.errorCode==0){
            this.errorReport="添加成功";
            this.dialogVisible=true;
          }else{
            this.errorReport=response.data.message;
            this.dialogVisible=true;
            if(result.errorCode==666){
              setTimeout(()=>{ this.$router.push("/login"); }, 1000);
            }
          }
        })
      }
    }
  }
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>