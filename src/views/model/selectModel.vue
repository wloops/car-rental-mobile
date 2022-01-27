<!-- 车型选择页面 -->
<template>
  <div class="SelectModel">
    <div class="top-navBar">
      <model-navtop></model-navtop>
    </div>
    <div class="imgLinkAD">
      <swipe-ad :ad-images-link="adImagesLink"></swipe-ad>
    </div>
    <div class="treeSelect">
      <van-tree-select
        height="75vh"
        :items="itemsTree"
        :main-active-index.sync="active"
        @click-nav="handleClickNav"
      >
        <template #content>
          <van-pull-refresh
            success-text="刷新成功"
            v-model="refreshing"
            @refresh="onRefresh"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              :offset="350"
              :immediate-check="false"
              finished-text="没有更多了"
              @load="onLoad"
              ref="checkList"
            >
              <van-skeleton :row="10" :loading="skeletonLoading">
                <van-grid
                  :column-num="1"
                  :gutter="15"
                  clickable
                  :border="false"
                >
                  <van-grid-item
                    v-for="(item, index) in carInfo"
                    :key="index"
                    icon="photo-o"
                    @click="selectCarItem"
                  >
                    <template>
                      <div class="carCard">
                        <div class="carImg">
                          <van-image
                            width="5rem"
                            height="5rem"
                            fit="contain"
                            :src="item.carImg"
                          />
                        </div>
                        <div class="carInfo">
                          <div class="carName">{{ item.carModelShowName }}</div>
                          <div class="carMsg van-ellipsis">
                            {{ item.carDescription }}
                          </div>
                          <div class="carPrice">
                            ￥{{ item.carPrice }} <span>日均</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </van-grid-item>
                </van-grid>
              </van-skeleton>
            </van-list>
          </van-pull-refresh>
        </template>
      </van-tree-select>
    </div>
    <!-- 车辆详情 -->
    <div class="carDetails">
      <car-details ref="showCarDetails"></car-details>
    </div>
  </div>
</template>

<script>
import ModelNavtop from './components/ModelNavtop.vue'
import SwipeAd from '@/views/home/components/SwipeAd.vue'
import CarDetails from '@/components/CarDetails.vue'

import { BASE_DOMAIN } from '@/global/config'
import { priceFormat } from '@/utils'

import { getVehicleType, getVehicleOfType } from '@/api/carInfo'

export default {
  name: 'SelectModel',
  components: {
    ModelNavtop,
    SwipeAd,
    CarDetails,
  },
  props: {},
  data() {
    return {
      active: 0,
      itemsTree: [],
      classifyName: '',
      checked: false,
      loading: false,
      finished: false,
      refreshing: false,
      carInfoList: [],
      total: 0, //总共的数据条数
      skeletonLoading: true,
      currentCarInfo: [],
      currentPage: 0,
      numOfPerPage: 7,
    }
  },
  computed: {
    adImagesLink() {
      // 广告图片链接 vuex
      return this.$store.getters.getAdImagesLink
    },
    carInfo() {
      // 车辆信息 vuex
      return this.$store.getters['car/getCarInfo']
    },
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
  },
  watch: {
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
    console.log('SelectModel created')
    this.onLoad()
  },
  mounted() {
    console.log(this.startDate, this.endDate, this.rentalDays)
  },
  methods: {
    selectCarItem(e) {
      // 当前选择车辆
      let imgURL =
        e.currentTarget.children[0].children[0].children[0].children[0].src
      this.carInfoList.forEach((item, index) => {
        if (item.carImg === imgURL) {
          this.$store.commit('car/setCurrentCarInfo', item)
        }
      })
      this.$refs.showCarDetails.showPopup()
    },
    toConfirmOrder() {
      this.$router.push('/confirm')
    },
    // 获取车辆信息
    loadVehicleOfType() {
      getVehicleOfType({
        classifyName: this.itemsTree[this.active].classifyName,
        actNo: this.itemsTree[this.active].actNo,
        startTime: this.startDate,
        endTime: this.endDate,
        rentalDays: this.rentalDays,
        currentPage: this.currentPage,
        numOfPerPage: this.numOfPerPage,
      }).then(res => {
        let carInfos = res.data.queryVehicleOfType
        console.log(carInfos)
        if (carInfos === undefined) {
          console.log('获取车辆信息失败')
          return false
        }
        // 拼接车辆图片信息
        this.carInfoList = carInfos.map(item => {
          if (item.carImg) {
            item.carImg = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.carImg}`
          }
          if (item.carPrice) {
            item.carPrice = priceFormat(item.carPrice)
          }
          return item
        })
        this.total = res.data.queryVehicleOfType_totalRecNum

        this.loading = true
        // this.carInfoList.forEach((item, index) => {
        //   this.currentCarInfo.push(item)
        // })
        this.currentCarInfo.push(...this.carInfoList)
        this.$store.commit('car/setCarInfo', this.currentCarInfo)
        console.log('carInfo:', this.carInfo)

        if (this.carInfo.length >= parseInt(this.total)) {
          this.finished = true
        }

        this.loading = false
        this.skeletonLoading = false
      })
    },
    handleClickNav(index) {
      this.active = index
      this.currentPage = 0
      this.currentCarInfo = []
      this.loading = true
      this.finished = false
      this.onLoad()
    },
    //加载时触发
    onLoad() {
      setTimeout(() => {
        this.currentPage++
        console.log('onLoad')
        this.skeletonLoading = true

        if (this.refreshing) {
          this.refreshing = false
        }

        if (this.itemsTree.length === 0) {
          // 获取车型分类
          getVehicleType().then(res => {
            console.log('res.data.queryVehicleType', res.data.queryVehicleType)
            if (res.data.queryVehicleType === undefined) {
              console.log('获取车型分类失败')
              return false
            }
            this.itemsTree = res.data.queryVehicleType.map(item => {
              return {
                // id: item.id,
                text: item.displayName,
                classifyName: item.classifyName,
                actNo: item.actNo,
              }
            })
            this.loadVehicleOfType()
          })
        } else {
          this.loadVehicleOfType()
        }

        // this.loading = false
        // if (this.carInfo.length >= this.total) {
        //   this.finished = true
        // }
      }, 500)
    },
    onRefresh() {
      console.log('onRefresh')
      this.currentPage = 0
      // 清空列表数据
      this.currentCarInfo = []
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
  },
}
</script>

<style scoped lang="less">
// /deep/ .van-grid-item__content--center {
//   border: 1px solid #ededed;

//   position: relative;
// }
.SelectModel {
  height: 100%;
}
.treeSelect {
  .van-list {
    margin-top: 0.5rem;
  }
  /deep/ .van-grid-item__content {
    border-radius: 5px;
    box-shadow: 1px 1px 8px #ccc;
  }
}
// .checkbox {
//   position: absolute;
//   right: 5px;
//   top: 5px;
//   z-index: 100;
// }
.text {
  line-height: 0.2rem;
}

.carCard {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-left: 1rem;

  .carName {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem;
    color: rgb(75, 72, 72);
  }
  .carMsg {
    margin: 0.5rem;
    width: 8rem;
    font-size: smaller;
  }
  .carPrice {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem;
    color: #ffba1c;
    span {
      font-size: x-small;
      color: rgb(168, 164, 164);
    }
  }
}
/deep/ .van-grid-item__content {
  padding: 0;
}
</style>
