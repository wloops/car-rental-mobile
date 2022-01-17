<template>
  <div class="orderRules">
    <div class="nav">
      <van-nav-bar title="规则说明" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="tabs">
      <van-tabs v-model="active" sticky>
        <van-tab title="订单取消规则">
          <div class="cancelRules">
            <van-grid :column-num="3">
              <van-grid-item text="租车产品" />
              <van-grid-item text="预计取车前4小时(含)以上" />
              <van-grid-item text="预计取车不足4小时" />
              <van-grid-item
                v-for="value in 6"
                :key="value"
                icon="photo-o"
                text="文字"
              />
            </van-grid>
          </div>
        </van-tab>
        <van-tab title="订单修改规则">
          <div class="alterRules"></div>
          订单修改规则 内容
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { NavBar, Tab, Tabs, Grid, GridItem } from 'vant'
export default {
  name: 'orderRules',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
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
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="less"></style>
