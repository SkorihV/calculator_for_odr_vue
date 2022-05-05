export default {
  setDatalistOut: (state, list) => {
    state.dataListOut = list;
  },
  addNewWork: (state, work) => {

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
  addLayoutIdForCalc: (state, data) => {
    let {nameDataArray, layoutId} = data;
    if (!state.globalArraysFormLayoutModules[nameDataArray]) {
      state.globalArraysFormLayoutModules[nameDataArray] = [];
    }
    state.globalArraysFormLayoutModules[nameDataArray].push(layoutId)
  },
  removeLayoutIdForCalc: (state, data) => {
    let {nameDataArray, layoutId} = data;
    state.globalArraysFormLayoutModules[nameDataArray] = state.globalArraysFormLayoutModules[nameDataArray].filter(layout => {
      return layout !== layoutId;
    })

    if (state.globalArraysFormLayoutModules[nameDataArray].length === 0) {

    }
  },
  switchStateFromUpdateModuleOff: (state, typeName) => {

    state.globalStateFromUpdatedModules[typeName] = false;
  },
  switchStateFromUpdateModuleOn: (state, typeName) => {
    state.globalStateFromUpdatedModules[typeName] = true;
  },
}
