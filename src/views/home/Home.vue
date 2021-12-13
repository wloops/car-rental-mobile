<template>
  <div class="home">
    <div class="homeTopAll">
      <div class="navTop">
        <van-nav-bar title="惠租车" left-arrow>
          <template #left>
            <span>德保县</span>
          </template>
          <template #right>
            <span>注册/登录</span>
          </template>
        </van-nav-bar>
      </div>
      <div class="switchingRentalMode">
        <van-tabs v-model="tabsActive" animated>
          <van-tab title="单位租">
            <!-- <rental-select-time></rental-select-time> -->
            <van-cell title="选择时间" is-link @click="show = !show" />
            <van-action-sheet v-model="show" title="标题">
              <div class="content">内容</div>
            </van-action-sheet>
          </van-tab>
          <van-tab title="个人租">
            <!-- <rental-select-time></rental-select-time> -->
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { rentalSelectTime } from '@/views/home/components/rentalSelectTime.vue'

import { NavBar } from 'vant'
import { Tab, Tabs } from 'vant'
import { ActionSheet } from 'vant'

export default {
  name: 'Home',
  components: {
    rentalSelectTime,

    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [ActionSheet.name]: ActionSheet,
  },
  data() {
    return {
      tabsActive: 0,
      show: false,
    }
  },
  methods: {},
}
</script>

<style long="less">
.content {
  padding: 16px 16px 160px;
}
</style>
