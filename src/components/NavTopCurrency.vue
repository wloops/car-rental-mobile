<template>
  <div class="NavTopCurrency">
    <div class="navTop">
      <!-- <van-cell-group> -->
      <van-nav-bar @click-right="toLogin">
        <template #left>
          <span>德保县</span>
        </template>
        <template #title>
          <span class="title">惠租车</span>
        </template>
        <template #right>
          <a>登录</a>
        </template>
      </van-nav-bar>
      <!-- </van-cell-group> -->
    </div>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup } from 'vant'
export default {
  name: 'NavTopCurrency',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped lang="less">
.NavTopCurrency {
  // background: #ffc65f;
  // padding: 0.5rem;
  /deep/ .van-nav-bar__content {
    border: none;
    background: #ffc65f;
  }
  [class*='van-hairline']::after {
    border: none;
  }
  .title {
    font-size: 1.4rem;
    font-weight: bold;
  }
}
</style>
