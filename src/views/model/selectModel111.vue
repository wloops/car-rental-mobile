<template>
  <div class="SelectModel">
    <div class="top-navBar">
      <model-navtop></model-navtop>
    </div>
    <div class="imgLinkAD">
      <swipe-ad></swipe-ad>
    </div>
    <div class="treeSelect">
      <!-- <van-tree-select
        height="60vh"
        :items="itemsTree"
        :active-id.sync="activeIds"
        :main-active-index.sync="active"
      >
        <template #content>
          <van-grid :column-num="2" :gutter="10" clickable v-if="active === 0">
            <van-grid-item
              v-for="value in 8"
              :key="value"
              icon="photo-o"
              @click="selectCarItem"
            >
              <template #text>
                <p style="font-size: 0.4rem; line-height: 0.3rem">宝沃BX5</p>
                <p style="font-size: 0.4rem; line-height: 0.3rem">￥180起</p>
              </template>
            </van-grid-item>
          </van-grid>
          <van-grid :column-num="2" :gutter="10" clickable v-if="active === 1">
            <van-grid-item v-for="value in 8" :key="value" icon="photo-o">
              <template #default>
                <div class="defaultBox">
                  <div class="checkbox">
                    <van-checkbox v-model="checked" />
                  </div>
                  <div class="Img">
                    <van-image
                      width="50"
                      height="50"
                      src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    />
                  </div>
                  <div class="text">
                    <p>宝马</p>
                  </div>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </template>
      </van-tree-select> -->
      <van-sidebar v-model="activeKey">
        <van-sidebar-item>
          <template #title>
            <div style="height: 0.2rem; line-height: 0.2rem">
              <p>经济型</p>
              <p style="font-size: small">￥108起</p>
            </div>
          </template>
        </van-sidebar-item>
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
    </div>

    <footer>
      <van-goods-action safe-area-inset-bottom style="z-index: 1000">
        <van-goods-action-button color="##ffc15f" type="warning" text="重置" />
        <van-goods-action-button color="##ffc65f" type="danger" text="确认" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import ModelNavtop from './components/ModelNavtop.vue'
import SwipeAd from './components/SwipeAd.vue'

import {
  TreeSelect,
  Grid,
  GridItem,
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Image as VanImage,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sidebar,
  SidebarItem,
} from 'vant'

export default {
  name: 'SelectModel',
  components: {
    ModelNavtop,
    SwipeAd,

    [TreeSelect.name]: TreeSelect,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
  },
  props: {},
  data() {
    return {
      activeKey: 0,
      active: 0,
      activeIds: [1, 2, 3, 4, 5, 6],
      itemsTree: [
        {
          // 导航名称
          text: '经济型',
          // 导航名称右上角徽标，2.5.6 版本开始支持
          // badge: 3,
          // 是否在导航名称右上角显示小红点
          // dot: true,
          // 导航节点额外类名
          className: 'my-class',
          // 该导航下所有的可选项
        },
        {
          text: '商务型',
        },
        {
          text: 'SUV',
        },
        {
          text: '5至15座商务型',
        },
        {
          text: '豪华型',
        },
        {
          text: '个性车',
        },
      ],
      checked: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectCarItem() {
      console.log('selectCarItem')
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .van-grid-item__content--center {
  border: 1px solid #ededed;

  position: relative;
}

.checkbox {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 100;
}
.text {
  line-height: 0.2rem;
}
</style>
