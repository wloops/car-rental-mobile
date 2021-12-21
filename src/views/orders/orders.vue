<!-- 订单页面 -->
<template>
  <div class="orders">
    <div class="topNav">
      <van-nav-bar title="租车订单" left-arrow fixed placeholder />
    </div>
    <div class="tabs">
      <van-tabs v-model="active" swipeable animated sticky offset-top="2rem">
        <van-tab title="全部">
          <orders-list tabA-ative="0"></orders-list>
        </van-tab>
        <van-tab title="待付款">
          <orders-list tabA-ative="1"></orders-list>
        </van-tab>
        <van-tab title="未出行">
          <orders-list tabA-ative="2"></orders-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import OrdersList from './components/OrdersList.vue'
import {
  NavBar,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  List,
  Grid,
  GridItem,
  Tag,
  PullRefresh,
} from 'vant'

export default {
  name: 'orders',
  components: {
    OrdersList,

    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Tag.name]: Tag,
    [PullRefresh.name]: PullRefresh,
  },
  props: {
    tabActive: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.orders {
  background-color: #f9f9f9;
}
.van-cell {
  padding: 1rem;
}
</style>
