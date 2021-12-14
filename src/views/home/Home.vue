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
            <van-cell title="选择日期区间" :value="date" @click="show = true" />
          </van-tab>
          <van-tab title="个人租">
            <!-- <rental-select-time></rental-select-time> -->
            <van-cell title="选择日期区间-tint" :value="date" @click="showPicker" />
          </van-tab>
        </van-tabs>
        <van-calendar
          v-model="show"
          type="range"
          position="bottom"
          allow-same-day
          confirm-text="完成"
          confirm-disabled-text="请选择结束时间"
          :formatter="formatter"
          @confirm="onConfirm"
        />
        <tint-datetime-picker ref="tintPicker"></tint-datetime-picker>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import { rentalSelectTime } from '@/views/home/components/rentalSelectTime.vue'
import TintDatetimePicker from '@/components/TintDatetimePicker.vue'

import { NavBar, Tab, Tabs, Cell, CellGroup, Calendar } from 'vant'

export default {
  name: 'Home',
  components: {
    // rentalSelectTime,
    TintDatetimePicker,

    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Calendar.name]: Calendar,
  },
  data() {
    return {
      tabsActive: 0,
      date: '',
      show: false,
    }
  },
  methods: {
    showPicker() {
      this.$refs.tintPicker.showView()
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    formatter(day) {
      // const month = day.date.getMonth() + 1
      // const date = day.date.getDate()
      const today = this.formatDate(new Date(new Date().toLocaleDateString()))
      const dayday = this.formatDate(day.date)

      console.log(dayday)
      if (day.type === 'start') {
        day.bottomInfo = '取车'
      } else if (day.type === 'end') {
        day.bottomInfo = '还车'
      } else if (day.type === 'start-end') {
        day.bottomInfo = '取车/还车'
      }

      if (dayday === today) {
        day.topInfo = '今天'
      }

      return day
    },
    onConfirm(date) {
      const [start, end] = date
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
    },
  },
}
</script>

<style long="less">
.content {
  padding: 16px 16px 20px;
}
</style>
