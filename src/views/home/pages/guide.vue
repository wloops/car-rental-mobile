<template>
  <div class="Guide">
    <van-nav-bar title="租车指引" left-arrow @click-left="onClickLeft" />
    <div class="tabs">
      <van-tabs v-model="active" scrollspy sticky>
        <van-tab title="所需证件">
          <template>
            <div>
              <h3>租车需要准备哪些证件?</h3>
              <van-card centered thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
                <template #title>
                  <div>
                    <p class="title">身份证</p>
                  </div>
                </template>
                <template #desc>
                  <div class="desc">
                    大陆用户驾驶员二代身份证，年满18周岁，有效期需超过当次租期一个月以上
                  </div>
                </template>
              </van-card>
            </div>
          </template>
        </van-tab>
        <van-tab title="如何预定">
          <template>
            <div>
              <h3>只需四步即可完成预定</h3>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
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
h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.desc {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
</style>
