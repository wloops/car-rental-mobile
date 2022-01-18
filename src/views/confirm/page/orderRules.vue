<template>
  <div class="orderRules">
    <div class="nav">
      <van-nav-bar title="规则说明" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="tabs">
      <van-tabs v-model="active" sticky>
        <van-tab title="订单取消规则">
          <div class="cancelRules">
            <div class="thead">
              <van-grid :column-num="3">
                <van-grid-item>
                  <template #text>
                    <div class="rulesTh">
                      <span>租车产品</span>
                    </div>
                  </template>
                </van-grid-item>
                <van-grid-item>
                  <template #text>
                    <div class="rulesTh">
                      <span>预计取车前</span><br />
                      <span
                        ><span style="color: #e9ab11">4</span>小时(含)以上</span
                      >
                    </div>
                  </template>
                </van-grid-item>
                <van-grid-item>
                  <template #text>
                    <div class="rulesTh">
                      <span>预计取车前</span><br />
                      <span>不足<span style="color: #e9ab11">4</span>小时</span>
                    </div>
                  </template>
                </van-grid-item>
              </van-grid>
            </div>
            <van-grid
              :column-num="3"
              v-for="(item, index) in tbody"
              :key="index"
            >
              <van-grid-item>
                <template #text>
                  <div>
                    <span>{{ item.title }}</span>
                  </div>
                </template>
              </van-grid-item>
              <van-grid-item>
                <template #text>
                  <div>
                    <span>{{ item.content1 }}</span>
                  </div>
                </template>
              </van-grid-item>
              <van-grid-item>
                <template #text>
                  <div>
                    <span>{{ item.content2 }}</span
                    ><br />
                    <span style="color: #e9ab11">{{ item.content3 }}</span>
                  </div>
                </template>
              </van-grid-item>
            </van-grid>
          </div>

          <footer>
            <!-- 注 -->
            <p>注:</p>
            <p>
              1.
              取消违约金的计算基数为取消订单的金额【车辆租赁及服务费】、【基础服务费】、【超时服务费】之和
            </p>
            <p>
              2. 订单取消后，退款一般3-5个工作日到账，各渠道退款周期可能不同
            </p>
          </footer>
        </van-tab>
        <van-tab title="订单修改规则">
          <div class="alterRules"></div>
          订单修改规则 内容
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderRules',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      tbody: [
        {
          title: '日租订单',
          content1: '免费取消',
          content2: '免费取消',
          content3: '',
        },
        {
          title: '套餐订单',
          content1: '免费取消',
          content2: '取消违约金:',
          content3: '30%',
        },
        {
          title: '上门送车订单',
          content1: '免费取消',
          content2: '取消违约金:',
          content3: '30%',
        },
        {
          title: '节假日订单',
          content1: '节假日订单具体规则',
          content2: '以节假日公示规则为准',
          content3: '',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="less">
.thead {
  /deep/ .van-grid-item__content--center {
    background: #f6f6f6;
  }
}
.rulesTh {
  color: #646464;
}
footer {
  padding: 0.5rem;
  color: #999;
}
</style>
