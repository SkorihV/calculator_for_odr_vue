export default {
  updatedAllDataResult({commit}, data) {
    commit('updateAllDataResult', data);
  },
  updatedIsHoveredOn({commit}, id) {
    commit('updateIsHoveredOn', id);
  },
  updatedIsHoveredOff({commit}, id) {
    commit('updateIsHoveredOff', id);
  },
  uploadAddLayoutIdForShop({commit}, data){
    commit('addLayoutIdForShops', data);
  },
  uploadRemoveLayoutIdForShop({commit}, data) {
    commit('removeLayoutIdForShops', data);
  }
}
