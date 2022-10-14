<template>
  <van-popup
    v-model="show"
    position="top"
    safe-area-inset-bottom
    class="calendar"
    @opened="handleCalendarOpened"
    transition-appear
    get-container="body"
  >
    <van-calendar
      ref="calendar"
      color="#ff7636"
      type="range"
      :formatter="formatter"
      :poppable="false"
      :allow-same-day="true"
      :minDate="minDate"
      :max-date="maxDate"
      :max-range="maxRangeIndex"
      :range-prompt="rangePrompt"
      :default-date="defaultDate"
      @confirm="onCalendarConfirm"
      @select="onCalendarSelect"
    >
      <div slot="title" class="calendar-header">
        <i class="icon" name="fanhui_m" @click="handleBack"><van-icon name="arrow-left" /></i>
        <div class="title">日期选择</div>
        <span class="clear" v-show="startDate" @click.stop="handleClearDate">重置</span>
      </div>
      <div slot="footer" class="calendar-footer">
        <!-- 显示当前选择的日期/时间/星期，以及共计几天 -->
        <date-time-section></date-time-section>
        <van-picker ref="picker" :columns="columnsToday" visible-item-count="3" item-height="32" @change="useCarTimeChange">
          <template #columns-top>
            <div class="useCarTimeTitle">
              <span>取车时间</span>
              <span>还车时间</span>
            </div>
          </template>
        </van-picker>
        <van-button block color="#ff7636" :disabled="isDisabled" @click="onCalendarConfirm">{{ subBtnText }}</van-button>
      </div>
    </van-calendar>
  </van-popup>
</template>

<script>
import { queryCarRentableDate } from '@/api/carInfo'
import { ZCbtnModifyValetDrivingOrderTime, ZCbtnModifySelfDrivingOrderTime } from '@/api/order'

import DateTimeSection from '@/components/DateTimeSection.vue'
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'
import { nextTimeOf } from '@/utils'
import { BASE_COMNAME } from '@/global/config'

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
      subBtnText: '确定时间',
      // minDate: moment().subtract(90, 'day').toDate(),
      minDate: new Date(),
      defaultDate: [new Date(), moment().add(1, 'day').toDate()],
      // maxDate: new Date(),
      maxDate: moment().add(60, 'day').toDate(),
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
      count: 'getDayToDay',
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
      // setCount: 'setCount',
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
    showView(data, type) {
      if (type) {
        // TODO: 查询当前选择车型的可选日期
        let carModel = type === 'filter' ? data.carModel : data.carType
        queryCarRentableDate({
          carModel: carModel,
        }).then(res => {
          console.log('查询当前选择车型的可选日期:', res.data)
          if (res.data.rs === '1') {
            this.dateLists = res.data.queryCarRentableDate
            this.subBtnText = '修改时间'
            if (type === 'change') {
              this.changeTimeData = data
              this.changeTimeFlag = true
            }
            this.show = true
          }
        })
      } else {
        this.show = true
      }

      // let defaultStartDate = moment().format('YYYY-MM-DD')
      // let defaultEndDate = moment().add(1, 'day').format('YYYY-MM-DD')
      // console.log('defaultStartDate:', defaultStartDate)
      // console.log('defaultEndDate:', defaultEndDate)
      // // let defaultEndDate = moment(val[1]).format('YYYY-MM-DD')
      // this.setStartDate(defaultStartDate)
      // this.setEndDate(defaultEndDate)
      // this.handleClearDate()
    },
    handleBack() {
      if (this.isDisabled === true) {
        Toast.fail('请选择还车的时间')
      } else {
        this.show = false
      }
    },
    formatDate(date, today) {
      if (today) {
        return `${date.getMonth() + 1}/${date.getDate()}`
      } else {
        let month0 = date.getMonth() + 1
        let date0 = date.getDate()
        month0 = month0 + '' // 先将其转化成字符串
        date0 = date0 + ''
        month0 = month0.padStart(2, '0') // 第一个参数是最大位数为2位，第二个参数是用 "0" 来补全前面缺少的位数 // padStart 是添加到头部，padEnd()就是添加到尾部
        date0 = date0.padStart(2, '0')
        return `${date.getYear() + 1900}${month0}${date0}`
      }
    },
    formatter(day) {
      // const month = day.date.getMonth() + 1
      // const date = day.date.getDate()
      const today = this.formatDate(new Date(new Date().toLocaleDateString()), 'today')
      const dayday = this.formatDate(day.date, 'today')
      let selectDay = this.formatDate(day.date)
      // console.log('selectDay', day)
      if (this.dateLists) {
        let isDisabled = true
        this.dateLists.forEach((item, index) => {
          if (selectDay === item.rentableDate) {
            // day.topInfo = '可选'
            isDisabled = false
          }
        })
        if (isDisabled) {
          day.type = 'disabled'
        }
      }
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
    maxRange(select) {
      // let select = '2022-10-12'
      // this.dateLists 转YYYY-MM-DD
      let days = []
      this.dateLists.forEach(day => {
        days.push(moment(day.rentableDate).format('YYYY-MM-DD'))
      })
      days = days.sort()

      console.log('days', days)
      let days_arr = []
      var days_index = 0
      let index = -1
      days.forEach((item, i) => {
        if (select === item) {
          console.log('select index: ', i)
          index = i
        }
        if (index >= 0) {
          days_arr.push(item)
          console.log(this.continueDays(days_arr))
          if (this.continueDays(days_arr)) {
            days_index++
          } else {
            // days_index = 0
            console.log('days_index', days_index)
          }
        }
      })

      this.maxRangeIndex = days_index
      this.rangePrompt = `当前选择租车时间最多不超过${days_index}天`
      console.log('days_index', days_index)
    },
    continueDays(arr_days) {
      console.log(arr_days)
      // 先排序，然后转时间戳
      let days = arr_days.sort().map((d, i) => {
        let dt = new Date(d)
        dt.setDate(dt.getDate() + 4 - i) // 处理为相同日期

        // 抹去 时 分 秒 毫秒
        dt.setHours(0)
        dt.setMinutes(0)
        dt.setSeconds(0)
        dt.setMilliseconds(0)

        return +dt
      })

      let ret = true

      days.forEach(d => {
        if (days[0] !== d) {
          ret = false
        }
      })

      return ret
    },
    formatStoreDate(date) {
      // 格式化时间为 yyyyMMdd
      if (date.indexOf('-') > -1) {
        date = date.replace(/-/g, '')
      } else if (date.indexOf(':') > -1) {
        date = date.replace(/:/g, '') + '00'
      }
      return date
    },
    onCalendarConfirm() {
      // this.$emit('confirm', { startTime: this.start, endTime: this.end })
      if (this.changeTimeFlag) {
        console.log('执行-->修改订单时间')
        console.log('修改时间:startDate', this.formatStoreDate(this.startDate))
        console.log('修改时间:endDate', this.formatStoreDate(this.endDate))
        console.log('修改时间:startTime', this.formatStoreDate(this.startTime))
        console.log('修改时间:endTime', this.formatStoreDate(this.endTime))
        console.log('修改时间:count', this.count)
        console.log('changeTimeData:', this.changeTimeData)
        // 代驾跟自驾订单分别调用不同的按钮
        let reqData = {
          saleCmpName: BASE_COMNAME,
          srlIDForEngine: 'Splenwise微信预约点餐系统',
          busiNameForEngine: '汽车租赁业务',
          busiFunNameForEngine: '修改租车订单',
          miniProcNameForEngine: '修改订单租车日期',
          billNo: this.changeTimeData.billNo,
          orderDate: this.formatStoreDate(this.changeTimeData.carUseTimeBegin),
          orderEndDate: this.formatStoreDate(this.changeTimeData.carUseTimeEnd),
          startDate: this.formatStoreDate(this.startDate),
          endDate: this.formatStoreDate(this.endDate),
          startTime: this.formatStoreDate(this.startTime),
          endTime: this.formatStoreDate(this.endTime),
          attr128LenValue1: this.changeTimeData.carType,
        }
        // 发送修改时间请求
        // 请求成功后,关闭弹窗并让父组件(订单列表)刷新
        if (this.changeTimeData.orderDriveType === '代驾') {
          ZCbtnModifyValetDrivingOrderTime(reqData).then(res => {
            console.log('代驾', res.data)
            if (res.data.rs === '1') {
              this.$toast.success('修改成功')
              this.$emit('refresh')
            }else{
             this.$toast(res.data.rs)
            }
          })
        } else {
          reqData.miniProcNameForEngine = '修改订单租车日期-自驾订单'
          ZCbtnModifySelfDrivingOrderTime(reqData).then(res => {
            console.log('自驾', res.data)
            if (res.data.rs === '1') {
              this.$toast.success('修改成功')
              this.$emit('refresh')
            }else{
             this.$toast(res.data.rs)
            }
          })
        }
        console.log('修改订单时间请求参数:', reqData)
      }
      this.show = false
    },
    onCalendarSelect(val) {
      console.log('当前选择日期:', val)
      // const today = moment(new Date()).format('YYYY-MM-DD')

      if (val[0]) {
        this.openToday = false

        let startDateSelect = moment(val[0]).format('YYYY-MM-DD')
        this.$refs.picker.setColumnValue(0, this.startTime)
        this.$refs.picker.setColumnValue(1, this.endTime)
        if (this.dateLists) {
          this.maxRange(startDateSelect)
        }
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
            // 保存到vuex
            this.setEndTime(end)
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

          let startTimeValue = moment().add(1, 'h').format('HH:mm').split(':')[0]

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
