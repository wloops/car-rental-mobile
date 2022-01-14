<template>
  <div class="ContactUs">
    <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from 'vant'

import { getContactUs } from '@/api/home'
export default {
  name: 'ContactUs',
  components: {
    [NavBar.name]: NavBar,
  },
  props: {},
  data() {
    return {}
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
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped lang="less"></style>
