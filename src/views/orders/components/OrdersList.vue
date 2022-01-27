<template>
  <div class="OrdersList">
    <div class="orderList">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid :gutter="15" :column-num="1">
            <van-grid-item v-for="item in list" :key="item">
              <div class="orderItem">
                <div class="useStatus">
                  <span
                    >{{ item.orderDriveType
                    }}<van-tag color="#f4f4f4" text-color="#adadad"
                      >用车</van-tag
                    ></span
                  >
                  <span class="" style="font-size: small; color: #adadad">{{
                    item.orderStatusShow !== '未出行'
                      ? '已完成'
                      : item.orderStatusShow
                  }}</span>
                </div>
                <div class="orderInfo">
                  <p>订单编号 : {{ item.billNo }}</p>
                  <p>用车车型 : {{ item.carType }}</p>
                  <p>用车时间 : {{ item.carUseTimeBegin }}</p>
                  <p>
                    还车时间 : {{ item.carUseTimeEnd }}（{{ item.useDays }}天）
                  </p>
                  <p>订单金额 : ￥{{ item.orderTotalPrice }}</p>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
        <div style="height: 3rem"></div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getNotOutOrder, getAllOrder } from '@/api/order'
export default {
  name: 'OrdersList',
  components: {},
  props: ['thisTab'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        console.log('this.thisTab', this.thisTab)
        if (this.thisTab === '0') {
          this.loadAllOrder()
        } else {
          this.loadNotOutOrder()
        }
        console.log('this.list', this.list)
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1)
        // }
        // // 加载状态结束
        // this.loading = false
        // // 数据全部加载完成
        // if (this.list.length >= 10) {
        //   this.finished = true
        // }
      }, 500)
    },
    onRefresh() {
      // 清空列表数据
      this.list = []
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    loadAllOrder() {
      getAllOrder().then(res => {
        this.list = this.list.concat(res.data.queryMyAllCarOrders)
        this.loading = false
        this.finished =
          this.list.length >= res.data.queryMyAllCarOrders_totalRecNum
      })
    },
    loadNotOutOrder() {
      getNotOutOrder().then(res => {
        this.list = this.list.concat(res.data.queryMyCarOrdersOfNoTravel)
        this.loading = false
        this.finished =
          this.list.length >= res.data.queryMyCarOrdersOfNoTravel_totalRecNum
      })
    },
  },
}
</script>

<style scoped lang="less">
.orderList {
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.orderItem {
  width: 95%;
  height: 8rem;
}
.useStatus {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orderInfo {
  font-size: small;
  color: #6f6f6f;
  line-height: 0.5rem;
}
</style>
