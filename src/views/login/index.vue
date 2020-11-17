<template>
  <div>
    <van-nav-bar
      class="van-nav-bar"
      title="欢迎登陆"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed" validate-first ref="loginForm">
        <van-cell-group>
          <van-field
            v-model="user.mobile"
            left-icon="shouji"
            icon-prefix="toutiao"
            placeholder="请输入手机号"
            :rules="loginFormRules.mobile"
            name="mobile"
          />
          <van-field
            v-model="user.code"
            clearable
            left-icon="yanzhengma"
            icon-prefix="toutiao"
            placeholder="请输入验证码"
            :rules="loginFormRules.code"
            name='code'
          >
            <template #button>
              <van-count-down :time="60*1000" :format="'ss s'" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
              <van-button size="small" round class="send-btn" @click="onSendSms" native-type="button" v-else :loading="isSendSmsLoading">获取验证码</van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="btnBox">
          <van-button type="info" block style="background-color:#6db4fb;">登陆</van-button>
        </div>
   </van-form>
  </div>
</template>

<script>
import {login,sendSms} from '../../api/user'
// import {Toast} from 'vant'
export default {
  data(){
    return {
      loginFormRules:{
        mobile:[
          { required: true, message: '请输入手机号' },
          { pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号' }
        ],
        code:[
          { required: true, message: '请输入验证码' },
          { pattern:/^\d{6}$/, message: '验证码为六位数' }
        ]
      },
      user:{
        mobile:'15982545746',
        code:'246810'
      },
      isCountDownShow:false,
      isSendSmsLoading:false
    }
  },
  methods:{
    onClickLeft(){

    },
    onSendSms(){
      console.log('发送验证码')
      this.$refs.loginForm.validate('mobile').then(data=>{
        this.isCountDownShow = true
        this.isSendSmsLoading = true
        sendSms(this.user.mobile).then(res=>{
          console.log(res)
          this.isSendSmsLoading = false
        }).catch(err=>{
          console.log(err)
          this.isSendSmsLoading = false
        })
      }).catch(err=>{
        console.log(err)
        this.$toast.fail(err.message)
      })
    },
    onFailed(err){
      if(err.errors[0]){
        this.$toast(err.errors[0].message)
      }
    },
    onLogin(){
      this.$toast.loading({
        message:'登陆中...',
        forbidClick:true,
        duration:0
      })
      login(this.user).then(res=>{
        this.$store.commit('setUser',res.data.data)
        this.$toast.success('登陆成功')
      }).catch(err=>{
        console.log(err)
        this.$toast.fail('登陆失败')
      })
    }
  }
}

</script>
<style scoped lang="less">
  .btnBox{
    padding: 26px 16px;
  }
  .van-button__text{
    font-size: 15px;
  }
 
  .send-btn{
    width: 90px;
    height: 23px;
    background-color: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666666;
    }
  }
  
</style>