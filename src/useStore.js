import {defineStore} from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      counter: 0,
      dataListOut: window.staticStore.dataOut,
      worksList: [],
      resultData: [],
    }
  },
  getters: {
    getSomething(store) {
      return (param) => {
        return param + 10;
      }
    }
  },
  actions: {
    increment() {
      this.counter++;
    }
  },

})
