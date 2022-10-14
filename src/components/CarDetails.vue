<template>
  <div class="CarDetails">
    <van-popup v-model="show" closeable position="bottom" round close-on-popstate safe-area-inset-bottom>
      <template>
        <div class="carImg">
          <van-badge color="#fec760">
            <van-image width="10rem" height="10rem" fit="contain" :src="carImg" @click="bigImagePreview" />
            <template #content>
              <van-icon name="photo-o" class="badge-icon" /> <span>{{ badgeContent }}</span>
            </template>
          </van-badge>
        </div>
        <div class="carInfo">
          <div class="carName">{{ carName }}</div>
          <div class="carMsg">{{ carMsg }}</div>
        </div>
        <date-time-section @click.native="showPicker"></date-time-section>
        <!-- <date-time-section></date-time-section> -->
        <div style="height: 4rem"></div>
        <div class="footerBtn">
          <div class="carPrice">￥{{ carPrice }} <span>日均</span></div>
          <van-button block color="#fec760" size="large" loading-type="spinner" :loading="isLoading" @click="toConfirmOrder"> 立即预定</van-button>
        </div>
      </template>
    </van-popup>
    <tint-datetime-picker ref="tintPicker"></tint-datetime-picker>
  </div>
</template>

<script>
import DateTimeSection from '@/components/DateTimeSection.vue'
import TintDatetimePicker from '@/components/TintDatetimePicker.vue'
import { ImagePreview } from 'vant'
import { queryVehicleImages } from '@/api/carInfo'
import { BASE_DOMAIN } from '@/global/config'
export default {
  name: 'CarDetails',
  components: {
    DateTimeSection,
    TintDatetimePicker,
  },
  props: {},
  data() {
    return {
      show: false,
      isLoading: true,
      badgeContent: '1/1',
    }
  },
  computed: {
    currentCarInfo() {
      return this.$store.getters['car/getCurrentCarInfo']
    },
    carImg() {
      return this.$store.getters['car/getCurrentCarInfo'].carImg
    },
    carName() {
      return this.$store.getters['car/getCurrentCarInfo'].carModelShowName
    },
    carMsg() {
      return this.$store.getters['car/getCurrentCarInfo'].carDescription
    },
    carPrice() {
      return this.$store.getters['car/getCurrentCarInfo'].carPrice
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    showPopup() {
      this.show = true
      this.getVehicleImages()
      console.log('currentCarInfo::', this.currentCarInfo)
      this.checklogin()
    },
    showPicker() {
      this.$refs.tintPicker.showView(this.currentCarInfo, 'filter')
    },
    toConfirmOrder() {
      let memberID = window.localStorage.getItem('memberID')
      if (memberID) {
        this.$router.push({
          name: 'confirm',
          params: {
            toPath: 'confirm',
          },
        })
        // this.$router.push('/confirm')
      } else {
        this.$dialog
          .confirm({
            title: '提示',
            message: '请先登录',
          })
          .then(() => {
            // on confirm
            // this.$router.push('/login')
            this.$router.push({
              name: 'login',
              params: {
                toPath: 'confirm',
              },
            })
          })
          .catch(() => {
            // this.$router.go(-1)
            // on cancel
            //  this.loading = false
          })
      }
    },
    getVehicleImages() {
      queryVehicleImages({
        operObjectID: this.currentCarInfo.operObjectID,
      }).then(res => {
        console.log('详情图片:', res.data)
        if (res.data.rs !== '1') {
          console.log('连接详情图片接口失败')
          return false
        }
        let carImages = res.data.queryVehicleImages
        // 拼接车辆图片信息
        this.carImgList = []
        carImages.forEach(item => {
          if (item.carImg) {
            let carImg = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.carImg}`
            this.carImgList.push(carImg)
          }
        })
        // this.$store.commit('setCarInfo', this.carImgList)
        // this.total = res.data.queryVehicleOfType_totalRecNum
        console.log('carImgList:', this.carImgList)
        let num = this.carImgList.length > 0 ? this.carImgList.length : 1
        this.badgeContent = `1/${num}`
      })
    },
    bigImagePreview() {
      let carImgList
      if (this.carImgList.length > 0) {
        carImgList = this.carImgList
      } else {
        carImgList = [this.carImg]
      }
      ImagePreview({
        images: carImgList,
        startPosition: 0,
      })
    },
  },
}
</script>

<style scoped lang="less">
.carImg {
  // width: 13rem;
  // margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.carInfo {
  margin-top: 1rem;
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
  position: fixed;
  bottom: 1.2rem;
  width: 90%;
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
  .van-button--default {
    width: 8rem;
    height: 2.5rem;
    color: #111 !important;
    border-radius: 0.2rem;
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
