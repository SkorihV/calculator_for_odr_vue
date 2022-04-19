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
      work.isHovered = false;
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
    },
    updateAllLayoutsData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.allLayoutsData = data.allLayouts;
    },
    updateCostWorkData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.costWorkData = data.costWorkData;
    },
    updateCostWorkInDiscountData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.costWorkInDiscountData = data.costWorkInDiscountData;
    },
    updateCountWorksData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.countWorksData = data.countWorksData;
    },
    updateCostWorkTotalData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.costWorkTotalData = data.costWorkTotalData;
    },
    updateAllWorksTimeInnerData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.allWorksTimeInnerData = data.allWorksTimeInnerData;
    },
    updateAllWorksTimeOutData(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.allWorksTimeOutData = data.allWorksTimeOutData;
    },
    updateBlockName(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.blockName = data.blockName;
    },
    updateDiscountValue(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.discountValue = data.discountValue;
    },
    updateDiscountType(state, data) {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.discountType = data.discountType;
    },
    updateIsHoveredOn(state, id) {
      let work = state.dataWorksList.find(work => work.id === id);
      work.isHovered = true;
    },
    updateIsHoveredOff(state, id) {
      let work = state.dataWorksList.find(work => work.id === id);
      work.isHovered = false;
    }
  },
  actions: {
    updatedAllLayoutsData(context, data) {
      context.commit('updateAllLayoutsData', data);
    },
    updatedCostWorkData(context, data) {
      context.commit('updateCostWorkData', data);
    },
    updatedCostWorkInDiscountData(context, data) {
      context.commit('updateCostWorkInDiscountData', data);
    },
    updatedCountWorksData(context, data) {
      context.commit('updateCountWorksData', data);
    },
    updatedCostWorkTotalData(context, data) {
      context.commit('updateCostWorkTotalData', data);
    },
    updatedAllWorksTimeInnerData(context, data) {
      context.commit('updateAllWorksTimeInnerData', data);
    },
    updatedAllWorksTimeOutData(context, data) {
      context.commit('updateAllWorksTimeOutData', data);
    },
    updatedBlockName(context, data) {
      context.commit('updateBlockName', data);
    },
    updatedDiscountValue(context, data) {
      context.commit('updateDiscountValue', data);
    },
    updatedDiscountType(context, data) {
      context.commit('updateDiscountType', data);
    },
    updatedIsHoveredOn(context, id) {
      context.commit('updateIsHoveredOn', id);
    },
    updatedIsHoveredOff(context, id) {
      context.commit('updateIsHoveredOff', id);
    }
  },
  modules: {},
});
