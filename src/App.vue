<template>
  <div class="app__wrapper p-5">
    <vue-select
      ref="select-work"
      :selectList="selectList"
      @changeSelectOut="changedTypeWork"
    ></vue-select>

    <div v-if="currentTypeWork.length > 5" class="btn-group w-25" role="group" aria-label="Basic mixed styles example">
      <button @click.stop="addWork" type="button" class="btn btn-success">Добавить работу в список</button>
    </div>
    <div>{{dataWorksList}}</div>
    <div class="allWorks mt-3">

        <Component
          v-for=" (work, index) in dataWorksList"
          :key="work.id"
          :is="work.dataCalculated.type"
          :data="work"
          @deleteCalc="deleteCalc"
        ></Component>

    </div>
  </div>
</template>

<script>
import VueSelect from "@/components/VueSelect";
import layoutOfBlock from "@/components/VueCalculator_layoutOfBlock";
import titleForBusiness from "@/components/VueCalculator_layoutOfBusiness";

export default {
  workName: 'App',
  created() {
    this.dataListOut = window.staticStore.dataOut;
  },
  components: {
    VueSelect,
    layoutOfBlock,
    titleForBusiness
  },

  data() {
    return {
      dataListOut: [],
      currentTypeWork: '',
      dataWorksList: []
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
        }
      })

      this.dataWorksList.push(work);
      this.currentTypeWork = '';
    },
    deleteCalc(id) {
      this.dataWorksList = this.dataWorksList.filter(calc => {
        return calc.id !== id;
      })
    }
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

.allWorks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
