<template>
  <van-popup
    v-model="show"
    position="top"
    safe-area-inset-bottom
    class="calendar"
    @closed="onCalendarConfirm"
    @opened="handleCalendarOpened"
  >
    <van-calendar
      ref="calendar"
      color="#ff7636"
      type="range"
      :formatter="formatter"
      :poppable="false"
      :allow-same-day="true"
      :minDate="minDate"
      @confirm="onCalendarConfirm"
      @select="onCalendarSelect"
    >
      <div slot="title" class="calendar-header">
        <i class="icon" name="fanhui_m" @click="handleBack"
          ><van-icon name="arrow-left"
        /></i>
        <div class="title">日期选择</div>
        <span class="clear" v-show="startDate" @click.stop="handleClearDate"
          >清除</span
        >
      </div>
      <div slot="footer" class="calendar-footer dis-flex flex-y-center">
        <date-time-section></date-time-section>

        <!-- <div class="flex-box f-14 text">
          <p>开始时间：{{ start }}</p>
          <p>结束时间：{{ end }}</p>
        </div> -->
        <van-button
          size="large"
          color="#ff7636"
          :disabled="isDisabled"
          @click="onCalendarConfirm"
          >确定时间</van-button
        >
      </div>
    </van-calendar>
    <van-popup
      v-model="showPicker"
      round
      position="bottom"
      @opened="handlePopupOpen"
    >
      <van-picker
        ref="picker"
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @change="onPickerChange"
        swipe-duration="500"
        visible-item-count="5"
      >
        <div class="picker-title">{{ pickerText }}</div>
      </van-picker>
    </van-popup>
  </van-popup>
</template>

<script>
import { Popup, Picker, Calendar, Button, Icon, DatetimePicker } from 'vant'
import DateTimeSection from '@/components/DateTimeSection.vue'
import moment from 'moment'
import columns from './hooks/columns'
import { mapGetters, mapMutations } from 'vuex'

function initData() {
  return {
    pickerText: '开始时间',
    show: false,
    isDisabled: true,
    showPicker: false,
    currentTime: '12:00',
    // startDate: '',
    // endDate: '',
    // startTime: '',
    // endTime: '',
  }
}

export default {
  name: 'TintDatetimePicker',
  components: {
    DateTimeSection,

    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Calendar.name]: Calendar,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [DatetimePicker.name]: DatetimePicker,
  },
  data() {
    return {
      // minDate: moment().subtract(90, 'day').toDate(),
      minDate: new Date(),
      // maxDate: new Date(),
      // maxDate: moment().add(90, 'day').toDate(),
      columns,
      ...initData(),
    }
  },
  watch: {
    startDate() {
      this.isDisabled = true
    },
    endTime(val) {
      if (!val) {
        return
      }
      if (moment(this.end).isBefore(moment(this.start))) {
        this.startTime = this.endTime
      }
      this.isDisabled = false
    },
  },
  computed: {
    start() {
      return this.startDate + ' ' + this.startTime
    },
    end() {
      return this.endDate + ' ' + this.endTime
    },
    ...mapGetters({
      startTime: 'getStartTime',
      endTime: 'getEndTime',
      startDate: 'getStartDate',
      endDate: 'getEndDate',
    }),
  },
  methods: {
    ...mapMutations({
      setStartTime: 'setStartTime',
      setEndTime: 'setEndTime',
      setStartDate: 'setStartDate',
      setEndDate: 'setEndDate',
      setCount: 'setCount',
    }),
    // 清除日历数据
    handleClearDate() {
      this.$refs.calendar.reset()
      Object.assign(this.$data, {
        pickerText: '开始时间',
        isDisabled: true,
        // startDate: '',
        // endDate: '',
        // startTime: '',
        // endTime: '',
      })
      this.setStartTime('')
      this.setEndTime('')
      this.setStartDate('')
      this.setEndDate('')
    },
    handleCalendarOpened() {
      this.isDisabled = false
      // const calendarBody =
      //   document.getElementsByClassName('van-calendar__body')[0]
      // calendarBody.scrollTo({
      //   top: calendarBody.scrollHeight,
      //   behavior: 'smooth',
      // })
    },
    showView() {
      this.show = true
    },
    handleCalendarClosed() {
      // this.$refs.calendar.reset()
      // Object.assign(this.$data, initData())
    },
    handleBack() {
      this.show = false
    },
    handlePopupOpen() {
      if (this.pickerText === '开始时间') {
        this.$refs.picker.setIndexes([8, 0, 0])
      }
      const value = this.$refs.picker.getValues()
      const str = value.join(':')
      if (this.pickerText === '开始时间') {
        // this.startTime = str
        this.setStartTime(str)
        return
      }
      // this.endTime = str
      this.setEndTime(str)
    },
    onPickerChange(el, value) {
      const str = value.join(':')
      if (this.pickerText === '开始时间') {
        // this.startTime = str
        this.setStartTime(str)
        return
      }
      // this.endTime = str
      this.setEndTime(str)
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    formatter(day) {
      // const month = day.date.getMonth() + 1
      // const date = day.date.getDate()
      const today = this.formatDate(new Date(new Date().toLocaleDateString()))
      const dayday = this.formatDate(day.date)

      // console.log(dayday)
      if (day.type === 'start') {
        day.bottomInfo = '取车'
      } else if (day.type === 'end') {
        day.bottomInfo = '还车'
      } else if (day.type === 'start-end') {
        day.bottomInfo = '取车/还车'
      }

      if (dayday === today) {
        day.topInfo = '今天'
      }

      return day
    },
    onCalendarConfirm() {
      this.$emit('confirm', { startTime: this.start, endTime: this.end })
      this.show = false
    },
    onCalendarSelect(val) {
      if (val[1]) {
        let endDateSelect = moment(val[1]).format('YYYY-MM-DD')
        this.setEndDate(endDateSelect)
        this.pickerText = '结束时间'
        this.isDisabled = false
      } else {
        if (this.end) {
          // this.endDate = ''
          // this.endTime = ''
          this.setEndDate('')
          this.setEndTime('')
        }
        let startDateSelect = moment(val[0]).format('YYYY-MM-DD')
        this.setStartDate(startDateSelect)
        this.pickerText = '开始时间'
      }
      this.showPicker = true
    },
    pickerFilter(type, options) {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0)
      }
      return options
    },
  },
}
</script>

<style scoped lang="less">
.calendar {
  width: 100%;
  height: 100%;

  .calendar-header {
    position: relative;

    .icon {
      position: absolute;
      left: 8px;
      top: 50%;
      width: 24px;
      height: 24px;
      line-height: 24px;
      padding: 0 6px;
      transform: translateY(-50%);
    }

    .title {
      text-align: center;
    }

    .clear {
      position: absolute;
      right: 8px;
      top: 50%;
      height: 24px;
      line-height: 24px;
      padding: 0 6px;
      transform: translateY(-50%);
    }
  }

  .calendar-footer {
    padding: 6px 0;

    .text {
      line-height: 20px;
    }
  }

  /deep/ .van-picker__toolbar {
    justify-content: center;
    font-weight: 500;
  }
}
</style>
