import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // vuex-persistedstate默认持久化所有state，指定需要持久化的state

import time from './modules/time'
import car from './modules/car'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      tabName: '单位租', // 当前选中的tab
      adImagesLink: [], // 广告图片链接
      // unitToken: '', // 单位token
      // personalToken: '', // 个人token
    }
  },
  getters: {
    getTabName(state) {
      // 实时监听state值里的当前选中的tab的最新状态的变化
      return state.tabName
    },
    getAdImagesLink(state) {
      // 实时监听state值里的广告图片链接的最新状态的变化
      return state.adImagesLink
    },
    // getUnitToken(state) {
    //   return state.unitToken
    // },
    // getPersonalToken(state) {
    //   return state.personalToken
    // },
  },
  mutations: {
    setTabName(state, payload) {
      // 通过mutations方式修改state里的值，更改当前选中的tab
      state.tabName = payload
    },
    setAdImagesLink(state, payload) {
      // 通过mutations方式修改state里的值，更改当前选中的tab
      state.adImagesLink = payload
    },
    // setUnitToken(state, payload) {
    //   state.unitToken = payload
    // },
    // setPersonalToken(state, payload) {
    //   state.personalToken = payload
    // },
  },
  modules: {
    // 模块
    time,
    car,
    order,
  },
  plugins: [
    createPersistedState({
      // storage: window.localStorage,
      storage: window.sessionStorage,
      // vuex-persistedstate默认持久化所有state，指定需要持久化的state
      reducer(val) {
        return {
          // 只储存state中的user
          adImagesLink: val.adImagesLink,
          // unitToken: val.unitToken,
          // personalToken: val.personalToken,
        }
      },
    }),
  ],
})
