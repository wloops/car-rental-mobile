<template>
  <div class="Problems">
    <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from 'vant'

// 加载home接口模块
import { getComProblem } from '@/api/home'
export default {
  name: 'Problems',
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
    this.loadComProblem()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 获取常见问题
    loadComProblem() {
      getComProblem()
        .then(res => {
          console.log(res.data.queryCarRentalComProblem)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped lang="less"></style>
