<!-- 登录页面 -->
<template>
  <div class="login">
    <div class="loginBox">
      <div class="topNav">
        <van-nav-bar
          title=""
          left-arrow
          @click-left="backPage"
          @click-right="toRegister"
        >
          <template #right v-if="tabName === '个人租'">
            <div class="register">
              <a>注册</a>
            </div>
          </template>
        </van-nav-bar>
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
            :rules="unameRules"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :rules="pwdRules"
          />
          <p class="unPassword"><a>忘记密码？</a></p>
          <div style="margin: 16px">
            <van-button block type="info" color="#ffc65f" native-type="submit"
              >登录</van-button
            >
          </div>
          <p
            class="toPersonalLogin"
            v-if="tabName === '单位租'"
            @click="changePersonal"
          >
            我是个人用户 <van-icon name="sort" />
          </p>
          <p
            class="toPersonalLogin"
            v-if="tabName === '个人租'"
            @click="changeCompany"
          >
            我是单位用户 <van-icon name="sort" />
          </p>
        </van-form>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'login',
  components: {},
  props: {},
  data() {
    return {
      username: '',
      password: '',
      unameRules: [
        {
          required: true,
          message: '请输入账号',
        },
        {
          // 自定义校验规则
          validator: value => {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
              value
            )
          },
          message: '请输入正确格式的手机号码',
          trigger: 'onBlur',
        },
      ],
      pwdRules: [
        {
          required: true,
          message: '请输入密码',
        },
        {
          // 自定义校验规则
          validator: value => {
            return /^[a-zA-Z0-9_]{6,16}$/.test(value)
          },
          message: '请输入正确格式的密码',
          trigger: 'onBlur',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      // 将store中的数据映射到当前组件的data中
      tabName: 'getTabName',
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      // 将store中的方法映射到当前组件的methods中
      setTabName: 'setTabName',
    }),
    backPage() {
      this.$router.back()
    },
    toRegister() {
      this.$router.push('/register')
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    changePersonal() {
      this.setTabName('个人租')
      // this.$router.push('/personalLogin')
    },
    changeCompany() {
      this.setTabName('单位租')
      // this.$router.push('/companyLogin')
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
