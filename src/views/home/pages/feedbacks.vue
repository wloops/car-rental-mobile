<template>
  <div class="Feedbacks">
    <van-form @submit="onSubmit">
      <van-nav-bar title="意见反馈" left-arrow @click-left="onClickLeft" />
      <div class="opinionType">
        <h4>意见类型</h4>
        <van-row gutter="20" type="flex">
          <van-col span="8" @click="onChoiceType1">
            <van-tag
              v-if="choiceType1 === false"
              color="#f7f7f7"
              text-color="#6c6c6c"
              size="large"
              >功能故障</van-tag
            >
            <van-tag
              v-else
              color="#ffc65f"
              plain
              text-color="#ffc65f"
              size="large"
              >功能故障</van-tag
            >
          </van-col>
          <van-col span="8" @click="onChoiceType2">
            <van-tag
              color="#f7f7f7"
              text-color="#6c6c6c"
              size="large"
              v-if="choiceType2 === false"
              >信息有误</van-tag
            >
            <van-tag
              color="#ffc65f"
              plain
              text-color="#ffc65f"
              size="large"
              v-else
              >信息有误</van-tag
            >
          </van-col>
          <van-col span="8" @click="onChoiceType3">
            <van-tag
              color="#f7f7f7"
              text-color="#6c6c6c"
              size="large"
              v-if="choiceType3 === false"
              >产品建议</van-tag
            >
            <van-tag
              color="#ffc65f"
              plain
              text-color="#ffc65f"
              size="large"
              v-else
              >产品建议</van-tag
            >
          </van-col>
          <van-col span="8" @click="onChoiceType4">
            <van-tag
              color="#f7f7f7"
              text-color="#6c6c6c"
              size="large"
              v-if="choiceType4 === false"
              >其他反馈</van-tag
            >
            <van-tag
              color="#ffc65f"
              plain
              text-color="#ffc65f"
              size="large"
              v-else
              >其他反馈</van-tag
            >
          </van-col>
        </van-row>
      </div>
      <div class="opinionDetailed">
        <h4>详细意见</h4>
        <van-field
          v-model="opinionMessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="300"
          placeholder="请详细描述您的意见或建议。我们将在1-3个工作日之内处理"
          show-word-limit
        />
        <van-uploader v-model="fileList" :after-read="afterRead" />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field v-model="tel" type="tel" label="联系手机" />
      </div>
      <div class="submitBox" style="width: 100%">
        <van-button
          block
          type="info"
          native-type="submit"
          :loading="loading"
          color="#ffc65f"
          style="width: 90%"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Tag, Col, Row, Field, Uploader, Button, Form } from 'vant'
export default {
  name: 'Feedbacks',
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Form.name]: Form,
  },
  props: {},
  data() {
    return {
      typeList: [],
      choiceType1: false,
      choiceType2: false,
      choiceType3: false,
      choiceType4: false,
      opinionMessage: '',
      fileList: [
        {
          url: 'https://img01.yzcdn.cn/vant/leaf.jpg',
        },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        {
          url: 'https://img01.yzcdn.cn/vant/tree.jpg',
        },
      ],
      tel: '',
      loading: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onChoiceType1() {
      this.choiceType1 = !this.choiceType1
      if (this.choiceType1 === true) {
        this.typeList.push('功能故障')
      } else {
        this.typeList.splice(this.typeList.indexOf('功能故障'), 1)
      }
    },
    onChoiceType2() {
      this.choiceType2 = !this.choiceType2
      if (this.choiceType2 === true) {
        this.typeList.push('信息有误')
      } else {
        this.typeList.splice(this.typeList.indexOf('信息有误'), 1)
      }
    },
    onChoiceType3() {
      this.choiceType3 = !this.choiceType3
      if (this.choiceType3 === true) {
        this.typeList.push('产品建议')
      } else {
        this.typeList.splice(this.typeList.indexOf('产品建议'), 1)
      }
    },
    onChoiceType4() {
      this.choiceType4 = !this.choiceType4
      if (this.choiceType4 === true) {
        this.typeList.push('其他反馈')
      } else {
        this.typeList.splice(this.typeList.indexOf('其他反馈'), 1)
      }
    },

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      file.status = 'uploading'
      file.message = '上传中...'

      setTimeout(() => {
        file.status = 'failed'
        file.message = '上传失败'
      }, 1000)
    },
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style scoped lang="less">
.opinionType {
  padding: 1rem;
  .van-col {
    margin-bottom: 0.5rem;
  }
}

.submitBox {
  display: flex;
  justify-content: center;
  // align-items: center;
  position: fixed;
  bottom: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
