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
        <van-cell is-link center>
          <van-card
            centered
            desc="1.5自动 | 三厢5座"
            title="雪佛兰新科鲁兹"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
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
                <van-tag color="#edaa01" size="medium">佩带司机</van-tag>
                <van-radio-group
                  class="radioGroup"
                  v-model="radio1"
                  direction="horizontal"
                  checked-color="#fcc55e"
                  icon-size="1rem"
                >
                  <van-radio name="1" shape="square">是</van-radio>
                  <van-radio name="2" shape="square">否</van-radio>
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
                >
                  <van-radio name="1" shape="square">送车上门</van-radio>
                  <van-radio name="2" shape="square">自行取车</van-radio>
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
                >
                  <van-radio name="1" shape="square">上门服务</van-radio>
                  <van-radio name="2" shape="square">自行还车</van-radio>
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
              <span>￥178</span>
            </div>
          </template>
        </van-cell>
        <van-cell title="司机服务费">
          <template #default>
            <div>
              <span>￥40*2 ￥178</span>
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
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <!-- <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template> -->
        <template #tip>
          <van-checkbox v-model="consentRules"
            >我已同意《租车服务合同》</van-checkbox
          >
        </template>
      </van-submit-bar>
    </div>

    <div class="orderSuccess">
      <van-popup v-model="orderSuccessShow" style="width: 100%; height: 100%">
        <van-nav-bar
          fixed
          placeholder
          right-text="完成"
          @click-right="toOrders"
        />
        下单成功
        <van-button
          block
          color="#fec760"
          :disabled="isDisabled"
          @click="toOrders"
          >查看订单</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue'
import { mapGetters } from 'vuex'
import {
  NavBar,
  Cell,
  CellGroup,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Card,
  Divider,
  Tag,
  RadioGroup,
  Radio,
  Popup,
  Button,
} from 'vant'
export default {
  name: 'confirmOrder',
  components: {
    ContactCard,

    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Card.name]: Card,
    [Divider.name]: Divider,
    [Tag.name]: Tag,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
  props: {},
  data() {
    return {
      consentRules: false,
      result: [],
      radio1: '1',
      radio2: '1',
      radio3: '1',
      payChecked: true,
      orderSuccessShow: false,
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
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 跳转到规则页面
    toRules() {
      // this.$router.push('/rules')
    },
    backPage() {
      this.$router.back()
    },
    onSubmit() {
      // this.$router.push('/pay')
      this.orderSuccessShow = true
    },
    toOrders() {
      this.$router.push('/orders')
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
}

.payMethod {
  padding-bottom: 0.5rem;
  .payTitle {
    font-weight: 600;
    color: #565656;
  }
}
</style>
