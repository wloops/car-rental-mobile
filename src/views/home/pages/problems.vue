<template>
  <div class="Problems">
    <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft" />

    <div v-for="(item, index) in comProblemList" :key="index">
      <h4 class="title">{{ item.title }}</h4>
      <span class="content">{{ item.content }}</span>
    </div>
  </div>
</template>

<script>
// 加载home接口模块
import { getComProblem } from '@/api/home'
export default {
  name: 'Problems',
  components: {},
  props: {},
  data() {
    return {
      comProblemList: [],
    }
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
          this.comProblemList = res.data.queryCarRentalComProblem
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped lang="less">
.title {
  color: #333;
  margin-top: 1rem;
  margin-left: 1rem;
}
.content {
  color: #999;
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
