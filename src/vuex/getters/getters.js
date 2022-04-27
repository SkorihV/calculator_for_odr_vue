export default {
  listOut(state) {
    return state.dataListOut ?? [];
  },
  selectList(state, getters) {

    if (getters.listOut.length) {
      return getters.listOut.map(item => {
        return {
          workName: item.dataCalculated.workName,
          prompt:   item.dataCalculated.prompt,
          type:     item.dataCalculated.type,
          id:       item.dataCalculated.id,
        }
      });
    } else {
      return [];
    }

  },
  workList(state) {
    return state.dataWorksList.sort((a,b) => {
      return a.dataCalculated.workName.localeCompare(b.dataCalculated.workName);
    })
  },
  work: state => Id => {
    return state.dataWorksList.find(work => work.id === Id);
  },
  layoutIdForNameType: state => nameArrayLayouts => {
    return state.globalArraysFormLayoutModules[nameArrayLayouts];
  },
  stateUpdateFromNameType: state => nameArrayLayouts => {
    return state.globalStateFromUpdatedModules[nameArrayLayouts] ?? null;
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
}
