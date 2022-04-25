<template>
  <div class="Guide">
    <van-nav-bar title="租车指引" left-arrow @click-left="onClickLeft" />
    <div class="tabs">
      <!-- <van-tabs v-model="active" scrollspy sticky>
        <van-tab title="所需证件"> -->
      <!-- <template> -->
      <div>
        <h3>{{ data1.title }}</h3>
        <van-card centered>
          <template #title>
            <div>
              <!-- <p class="title">身份证</p> -->
            </div>
          </template>
          <template #desc>
            <div
              class="desc"
              v-for="(item, index) in data1.content"
              :key="index"
            >
              <p>{{ item }}</p>
            </div>
          </template>
        </van-card>
      </div>
      <div>
        <h3>{{ data2.title }}</h3>
        <van-card centered>
          <template #title>
            <div>
              <!-- <p class="title">身份证</p> -->
            </div>
          </template>
          <template #desc>
            <div
              class="desc"
              v-for="(item, index) in data2.content"
              :key="index"
            >
              <p>{{ item }}</p>
            </div>
          </template>
        </van-card>
      </div>
      <!-- </template>
        </van-tab>
        <van-tab title="如何预定">
          <template>
            <div>
              <h3>只需四步即可完成预定</h3>
            </div>
          </template>
        </van-tab>
      </van-tabs> -->
    </div>
  </div>
</template>

<script>
import { getCarGuidance } from '@/api/home'
export default {
  name: 'Guide',
  components: {},
  props: {},
  data() {
    return {
      data1: [],
      data2: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    init() {
      getCarGuidance().then(res => {
        if (res.data.rs === '1') {
          let data = res.data.queryCarRentalCarGuidance
          this.data1 = data[0]
          this.data2 = data[1]
          // 格式化以;分隔的文本
          this.data1.content = this.formatText(this.data1.content)
          this.data2.content = this.formatText(this.data2.content)

          console.log(this.data1)
        } else {
          this.$toast(res.data.rs)
        }
      })
    },
    // 格式化文本;分隔
    formatText(text) {
      // 分号转换
      if (text.indexOf('；') !== -1) {
        text = text.replace(/；/g, ';')
      }
      let arr = text.split(';')
      let str = []
      arr.forEach(item => {
        str.push(`${item}`)
      })
      return str
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
