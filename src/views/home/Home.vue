<template>
  <div class="home">
    <div class="navTop">
      <van-nav-bar title="惠租车" left-arrow>
        <template #left>
          <span>德保县</span>
        </template>
        <template #right>
          <span>注册/登录</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="switchingRentalMode">
      <van-tabs v-model="active" animated>
        <van-tab v-for="index in 4" :title="'选项 ' + index">
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { NavBar } from 'vant'
import { Tab, Tabs } from 'vant'

export default {
  name: 'Home',
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  methods: {
    beforeChange(index) {
      // 返回 false 表示阻止此次切换
      if (index === 1) {
        return false
      }

      // 返回 Promise 来执行异步逻辑
      return new Promise(resolve => {
        // 在 resolve 函数中返回 true 或 false
        resolve(index !== 3)
      })
    },
  },
}
</script>
