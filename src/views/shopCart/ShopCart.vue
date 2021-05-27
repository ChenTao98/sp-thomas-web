<template>
<el-container>
<h1 v-if="shopCartList.length==0">购物车空空如也</h1>
<el-col :span="24" v-if="shopCartList.length!=0">
<el-col :span="24">
  <el-table
    ref="multipleTable"
    :data="shopCartList"
    tooltip-effect="dark"
    style="width: 100%"
    height="80vh"
    :stripe="true"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="品名"
      width="120">
      <template slot-scope="scope"><span style="cursor:pointer" @click="goToProductDetail(scope.row.productId)">{{scope.row.name}}</span></template>
    </el-table-column>
    <el-table-column
      label="图片"
      width="150">
       <template slot-scope="scope"><img  style="cursor:pointer" :src="scope.row.img" width="120" height="120" @click="goToProductDetail(scope.row.productId)"></template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="120">
      <template slot-scope="scope">{{ "￥"+(scope.row.price*scope.row.priceMul).toFixed(2) }}</template>
    </el-table-column>
    <el-table-column
      label="总价"
      width="120">
      <template slot-scope="scope">{{ "￥"+ (parseFloat((scope.row.price*scope.row.priceMul).toFixed(2))*scope.row.shopNum).toFixed(2) }}</template>
    </el-table-column>
    <el-table-column
      label="购买数量"
      width="200">
      <template slot-scope="scope"> <el-input-number v-model="scope.row.shopNum" :min="1" :max="scope.row.remainNum" @change="shopNumChange(scope.$index)"></el-input-number></template>
    </el-table-column>
    <el-table-column
      label="删除"
      width="200">
      <template slot-scope="scope"> <el-button @click="deleteShopCart(scope.row.shopCartId,scope.$index)" round type="danger">删除</el-button></template>
    </el-table-column>
  </el-table>
  <div style="text-align:left; margin-top: 20px">
    <el-button @click="buy()" v-show="buyButtonVisible" round type="primary">购买选中商品</el-button>
    
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
    name:"ShopCart",
    created(){
        if( !this.isLogin()){
            this.$router.push("/login/");
            return
        }

        this.$http.get("shopcart/all")
        .then((response)=>{
          let data=response.data
          if(data.errorCode==0){
            this.shopCartList=response["data"].data;
          }else if(data.errorCode==666){
            this.$router.push("/login")
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
        }
    },
    methods: {   
      handleSelectionChange(val) {
        // console.log(val)
        this.buyButtonVisible= val.length==0? false:true;
        this.multipleSelection = val;
      },
      buy(){
        console.log(this.multipleSelection)
        let buy_list=this.multipleSelection;
        if(buy_list.length==0){
          return ;
        }
        let buy_id_list=[]
        // console.log(buy_list.length)
        for(let i=0;i<buy_list.length;i++){
          buy_id_list.push(buy_list[i].shopCartId)
          // console.log(i)
        }
        // console.log(buy_id_list)
        this.$router.push({name:"pay",params:{shopCartId:JSON.stringify(buy_id_list)}})
      },
      deleteShopCart(shopCartId,row_num){
          let data={"shopCartId":shopCartId};
          console.log(data);
          this.$http.post("/shopcart/deleteShopCart",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
          .then((response)=>{
            //   console.log(response)
              let result=response.data;
              if(result.errorCode==0){
                  console.log("删除成功");
                  this.shopCartList.splice(row_num,1)
                //   this.errorReport="添加成功";
                //   this.dialogVisible=true;
              }else{
                  console.log("删除失败");

                //   this.errorReport=response.message;
                //   this.dialogVisible=false;
          }
        })
      },
      shopNumChange(row_num){
          let product=this.shopCartList[row_num]
          console.log(row_num);
        //   console.log(product);
          let data={"productId":product.productId,"shopNum":product.shopNum};
          console.log(data);
          this.$http.post("/shopcart/updateShopCart",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
          .then((response)=>{
              console.log(response)
              let result=response.data;
              if(result.errorCode==0){
                  console.log("修改成功");
                //   this.errorReport="添加成功";
                //   this.dialogVisible=true;
              }else{
                  console.log("修改失败");

                //   this.errorReport=response.message;
                //   this.dialogVisible=false;
          }
        })
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