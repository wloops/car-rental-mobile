export default {
  namespaced: true,
  state() {
    return {
      driverPrice: 0.0, // 司机费用
      deliveryPrice: 0.0, // 取车费用
      returnPrice: 0.0, // 还车费用

      // 联系人信息
      currentContactInfo: {},
    }
  },
  getters: {
    getDriverPrice(state) {
      return state.driverPrice
    },
    getDeliveryPrice(state) {
      return state.deliveryPrice
    },
    getReturnPrice(state) {
      return state.returnPrice
    },

    getCurrentContactInfo(state) {
      return state.currentContactInfo
    },
  },
  mutations: {
    setDriverPrice(state, price) {
      state.driverPrice = price
    },
    setDeliveryPrice(state, price) {
      state.deliveryPrice = price
    },
    setReturnPrice(state, price) {
      state.returnPrice = price
    },

    setCurrentContactInfo(state, info) {
      state.currentContactInfo = info
    },
  },
  actions: {},
}
