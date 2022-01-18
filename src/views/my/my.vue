<!-- 我的页面 -->
<template>
  <div class="myPage">
    <div class="topNav">
      <van-nav-bar title="我的" />
    </div>
    <div class="userInfo">
      <van-image
        round
        width="5rem"
        height="5rem"
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="userInfo-info">
        <div class="userInfo-info-name">{{ userInfo.nickName }}</div>
        <div class="userInfo-info-desc">ID : {{ userInfo.id }}</div>
      </div>
    </div>
    <div class="userInfo-list">
      <van-cell-group>
        <van-cell
          title="我的订单"
          size="large"
          icon="balance-list"
          is-link
          to="orders"
        />
        <van-cell title="我的违章" size="large" icon="underway" is-link />
        <van-cell
          title="密码管理"
          size="large"
          icon="umbrella-circle"
          is-link
        />
        <van-cell title="常见问题" size="large" icon="warning" is-link />
      </van-cell-group>
    </div>

    <!-- 退出登录 -->
    <!-- <van-popup v-model="showLogout"> -->
    <div class="logout">
      <van-button block color="#fec760" style="width: 100%" @click="logout">
        退出登录
      </van-button>
    </div>

    <!-- </van-popup> -->
  </div>
</template>

<script>
export default {
  name: 'myPage',
  components: {},
  props: {},
  data() {
    return {
      userInfo: {
        nickName: '惠保单位',
        id: '14223526',
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped lang="less">
.userInfo {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  flex-direction: row;
  margin-top: 5rem;
  margin-left: 2rem;
  .userInfo-info {
    margin-left: 2rem;
    .userInfo-info-name {
      font-size: 1.2rem;
      font-weight: 550;
      margin-bottom: 0.5rem;
    }
  }
}

.userInfo-list {
  margin-top: 2rem;
}

.logout {
  position: fixed;
  bottom: 4rem;
  width: 95%;
  padding: 0.5rem;
}
</style>
