<template>
  <div class="SwipeAd">
    <van-cell-group inset>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in adImagesLink" :key="index">
          <van-image fit="scale-down" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </van-cell-group>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Cell,
  CellGroup,
  Lazyload,
  Image as VanImage,
} from 'vant'

export default {
  name: 'SwipeAd',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Lazyload.name]: Lazyload,
    [VanImage.name]: VanImage,
  },
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
