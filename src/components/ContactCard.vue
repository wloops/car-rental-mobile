<template>
  <div class="ContactCard">
    <van-cell center is-link size="large" @click="onListContact">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <div style="color: #fcc55e">更换</div>
      </template>
      <template #title>
        <div class="custom-title">
          <span class="title-username">{{ username }}:</span>&nbsp;&nbsp;
          <span class="title-name">{{ currentContact.name }}</span
          >&nbsp;&nbsp;
          <span class="title-tel">{{ currentContact.tel }}</span>
        </div>
      </template>
      <template #label>
        <div class="custom-label">
          <span class="label-address">{{ currentContact.address }}</span>
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
            v-model="contact.chosenContactId"
            :list="contact.list"
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
            set-default-label="设为默认联系人"
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
  components: {},
  props: {},
  data() {
    return {
      listPupopShow: false,
      editPupopShow: false,
      username: 'XX单位',
      currentContact: {
        name: 'XX',
        tel: '18100000000',
        address: '惠保县XX路XX号',
      },
      contact: {
        chosenContactId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '惠保县XX路102号',
            isDefault: true,
          },
          {
            id: '2',
            name: '李四',
            tel: '13000000003',
            address: '惠保县XX路121号',
          },
        ],
      },

      editingContact: {},
    }
  },
  computed: {},
  watch: {},
  created() {
    this.contact.list.forEach(item => {
      if (item.isDefault) {
        this.currentContact = item
      }
    })
  },
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
      this.$toast('新增')
      this.editingContact = {}
      this.editPupopShow = true
    },
    onEdit(contact) {
      this.$toast('编辑' + contact.id)
      this.editingContact = contact
      this.editPupopShow = true
    },
    onSelect(contact) {
      console.log('选择', contact)
      this.$toast('选择' + contact.id)
      // 赋值到currentContact
      this.currentContact = contact
    },
    onSave(contactInfo) {
      this.$toast('保存')
      this.editPupopShow = false
      // 新增id
      contactInfo.id = this.contact.list.length + 1
      // 更新contact.list
      this.contact.list.push(contactInfo)
    },
    onDelete(contactInfo) {
      this.$toast('删除')
      this.editPupopShow = false
      // 更新contact.list
      this.contact.list = this.contact.list.filter(
        item => item.id !== contactInfo.id
      )
    },
  },
}
</script>

<style scoped lang="less"></style>
