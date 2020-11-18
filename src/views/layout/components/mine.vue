<template>
  <!-- https://toutiao.m.lipengzhou.com/img/banner.d43e3812.png -->
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell title="单元格" value="内容" class="base-info" :border="false" center>
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div slot="title" class="name">{{userInfo.name}}</div>
        <van-button round class="update-btn">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item  class="data-info-item">
          <div solt="text" style="text-align:center;">
            <div class="count">{{userInfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div solt="text" style="text-align:center;">
            <div class="count">{{userInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div solt="text" style="text-align:center;">
            <div class="count">{{userInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item  class="data-info-item">
          <div solt="text" style="text-align:center;">
            <div class="count">{{userInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="../../../assets/mobile.png">
      </div>
      <div class="text">登陆 / 注册</div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item icon="shoucang" text="收藏" icon-prefix="toutiao" class="nav-grid-item"/>
      <van-grid-item icon="lishi" text="历史" icon-prefix="toutiao" class="nav-grid-item"/>
    </van-grid>
    <van-cell title="消息通知" is-link to="/"></van-cell>
    <van-cell title="小智同学" is-link to="/" class="mb-4"></van-cell>
    <van-cell title="退出登陆" class="logout-cell" v-if="user" @click="onLogout"></van-cell>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getUserInfo} from '../../../api/user'
export default {
  data(){
    return {
      userInfo:{}
    }
  },
  created(){
    getUserInfo().then(res=>{
      this.userInfo = res.data.data
    }).catch(err=>{
      console.log(err)
    })
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    onLogout(){
      this.$dialog.confirm({
        title: '温馨提示',
        message: '是否立即退出？',
      }).then(() => {
          this.$store.commit('setUser',null)
      }).catch(() => {
          // on cancel
      });
    }
  }
}

</script>
<style scoped lang="less">
.my-container{
  .my-info{
    background:url('https://toutiao.m.lipengzhou.com/img/banner.d43e3812.png') no-repeat;
    background-size: cover;
    .base-info{
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar{
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .update-btn{
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
      .name{
        font-size: 15px;
        color: #fff;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #fff;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
        }
      } 
    }
    /deep/ .van-grid-item__content{
      background-color: unset;
    }   
  }
  .not-login{
    height: 180px;
    background:url('https://toutiao.m.lipengzhou.com/img/banner.d43e3812.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile{
      width: 66px;
      height: 66px;
    }
    .text{
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/ .nav-grid{
    .nav-grid-item{
      height: 70px;
      /deep/ .toutiao{
        font-size: 22px;  
      }
      /deep/ .toutiao-shoucang{
        color: #eb5253;
      }
      /deep/ .toutiao-lishi{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}
</style>