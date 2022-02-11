<template>
  <div class="ContactCard">
    <van-cell center is-link size="large" @click="onListContact">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <div style="color: #fcc55e">更换</div>
      </template>
      <template #title>
        <div class="custom-title">
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
          <van-address-list
            v-model="contact.chosenContactId"
            :list="contact.list"
            default-tag-text="默认"
            add-button-text="新增联系人"
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
          <!-- <van-contact-edit
            is-edit
            :contact-info="editingContact"
            @save="onSave"
            @delete="onDelete"
          /> -->
          <van-address-edit
            :area-list="areaList"
            :address-info="editingContact"
            show-delete
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
          />
        </main>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
var _ = require('lodash')
export default {
  name: 'ContactCard',
  components: {},
  props: {},
  data() {
    return {
      areaList, // 地区列表
      areaCode: '', // 地区编码

      listPupopShow: false,
      editPupopShow: false,
      currentContact: {
        name: '',
        tel: '',
        address: '',
      },
      contact: {
        chosenContactId: '1',
        list: [
          {
            id: '1',
            name: '王纯军',
            tel: '15000011122',
            address: '中国/广东省/广州市/天河区/龙口东路129号',
            isDefault: true,
          },
          {
            id: '2',
            name: '李四',
            tel: '13000000003',
            address: '中国/广东省/广州市/天河区/龙口东路149号',
          },
        ],
      },

      editingContact: {},
    }
  },
  computed: {},
  watch: {
    currentContact: {
      handler(newVal, oldVal) {
        this.$store.commit('order/setCurrentContactInfo', newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.contact.list.forEach(item => {
      if (item.isDefault) {
        this.currentContact = item
      }
    })
  },
  mounted() {},
  methods: {
    async areaCodeInit(contact) {
      // 这里是点击编辑拿到的地址，我是用‘/’拼接起来的，现在分割一下
      let areaN = contact.address.split('/')
      let city = areaN[2] //城市
      let district = areaN[3] //区/县
      _.forEach(this.areaList.city_list, (o, c) => {
        if (o == city) {
          let cityId = String(_.take(c, 2))
          _.forEach(this.areaList.county_list, (i, a) => {
            if (i == district) {
              let districtId = String(_.take(a, 2))
              if (cityId == districtId) {
                this.areaCode = a
              }
            }
          })
        }
      })
    },

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
      // 格式化地址
      let formatContact = contact.address.split('/')
      // 获取areaCode
      this.areaCodeInit(contact)
      this.editingContact = {
        name: contact.name,
        tel: contact.tel,
        province: formatContact[1],
        city: formatContact[2],
        county: formatContact[3],
        addressDetail: formatContact[4],
        areaCode: this.areaCode,
      }
      this.editPupopShow = true
    },
    onSelect(contact) {
      console.log('选择', contact)
      this.$toast('选择' + contact.id)
      // 赋值到currentContact
      this.currentContact = contact
    },
    onSave(contactInfo) {
      console.log('保存', contactInfo)
      this.$toast('保存')
      this.editPupopShow = false
      // 新增id
      contactInfo.id = this.contact.list.length + 1
      // 格式化地址
      let contact = {
        ...contactInfo,
        address: `中国/${contactInfo.province}/${contactInfo.city}/${contactInfo.county}/${contactInfo.addressDetail}`,
      }
      // 更新contact.list
      this.contact.list.push(contact)
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
