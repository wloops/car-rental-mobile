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
      //  去重方法1：利用对象访问属性的方法，判断对象中是否存在key
      var result = []
      var obj = {}
      for (var i = 0; i < payload.length; i++) {
        if (!obj[payload[i].prdNo]) {
          result.push(payload[i])
          obj[payload[i].prdNo] = true
        }
      }
      state.carInfo = result
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
