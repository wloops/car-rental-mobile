<template>
  <div class="login">
    <div class="topNav">
      <van-nav-bar title="" left-arrow @click-left="backPage" />
    </div>
    <div class="logoBox">
      <van-image
        width="10rem"
        height="4rem"
        fit="contain"
        :src="require('./logo.jpg')"
      />
    </div>
    <main>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
        <div style="margin: 16px">
          <van-button block type="info" color="#ffc65f" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
import { NavBar, Button, Image as VanImage, Form, Field } from 'vant'

export default {
  name: 'login',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [VanImage.name]: VanImage,
    [Form.name]: Form,
    [Field.name]: Field,
  },
  props: {},
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    backPage() {
      this.$router.back()
    },
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .van-button--info {
  color: #3c3839;
}
.logoBox {
  text-align: center;
  margin-top: 2rem;
}
</style>
