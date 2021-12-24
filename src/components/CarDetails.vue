<template>
  <div class="CarDetails">
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ width: '100%', height: '50%' }"
    >
      <template>
        <div class="carImg">
          <van-image
            fit="contain"
            src="http://res.tintjs.com/img/宝沃BX7.png"
          />
        </div>
        <div class="carInfo">
          <div class="carName">宝沃BX7</div>
          <div class="carMsg">2.0T自动 | SUV5座</div>
        </div>
        <div class="footerBtn">
          <div class="carPrice">￥280 <span>日均</span></div>
          <van-button
            block
            color="#fec760"
            size="normal"
            @click="toConfirmOrder"
            >立即预定</van-button
          >
        </div>
      </template>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell, Image as VanImage, Button } from 'vant'
export default {
  name: 'CarDetails',
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Button.name]: Button,
  },
  props: {},
  data() {
    return {
      show: false,
      carInfo: {
        carName: '宝沃BX7',
        carMsg: '2.0T自动 | SUV5座',
        carPrice: '￥280',
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showPopup() {
      this.show = true
    },
    toConfirmOrder() {
      this.$router.push('/confirm')
    },
  },
}
</script>

<style scoped lang="less">
.carImg {
  width: 13rem;
  margin: 0 auto;
  margin-top: 2rem;
}
.carInfo {
  margin-top: 2rem;
  text-align: center;
  .carName {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .carMsg {
    font-size: 1rem;
    color: #999;
  }
  .carPrice {
    font-size: 1.2rem;
    color: #ff5a00;
    margin-top: 0.5rem;
  }
}
.footerBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 1rem 0;
  .carPrice {
    font-size: 1.2rem;
    color: #ff5a00;
    span {
      font-size: 0.8rem;
      color: #999;
    }
  }
  .van-button {
    width: 8rem;
    height: 2rem;
    border-radius: 0.2rem;
    font-size: 1rem;
  }
}
</style>
