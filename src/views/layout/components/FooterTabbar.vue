<template>
  <div class="FooterTabbar">
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">惠租车</van-tabbar-item>
      <van-tabbar-item icon="orders-o" dot>订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar> -->
    <!-- 路由模式 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">惠租车</van-tabbar-item>
      <van-tabbar-item replace to="/orders" icon="orders-o"
        >订单</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'FooterTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  props: {},
  data() {
    return {
      active: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less"></style>
