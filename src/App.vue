<template>
  <div class="app__wrapper p-5">
    <vue-select
      ref="select-work"
      :selectList="selectList"
      v-model:selectedSelect="selectedSelect"
      @changeSelectOut="changedTypeWork"
    ></vue-select>
    <div v-if="currentTypeWork.length > 5" class="btn-group w-25" role="group" aria-label="Basic mixed styles example">
      <button @click.stop="addWork" type="button" class="btn btn-success">Добавить работу в список</button>
    </div>
    <div class="allWorks mt-3">
        <Component
          v-for=" (work, index) in dataWorksList"
          :key="work.id"
          :is="work.dataCalculated.type"
          :data="work"
          @deleteCalc="deleteCalc"
          v-model:resultData="updateResultData"
        ></Component>

    </div>
    <div class="allResult" v-if="totalSumm > 0">
      <h2>Список всех работ!</h2>
      <template v-for="data in dataWorksList">
        <result-block
          v-if="data.result !== null"
          :dataValue="data.result"
          :mainTitle="data.dataInner.name"
        ></result-block>
      </template>
      <div>Общая сумма заказа - {{totalSumm}}₽</div>
    </div>
  </div>
</template>

<script>
import VueSelect from "@/components/VueSelect";
import layoutOfBlock from "@/components/VueCalculator_layoutOfBlock";
import titleForBusiness from "@/components/VueCalculator_layoutOfBusiness";
import layoutForShop from "@/components/VueCalculator_layoutOfShop";
import newSample from "@/components/VueCalculator_layoutOfSample";
import resultBlock from "@/UI/VueResultBlock";

export default {
  workName: 'App',
  created() {
    this.dataListOut = window.staticStore.dataOut;
  },
  components: {
    VueSelect,
    layoutOfBlock,
    titleForBusiness,
    layoutForShop,
    newSample,
    resultBlock
  },

  data() {
    return {
      dataListOut: [],
      currentTypeWork: '',
      dataWorksList: [],
      selectedSelect: true,
      resultData: [],
      totalSumm: 0
    }
  },
  methods: {
    changedTypeWork(value) {
      this.currentTypeWork = value;
    },
    addWork() {
      if (!this.$options.components.hasOwnProperty(this.currentTypeWork)) {
        return false;
      }
      let list = JSON.parse(JSON.stringify(this.dataListOut))
      let work = null;
      let id = Math.random();
      list.forEach( item => {
        if(item.dataCalculated.type === this.currentTypeWork) {
          work = item;
          work.id = id;
          work.result = null;
        }
      })

      this.dataWorksList.push(work);
      this.currentTypeWork = '';
      this.selectedSelect = true;
    },
    deleteCalc(id) {
      this.dataWorksList = this.dataWorksList.filter(calc => {
        return calc.id !== id;
      })
    },
    updateResultData(value) {
    },
  },
  computed: {
    selectList() {
        return this.dataListOut.map(item => {
          return {
            workName: item.dataCalculated.workName,
            type:     item.dataCalculated.type,
            prompt:   item.dataCalculated.prompt
          }
        });
    },
    dataForCalculator() {
      return this.dataListOut.filter(item => {
        return item.dataCalculated.type === this.currentTypeWork;
      })[0];
    },
    allCostWorks() {

    }
  },
  watch: {
    dataWorksList: {
      handler() {
        this.totalSumm = this.dataWorksList.reduce((value, item) => {
          if (item.result !== null) {
            return value += item.result.costWorkTotalData;
          }
          return value
        }, 0)

      },
      deep: true

    }
  }
};

</script>

<style scoped>
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

.allWorks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
