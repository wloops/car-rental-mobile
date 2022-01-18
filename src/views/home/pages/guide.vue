<template>
  <div class="Guide">
    <van-nav-bar title="租车指引" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  name: 'Guide',
  components: {},
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
