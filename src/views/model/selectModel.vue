<!-- 车型选择页面 -->
<template>
  <div class="SelectModel">
    <div class="top-navBar">
      <model-navtop></model-navtop>
    </div>
    <div class="imgLinkAD">
      <swipe-ad :ad-images-link="adImagesLink"></swipe-ad>
    </div>
    <van-pull-refresh
      success-text="刷新成功"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="treeSelect">
          <van-tree-select
            height="100%"
            :items="itemsTree"
            :main-active-index.sync="active"
            @click-nav="handleClickNav"
          >
            <template #content>
              <van-grid :column-num="1" :gutter="10" clickable>
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
                        <!-- <div class="carPrice">￥280 <span>日均</span></div> -->
                      </div>
                    </div>
                  </template>
                </van-grid-item>
              </van-grid>
            </template>
          </van-tree-select>
        </div>
      </van-list>
    </van-pull-refresh>
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
      // result: [],
      active: 0,
      itemsTree: [],
      classifyName: '',
      checked: false,
      // carInfo: [],
      loading: false,
      finished: false,
      refreshing: false,
      total: 0, //总共的数据条数
    }
  },
  computed: {
    adImagesLink() {
      // 广告图片链接 vuex
      return this.$store.getters.getAdImagesLink
    },
    carInfo() {
      // 车辆信息 vuex
      return this.$store.getters.getCarInfo
    },
  },
  watch: {
    // active() {
    //   // 切换车型
    //   this.loadVehicleOfType()
    // },
  },
  created() {
    // console.log('车型分类轮播图', this.adImagesLink)
    // this.loadVehicleType()
    // this.loading = true
    // this.onLoad()
  },
  mounted() {},
  methods: {
    selectCarItem() {
      // console.log('selectCarItem')
      this.$refs.showCarDetails.showPopup()
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    toConfirmOrder() {
      this.$router.push('/confirm')
    },
    // 获取车辆信息
    loadVehicleOfType() {
      getVehicleOfType({
        classifyName: this.itemsTree[this.active].classifyName,
      }).then(res => {
        // console.log('车辆信息', res.data.queryVehicleOfType)
        // console.log('total:', res.data.queryVehicleOfType_totalRecNum)
        // this.carInfo = res.data.queryVehicleOfType
        this.$store.commit('setCarInfo', res.data.queryVehicleOfType)
        console.log('carInfo:', this.carInfo)
        this.total = res.data.queryVehicleOfType_totalRecNum
      })
    },
    handleClickNav(index) {
      this.active = index
      this.onLoad()
    },
    //加载时触发
    onLoad() {
      console.log('onLoad')
      console.log('this.loading', this.loading)
      console.log('this.refreshing', this.refreshing)
      if (this.refreshing) {
        this.refreshing = false
      }
      if (this.itemsTree.length === 0) {
        // 获取车型分类
        getVehicleType().then(res => {
          console.log('res.data.queryVehicleType', res.data.queryVehicleType)
          this.itemsTree = res.data.queryVehicleType.map(item => {
            return {
              // id: item.id,
              text: item.displayName,
              classifyName: item.classifyName,
            }
          })
          console.log('this.itemsTree', this.itemsTree)
          this.loadVehicleOfType()
        })
      } else {
        this.loadVehicleOfType()
      }

      this.loading = false

      if (this.carInfo.length >= this.total) {
        this.finished = true
      }
    },
    onRefresh() {
      // 清空列表数据
      // this.carInfo = []
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
