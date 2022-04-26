import {createStore} from 'vuex';


export default createStore({
  state: {
    dataWorksList:  [],
    dataListOut:    window.staticStore.dataOut,
    totalSumm:      0,
    layoutForShop: [],
    layoutOfBlock: [],
    newSample: [],
    titleForBusiness: [],
  },
  getters: {
    listOut(state) {
      return state.dataListOut;
    },
    selectList(state, getters) {
      return getters.listOut.map(item => {
        return {
          workName: item.dataCalculated.workName,
          prompt:   item.dataCalculated.prompt,
          type:     item.dataCalculated.type
        }
      });
    },
    workList(state) {
      return state.dataWorksList;
    },
    work: state => Id => {
      return state.dataWorksList.find(work => work.id === Id);
    },
    layoutIdForName: state => nameArrayLayouts => {
      return state[nameArrayLayouts];
    },

    allTimeInner(state) {
      return state.dataWorksList.reduce((summ, work) => {
        return summ + work.result.allWorksTimeInnerData;
      }, 0)
    },
    allTimeOut(state) {
      return state.dataWorksList.reduce((summ, work) => {
        return summ + work.result.allWorksTimeOutData;
      }, 0)
    }
  },
  mutations: {
    addNewWork: (state,work) => {
      work.isHovered = false;
      work.result = {
        costWorkInDiscountData: 0,
        allWorksTimeInnerData:  0,
        allWorksTimeOutData:    0,
        costWorkTotalData:      0,
        allLayoutsData:         [],
        countWorksData:         0,
        discountValue:          0,
        costWorkData:           0,
        discountType:           0,
        blockName:              0
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
      };
      state.dataWorksList.unshift(work);
    },
    addTotalSumm: (state, summ) => {
      state.totalSumm = summ;
    },
    deleteCalc: (state, id) => {
      state.dataWorksList = state.dataWorksList.filter(calc => {
        return calc.id !== id;
      });
    },
    updateCountWorkData: (state, data) => {
      state.dataWorksList.forEach(item => {
        if (item.id === data.id) {
          item.dataInner.countBlocks = data.value;
        }
      })
    },
    createInnerData: (state, data) => {
      for (let i = 0; i < state.dataWorksList.length; i++ ) {
        if (state.dataWorksList[i].id === data.id) {
          state.dataWorksList[i].dataInner = data.data;
        }
      }
    },
    updateIsHoveredOn: (state, id) => {
      let work = state.dataWorksList.find(work => work.id === id);
      if (work) {
        work.isHovered = true;

      }
    },
    updateIsHoveredOff: (state, id) => {
      let work = state.dataWorksList.find(work => work.id === id);
      if (work) {
        work.isHovered = false;
      }
    },
    updateAllDataResult: (state, data) => {
      let work = state.dataWorksList.find(work => work.id === data.id);
      work.result.costWorkInDiscountData  = data.costWorkInDiscountData;
      work.result.allWorksTimeInnerData   = data.allWorksTimeInnerData;
      work.result.allWorksTimeOutData     = data.allWorksTimeOutData;
      work.result.costWorkTotalData       = data.costWorkTotalData;
      work.result.allLayoutsData          = data.allLayouts;
      work.result.countWorksData          = data.countWorksData;
      work.result.discountValue           = data.discountValue;
      work.result.costWorkData            = data.costWorkData;
      work.result.discountType            = data.discountType;
      work.result.blockName               = data.blockName;
    },
    addLayoutIdForCalcs(state, data){
      let {nameDataArray, layoutId} = data;
      state[nameDataArray].push(layoutId)
    },
    removeLayoutIdForCalsc(state, data) {
      let {nameDataArray, layoutId} = data;
      state[nameDataArray] = state[nameDataArray].filter(layout => {
        return layout !== layoutId;
      })
    },
  },
  actions: {
    updatedAllDataResult(context, data) {
      context.commit('updateAllDataResult', data);
    },
    updatedIsHoveredOn(context, id) {
      context.commit('updateIsHoveredOn', id);
    },
    updatedIsHoveredOff(context, id) {
      context.commit('updateIsHoveredOff', id);
    },
    uploadAddLayoutIdForShop({commit}, data){
      commit('addLayoutIdForShops', data);
    },
    uploadRemoveLayoutIdForShop({commit}, data) {
      commit('removeLayoutIdForShops', data);
    }
  },
  modules: {},
});
