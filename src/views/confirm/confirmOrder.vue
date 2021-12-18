<!-- 订单确认页面 -->
<template>
  <div class="confirmOrder">
    <div class="topNav">
      <van-nav-bar
        title="订单确认"
        left-text=""
        right-text="规则说明"
        left-arrow
        @click-left="backPage"
        @click-right="onClickRight"
      />
    </div>
    <div class="carInfo">
      <van-cell-group>
        <van-cell>车辆信息</van-cell>
        <van-cell>用车时间</van-cell>
        <van-cell>佩带司机</van-cell>
        <van-cell>取车方式</van-cell>
        <van-cell>还车方式</van-cell>
      </van-cell-group>
    </div>

    <div class="lesseeInfo">
      <van-cell-group inset>
        <van-cell title="承租人" />
        <van-cell title="单元格" value="内容" label="描述信息" size="large" />
      </van-cell-group>
    </div>

    <div class="rentalCost">
      <van-cell-group inset>
        <van-cell title="租车费用" />
        <van-cell
          title="车辆租赁及服务费"
          value="￥178"
          label="描述信息"
          size="large"
        />
        <van-cell title="司机服务费" value="￥178" />
      </van-cell-group>
    </div>

    <div class="payMethod">
      <van-cell-group inset>
        <van-cell title="支付方式" />
        <van-cell title="支付宝" value="支付宝" />
      </van-cell-group>
    </div>

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
  </div>
</template>

<script>
import {
  NavBar,
  Cell,
  CellGroup,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
} from 'vant'
export default {
  name: 'confirmOrder',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  props: {},
  data() {
    return {
      consentRules: false,
      result: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    backPage() {
      this.$router.back()
    },
  },
}
</script>

<style scoped lang="less"></style>
