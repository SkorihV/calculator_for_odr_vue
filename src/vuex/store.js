import {createStore} from 'vuex';
import mutations from "@/vuex/mutations/mutations";
import actions from "@/vuex/actions/actions";
import getters from "@/vuex/getters/getters";

export default createStore({
  state: {
    dataWorksList:  [],
    dataListOut:    [],
    totalSumm:      0,
    globalArraysFormLayoutModules: {},
    globalStateFromUpdatedModules: {}
  },
  getters,
  mutations,
  actions,
  modules: {},
});
