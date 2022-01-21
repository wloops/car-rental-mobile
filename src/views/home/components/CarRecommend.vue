<template>
  <div class="CarRecommend">
    <div class="carRecommend">
      <div class="recommendTitle">好车推荐</div>
      <span class="recommendText">超值特惠，出行首选</span>
      <van-grid :column-num="2" :gutter="10" clickable>
        <van-grid-item
          v-for="(item, index) in carInfoList"
          :key="index"
          @click="selectCarItem"
        >
          <van-image fit="contain" :src="item.carImg" />
          <div class="recommendPrice">
            <span class="oneDay">短期优惠</span>
            <van-button
              color="linear-gradient(to right, #fff ,#f8c764)"
              size="mini"
            >
              ￥{{ item.carPrice }}
            </van-button>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 车辆详情 -->
    <div class="carDetails">
      <car-details ref="showCarDetails"></car-details>
    </div>
  </div>
</template>

<script>
import CarDetails from '@/components/CarDetails.vue'

export default {
  name: 'CarRecommend',
  components: {
    CarDetails,
  },
  props: {
    carInfoList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    carImg() {
      return this.$store.getters.getCurrentCarInfo.carImg
    },
    carName() {
      return this.$store.getters.getCurrentCarInfo.carModelShowName
    },
    carMsg() {
      return this.$store.getters.getCurrentCarInfo.carDescription
    },
    carPrice() {
      return this.$store.getters.getCurrentCarInfo.carPrice
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectCarItem(e) {
      // 当前选择车辆
      // console.log('e.currentTarget', e.currentTarget)
      let imgURL = e.currentTarget.children[0].children[0].src
      // console.log('imgURL', imgURL)
      this.carInfoList.forEach((item, index) => {
        if (item.carImg === imgURL) {
          this.$store.commit('setCurrentCarInfo', item)
        }
      })
      this.$refs.showCarDetails.showPopup()
    },
  },
}
</script>

<style scoped lang="less">
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
    margin-top: 0.5rem;
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
  /deep/ .van-grid-item__content {
    border-radius: 5px;
    box-shadow: 1px 1px 5px #ccc;
  }
}
</style>
