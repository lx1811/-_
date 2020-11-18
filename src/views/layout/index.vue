<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="shouye" to="/home" icon-prefix ="toutiao">首页</van-tabbar-item>
      <van-tabbar-item icon="wenda" to="/QA" icon-prefix ="toutiao">问答</van-tabbar-item>
      <van-tabbar-item icon="shipin" to="/video" icon-prefix ="toutiao">视频</van-tabbar-item>
      <van-tabbar-item icon="wode" to="/mine" icon-prefix ="toutiao">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:0
    }
  }
}

</script>
<style scoped lang="less">
</style>