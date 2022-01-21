export default {
  namespaced: true,
  state() {
    return {
      carInfo: [], // 车辆信息
      currentCarInfo: [], // 当前选中的车辆信息
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
  },
  mutations: {
    setCarInfo(state, payload) {
      // 通过mutations方式修改state里的值，更改当前选中的tab
      state.carInfo = payload
    },
    setCurrentCarInfo(state, payload) {
      // 通过mutations方式修改state里的值，更改当前选中的tab
      state.currentCarInfo = payload
    },
  },
  actions: {},
}
