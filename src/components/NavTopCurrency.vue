<template>
  <div class="NavTopCurrency">
    <div class="navTop">
      <!-- <van-cell-group> -->
      <van-nav-bar title="惠租车">
        <template #left>
          <span>德保县</span>
        </template>
        <template #right>
          <span>注册/登录</span>
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
  methods: {},
}
</script>

<style scoped lang="less">
.NavTopCurrency {
  // background: #ffc65f;
  padding: 0.5rem;
  /deep/ .van-nav-bar__content {
    border: none;
    background: #ffc65f;
  }
  [class*='van-hairline']::after {
    border: none;
  }
}
</style>
