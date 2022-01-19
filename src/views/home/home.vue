<!-- 租车主页 -->
<template>
  <div class="home">
    <div class="homeTopAll">
      <!-- 顶部标题导航 start -->
      <nav-top-currency></nav-top-currency>
      <!-- 顶部标题导航 end -->

      <div class="switchingRentalMode">
        <van-cell-group inset>
          <van-tabs
            v-model="tabsActiveName"
            animated
            @click="tabsChange"
            :before-change="beforeChange"
          >
            <van-tab name="单位租">
              <template #title>
                <span class="tabTitle">单位租</span>
              </template>
              <date-time-section
                :value="date"
                @click.native="showPicker"
              ></date-time-section>
            </van-tab>
            <van-tab name="个人租">
              <template #title>
                <span class="tabTitle">个人租</span>
              </template>
              <date-time-section
                :value="date"
                @click.native="showPicker"
              ></date-time-section>
            </van-tab>
          </van-tabs>
          <van-button
            class="selectionCar"
            color="#ffc65f"
            block
            size="normal"
            to="model"
            >去选车</van-button
          >
          <tint-datetime-picker ref="tintPicker"></tint-datetime-picker>
        </van-cell-group>
      </div>
    </div>

    <div class="swipeAD">
      <div class="wrapper" v-if="isLoading === true">
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
      <swipe-ad :ad-images-link="adImagesLink" v-else></swipe-ad>
    </div>
    <div class="AD2">
      <van-grid clickable :column-num="2" :gutter="10" :border="false">
        <van-grid-item to="/"
          ><van-image
            fit="scale-down"
            src="https://dfs.zuchecdn.com/visit/carmktplat/g/V3/e4a1f8376b2f4aea99bbfb1054041bfa.png"
        /></van-grid-item>
        <van-grid-item url="#"
          ><van-image
            fit="scale-down"
            src="https://dfs.zuchecdn.com/visit/carmktplat/g/V3/9092eae356d34a59b6b04d95980c7709.png"
        /></van-grid-item>
      </van-grid>
    </div>

    <div class="otherModule">
      <van-cell-group inset>
        <van-grid clickable :column-num="4">
          <van-grid-item
            icon="question"
            text="常见问题"
            to="/problems"
            @click="toProblems"
          />
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
    <div class="CarRecommend">
      <car-recommend :car-info-list="carInfoList"></car-recommend>
    </div>
    <div style="height: 5rem"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavTopCurrency from '@/components/NavTopCurrency.vue'
import TintDatetimePicker from '@/components/TintDatetimePicker.vue'
import DateTimeSection from '@/components/DateTimeSection.vue'
import SwipeAd from './components/SwipeAd.vue'
import CarRecommend from './components/CarRecommend.vue'

import { mapGetters, mapMutations } from 'vuex'
import { BASE_URL } from '@/global/config'

// 加载home接口模块
import { silenceLogin, getAdImages } from '@/api/home'
import { getVehicleOfType } from '@/api/carInfo'

export default {
  name: 'Home',
  components: {
    NavTopCurrency,
    TintDatetimePicker,
    DateTimeSection,
    SwipeAd,
    CarRecommend,
  },
  data() {
    return {
      tabsActiveName: '单位租',
      date: '',
      show: false,
      adImagesLink: [],
      isLoading: false,
      carInfoList: [],
      // total: 0,
    }
  },
  computed: {},
  watch: {
    // 监听tabsActiveName，并提交到vuex的state中
    tabsActiveName: {
      handler(newValue, oldValue) {
        this.setTabName(newValue)
      },
      immediate: true, // 初始化时立即触发
    },
  },
  created() {
    // 静默登录

    this.loadSilenceLogin()
  },
  mounted() {},
  methods: {
    toProblems() {
      // this.loadComProblem()
    },
    loadSilenceLogin() {
      this.isLoading = true
      silenceLogin()
        .then(res => {
          // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
          // window.localStorage.setItem('user', res.data.data)
          // 但是本地存储只能存储字符串
          // 想要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
          // window.localStorage.setItem('user', JSON.stringify(res.data.data))
          // console.log(window.localStorage.getItem('user'))
          if (res.status === 200) {
            // 加载 获取广告图片
            this.loadAdImages()
            // 加载 获取车辆信息
            this.loadVehicleOfType()
            // console.log(res.status)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadAdImages() {
      // 获取轮播图图片
      getAdImages()
        .then(res => {
          let adImages = res.data.queryCarRentalADImg
          // console.log(adImages)
          this.adImagesLink = adImages.map(item => {
            return `${BASE_URL}/socketServer/images/cardMall/imgsrc/${item.picFile}`
          })
          // 广告图片链接 存入vuex
          this.setAdImagesLink(this.adImagesLink)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取车辆信息
    loadVehicleOfType() {
      getVehicleOfType({
        classifyName: '经济型',
      }).then(res => {
        let carInfos = res.data.queryVehicleOfType
        // 拼接车辆图片信息
        this.carInfoList = carInfos.map(item => {
          if (item.carImg) {
            item.carImg = `${BASE_URL}/socketServer/images/cardMall/imgsrc/${item.carImg}`
          }
          return item
        })
        // this.$store.commit('setCarInfo', this.carInfoList)
        // this.total = res.data.queryVehicleOfType_totalRecNum
        // console.log('carInfo:', this.carInfo)
      })
    },
    ...mapMutations({
      // 将改变store中值的方法映射到当前组件的methods中
      setTabName: 'setTabName',
      setAdImagesLink: 'setAdImagesLink',
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
    tabsChange(name, title) {
      // this.setTabName(name)
      // console.log(name, title)
      if (name === '个人租') {
        Toast.fail('个人租 暂未开放')
      }
    },
    beforeChange(index) {
      // 返回 false 表示阻止此次切换
      if (index === 1) {
        return false
      }
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
    width: 90%;
    margin: 0 5% 3%;
    // font-size: 0.9rem;
    font-weight: 550;
  }
  /deep/ .van-tab {
    font-size: 1.1rem;
    font-weight: 600;
    color: #aeaac5;
    // margin: 1rem 0 0.5rem 1rem;
  }
  /deep/ .van-tab--active {
    color: #423d5e;
  }
}

.otherModule {
  margin-top: 0.5rem;
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
.selectionCar {
  color: #111 !important;
  font-size: 1.1rem;
  font-weight: 600;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>
