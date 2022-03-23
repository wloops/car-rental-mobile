<template>
  <div class="ContactUs">
    <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" />
    <div v-for="(item, index) in contactUsList" :key="index">
      <h4 class="content_title">{{ item.content }}</h4>
    </div>
  </div>
</template>

<script>
import { getContactUs } from '@/api/home'
export default {
  name: 'ContactUs',
  components: {},
  props: {},
  data() {
    return {
      contactUsList: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    // 发送请求
    this.loadContactUs()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取联系我们
    loadContactUs() {
      getContactUs()
        .then(res => {
          console.log(res.data.queryCarRentalContactUs)
          this.contactUsList = res.data.queryCarRentalContactUs
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped lang="less">
.content_title {
  color: #333;
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
