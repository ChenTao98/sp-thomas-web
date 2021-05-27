<template>
<el-container>
<h1 v-if="user==null">对不起，没有个人信息</h1>
<el-col :span="24" v-if="user!=null">
<el-col :span="24">
    <h2 style="text-align:left">个人信息</h2>
    <el-col :span="24">
    <el-col :span="12" style="margin-left:20px">
    <p style="text-align:left">账号<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+user.username}}</span></p>
    <p style="text-align:left">邮箱<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+user.email}}</span></p>
    <p style="text-align:left">性别<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+user.sex}}</span></p>
    <p style="text-align:left">生日<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+user.birthday.substring(0,10)}}</span></p>
    <p style="text-align:left">电话<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+user.mobile}}</span></p>
    <p style="text-align:left">积分<span style="font-size:20px">{{"&nbsp&nbsp&nbsp "+user.point}}</span></p>
    </el-col>
    </el-col>
    <div>
      <el-col :span="24">
    <el-divider><i class="el-icon-grape"></i></el-divider>
    <h3 style="text-align:left">收货地址</h3>
      <el-table
    :data="addressList"
    tooltip-effect="dark"
    style="width: 100%"
    height="80vh"
    :stripe="true">
    <el-table-column
      label="收货人"
      width="100">
      <template slot-scope="scope"><span>{{scope.row.receiverName}}</span></template>
    </el-table-column>
        <el-table-column
      label="电话"
      width="120">
      <template slot-scope="scope"><span>{{scope.row.receiverPhone}}</span></template>
    </el-table-column>
    <el-table-column
      label="国家"
      width="100">
      <template slot-scope="scope"><span>{{scope.row.country}}</span></template>
    </el-table-column>
    <el-table-column
      label="省份"
      width="100">
      <template slot-scope="scope"><span>{{scope.row.province}}</span></template>
    </el-table-column>
      <el-table-column
      label="城市"
      width="100">
      <template slot-scope="scope"><span>{{scope.row.city}}</span></template>
    </el-table-column>
    <el-table-column
      label="县区"
      width="100">
      <template slot-scope="scope"><span>{{scope.row.county}}</span></template>
    </el-table-column>
    <el-table-column
      label="详细地址"
      width="200">
      <template slot-scope="scope"><span>{{scope.row.detail}}</span></template>
    </el-table-column>

  </el-table>
  </el-col>
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
    name:"Product",
    created(){
        let valid=this.isLogin();
        if(!valid){
          this.$router.push("/login/");
          return
        }
        this.$http.get("user/myinfo")
        .then((response)=>{
          console.log(response)
          if(response.data.errorCode==666){
            this.$router.push("/login")
          }else if(response.data.errorCode==0){
            this.user=response["data"].user;
            this.addressList=response["data"].addressList;
            console.log(this.user);
          }
        });
    },
    data(){
        return{
            user:null,
            num:1,
            dialogVisible:false,
            errorReport:"",
            addressList:[],
        }
    },
    methods: {

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