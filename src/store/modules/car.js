export default {
  namespaced: true,
  state() {
    return {
      carInfo: [], // 车辆信息
      currentCarInfo: [], // 当前选中的车辆信息
      actNo: '', // 车型编号
    }
  },
  getters: {
    getCarInfo(state) {
      // 实时监听state值里的车辆信息的最新状态的变化
      return state.carInfo
    },
    getCurrentCarInfo(state) {
      // 实时监听state值里的当前车辆信息的最新状态的变化
      return state.currentCarInfo
    },
    getActNo(state) {
      // 实时监听state值里的车型编号的最新状态的变化
      return state.actNo
    },
  },
  mutations: {
    setCarInfo(state, payload) {
      state.carInfo = payload
    },
    setCurrentCarInfo(state, payload) {
      state.currentCarInfo = payload
    },
    setActNo(state, payload) {
      state.actNo = payload
    },
  },
  actions: {},
}
