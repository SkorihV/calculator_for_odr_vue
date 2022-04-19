import {createStore} from 'vuex';


export default createStore({
  state: {
    dataListOut: window.staticStore.dataOut,
    dataWorksList: [],
    totalSumm: 0,
  },
  getters:{
    listOut(state) {
      return state.dataListOut;
    },
    selectList(state, getters) {
      return getters.listOut.map(item => {
        return {
          workName: item.dataCalculated.workName,
          type:     item.dataCalculated.type,
          prompt:   item.dataCalculated.prompt
        }
      });
    },
    workList(state) {
      return state.dataWorksList;
    },
    work: state => Id => {
      return state.dataWorksList.find(work => work.id === Id);
    }
  },
  mutations: {
    addNewWork(state,work) {
      work.result = {
        allLayoutsData: [],
        costWorkData: 0,
        costWorkInDiscountData: 0,
        countWorksData: 0,
        costWorkTotalData: 0,
        allWorksTimeInnerData: 0,
        allWorksTimeOutData: 0,
        blockName: 0,
        discountValue: 0,
        discountType: 0
      };
      work.dataInner = {
                      name: '',
                        countBlocks: 0,
                        isLayoutPc: {
                        isDone: false,
                          name: 'Макет для ПК.',
                          id: Math.random()
                      },
                      isLayoutTable: {
                        isDone: false,
                          name: 'Макет для Планшета.',
                          id: Math.random()
                      },
                      isLayoutMobile: {
                        isDone: false,
                          name: 'Макет для Смартфона.',
                          id: Math.random()
                      },
                      extraLayouts: [],
                    }
      state.dataWorksList.unshift(work);
    },
    addTotalSumm(state, summ) {
      state.totalSumm = summ;
    },
    deleteCalc(state, id) {
      state.dataWorksList = state.dataWorksList.filter(calc => {
        return calc.id !== id;
      });
    },
    updateCountWorkData(state, data) {
      state.dataWorksList.forEach(item => {
        if (item.id === data.id) {
          item.dataInner.countBlocks = data.value;
        }
      })
    },
    createInnerData(state, data) {
      for (let i = 0; i < state.dataWorksList.length; i++ ) {
        if (state.dataWorksList[i].id === data.id) {
          state.dataWorksList[i].dataInner = data.data;
        }
      }
    }
  },
  actions: {
  },
  modules: {},
});
