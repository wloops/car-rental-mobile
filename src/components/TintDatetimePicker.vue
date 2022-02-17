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
      :default-date="defaultDate"
      @confirm="onCalendarConfirm"
      @select="onCalendarSelect"
    >
      <div slot="title" class="calendar-header">
        <i class="icon" name="fanhui_m" @click="handleBack"
          ><van-icon name="arrow-left"
        /></i>
        <div class="title">日期选择</div>
        <span class="clear" v-show="startDate" @click.stop="handleClearDate"
          >重置</span
        >
      </div>
      <div slot="footer" class="calendar-footer">
        <!-- 显示当前选择的日期/时间/星期，以及共计几天 -->
        <date-time-section></date-time-section>
        <van-picker
          ref="picker"
          :columns="columnsToday"
          visible-item-count="3"
          item-height="32"
          @change="useCarTimeChange"
        >
          <template #columns-top>
            <div class="useCarTimeTitle">
              <span>取车时间</span>
              <span>还车时间</span>
            </div>
          </template>
        </van-picker>
        <van-button
          block
          color="#ff7636"
          :disabled="isDisabled"
          @click="onCalendarConfirm"
          >确定时间</van-button
        >
      </div>
    </van-calendar>
  </van-popup>
</template>

<script>
import DateTimeSection from '@/components/DateTimeSection.vue'
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'
import { nextTimeOf } from '@/utils'

var _ = require('lodash')

function initData() {
  return {
    show: false,
    isDisabled: true,
    openToday: false,
  }
}

export default {
  name: 'TintDatetimePicker',
  components: {
    DateTimeSection,
  },
  data() {
    return {
      // minDate: moment().subtract(90, 'day').toDate(),
      minDate: new Date(),
      defaultDate: [new Date(), moment().add(1, 'day').toDate()],
      // maxDate: new Date(),
      // maxDate: moment().add(90, 'day').toDate(),
      ...initData(),
      columnsToday: [],
      columns: [
        // 第一列
        {
          values: [
            '00:00',
            '00:30',
            '01:00',
            '01:30',
            '02:00',
            '02:30',
            '03:00',
            '03:30',
            '04:00',
            '04:30',
            '05:00',
            '05:30',
            '06:00',
            '06:30',
            '07:00',
            '07:30',
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30',
            '21:00',
            '21:30',
            '22:00',
            '22:30',
            '23:00',
            '23:30',
          ],
          defaultIndex: 20,
        },
        // 第二列
        {
          values: [
            '00:00',
            '00:30',
            '01:00',
            '01:30',
            '02:00',
            '02:30',
            '03:00',
            '03:30',
            '04:00',
            '04:30',
            '05:00',
            '05:30',
            '06:00',
            '06:30',
            '07:00',
            '07:30',
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30',
            '21:00',
            '21:30',
            '22:00',
            '22:30',
            '23:00',
            '23:30',
          ],
          defaultIndex: 20,
        },
      ],
    }
  },
  watch: {
    // startDate() {
    //   this.isDisabled = true
    // },
    // endTime(val) {
    //   if (!val) {
    //     return
    //   }
    //   if (moment(this.end).isBefore(moment(this.start))) {
    //     this.startTime = this.endTime
    //   }
    //   this.isDisabled = false
    // },
  },
  computed: {
    start() {
      return this.startDate + ' ' + this.startTime
    },
    end() {
      return this.endDate + ' ' + this.endTime
    },
    ...mapGetters('time', {
      // 将store中的数据映射到当前组件的data中
      startTime: 'getStartTime',
      endTime: 'getEndTime',
      startDate: 'getStartDate',
      endDate: 'getEndDate',
    }),
  },
  created() {
    // 初始化时间选择器
    this.columnsToday = _.cloneDeep(this.columns) // 结合lodash的cloneDeep方法，深拷贝数组
  },
  methods: {
    ...mapMutations('time', {
      // 将改变store中的值的方法映射到当前组件的methods中
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
        isDisabled: true,
      })
    },
    handleCalendarOpened() {
      this.openToday = true
      // 打开日历时，时间选择器设置默认时间段
      this.$refs.picker.setColumnValue(0, this.startTime)
      this.$refs.picker.setColumnValue(1, this.endTime)
      this.isDisabled = false
    },
    showView() {
      this.show = true
    },
    handleBack() {
      if (this.isDisabled === true) {
        Toast.fail('请选择还车的时间')
      } else {
        this.show = false
      }
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
      // 自定义日期选择时显示的文本
      if (day.type === 'start') {
        day.bottomInfo = '取车'
      } else if (day.type === 'end') {
        day.bottomInfo = '还车'
      } else if (day.type === 'start-end') {
        day.bottomInfo = '取车/还车'
      }

      if (dayday === today) {
        day.topInfo = '今天'
        // this.columnsToday[0].values = this.columns[0].values.filter(item => {
        //   // let startTimeValue = this.$refs.picker.getColumnValue(0).split(':')[0]
        //   let startTimeValue = moment()
        //     .add(1, 'h')
        //     .format('HH:mm')
        //     .split(':')[0]
        //   if (item.split(':')[0] >= startTimeValue) {
        //     return true
        //   }
        //   return false
        // })
      }
      return day
    },
    onCalendarConfirm() {
      this.$emit('confirm', { startTime: this.start, endTime: this.end })
      this.show = false
    },
    onCalendarSelect(val) {
      // console.log(val)
      // const today = moment(new Date()).format('YYYY-MM-DD')

      if (val[0]) {
        this.openToday = false

        let startDateSelect = moment(val[0]).format('YYYY-MM-DD')
        this.$refs.picker.setColumnValue(0, this.startTime)
        this.$refs.picker.setColumnValue(1, this.endTime)

        // console.log('columns:', this.columns)
        // console.log('columsToday:', this.columnsToday)
        this.setStartDate(startDateSelect)
        this.isDisabled = true
        // console.log('取车日期', val[0])
        if (val[1]) {
          // console.log('还车日期', val[1])
          let endDateSelect = moment(val[1]).format('YYYY-MM-DD')
          // 如果选择的日期是今天，则重新设置时间选择器的默认时间段
          this.setTodayTime(endDateSelect, 1)
          this.setEndDate(endDateSelect)

          // 如果选择的开始结束日期相同，则设置时间选择器的默认时间段(并禁用不可选择的时间段)
          if (startDateSelect === endDateSelect) {
            console.log('选择的开始结束日期相同')
            let time2330 = moment({ hour: 23, minute: 30 }).format('HH:mm')
            let end = nextTimeOf(moment().add(4, 'h').format('HH:mm'))
            // 时间不超过23点
            if (end <= nextTimeOf(moment().add(1, 'h').format('HH:mm'))) {
              end = time2330
            }
            console.log('end:', end)
            this.$refs.picker.setColumnValue(1, end)
          }
          this.isDisabled = false
        }
        // 如果选择的日期是今天，则重新设置时间选择器的默认时间段
        this.setTodayTime(startDateSelect, 0)
      }
    },
    setTodayTime(time, i) {
      // 如果选择的日期是今天，则重新设置时间选择器的默认时间段
      const today = moment(new Date()).format('YYYY-MM-DD')
      if (time === today) {
        this.columnsToday[i].values = this.columns[i].values.filter(item => {
          // let startTimeValue = this.$refs.picker.getColumnValue(0).split(':')[0]

          let startTimeValue = moment()
            .add(1, 'h')
            .format('HH:mm')
            .split(':')[0]

          if (item.split(':')[0] >= startTimeValue) {
            return true
          }
          return false
        })
      } else {
        this.columnsToday[i].values = this.columns[i].values
      }
    },
    useCarTimeChange(el, val) {
      if (this.openToday === true) {
        // 如果开始时间是今天,则不能设置小于当前时间
        let startTimeValue = moment().add(1, 'h').format('HH:mm').split(':')[0]
        if (val[0].split(':')[0] < startTimeValue) {
          this.$refs.picker.setColumnValue(0, this.startTime)
          this.$toast.fail('取车时间不能早于当前时间')
        } else {
          this.setStartTime(val[0])
          this.setEndTime(val[1])
        }
      } else {
        this.setStartTime(val[0])
        this.setEndTime(val[1])
      }
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
    .van-button {
      margin-bottom: 0.5rem;
    }
  }

  /deep/ .van-picker__toolbar {
    justify-content: center;
    font-weight: 500;
  }
}
.useCarTimeTitle {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-around;
}
</style>
