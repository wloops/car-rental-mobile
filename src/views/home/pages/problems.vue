<template>
  <div class="Problems">
    <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
import { NavBar } from 'vant'
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
