<template>
<el-container>
<h1 v-if="orderList.length==0">你还没有卖过任何东西哦</h1>
<el-col :span="24" v-if="orderList.length!=0">
<el-col :span="24">
  <h3>未完成订单</h3>
  <el-table
    :data="unCompleteOrder"
    :stripe="true"
    tooltip-effect="dark"
    row-class-name="uncomplete-row"
    style="width: 95%;margin-left:auto;margin-right:auto;"
    height="80vh">
    <el-table-column
      label="品名"
      width="120"
      align="center">
      <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
    </el-table-column>
    <el-table-column
      label="图片"
      width="150">
       <template slot-scope="scope"><img :src="scope.row.productImg" width="120" height="120"></template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="120">
      <template slot-scope="scope">{{ "￥"+scope.row.buyPrice }}</template>
    </el-table-column>
    <el-table-column
      label="购买数量"
      width="120">
      <template slot-scope="scope"><span>{{scope.row.buyNum}}</span></template>
      </el-table-column>
    <el-table-column
      label="总价"
      width="120">
      <template slot-scope="scope"><span>{{ "￥"+ scope.row.buyTotalCost }}</span></template>
    </el-table-column>
    <el-table-column
      label="订单状态"
      width="120">
      <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
    </el-table-column>
    <el-table-column
      label="详情"
      width="120">
      <template slot-scope="scope"><el-button @click="goAdminOrderDetail(scope.row.id)" round type="primary">详情</el-button></template>
    </el-table-column>
  </el-table>
  <br>
<el-divider><i class="el-icon-grape"></i></el-divider>
  <br>
  <h3>退款中订单</h3>
    <el-table
    :data="refundingOrder"
    :stripe="true"
    tooltip-effect="dark"
    row-class-name="refunding-row"
    style="width: 95%;margin-left:auto;margin-right:auto;"
    height="80vh">
    <el-table-column
      label="品名"
      width="120"
      align="center">
      <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
    </el-table-column>
    <el-table-column
      label="图片"
      width="150">
       <template slot-scope="scope"><img :src="scope.row.productImg" width="120" height="120"></template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="120">
      <template slot-scope="scope">{{ "￥"+scope.row.buyPrice }}</template>
    </el-table-column>
    <el-table-column
      label="购买数量"
      width="120">
      <template slot-scope="scope"><span>{{scope.row.buyNum}}</span></template>
      </el-table-column>
    <el-table-column
      label="总价"
      width="120">
      <template slot-scope="scope"><span>{{ "￥"+ scope.row.buyTotalCost }}</span></template>
    </el-table-column>
    <el-table-column
      label="订单状态"
      width="120">
      <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
    </el-table-column>
    <el-table-column
      label="退款理由"
      width="240">
      <template slot-scope="scope"><span>{{ scope.row.spareCharOne }}</span></template>
      </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">        <el-button
          size="mini" round
          @click="agree(scope.row.id,scope.$index)">同意退款</el-button>
        <el-button
          size="mini" round
          type="danger"
          @click="reject(scope.row.id,scope.$index)">拒绝退款</el-button></template>
    </el-table-column>
    <el-table-column
      label="详情"
      width="120">
      <template slot-scope="scope"><el-button @click="goAdminOrderDetail(scope.row.id)" round type="primary">详情</el-button></template>
    </el-table-column>
  </el-table>
  <br>
<el-divider><i class="el-icon-grape"></i></el-divider>
  <br>
  <h3>已完成订单</h3>
    <el-table
    :data="completeOrder"
    tooltip-effect="dark"
    :stripe="true"
    style="width: 95%;margin-left:auto;margin-right:auto;"
    row-class-name="success-row"
    height="80vh">
    <el-table-column
      label="品名"
      width="120">
      <template slot-scope="scope"><span>{{scope.row.productName}}</span></template>
    </el-table-column>
    <el-table-column
      label="图片"
      width="150">
       <template slot-scope="scope"><img :src="scope.row.productImg" width="120" height="120"></template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="120">
      <template slot-scope="scope">{{ "￥"+scope.row.buyPrice }}</template>
    </el-table-column>
    <el-table-column
      label="购买数量"
      width="120">
      <template slot-scope="scope"><span>{{scope.row.buyNum}}</span></template>
      </el-table-column>
    <el-table-column
      label="总价"
      width="120">
      <template slot-scope="scope"><span>{{ "￥"+ scope.row.buyTotalCost }}</span></template>
    </el-table-column>
    <el-table-column
      label="订单状态"
      width="120">
      <template slot-scope="scope"><span>{{ scope.row.status }}</span></template>
    </el-table-column>
        <el-table-column
      label="详情"
      width="120">
      <template slot-scope="scope"><el-button @click="goAdminOrderDetail(scope.row.id)" round type="primary">详情</el-button></template>
    </el-table-column>
  </el-table>

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
    name:"Order",
    created(){
        if( !this.isLogin()){
            this.$router.push("/login/");
            return
        }
        this.$http.get("/admin/all")
        .then((response)=>{
          let data=response.data
          if(data.errorCode==666){
            this.$router.push("/login")
          }else{
            this.orderList=response["data"].data;
            console.log(this.orderList)
            this.completeOrder=[];
            this.unCompleteOrder=[];
            this.refundingOrder=[];
            for(let i=0;i<this.orderList.length;i++){
                let cur_order=this.orderList[i];
                if(cur_order.status=="已完成" || cur_order.status=="已退款"){
                    this.completeOrder.push(cur_order)
                }else if(cur_order.status=="退款中"){
                    this.refundingOrder.push(cur_order);
                }else{
                    this.unCompleteOrder.push(cur_order)
                }
            }
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
            orderList:[],
            completeOrder:[],
            unCompleteOrder:[],
            refundingOrder:[],
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
      agree(id,index){
        console.log(id,index)
        let data={"orderId":id}
        this.$http.post("/admin/agreeRefund",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
        .then((response)=>{
          let errorCode=response.data.errorCode;
          if(errorCode==666){
            this.$router.push("/login");
            return;
          }else if(errorCode!=0){
            this.errorReport=response.data.message;
            this.dialogVisible=true
            return;
          }else{
            this.errorReport=response.data.message;
            this.dialogVisible=true
            let cur_order=this.refundingOrder[index]
            cur_order.status="已退款"
            this.completeOrder.push(cur_order)
            this.refundingOrder.splice(index,1)
            return;
          }
        })

      },
      reject(id,index){
        console.log(id)
        let data={"orderId":id}
        this.$http.post("/admin/rejectRefund",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
        .then((response)=>{
          let errorCode=response.data.errorCode;
          if(errorCode==666){
            this.$router.push("/login");
            return;
          }else if(errorCode!=0){
            this.errorReport=response.data.message;
            this.dialogVisible=true
            return;
          }else{
            this.errorReport=response.data.message;
            this.dialogVisible=true
            let cur_order=this.refundingOrder[index]
            cur_order.status="配送中"
            this.unCompleteOrder.push(cur_order)
            this.refundingOrder.splice(index,1)
            return;
          }
        })
      },
      goAdminOrderDetail(id){
        this.$router.push({path:"/adminorderdetail",query:{orderId:id}})
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
  .el-table .uncomplete-row {
    background: #f0f9eb;
  }
  .el-table .refunding-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #ECFFFF	;
  }
</style>