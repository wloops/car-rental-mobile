<template>
  <div class="ModelNavtop">
    <van-nav-bar
      fixed
      placeholder
      @click-left="backHome"
      @click-right="editTime"
    >
      <template #left>
        <van-icon name="arrow-left" size="1.3rem" />
      </template>
      <template #title>
        <div class="useCarTime" @click="editTime">
          <p class="useCarTimeText">用车时间</p>
          <p>
            <span class="startDateMD"
              >{{ startDateM }}月{{ startDateD }}日</span
            >
            <span class="startDateTime timeText">{{ startTime }}</span>
            -
            <span class="endDateMD">{{ endDateM }}月{{ endDateD }}日</span>
            <span class="endDateTime timeText">{{ endTime }}</span>
          </p>
        </div>
      </template>
      <template #right>
        <van-icon name="edit" size="1.3rem" />
      </template>
    </van-nav-bar>
    <div class="topPopup">
      <van-popup v-model="popupShow" position="top" :style="{ height: '23%' }">
        <van-cell-group inset>
          <date-time-section @click.native="showPicker"></date-time-section>
          <van-button block color="#ff7636" @click="closePopup"
            >确定修改</van-button
          >
        </van-cell-group>
      </van-popup>
      <tint-datetime-picker ref="tintPicker"></tint-datetime-picker>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import DateTimeSection from '@/components/DateTimeSection.vue'
import TintDatetimePicker from '@/components/TintDatetimePicker.vue'

export default {
  name: 'ModelNavtop',
  components: {
    DateTimeSection,
    TintDatetimePicker,
  },
  props: {},
  data() {
    return {
      popupShow: false,
    }
  },
  computed: {
    ...mapGetters({
      startTime: 'getStartTime',
      endTime: 'getEndTime',
      startDate: 'getStartDate',
      endDate: 'getEndDate',
      startDateM: 'getStartDateM',
      startDateD: 'getStartDateD',
      endDateM: 'getEndDateM',
      endDateD: 'getEndDateD',
      // dayToDay: 'getDayToDay',
      // startWeek: 'getStartWeek',
      // endWeek: 'getEndWeek',
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    backHome() {
      this.$router.push('/')
    },
    closePopup() {
      this.popupShow = false
    },
    editTime() {
      this.popupShow = !this.popupShow
      console.log('click editTime')
    },
    showPicker() {
      this.$refs.tintPicker.showView()
    },
  },
}
</script>

<style scoped lang="less">
.useCarTime {
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  font-size: 0.7rem;
  color: #909090;
  .useCarTimeText {
    font-size: 0.8rem;
    font-weight: 500;
  }
  p {
    line-height: 0.3rem;
  }
}
</style>
