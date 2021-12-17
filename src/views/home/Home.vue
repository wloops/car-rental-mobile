<template>
  <div class="home">
    <div class="homeTopAll">
      <!-- 顶部标题导航 start -->
      <nav-top-currency></nav-top-currency>
      <!-- 顶部标题导航 end -->

      <div class="switchingRentalMode">
        <van-cell-group inset>
          <van-tabs v-model="tabsActive" animated @click="tabsChange">
            <van-tab title="单位租">
              <date-time-section
                :value="date"
                @click.native="showPicker"
              ></date-time-section>
            </van-tab>
            <van-tab title="个人租">
              <date-time-section
                :value="date"
                @click.native="showPicker"
              ></date-time-section>
            </van-tab>
          </van-tabs>
          <van-button color="#ffc65f" block size="small" to="model"
            >去选车</van-button
          >
          <tint-datetime-picker ref="tintPicker"></tint-datetime-picker>
        </van-cell-group>
      </div>
    </div>

    <div class="swipeAD">
      <swipe-ad></swipe-ad>
    </div>

    <div class="otherModule">
      <van-cell-group inset>
        <van-grid clickable :column-num="4">
          <van-grid-item icon="question" text="常见问题" to="/problems" />
          <van-grid-item
            icon="smile-comment"
            text="客户反馈"
            route
            to="/feedbacks"
          />
          <van-grid-item icon="todo-list" text="租车引导" route to="/guide" />
          <van-grid-item
            color="red"
            icon="friends"
            text="联系我们"
            route
            to="/contactUs"
          />
        </van-grid>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavTopCurrency from '../../components/NavTopCurrency.vue'
import TintDatetimePicker from '@/components/TintDatetimePicker.vue'
import DateTimeSection from '@/components/DateTimeSection.vue'
import SwipeAd from '@/views/home/components/SwipeAd.vue'

import { mapGetters, mapMutations } from 'vuex'

import {
  NavBar,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  Calendar,
  Button,
  Col,
  Row,
  Icon,
  Grid,
  GridItem,
} from 'vant'

export default {
  name: 'Home',
  components: {
    NavTopCurrency,
    TintDatetimePicker,
    DateTimeSection,
    SwipeAd,

    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Calendar.name]: Calendar,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      tabsActive: 0,
      date: '',
      show: false,
    }
  },

  methods: {
    ...mapMutations({
      // 将改变store中值的方法映射到当前组件的methods中
      setTabName: 'setTabName',
    }),
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

      // console.log(dayday)
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
      console.log(start, end)
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
      console.log(this.date)
    },
    tabsChange(title, name) {
      this.setTabName(name)
    },
  },
}
</script>

<style scoped lang="less">
.homeTopAll {
  background: #ffc65f;
  border-radius: 0 0 5% 5%;
  padding: 0.5rem;
}
.switchingRentalMode .van-button--block {
  display: block;
  width: 80%;
  margin: 0 10% 3%;
  font-size: 0.9rem;
  font-weight: 600;
}
.otherModule {
  color: #a7a9a8;
  /deep/ .van-grid-item__icon {
    font-size: 28px;
    color: #423d5e;
  }
}

.content {
  padding: 16px 16px 20px;
}
</style>
