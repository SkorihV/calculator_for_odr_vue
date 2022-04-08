<template>
  <div class="app__wrapper p-5">
    <vue-select
      :selectList="selectList"
      @changeSelectOut="changedTypeWork"
    ></vue-select>
    <template class="w-25" v-if="currentTypeWork.length > 0">
      <Component
        :is="currentTypeWork"
        :data="dataForCalculator"
      ></Component>
    </template>
  </div>
</template>

<script>
import VueSelect from "@/components/VueSelect";
import layoutOfBlock from "@/components/VueCalculator_layoutOfBlock";

export default {
  workName: 'App',
  created() {
    this.dataListOut = window.staticStore.dataOut;
  },
  components: {
    VueSelect,
    layoutOfBlock
  },

  data() {
    return {
      dataListOut: [],
      currentTypeWork: '',
      dataListInner: []
    }
  },
  methods: {
    changedTypeWork(value) {
      this.currentTypeWork = value;
    }
  },
  computed: {
    selectList() {
        return this.dataListOut.map(item =>{
          return {
            workName: item.workName,
            type:     item.type,
            prompt:   item.prompt
          }
        });
    },
    dataForCalculator() {
      return this.dataListOut.filter(item => {
        return item.type === this.currentTypeWork;
      })[0];
    }
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app__wrapper {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
