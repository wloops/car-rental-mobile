<template>
  <div class="ContactUs">
    <van-nav-bar title="联系我们" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from 'vant'
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
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="less"></style>
