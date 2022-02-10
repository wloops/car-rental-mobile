export default {
  namespaced: true,
  state() {
    return {
      driverPrice: '0.00', // 司机费用
      deliveryPrice: '0.00', // 取车费用
      returnPrice: '0.00', // 还车费用

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
  },
  actions: {},
}
