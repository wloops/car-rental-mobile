import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
      startTime: moment().add(1, 'h').format('HH:mm'),
      endTime: moment().add(1, 'h').format('HH:mm'),
      startDateM: '',
      startTimeD: '',
      endDateM: '',
      endDateD: '',
      dayToDay: '',
      startWeek: '',
      endWeek: '',
    }
  },
  getters: {
    // getters 可以实时监听state值的变化(最新状态)
    getStartTime(state) {
      return state.startTime
    },
    getEndTime(state) {
      return state.endTime
    },
    getStartDate(state) {
      return state.startDate
    },
    getEndDate(state) {
      return state.endDate
    },
    getStartDateM(state) {
      return state.startDate.split('-')[1]
    },
    getStartDateD(state) {
      return state.startDate.split('-')[2]
    },
    getEndDateM(state) {
      return state.endDate.split('-')[1]
    },
    getEndDateD(state) {
      return state.endDate.split('-')[2]
    },
    getDayToDay(state) {
      // 计算相差几天
      let start = moment(state.startDate)
      let end = moment(state.endDate)
      // Math.floor(moment.duration(end.diff(start)).asYears()) // 2
      // console.log(Math.floor(moment.duration(b.diff(start)).asMonths())) // 26
      let total = Math.floor(moment.duration(end.diff(start)).asDays()) // 807
      // let total = end.diff(start, 'y', true) // "5 天"
      if (total > 0) {
        return total
      }
      return 1
    },
    getStartWeek(state) {
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
      state.startDate = payload
    },
    setEndDate(state, payload) {
      state.endDate = payload
    },
    setStartTime(state, payload) {
      state.startTime = payload
    },
    setEndTime(state, payload) {
      state.endTime = payload
    },
    setCount(state, payload) {
      state.count += payload
    },
  },
  modules: {},
})
