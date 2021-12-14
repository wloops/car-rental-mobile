import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      count: 0,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
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
    getCount(state) {
      return state.count
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
