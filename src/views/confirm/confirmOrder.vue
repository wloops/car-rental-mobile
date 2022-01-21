<!-- 订单确认页面 -->
<template>
  <div class="confirmOrder">
    <div class="topNav">
      <van-nav-bar
        fixed
        placeholder
        title="订单确认"
        left-text=""
        right-text="规则说明"
        left-arrow
        @click-left="backPage"
        @click-right="toRules"
      />
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
                  v-model="radio1"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                  @change="changeDriverRadio"
                >
                  <van-radio name="1" shape="square">聘用司机</van-radio>
                  <van-radio name="0" shape="square">自行驾驶</van-radio>
                </van-radio-group>
              </div>
              <div class="tagChecks">
                <van-tag color="#5e4618" size="medium">取车方式</van-tag>
                <van-radio-group
                  class="radioGroup"
                  v-model="radio2"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                  @change="changePickupCarRadio"
                >
                  <van-radio name="1" shape="square">送车上门</van-radio>
                  <van-radio name="0" shape="square">自行取车</van-radio>
                </van-radio-group>
              </div>
              <div class="tagChecks">
                <van-tag color="#edaa01" size="medium">还车方式</van-tag>
                <van-radio-group
                  class="radioGroup"
                  v-model="radio3"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                  @change="changeReturnCarRadio"
                >
                  <van-radio name="1" shape="square">上门服务</van-radio>
                  <van-radio name="0" shape="square">自行还车</van-radio>
                </van-radio-group>
              </div>
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
              <span>￥{{ currentCarInfo.carPrice }} * {{ dayToDay }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;<span class="totalPrice"
                >￥{{ carPriceTotal }}</span
              >
            </div>
          </template>
        </van-cell>
        <van-cell title="司机服务费" v-if="isDrier">
          <template #default>
            <div>
              <span>￥{{ driverFeeShow }}*{{ dayToDay }} </span
              >&nbsp;&nbsp;&nbsp;&nbsp;<span class="totalPrice"
                >￥{{ driverFeeTotal }}</span
              >
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

import { priceFormat } from '@/utils'

export default {
  name: 'confirmOrder',
  components: {
    ContactCard,
  },
  props: {},
  data() {
    return {
      consentRules: false,
      radio1: '1',
      radio2: '1',
      radio3: '1',
      payChecked: true,
      orderSuccessShow: false,
      driverFee: 39.98234,
      isDrier: true, // 是否需要司机
      isPickupCar: true, // 是否自助取车
      isReturnCar: true, // 是否自助还车
    }
  },
  computed: {
    ...mapGetters({
      startTime: 'getStartTime',
      endTime: 'getEndTime',
      startDate: 'getStartDate',
      endDate: 'getEndDate',
      startDateM: 'getStartDateM',
      startDateD: 'getStartDateD',
      endDateM: 'getEndDateM',
      endDateD: 'getEndDateD',
      dayToDay: 'getDayToDay',
      tabName: 'getTabName',
      currentCarInfo: 'getCurrentCarInfo',
    }),
    driverFeeShow() {
      // 根据是否需要司机，显示司机费用.不需要则赋值为0,方便计算
      return priceFormat(this.isDrier ? this.driverFee : 0)
    },
    driverFeeTotal() {
      // 计算司机费用
      return priceFormat(this.driverFeeShow * this.dayToDay)
    },
    carPriceTotal() {
      // 计算车辆总租金
      return priceFormat(this.currentCarInfo.carPrice * this.dayToDay)
    },
    totalFee() {
      // 计算总费用
      return priceFormat(
        (Number(this.carPriceTotal) + Number(this.driverFeeTotal)) * 100
      )
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 跳转到规则页面
    toRules() {
      this.$router.push('/rules')
    },
    backPage() {
      this.$router.back()
    },
    orderSubmit() {
      // this.$router.push('/pay')

      let orderInfo = {
        startTime: this.startTime, // 出发时间
        endTime: this.endTime, // 结束时间
        startDate: this.startDate, // 开始日期
        endDate: this.endDate, // 开始日期
        startDateM: this.startDateM, // 开始日期月份
        startDateD: this.startDateD, // 开始日期
        endDateM: this.endDateM, // 开始日期月份
        endDateD: this.endDateD, // 日期
        dayToDay: this.dayToDay, // 天数
        tabName: this.tabName, // 当前页面的tab
        currentCarInfo: this.currentCarInfo, // 当前车辆信息
        isDrier: this.isDrier, // 是否需要司机
        isPickupCar: this.isPickupCar, // 是否自助取车
        isReturnCar: this.isReturnCar, // 是否自助还车
        driverFeeShow: this.driverFeeShow, // 司机费用
        driverFeeTotal: this.driverFeeTotal, // 司机总费用
        totalFee: this.totalFee, // 总费用
      }
      console.log(orderInfo)
      this.orderSuccessShow = true
    },
    toOrders() {
      this.$router.push('/orders')
    },
    changeDriverRadio(name) {
      // 是否佩带司机
      if (name === '1') {
        this.isDrier = true
      } else {
        this.isDrier = false
      }
    },
    changePickupCarRadio(name) {
      // 是否自助取车
      if (name === '1') {
        this.isPickupCar = true
        console.log('自助取车')
      } else {
        this.isPickupCar = false
        console.log('上门取车')
      }
    },
    changeReturnCarRadio(name) {
      // 是否自助还车
      if (name === '1') {
        this.isReturnCar = true
        console.log('自助还车')
      } else {
        this.isReturnCar = false
        console.log('上门还车')
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
