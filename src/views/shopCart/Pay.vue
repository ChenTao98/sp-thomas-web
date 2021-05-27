<template>
<el-container>
<h1 v-if="shopCartList.length==0">没有需要结算的商品</h1>
<el-col :span="24" v-if="shopCartList.length!=0">
<el-col :span="24">
  <el-table
    :data="shopCartList"
    tooltip-effect="dark"
    style="width: 100%"
    height="80vh"
    @selection-change="handleSelectionChange">
    <el-table-column
      label="品名"
      width="120">
      <template slot-scope="scope"><span style="cursor:pointer">{{scope.row.name}}</span></template>
    </el-table-column>
    <el-table-column
      label="图片"
      width="150">
       <template slot-scope="scope"><img  style="cursor:pointer" :src="scope.row.img" width="120" height="120"></template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="120">
      <template slot-scope="scope">{{ "￥"+(scope.row.price*scope.row.priceMul).toFixed(2) }}</template>
    </el-table-column>
    <el-table-column
      label="购买数量"
      width="120">
      <template slot-scope="scope"><span>{{scope.row.shopNum}}</span></template>
    </el-table-column>
    <el-table-column
      label="总价"
      width="120">
      <template slot-scope="scope">{{ "￥"+ (parseFloat((scope.row.price*scope.row.priceMul).toFixed(2))*scope.row.shopNum).toFixed(2) }}</template>
    </el-table-column>

  </el-table>
  <div style="text-align:left; margin-top: 20px">
    <span style="margin-right:20px;color:red">{{"总价：￥"+total_cost}}</span>
    <el-button @click="pay()" round type="primary">支付</el-button>
    <el-checkbox v-model="pointChecked" style="margin-left:20px">使用积分抵扣</el-checkbox>
    <span style="margin-left:20px">地址：
      <el-select v-model="addressSelect" placeholder="请选择" style="width:30%">
    <el-option
      v-for="item in addressList"
      :key="item.id"
      :label="item.country+item.province+item.city+item.county+item.detail +'&nbsp&nbsp&nbsp收货人：'+item.receiverName +'&nbsp&nbsp&nbsp电话：'+item.receiverPhone"
      :value="item.id">
      <span>{{item.country+item.province+item.city+item.county+item.detail+'&nbsp&nbsp&nbsp收货人：'+item.receiverName +'&nbsp&nbsp&nbsp电话：'+item.receiverPhone}}</span>
    </el-option>
  </el-select></span>
    <!-- <el-button @click="toggleSelection()">取消选择</el-button> -->
  </div>

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
    name:"Pay",
    created(){
        if( !this.isLogin()){
            this.$router.push("/login/");
            return
        }
        let shopCartIdList=this.$route.params.shopCartId
        if(typeof(shopCartIdList) == "undefined"){
          return false
        }
        let data={"shopCartIdList":JSON.parse(shopCartIdList)}
        this.$http.post("shopcart/getShopCartByIdList",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
        .then((response)=>{
          let data=response.data
          if(data.errorCode==666){
            this.$router.push("/login")
          }else{
            this.shopCartList=response["data"].data;
            let total_cost=0;
            for(let i=0;i<this.shopCartList.length;i++){
              let cur_shopcart=this.shopCartList[i];
              total_cost+=parseFloat((parseFloat((cur_shopcart.price*cur_shopcart.priceMul).toFixed(2))*cur_shopcart.shopNum).toFixed(2));
            }
            this.total_cost=total_cost;}
        });
        this.$http.get("address/userAddress")
        .then((response)=>{
          let data=response.data
          if(data.errorCode==666){
            this.$router.push("/login")
          }else{
            this.addressList=response["data"].data;
            this.addressSelect=this.addressList[0].id;
            }
        });

        // let tableData=[];
        // for(let i=0;i++;i<this.shopCartList.length){
        //     cur_data=this.shopCartList[i];
        //     tableData.push({"productId":cur_data.productId,"name":cur_data.name,"price":(cur_data.price*cur_data.priceMul).toFixed(2),"shopNum":cur_data.shopNum})
        // }
    },
    data(){
        return{
            shopCartList:[],
            num:1,
            dialogVisible:false,
            errorReport:"",
            buyButtonVisible:false,
            multipleSelection: [],
            pointChecked:false,
            total_cost:0,
            addressList:[],
            addressSelect:"",
        }
    },
    methods: {   
      handleSelectionChange(val) {
        console.log(val)
        this.buyButtonVisible= val.length==0? false:true;
        this.multipleSelection = val;
      },
      pay(){
          // console.log(this.shopCartList)
          // console.log(this.pointChecked)
          let payShopCartIdList=[];
          for(let i=0;i<this.shopCartList.length;i++){
            payShopCartIdList.push(this.shopCartList[i].shopCartId);
          }
          console.log(payShopCartIdList);
          console.log(this.addressSelect)

          let data={"shopCartIdList":payShopCartIdList,"addressId":this.addressSelect,"usePoint":this.pointChecked}
          this.$http.post("order/pay",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
          .then((response)=>{
            console.log(response)
            let data=response.data
            if(data.errorCode==666){
              this.$router.push("/login")
            }else if(data.errorCode!=0){
            this.errorReport=response.data.message;
            this.dialogVisible=true;
            }else{
            this.errorReport=data.message;
            this.dialogVisible=true;
             setTimeout(()=>{ this.$router.push("/order"); }, 3000);
            }
          });
      },
      goToProductDetail(id){
        // console.log(id)
        this.$router.push({path:"/product",query:{productId:id}})
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