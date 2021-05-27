<template>
<el-container>
<h1 v-if="product==null">对不起，没有此订单</h1>
<el-col :span="24" v-if="product!=null">
<el-col :span="24">
    <h2 style="text-align:left">{{product.productName}}</h2>
    <el-col :span="24">
        <el-divider><i class="el-icon-grape"></i></el-divider>
    <el-col :span="6">
    <img :src="product.productImg" @click="goToProductDetail(product.productId)" width="100%" height="width" style="cursor:pointer">
    </el-col>
    <el-col :span="12" style="margin-left:20px">
    <p style="text-align:left">单价<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+product.buyPrice}}</span></p>
    <p style="text-align:left">数量<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+product.buyNum}}</span></p>
    <p style="text-align:left">总价<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+product.buyTotalCost}}</span></p>
    <p style="text-align:left">消耗积分<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+product.usedPoint}}</span></p>
    <p style="text-align:left">状态<span style="color:red;font-size:20px">{{"&nbsp&nbsp&nbsp "+product.status}}</span></p>
    <p v-show="isRefunding" style="text-align:left">退款理由<span style="color:red;font-size:20px">{{"&nbsp&nbsp&nbsp "+product.spareCharOne}}</span></p>
    <el-row v-show="hasComplete" style="text-align:left">
        <el-button type="primary" round :disabled="receiveButton" @click="receive()">确认收货</el-button>
        <el-button type="success" round :disabled="refundButton" @click="refund()">退款</el-button>
    </el-row>
    </el-col>
    </el-col>
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
        let valid=this.isLogin();
        if(!valid){
          this.$router.push("/login/");
          return
        }
        let orderId=this.$route.query.orderId;
        let data={"orderId":orderId}
        console.log(orderId)
        this.$http.post("order/byId",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
        .then((response)=>{
          console.log(response)
          if(response.data.errorCode==666){
            this.$router.push("/login")
          }else if(response.data.errorCode==0){
            this.product=response["data"].data;
            console.log(this.product)
            let status=this.product.status;
            // console.log(status)
            this.isRefunding=( status=="已退款" || status=="退款中")
            this.receiveButton= (status=="已完成" || status=="已退款" || status=="退款中")
            this.refundButton= (status=="已完成" || status=="已退款" || status=="退款中")
            this.hasComplete= (status!="已完成" && status!="已退款" && status!="退款中")
            // console.log(this.product)
          }
        });
    },
    data(){
        return{
            product:null,
            num:1,
            dialogVisible:false,
            errorReport:"",
            isAble:true,
            receiveButton:false,
            refundButton:false,
            hasComplete:true,
            isRefunding:false,
        }
    },
    methods: {
      goToProductDetail(id){
        // console.log(id)
        this.$router.push({path:"/product",query:{productId:id}})
      },
      receive(){
        if( !this.isLogin()){
            this.$router.push("/login/");
            return
        }
        let data={"orderId":this.product.id}
          this.$http.post("/order/receive",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
          .then((response)=>{
            let errorCode=response.data.errorCode;
            if(errorCode==666){
              this.$router.push("/login/");
              return false;
            }else if(errorCode!=0){
              this.errorReport=response.data.message;
              this.dialogVisible=true;
              return false;
            }else{
            this.receiveButton=true;
            this.refundButton=true;
            this.hasComplete=false;
            this.product.status="已完成"
            }
          })
      },
      refund() {
        this.$prompt('请输入退款理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value==null){
            this.$message({
            type: 'info',
            message: '没有输入退款理由'
          });
          return   
          }
          let data={"orderId":this.product.id,"reason":value}
          console.log(data)
          this.$http.post("/order/refund",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
          .then((response)=>{
            let errorCode=response.data.errorCode;
            if(errorCode==666){
              this.$router.push("/login/");
              return false;
            }else if(errorCode!=0){
              this.errorReport=response.data.message;
              this.dialogVisible=true;
              return false;
            }else{
            this.receiveButton=true;
            this.refundButton=true;
            this.hasComplete=false;
            this.product.status="退款中";
            this.product.spareCharOne=value;
            this.isRefunding=true;
            }
          });
          // this.$message({
          //   type: 'success',
          //   message: '你的邮箱是: ' + value
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '没有输入退款理由'
          });       
        });
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