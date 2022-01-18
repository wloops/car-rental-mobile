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
        height="100%"
        :items="itemsTree"
        :main-active-index.sync="active"
      >
        <template #content>
          <van-grid :column-num="1" :gutter="10" clickable v-if="active === 0">
            <van-grid-item
              v-for="value in 8"
              :key="value"
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
                      src="http://res.tintjs.com/img/宝沃BX7.png"
                    />
                  </div>
                  <div class="carInfo">
                    <div class="carName">宝沃BX7</div>
                    <div class="carMsg">2.0T自动 | SUV5座</div>
                    <div class="carPrice">￥280 <span>日均</span></div>
                  </div>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
          <van-grid :column-num="1" :gutter="10" clickable v-if="active === 1">
            <van-grid-item
              v-for="value in 8"
              :key="value"
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
                      src="http://res.tintjs.com/img/奥迪A6.png"
                    />
                  </div>
                  <div class="carInfo">
                    <div class="carName">奥迪A6</div>
                    <div class="carMsg">2.0T自动 | SUV5座</div>
                    <div class="carPrice">￥280 <span>日均</span></div>
                  </div>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
          <!-- 车辆详情 -->
          <div class="carDetails">
            <car-details ref="showCarDetails"></car-details>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
import ModelNavtop from './components/ModelNavtop.vue'
import SwipeAd from '@/views/home/components/SwipeAd.vue'
import CarDetails from '@/components/CarDetails.vue'

import { getVehicleType } from '@/api/carInfo'

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
      result: [],
      active: 0,
      itemsTree: [],
      checked: false,
      carInfo: [
        {
          carName: '宝沃BX7',
          carMsg: '2.0T自动 | SUV5座',
          carPrice: '￥280 <span>日均</span>',
          carImg: 'http://res.tintjs.com/img/宝沃BX7.png',
        },
        {
          carName: '奥迪A6',
          carMsg: '2.0T自动 | SUV5座',
          carPrice: '￥280 <span>日均</span>',
          carImg: 'http://res.tintjs.com/img/奥迪A6.png',
        },
      ],
    }
  },
  computed: {
    adImagesLink() {
      // 广告图片链接 vuex
      return this.$store.getters.getAdImagesLink
    },
  },
  watch: {},
  created() {
    // console.log('车型分类轮播图', this.adImagesLink)
    this.loadVehicleType()
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
    loadVehicleType() {
      getVehicleType().then(res => {
        console.log(res.data.queryVehicleType)
        this.itemsTree = res.data.queryVehicleType.map(item => {
          return {
            // id: item.id,
            text: item.displayName,
          }
        })
        console.log(this.itemsTree)
      })
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

.checkbox {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 100;
}
.text {
  line-height: 0.2rem;
}
.carCard {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .carName {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem;
    color: rgb(75, 72, 72);
  }
  .carMsg {
    margin: 0.5rem;
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
