<template>
  <div class="SwipeAd">
    <van-cell-group inset>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in adImagesLink" :key="index">
          <a :href="image.linkAddress ? image.linkAddress : '#'">
            <van-image fit="scale-down" :src="image.picFile" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'SwipeAd',
  components: {},
  props: {
    adImagesLink: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.SwipeAd {
  padding: 0.7rem 0;
}
</style>
