import moment from 'moment'
import { nextTimeOf } from '@/utils'

export default {
  namespaced: true,
  state() {
    return {
      startDate: moment().format('YYYY-MM-DD'), // 默认开始日期
      endDate: moment().add(1, 'days').format('YYYY-MM-DD'), // 默认结束日期
      startTime: moment().add(1, 'h').format('HH:mm'), // 默认开始时间
      endTime: moment().add(1, 'h').format('HH:mm'), // 默认结束时间
      startDateM: '', // 开始日期的月份
      startTimeD: '', // 开始时间的天
      endDateM: '', // 结束日期的月份
      endDateD: '', // 结束日期的天
      dayToDay: '', // 日期间隔
      startWeek: '', // 开始日期的星期
      endWeek: '', // 结束日期的星期
    }
  },
  getters: {
    // getters 可以实时监听state值的变化(最新状态)
    getStartTime(state) {
      // 实时监听state值里的开始时间的最新状态的变化

      // 调用nextTimeOf()函数，设置默认结束时间
      return nextTimeOf(state.startTime)
    },
    getEndTime(state) {
      // 实时监听state值里的结束时间的最新状态的变化
      // 调用nextTimeOf()函数，设置默认结束时间
      return nextTimeOf(state.endTime)
    },
    getStartDate(state) {
      // 实时监听state值里的开始日期的最新状态的变化
      return state.startDate
    },
    getEndDate(state) {
      // 实时监听state值里的结束日期的最新状态的变化
      return state.endDate
    },
    getStartDateM(state) {
      // 实时监听state值里的开始日期的最新状态的变化，只取月份
      return state.startDate.split('-')[1]
    },
    getStartDateD(state) {
      // 实时监听state值里的开始日期的最新状态的变化，只取日期
      return state.startDate.split('-')[2]
    },
    getEndDateM(state) {
      // 实时监听state值里的结束日期的最新状态的变化，只取月份
      return state.endDate.split('-')[1]
    },
    getEndDateD(state) {
      // 实时监听state值里的结束日期的最新状态的变化，只取日期
      return state.endDate.split('-')[2]
    },
    getDayToDay(state) {
      // 实时监听state值里的日期间隔的最新状态的变化
      // 计算相差几天
      let start = moment(state.startDate)
      let end = moment(state.endDate)
      let startTime = moment(state.startTime, 'HH:mm')
      let endTime = moment(state.endTime, 'HH:mm')
      // Math.floor(moment.duration(end.diff(start)).asYears()) // 2
      // console.log(Math.floor(moment.duration(b.diff(start)).asMonths())) // 26
      let total = Math.floor(moment.duration(end.diff(start)).asDays()) // 807
      // let total = end.diff(start, 'y', true) // "5 天"
      if (total > 0) {
        if (startTime < endTime) {
          return total + 1
        }
        return total
      }
      return 1
    },
    getStartWeek(state) {
      // 实时监听state值里的开始日期的最新状态的变化，只取星期（并转化格式）
      let week = moment(state.startDate).day()
      switch (week) {
        case 1:
          state.startWeek = '周一'
          break
        case 2:
          state.startWeek = '周二'
          break
        case 3:
          state.startWeek = '周三'
          break
        case 4:
          state.startWeek = '周四'
          break
        case 5:
          state.startWeek = '周五'
          break
        case 6:
          state.startWeek = '周六'
          break
        case 0:
          state.startWeek = '周日'
          break
      }
      return state.startWeek
    },
    getEndWeek(state) {
      // 实时监听state值里的结束日期的最新状态的变化，只取星期（并转化格式）
      let week = moment(state.endDate).day()
      switch (week) {
        case 1:
          state.endWeek = '周一'
          break
        case 2:
          state.endWeek = '周二'
          break
        case 3:
          state.endWeek = '周三'
          break
        case 4:
          state.endWeek = '周四'
          break
        case 5:
          state.endWeek = '周五'
          break
        case 6:
          state.endWeek = '周六'
          break
        case 0:
          state.endWeek = '周日'
          break
      }
      return state.endWeek
    },
  },
  mutations: {
    // mutations 只能执行同步代码
    setStartDate(state, payload) {
      // 通过mutations方式修改state里的值，更改开始日期
      state.startDate = payload
    },
    setEndDate(state, payload) {
      // 通过mutations方式修改state里的值，更改结束日期
      state.endDate = payload
    },
    setStartTime(state, payload) {
      // 通过mutations方式修改state里的值，更改开始时间
      state.startTime = payload
    },
    setEndTime(state, payload) {
      // 通过mutations方式修改state里的值，更改结束时间
      state.endTime = payload
    },
  },
  actions: {},
}
