<!-- 订单确认页面 -->
<template>
  <div class="confirmOrder">
    <div class="topNav">
      <van-nav-bar
        fixed
        placeholder
        title="订单确认"
        left-text=""
        left-arrow
        @click-left="backPage"
      />
      <!-- <van-nav-bar
        fixed
        placeholder
        title="订单确认"
        left-text=""
        right-text="规则说明"
        left-arrow
        @click-left="backPage"
        @click-right="toRules"
      /> -->
    </div>
    <div class="orderInfo">
      <van-cell-group inset>
        <van-cell center>
          <van-card centered :thumb="currentCarInfo.carImg">
            <template #title>
              <div class="carName">{{ currentCarInfo.carModelShowName }}</div>
            </template>
            <template #desc>
              <div class="carDesc">{{ currentCarInfo.carDescription }}</div>
            </template>
          </van-card>
        </van-cell>
        <van-cell>
          <div class="useCarTime">
            <div class="startDateCell">
              <span class="startDateMD"
                >{{ startDateM }}月{{ startDateD }}日</span
              >&nbsp;&nbsp;
              <span class="startDateTime timeText1">{{ startTime }}</span>
            </div>
            <div class="dayinTotal">
              <van-divider
                :style="{
                  color: '#565656',
                  borderColor: '#a3a3a3',
                  fontSize: 'small',
                }"
              >
                <span class="dayinTotalNum"> {{ dayToDay }}天</span>
              </van-divider>
            </div>
            <div class="endDateCell">
              <span class="endDateMD">{{ endDateM }}月{{ endDateD }}日</span
              >&nbsp;&nbsp;
              <span class="endDateTime timeText1">{{ endTime }}</span>
            </div>
          </div>
        </van-cell>
        <div class="otherCheck">
          <van-cell>
            <template #default>
              <div class="tagChecks">
                <van-tag color="#edaa01" size="medium">配带司机</van-tag>
                <van-radio-group
                  class="radioGroup"
                  v-model="isDrier"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                  @change="changeDriverRadio"
                >
                  <van-radio name="1" shape="square">聘用司机</van-radio>
                  <van-radio name="0" shape="square">自行驾驶</van-radio>
                </van-radio-group>
              </div>
              <!-- <div class="tagChecks">
                <van-tag color="#5e4618" size="medium">取车方式</van-tag>
                <van-radio-group
                  class="radioGroup"
                  v-model="isPickupCar"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                  @change="changePickupCarRadio"
                  :disabled="isDrier === '1'"
                >
                  <van-radio name="1" shape="square">送车上门</van-radio>
                  <van-radio name="0" shape="square">自行取车</van-radio>
                </van-radio-group>
              </div>
              <div class="tagChecks">
                <van-tag color="#edaa01" size="medium">还车方式</van-tag>
                <van-radio-group
                  class="radioGroup"
                  v-model="isReturnCar"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                  @change="changeReturnCarRadio"
                  :disabled="isDrier === '1'"
                >
                  <van-radio name="1" shape="square">上门服务</van-radio>
                  <van-radio name="0" shape="square">自行还车</van-radio>
                </van-radio-group>
              </div> -->
            </template>
          </van-cell>
        </div>
      </van-cell-group>
    </div>

    <div class="lesseeInfo">
      <van-cell-group inset>
        <van-cell title-class="lesseeTitle">
          <template #title>
            <div>
              <span>承租人</span>
            </div>
          </template>
        </van-cell>
        <contact-card></contact-card>
      </van-cell-group>
    </div>

    <div class="rentalCost">
      <van-cell-group inset>
        <van-cell title-class="costTitle">
          <template #title>
            <div>
              <span>租车费用</span>
            </div>
          </template>
        </van-cell>
        <van-cell title="车辆租赁及服务费">
          <template #default>
            <div>
              <!-- <span>￥{{ actualPrice }} x {{ dayToDay }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp; -->
              <span class="totalPrice">￥{{ actualPrice }}</span>
            </div>
          </template>
        </van-cell>
        <van-cell title="司机服务费">
          <template #default>
            <div>
              <!-- <span>￥{{ driverFeeShow }} x {{ dayToDay }} </span
              >&nbsp;&nbsp;&nbsp;&nbsp; -->
              <span class="totalPrice">￥{{ driverFeeShow }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="costDescription">
      <van-cell-group inset>
        <van-cell title-class="payTitle">
          <template #title>
            <div>
              <span>费用说明</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div>
              <span
                ><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                订单显示费用为预估基础费用，实际产生费用以还车时显示为准；详细费用规则请参考规则说明，或可通过联系电话联系我们，谢谢您的理解与支持！</span
              >
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="payMethod">
      <van-cell-group inset>
        <van-cell title-class="payTitle">
          <template #title>
            <div>
              <span>支付方式</span>
            </div>
          </template>
        </van-cell>
        <van-cell icon="wechat-pay">
          <template #title>
            <div>
              <span v-if="tabName === '单位租'">月结</span>
              <span v-else>微信支付</span>
            </div>
          </template>
          <template #extra>
            <div>
              <van-checkbox v-model="payChecked"></van-checkbox>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div style="height: 6rem"></div>
    <div class="confirmOrderBox">
      <van-submit-bar
        :price="totalFee"
        button-text="提交订单"
        @submit="orderSubmit"
        label="预计："
      >
        <!-- <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template> -->
        <!-- <template #tip>
          <van-checkbox v-model="consentRules"
            >我已同意《租车服务合同》</van-checkbox
          >
        </template> -->
      </van-submit-bar>
    </div>

    <div class="orderSuccess">
      <van-popup v-model="orderSuccessShow" style="width: 100%; height: 100%">
        <div class="orderSuccessContainer">
          <van-nav-bar
            fixed
            placeholder
            right-text="完成"
            @click-right="toOrders"
          />
          <van-icon name="checked" color="#fec760" size="50" />
          <p v-if="tabName === '单位租'">下单成功</p>
          <p v-else>预订成功</p>
          <p style="font-size: small; color: #bcbcbc">
            请保持手机畅通，如行程有变，请在规定时间取消订单
          </p>
          <template v-if="tabName === '单位租'" class="btnBox">
            <van-button
              block
              color="#fec760"
              style="width: 90%; margin-top: 3rem"
              to="orders"
              >查看订单</van-button
            >
          </template>
          <template v-else>
            <div class="btnBox1">
              <van-button block type="default" to="orders">查看订单</van-button>
              <van-button block color="#fec760">去支付</van-button>
            </div>
          </template>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue'
import { mapGetters } from 'vuex'

import { getPriceInfo, setCreatOrder, sendSMSNotification } from '@/api/order'
import { BASE_COMNAME } from '@/global/config'

export default {
  name: 'confirmOrder',
  components: {
    ContactCard,
  },
  props: {},
  data() {
    return {
      consentRules: false,
      payChecked: true,
      orderSuccessShow: false,
      isDrier: '1', // 是否需要司机
      isPickupCar: '0', // 是否自助取车
      isReturnCar: '0', // 是否自助还车

      // 原价
      originalPrice: '',
      // 实际价格
      actualPrice: '',
      // 折扣金额
      discountPrice: '',
      // 总价
      totalPrice: '',

      // 存入接口请求的司机费用,用于计算展示
      thisDriverPrice: 0.0,
      // 存入接口请求的取车费用,用于计算展示
      thisDeliveryPrice: 0.0,
      // 存入接口请求的还车费用,用于计算展示
      thisReturnPrice: 0.0,

      driverFeeShow: '', // 司机费用展示
    }
  },
  computed: {
    tabName() {
      return this.$store.getters['getTabName']
    },
    currentCarInfo() {
      return this.$store.getters['car/getCurrentCarInfo']
    },
    ...mapGetters('time', {
      startTime: 'getStartTime',
      endTime: 'getEndTime',
      startDate: 'getStartDate',
      endDate: 'getEndDate',
      startDateM: 'getStartDateM',
      startDateD: 'getStartDateD',
      endDateM: 'getEndDateM',
      endDateD: 'getEndDateD',
      dayToDay: 'getDayToDay',
    }),
    ...mapGetters('order', {
      driverPrice: 'getDriverPrice', // 接口请求的司机费用
      deliveryPrice: 'getDeliveryPrice', // 接口请求的取车费用
      returnPrice: 'getReturnPrice', // 接口请求的还车费用
      currentContactInfo: 'getCurrentContactInfo', // 当前选中的联系人信息
    }),
    actNo() {
      return this.$store.getters['car/getActNo']
    },
    carModel() {
      return this.$store.getters['car/getCurrentCarInfo'].carModel
    },
    formatStartDate() {
      // 格式化时间为 yyyyMMdd
      let startDate = this.$store.getters['time/getStartDate']
      if (startDate != null) {
        startDate = startDate.replace(/-/g, '')
      }
      return startDate
    },
    formatEndDate() {
      // 格式化时间为 yyyyMMdd
      let endDate = this.$store.getters['time/getEndDate']
      if (endDate != null) {
        endDate = endDate.replace(/-/g, '')
      }
      return endDate
    },
    formatStartTime() {
      // 格式化时间为 HHmmss
      let startTime = this.$store.getters['time/getStartTime']
      if (startTime != null) {
        startTime = startTime.replace(/:/g, '') + '00'
      }
      return startTime
    },
    formatEndTime() {
      // 格式化时间为 HHmmss
      let endTime = this.$store.getters['time/getEndTime']
      if (endTime != null) {
        endTime = endTime.replace(/:/g, '') + '00'
      }
      return endTime
    },
    driverFeeTotal() {
      // 计算司机费用
      return (
        Number(this.thisDriverPrice) +
        Number(this.thisDeliveryPrice) +
        Number(this.thisReturnPrice)
      )
    },
    totalFee() {
      // 计算总费用,并化为分
      return (Number(this.driverFeeTotal) + Number(this.actualPrice)) * 100
    },
  },
  watch: {
    driverFeeTotal: {
      handler(val) {
        // 司机费用,用于展示,保留两位小数
        this.driverFeeShow = val.toFixed(2)
      },
      immediate: true,
    },
  },
  created() {
    // 通过接口获取司机以及服务费
    this.loadPriceInfo()
    this.loadPriceInfo('0')
  },
  mounted() {},
  methods: {
    // 跳转到规则页面
    toRules() {
      this.$router.push('/rules')
    },
    backPage() {
      this.$router.back()
    },
    loadPriceInfo(key) {
      // let base_comname = window.localStorage.getItem('REALUSERNAME')
      console.log('loadPriceInfo', BASE_COMNAME)
      let param = {
        actNo: this.actNo,
        priceAttrValueList: this.carModel,
        saleCmpName: BASE_COMNAME,
        startDate: this.formatStartDate,
        startTime: this.formatStartTime,
        finishDate: this.formatEndDate,
        finishTime: this.formatEndTime,
        buyDriverService: key ? key : this.isDrier,
        buyDeliveryService: this.isPickupCar,
        buyReturnService: this.isReturnCar,
      }
      getPriceInfo(param).then(res => {
        console.log('rs', res.data.rs)
        if (res.data.rs !== '1') {
          return false
        }
        console.log('res.data.priceData', res.data.priceData)
        let priceData = res.data.priceData
        if (key) {
          // 取车费用(折扣后)
          this.$store.commit(
            'order/setDeliveryPrice',
            priceData.deliveryPriceAfterDiscount
          )
          // this.thisDeliveryPrice = Number(this.deliveryPrice)
          // 还车费用(折扣后)
          this.$store.commit(
            'order/setReturnPrice',
            priceData.returnPriceAfterDiscount
          )
          // this.thisReturnPrice = Number(this.returnPrice)
        } else {
          // 司机费用(折扣后)
          this.$store.commit(
            'order/setDriverPrice',
            priceData.totalDriverPriceAfterDiscount
          )
          this.thisDriverPrice = Number(this.driverPrice)
        }

        this.originalPrice = priceData.totalCarRentPrice // 原价
        this.actualPrice = priceData.totalCarRentPriceAfterDiscount // 实际价格
        // this.discountPrice = priceData.reduction // 折扣金额
        this.totalPrice = priceData.totalDiscountPrice // 总价
      })
    },
    orderSubmit() {
      // this.$router.push('/pay')
      console.log(
        'currentContactInfo',
        Object.keys(this.currentContactInfo).length
      )
      if (Object.keys(this.currentContactInfo).length === 0) {
        this.$toast.fail('请选择承租人!')
        return false
      }
      let params = {
        actNo: this.actNo,
        priceAttrValueList: this.carModel,
        saleCmpName: BASE_COMNAME,
        startDate: this.formatStartDate,
        startTime: this.formatStartTime,
        finishDate: this.formatEndDate,
        finishTime: this.formatEndTime,
        buyDriverService: this.isDrier,
        buyDeliveryService: this.isPickupCar,
        buyReturnService: this.isReturnCar,
        receiver: this.currentContactInfo.name,
        phone: this.currentContactInfo.tel,
        address: this.currentContactInfo.addressDetail,
      }
      setCreatOrder(params).then(res => {
        console.log('rs', res.data.rs)
        // console.log('res.data.orderData', res.data.orderData)
        if (res.data.rs === '1') {
          this.orderSuccessShow = true
          this.sendSMS()
        } else {
          this.$toast.fail(res.data.msg)
        }
      })
    },
    sendSMS() {
      sendSMSNotification({
        srlIDForEngine: 'Splenwise微信预约点餐系统',
        busiNameForEngine: '汽车租赁业务',
        busiFunNameForEngine: '生成租车订单',
        miniProcNameForEngine: '下单成功发送短信通知',
      }).then(res => {
        console.log('发送下单成功通知:', res)
      })
    },
    toOrders() {
      this.$router.push('/orders')
    },
    changeDriverRadio(name) {
      // 是否佩带司机
      this.isDrier = name
      if (name === '1') {
        this.thisDriverPrice = this.driverPrice
        this.thisDeliveryPrice = 0.0
        this.thisReturnPrice = 0.0
        this.isPickupCar = '1'
        this.isReturnCar = '1'
      } else {
        this.thisDriverPrice = 0.0
        if (this.isPickupCar === '1') {
          this.thisDeliveryPrice = this.deliveryPrice
        } else {
          this.thisDeliveryPrice = 0.0
        }
        if (this.isReturnCar === '1') {
          this.thisReturnPrice = this.returnPrice
        } else {
          this.thisReturnPrice = 0.0
        }
        // this.thisDeliveryPrice = this.deliveryPrice
        // this.thisReturnPrice = this.returnPrice
      }
    },
    changePickupCarRadio(name) {
      // 是否自助取车
      this.isPickupCar = name
      if (name === '1' && this.isDrier === '0') {
        this.thisDeliveryPrice = this.deliveryPrice
      } else {
        this.thisDeliveryPrice = 0.0
      }
    },
    changeReturnCarRadio(name) {
      // 是否自助还车
      this.isReturnCar = name
      if (name === '1' && this.isDrier === '0') {
        this.thisReturnPrice = this.returnPrice
      } else {
        this.thisReturnPrice = 0.0
      }
    },
  },
}
</script>

<style scoped lang="less">
.confirmOrder {
  background: #f6f6f8;
}

.topNav {
  padding-bottom: 0.5rem;
}
.useCarTime {
  display: flex;
  height: 1rem;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  /deep/ .van-cell {
    padding: 0;
  }
  .dayinTotal {
    flex: 1;
    font-size: 0.5rem;
    .dayinTotalNum {
      color: #f97f04;
      background: #fef2e2;
      padding: 0 0.5rem;
    }
  }

  .timeText {
    font-size: 0.8rem;
    color: #565656;
  }
}
.van-card {
  background-color: #fff;
  padding: 0;
}
.tagChecks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  font-size: small;
}
.orderInfo {
  padding-bottom: 0.5rem;
  .carName {
    font-size: 1.1rem;
    color: #333131;
    padding: 0.5rem 0;
    margin-left: 1rem;
    font-weight: 600;
  }
  .carDesc {
    font-size: 1rem;
    color: #565656;
    padding: 0.5rem 0;
    margin-left: 1rem;
  }
}
.lesseeInfo {
  padding-bottom: 0.5rem;
  .lesseeTitle {
    font-weight: 600;
    color: #565656;
  }
}
.rentalCost {
  padding-bottom: 0.5rem;
  .costTitle {
    font-weight: 600;
    color: #565656;
  }
  .van-cell__value {
    .totalPrice {
      color: #fec760;
      font-size: 1rem;
    }
  }
}

.payMethod {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.payTitle {
  font-weight: 600;
  color: #565656;
}

.orderSuccessContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -10rem;
  height: 100%;
  padding: 0.5rem;
  .btnBox1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .van-button {
      width: 45%;
      margin-top: 3rem;

      margin-left: 0.5rem;
    }
  }
}
</style>
