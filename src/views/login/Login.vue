<template>
  <div>
    <el-card class="login-box">
      <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
      </div>
      <el-tabs stretch type="border-card">
  <el-tab-pane label="登录">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
      </el-form-item>
        <el-button style="left: 0;right:0;" type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      
    </el-form>
  </el-tab-pane>
  <el-tab-pane label="注册">
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" >
      <h3 class="login-title">欢迎注册</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="registerForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="registerForm.password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordConfirm">
        <el-input type="password" placeholder="请再次输入密码" v-model="registerForm.passwordConfirm"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" placeholder="请输入邮箱" v-model="registerForm.email"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="registerForm.gender" label="男" value="男">男</el-radio>
        <el-radio v-model="registerForm.gender" label="女" value="女">女</el-radio>
      </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="registerForm.birthday" type="date" placeholder="选择日期" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input type="text" placeholder="请输入手机号" v-model="registerForm.phone" maxlength="11"/>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input type="text" placeholder="请输入所属国家" v-model="registerForm.country" maxlength="31"/>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input type="text" placeholder="请输入所在省份" v-model="registerForm.province" maxlength="31"/>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input type="text" placeholder="请输入所在城市" v-model="registerForm.city" maxlength="31"/>
      </el-form-item>
      <el-form-item label="县区" prop="county">
        <el-input type="text" placeholder="请输入所在县区" v-model="registerForm.county" maxlength="31"/>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-input type="text" placeholder="请输入详细地址" v-model="registerForm.detail" maxlength="255"/>
      </el-form-item>
        <el-button style="left: 0;right:0;" type="primary" v-on:click="register()">注册</el-button>
    </el-form>
  </el-tab-pane>
</el-tabs>

    </el-card>
    <img src="@/assets/login_center_bg.png" class="login-center-layout">
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span v-html="errorReport"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    name: "Login",
    created(){
      this.reload();
    },
    data() {
      var validatePassConfirm = (rule, value, callback) => {
          if (value !== this.registerForm.password) {
              callback(new Error('两次输入密码不一致!'));
          } else {
              callback();
          }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        registerForm: {
          username: '',
          password: '',
          gender:'男',
          email:'',
          phone:'',
          passwordConfirm:'',
          birthday:new Date(),
          country:'',
          province:'',
          city:'',
          county:'',
          detail:'',
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },
              
        registerRules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ],
          passwordConfirm:[
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            { validator: validatePassConfirm, trigger: 'blur', required: true }
          ],
          email: [
            {required: true, message: '邮箱不可为空', trigger: 'blur'},
            {pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:"邮箱不符合格式",required: true, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机不可为空', trigger: 'blur'},
            {pattern:/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,message:"手机不符合格式",required: true, trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '生日不可为空', trigger: 'blur'}
          ],
          country: [
            {required: true, message: '所在国家不可为空', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '所在省份不可为空', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '所在城市不可为空', trigger: 'blur'}
          ],
          county: [
            {required: true, message: '所在县区不可为空', trigger: 'blur'}
          ],
          detail: [
            {required: true, message: '详细地址不可为空', trigger: 'blur'}
          ]
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }},
        errorReport:"",
        // 对话框显示和隐藏
        dialogVisible: false,
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            var username=this.loginForm.username;
            var password=this.loginForm.password;
            // console.log(username);
            // console.log(password);
            let data={"username":username,"password":password};
            this.$http.post("login",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
            .then(response =>{
              console.log(response)
              console.log(response.headers)
              data=response["data"];
              if(data["errorCode"]==0){
                let allCookies = document.cookie;
                console.log(allCookies)
                this.$cookieStore.setCookie("username",username,3600)
                this.$cookieStore.setCookie("level",data.user.level,3600)
                this.reload();
                // this.$router.push("/");
                this.$router.go(-1);
              }else{
                this.dialogVisible = true;
                this.errorReport=data["message"]
                return false;
              }
              console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
          } else {
            this.errorReport="请输入用户名或密码"
            this.dialogVisible = true;
            return false;
          }
        });
      },
      register(){
        this.$refs["registerForm"].validate((valid) => {
          if (valid) {
            console.log(this.registerForm.birthday)

            let data={
              "username":this.registerForm.username,
              "password":this.registerForm.password,
              "email":this.registerForm.email,
              "gender":this.registerForm.gender,
              "phone":this.registerForm.phone,
              "birthday":this.registerForm.birthday.toLocaleDateString().replace(/\//g,"-"),
              "country":this.registerForm.country,
              "province":this.registerForm.province,
              "city":this.registerForm.city,
              "county":this.registerForm.county,
              "detail":this.registerForm.detail
              };
            console.log(data)
            this.$http.post("register",JSON.stringify(data),{headers:{ 'Content-Type':'application/json' }})
            .then(response =>{
              console.log(response)
              console.log(response.headers)
              data=response["data"];
              if(data["errorCode"]==0){
                let allCookies = document.cookie;
                console.log(allCookies)
                this.$cookieStore.setCookie("username",this.registerForm.username,3600)
                this.$cookieStore.setCookie("level",data.user.level,3600)
                this.reload();
                // this.$router.push("/");
                this.$router.go(-1);
              }else{
                this.dialogVisible = true;
                this.errorReport=data["message"]
                return false;
              }
              console.log(response)
            })
            .catch(function (error) {
              console.log(error);
            });
          } else {
            this.errorReport="请输入完整信息"
            this.dialogVisible = true;
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    position: absolute;
    width: 350px;
    left: 0;
    right: 0;
    top: 0;
    margin: 190px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }

</style>