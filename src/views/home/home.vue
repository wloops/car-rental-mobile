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
      <keep-alive>
        <div class="wrapper" v-if="isLoading === true">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <swipe-ad :ad-images-link="adImagesLink" v-else></swipe-ad>
      </keep-alive>
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
      <keep-alive>
        <car-recommend :car-info-list="carInfoList"></car-recommend>
      </keep-alive>
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
import { BASE_DOMAIN } from '@/global/config'
/* 引入config文件模块 */
import global_ from '@/global/config_global'

// 加载home接口模块
import { silenceLogin, getAdImages } from '@/api/home'
import { getVehicleType, getVehicleOfType } from '@/api/carInfo'

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
      // actNo: '',
    }
  },
  computed: {
    startDate() {
      // 开始时间 vuex
      // 格式化时间为 yyyyMMdd
      let startDate = this.$store.getters['time/getStartDate']
      if (startDate != null) {
        startDate = startDate.replace(/-/g, '')
      }
      return startDate
    },
    endDate() {
      // 结束时间 vuex
      // 格式化时间为 yyyyMMdd
      let endDate = this.$store.getters['time/getEndDate']
      if (endDate != null) {
        endDate = endDate.replace(/-/g, '')
      }
      return endDate
    },
    rentalDays() {
      return this.$store.getters['time/getDayToDay']
    },
    actNo() {
      return this.$store.getters['car/getActNo']
    },
  },
  watch: {
    // 监听tabsActiveName，并提交到vuex的state中
    tabsActiveName: {
      handler(newValue, oldValue) {
        this.setTabName(newValue)
      },
      immediate: true, // 初始化时立即触发
    },
    startDate: {
      handler(newValue, oldValue) {
        // this.setStartDate(newValue)
        // 值改变触发loadVehicleOfType请求
        if (oldValue != newValue) {
          this.loadVehicleOfType()
        }
      },
      // immediate: true, // 初始化时立即触发
    },
    endDate: {
      handler(newValue, oldValue) {
        // this.setEndDate(newValue)
        // 值改变触发loadVehicleOfType请求
        if (oldValue != newValue) {
          this.loadVehicleOfType()
        }
      },
      // immediate: true, // 初始化时立即触发
    },
  },
  created() {
    // 静默登录
    // this.login()
    this.loadSilenceLogin()
  },
  mounted() {},
  methods: {
    toProblems() {
      // this.loadComProblem()
    },
    loadSilenceLogin() {
      console.log('login:::')
      this.dataLoading = true
      let storage = window.localStorage
      let param = decodeURI(location.search)
      if (param == '') {
        let redirect =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          storage.getItem('appid') +
          '&redirect_uri=http%3A%2F%2F' +
          global_.domain +
          '%2f' +
          global_.clientName +
          '%3fappid%3d' +
          storage.getItem('appid') +
          '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.href = redirect
        console.log('redirect:::' + redirect)
        return
      } else {
        storage.setItem('codeAppID', param)
      }
      var REALTERMTYPE = ''
      let appid = ''
      let url = '/currencyLogin/login'
      console.log('param::' + param)
      if (param.indexOf('appid') != -1) {
        appid = param.substring(
          param.indexOf('=') + 1,
          param.indexOf('code') - 1
        )
        let code = param.substring(
          param.indexOf('code') + 5,
          param.indexOf('state') - 1
        )
        console.log('code::' + code)
        REALTERMTYPE = '微信预约点餐公众号'
        url =
          url +
          '?code=' +
          code +
          '&appid=' +
          appid +
          '&REALTERMTYPE=' +
          REALTERMTYPE
        storage.setItem('appid', appid)
      }
      if (appid.length < 18) {
        // 解决分享过来时获取不到appid的问题,从分享登录时存入sessionStorage中重新获取
        appid = storage.getItem('appid')
      }
      var that = this
      console.log('url:::' + url)

      this.$http
        .get(`http://www.paytunnel.cn/carRentalServerRH${url}`)
        .then(res => {
          // 加载 获取广告图片
          this.loadAdImages()
          // 加载 获取车辆类型
          this.loadVehicleType()
          // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
          // window.localStorage.setItem('user', res.data.data)
          // 但是本地存储只能存储字符串
          // 想要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
          // window.localStorage.setItem('user', JSON.stringify(res.data.data))
          // console.log(window.localStorage.getItem('user'))
          // if (res.status === 200) {
          // await this.login()
          console.log('res:::', res)
          console.log('res.data:::', res.data)
          var rs = JSON.stringify(res.data)
          if (rs.indexOf('-11419') != -1) {
            // 则是没有注册
            that.regSchool('广西德保县惠保投资发展有限公司')
          } else {
            var userName = res.data.userName
            // that.$toast('欢迎您，' + userName)
            global_.token = res.data.token.token
            global_.userName = userName
            global_.openid = res.data.openid
            global_.TELLERCOMPANY = res.data.TELLERCOMPANY
            appid = res.data.appid
            /* --当刷新页面导致token不存在时,使用sessionStorage中的token-- */
            storage.setItem('token', global_.token)
            storage.setItem('openid', global_.openid)
            storage.setItem('guestMemberID', global_.userName)
            storage.setItem('appid', appid)
            storage.setItem('TELLERCOMPANY', res.data.TELLERCOMPANY)
            that.schoolName = storage.getItem('TELLERCOMPANY')
            that.dataLoading = false

            that.checklogin()
            // that.getShopList()
            // that.getBannerImages()
            // that.getNotice()
            // that.wxConfig()
            // callback(true)
          }

          // console.log(res.status)
          // }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadAdImages() {
      if (this.$store.getters.getAdImagesLink.length > 0) {
        this.adImagesLink = this.$store.getters.getAdImagesLink
        return false
      }
      this.isLoading = true
      // 获取轮播图图片
      getAdImages()
        .then(res => {
          let adImages = res.data.queryCarRentalADImg
          if (adImages === null && adImages === undefined) {
            console.log('获取轮播图图片失败')
            return false
          }
          // console.log(adImages)
          this.adImagesLink = adImages.map(item => {
            if (item.picFile) {
              item.picFile = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.picFile}`
            }
            return item
          })
          console.log('this.adImagesLink:', this.adImagesLink)
          // 广告图片链接 存入vuex
          this.setAdImagesLink(this.adImagesLink)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadVehicleType() {
      getVehicleType().then(res => {
        // 获取经济型的actNo
        res.data.queryVehicleType.forEach(item => {
          if (item.classifyName === '经济型') {
            // this.actNo = item.actNo
            this.setActNo(item.actNo)
          }
        })

        // 加载 获取车辆信息
        this.loadVehicleOfType()
      })
    },
    // 获取车辆信息
    loadVehicleOfType() {
      console.log('loadVehicleOfType')
      getVehicleOfType({
        classifyName: '经济型',
        actNo: this.actNo,
        startTime: this.startDate,
        endTime: this.endDate,
        rentalDays: this.rentalDays,
      }).then(res => {
        let carInfos = res.data.queryVehicleOfType
        // 拼接车辆图片信息
        if (carInfos === null || carInfos === undefined) {
          console.log('连接车辆信息接口失败')
          return false
        }
        this.carInfoList = carInfos.map(item => {
          if (item.carImg) {
            item.carImg = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.carImg}`
          }
          return item
        })
        // this.$store.commit('setCarInfo', this.carInfoList)
        // this.total = res.data.queryVehicleOfType_totalRecNum
        console.log('carInfoList:', this.carInfoList)
      })
    },
    ...mapMutations({
      // 将改变store中值的方法映射到当前组件的methods中
      setTabName: 'setTabName',
      setAdImagesLink: 'setAdImagesLink',
      setActNo: 'car/setActNo',
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
        this.$toast.fail('个人租 暂未开放')
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
