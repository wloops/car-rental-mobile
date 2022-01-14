<template>
  <div class="SwipeAd">
    <van-cell-group inset>
      <van-swipe-item v-for="(image, index) in adImagesLink" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-cell-group>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Cell, CellGroup } from 'vant'

// 加载home接口模块
import { silenceLogin, getAdImages } from '@/api/home'
export default {
  name: 'SwipeAd',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  props: {},
  data() {
    return {
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
      adImagesLink: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadAdImages()
  },
  mounted() {},
  methods: {
    loadAdImages() {
      // 获取轮播图图片
      getAdImages()
        .then(res => {
          console.log(res.data.queryCarRentalADImg)
          let adImages = res.data.queryCarRentalADImg
          console.log(adImages)
          this.adImagesLink = adImages.map(item => {
            return `http://paytunnel.cn/socketServer/images/cardMall/imgsrc/${item.picFile}`
          })
          console.log(this.adImagesLink)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped lang="less">
.SwipeAd {
  padding: 0.7rem 0;
}
.my-swipe {
  // margin-top: 0.7rem;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>
