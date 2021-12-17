<template>
  <div class="login">
    <div class="loginBox">
      <div class="topNav">
        <van-nav-bar
          title=""
          left-arrow
          right-text="注册"
          @click-left="backPage"
          @click-right="toRegister"
        />
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
          <p class="unPassword">忘记密码？</p>
          <div style="margin: 16px">
            <van-button block type="info" color="#ffc65f" native-type="submit"
              >登录</van-button
            >
          </div>
          <p class="toPersonalLogin">我是个人用户 <van-icon name="sort" /></p>
        </van-form>
      </main>
    </div>
  </div>
</template>

<script>
import { NavBar, Button, Image as VanImage, Form, Field, Icon } from 'vant'

export default {
  name: 'login',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [VanImage.name]: VanImage,
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
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
    toRegister() {
      this.$router.push('/register')
    },
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .van-button--info {
  font-size: 1rem;
  color: #3c3839;
}
.logoBox {
  text-align: center;
  margin-top: 2rem;
}
.unPassword {
  font-size: 0.9rem;
  text-align: right;
  margin-top: 1rem;
  margin-right: 1rem;
  color: #ccc;
}
.toPersonalLogin {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 2rem;
  color: #ff7636;
}
</style>
