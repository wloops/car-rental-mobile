<template>
  <div class="ContactCard">
    <van-cell is-link @click="onListContact">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <div style="color: #fcc55e">更换</div>
      </template>
      <template #title>
        <div class="custom-title">
          <span class="title-name">XX单位</span>&nbsp;&nbsp;
          <span class="title-tel">18100000000</span>
        </div>
      </template>
      <template #label>
        <div class="custom-label">
          <span class="label-address">惠保县XX路XX号</span>
        </div>
      </template>
    </van-cell>

    <div class="listPupop">
      <van-popup
        v-model="listPupopShow"
        position="right"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="listPupopTop">
          <van-nav-bar
            fixed
            placeholder
            title="承租人"
            left-arrow
            @click-left="backPage"
          />
        </div>
        <div class="noticeBar">
          <van-notice-bar
            text="订单支付成功后，将同步到承租人账号"
            :scrollable="false"
          />
        </div>
        <main>
          <van-contact-list
            v-model="chosenContactId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </main>
      </van-popup>
    </div>
    <div class="editPupop">
      <van-popup
        v-model="editPupopShow"
        position="right"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="editPupopTop">
          <van-nav-bar
            fixed
            placeholder
            title="新建承租人"
            left-arrow
            @click-left="backListPage"
          />
        </div>
        <div class="noticeBar">
          <van-notice-bar
            text="提示：姓名、手机号须真实有效，否则影响取车"
            :scrollable="false"
          />
        </div>
        <main>
          <van-contact-edit
            is-edit
            :contact-info="editingContact"
            @save="onSave"
            @delete="onDelete"
          />
        </main>
      </van-popup>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContactCard',
  components: {
  },
  props: {},
  data() {
    return {
      listPupopShow: false,
      editPupopShow: false,
      currentContact: {
        name: 'XX单位 18100000000',
        tel: '惠保县XX路XX号',
      },

      chosenContactId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
        },
      ],

      editingContact: {},
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onListContact() {
      this.listPupopShow = true
    },
    backPage() {
      this.listPupopShow = false
    },
    backListPage() {
      this.editPupopShow = false
    },
    onAdd() {
      Toast('新增')
      this.editPupopShow = true
    },
    onEdit(contact) {
      Toast('编辑' + contact.id)
    },
    onSelect(contact) {
      Toast('选择' + contact.id)
    },
    onSave(contactInfo) {
      Toast('保存')
    },
    onDelete(contactInfo) {
      Toast('删除')
    },
  },
}
</script>

<style scoped lang="less"></style>
