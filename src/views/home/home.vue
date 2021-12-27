<!-- 租车主页 -->
<template>
  <div class="home">
    <div class="homeTopAll">
      <!-- 顶部标题导航 start -->
      <nav-top-currency></nav-top-currency>
      <!-- 顶部标题导航 end -->

      <div class="switchingRentalMode">
        <van-cell-group inset>
          <van-tabs v-model="tabsActiveName" animated @click="tabsChange">
            <van-tab title="单位租" name="单位租">
              <date-time-section
                :value="date"
                @click.native="showPicker"
              ></date-time-section>
            </van-tab>
            <van-tab title="个人租" name="个人租">
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

    <div class="carRecommend">
      <div class="recommendTitle">好车推荐</div>
      <span class="recommendText">超值特惠，出行首选</span>
      <van-grid :column-num="2" :gutter="10" clickable>
        <van-grid-item @click="showItem">
          <van-image
            fit="contain"
            src="http://res.tintjs.com/img/宝沃BX7.png"
          />
          <div class="recommendPrice">
            <span class="oneDay">短期优惠</span>
            <van-button
              color="linear-gradient(to right, #fff ,#f8c764)"
              size="mini"
            >
              ￥100
            </van-button>
          </div>
        </van-grid-item>
        <van-grid-item @click="showItem">
          <van-image
            fit="contain"
            src="http://res.tintjs.com/img/别克GL8.png"
          />
          <div class="recommendPrice">
            <span class="oneDay">短期优惠</span>
            <van-button
              color="linear-gradient(to right, #fff ,#f8c764)"
              size="mini"
            >
              ￥100
            </van-button>
          </div>
        </van-grid-item>
        <van-grid-item @click="showItem">
          <van-image fit="contain" src="http://res.tintjs.com/img/奥迪A6.png" />
          <div class="recommendPrice">
            <span class="oneDay">短期优惠</span>
            <van-button
              color="linear-gradient(to right, #fff ,#f8c764)"
              size="mini"
            >
              ￥100
            </van-button>
          </div>
        </van-grid-item>
        <van-grid-item @click="showItem">
          <van-image
            fit="contain"
            src="http://res.tintjs.com/img/沃尔沃S90.png"
          />
          <div class="recommendPrice">
            <span class="oneDay">短期优惠</span>
            <van-button
              color="linear-gradient(to right, #fff ,#f8c764)"
              size="mini"
            >
              ￥100
            </van-button>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 车辆详情 -->
    <div class="carDetails">
      <car-details ref="showCarDetails"></car-details>
    </div>
    <div style="height: 5rem"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavTopCurrency from '@/components/NavTopCurrency.vue'
import TintDatetimePicker from '@/components/TintDatetimePicker.vue'
import DateTimeSection from '@/components/DateTimeSection.vue'
import SwipeAd from '@/views/home/components/SwipeAd.vue'
import CarDetails from '@/components/CarDetails.vue'

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
  Image as VanImage,
} from 'vant'

export default {
  name: 'Home',
  components: {
    NavTopCurrency,
    TintDatetimePicker,
    DateTimeSection,
    SwipeAd,
    CarDetails,

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
    [VanImage.name]: VanImage,
  },
  data() {
    return {
      tabsActiveName: '单位租',
      date: '',
      show: false,
    }
  },
  watch: {
    // 监听tabsActiveName，并提交到vuex的state中
    tabsActiveName: {
      handler(newValue, oldValue) {
        this.setTabName(newValue)
      },
      immediate: true, // 初始化时立即触发
    },
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
      // this.setTabName(name)
    },
    showItem() {
      this.selectCarItem()
    },
    selectCarItem() {
      // console.log('selectCarItem')
      this.$refs.showCarDetails.showPopup()
    },
  },
}
</script>

<style scoped lang="less">
.homeTopAll {
  background: #ffc65f;
  border-radius: 0 0 5% 5%;
  padding-bottom: 1rem;
}
.switchingRentalMode {
  .van-button--block {
    display: block;
    width: 80%;
    margin: 0 10% 3%;
    font-size: 0.9rem;
    font-weight: 600;
  }
}

.otherModule {
  color: #a7a9a8;
  /deep/ .van-grid-item__icon {
    font-size: 28px;
    color: #423d5e;
  }
}
.carRecommend {
  .recommendTitle {
    font-size: 1.2rem;
    font-weight: 600;
    color: #423d5e;
    margin: 1rem 0 0.5rem 1rem;
  }
  .recommendText {
    font-size: 0.9rem;
    color: #a7a9a8;
    margin-left: 1rem;
    margin-top: -0.5rem;
  }
  .recommendPrice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    // padding: 0.5rem 0;
    .oneDay {
      font-size: 0.7rem;
      color: #a7a9a8;
    }
  }
  .van-image {
    width: 5rem;
    height: 5rem;
  }
  .van-button--default {
    color: #111 !important;
    font-size: 1rem;
    font-weight: 600;
  }

  /deep/ .van-grid-item {
    border-radius: 50%;
  }
}
</style>
