<template>
  <div class="app__wrapper p-5">
    <div class="control__block">
      <vue-select
        ref="select-work"
        :selectList="selectList"
        v-model:selectedSelect="selectedSelect"
        @changeSelectOut="changedTypeWork"
      ></vue-select>
      <div v-if="currentTypeWork.length > 5" class="btn-group add__work__btn" role="group" aria-label="Basic mixed styles example">
        <button @click.stop="addWork" type="button" class="btn btn-success">Добавить работу в список</button>
      </div>
    </div>

    <div class="content__block">
      <div class="allWorks mt-3">
        <transition-group name="calc-list">
          <Component
            v-for="work in workList"
            :key="work.id"
            :is="work.dataCalculated.type"
            :data="work"
          ></Component>
        </transition-group>
      </div>

      <div class="allResult" v-if="totalSumm > 0">
        <h2>Список всех работ!</h2>
          <template v-for="data in workList">
            <result-block
              :isHovered="data.isHovered"
              v-if="data.result !== null"
              :dataValue="data.result"
              :mainTitle="data.dataInner.name"
            ></result-block>
          </template>
        <div class="text-info bg-dark p-1">Общая сумма заказа - {{totalSumm}}₽</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import VueSelect from "@/components/VueSelect";
import layoutOfBlock from "@/components/VueCalculator_layoutOfBlock";
import titleForBusiness from "@/components/VueCalculator_layoutOfBusiness";
import layoutForShop from "@/components/VueCalculator_layoutOfShop";
import newSample from "@/components/VueCalculator_layoutOfSample";
import resultBlock from "@/UI/VueResultBlock";

export default {
  workName: 'App',
  created() {
    // this.dataListOut = window.staticStore.dataOut;
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
      currentTypeWork: '',
      selectedSelect: true,
    }
  },
  methods: {
    ...mapMutations(['addNewWork', 'addTotalSumm', 'deleteCalc']),
    changedTypeWork(value) {
      this.currentTypeWork = value;
    },
    addWork() {
      if (!this.$options.components.hasOwnProperty(this.currentTypeWork)) {
        return false;
      }
      let list = JSON.parse(JSON.stringify(this.listOut))
      let work = null;
      let id = Math.random();
      list.forEach( item => {
        if(item.dataCalculated.type === this.currentTypeWork) {
          work = item;
          work.id = id;
          work.result = null;
        }
      })
      this.$store.commit('addNewWork',work);
      this.currentTypeWork = '';
      this.selectedSelect = true;
    },

  },
  computed: {
    ...mapState(['dataWorksList', 'totalSumm']),
    ...mapGetters(['listOut', 'selectList', 'workList']),
  },
  watch: {
    workList: {
      handler() {
        let summ = this.workList.reduce((value, item) => {
          if (item.result !== null) {
            return value += item.result.costWorkTotalData;
          }
          return value
        }, 0);
        this.addTotalSumm(summ);
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
.content__block {
  display: flex;
  flex-direction: row;
}
.allWorks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 0 80%;
  max-width: 80%;
}

@media all and (max-width: 1250px) {
  .allWorks {
    flex: 1 0 70%;
    max-width: 70%;
  }
}


@media all and (max-width: 980px) {
  .allWorks {
    flex: 1 0 60%;
    max-width: 60%;
  }
}

.add__work__btn {
  max-width: 450px;
  width: 100%;
}

.allResult {
  position: fixed;
  height: 80%;
  overflow-y: auto;
  max-width: 40%;
  right: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  background-color: white;
  z-index: 5;
  padding: 10px;
}

@media all and (max-width: 768px) {
  .content__block {
    flex-direction: column;
  }
  .allWorks {
    max-width: 100%;;
    flex: 1 0 auto;

  }
  .allResult {
    margin-top: 15px;
    position: relative;
    overflow-y: auto;
    max-width: 100%;;
    height: auto;
    right: 0;
  }
}

.calc-list-item {
  display: flex;
  margin-right: 10px;
}
.calc-list-enter-active,
.calc-list-leave-active {
  transition: all 0.5s ease;
}
.calc-list-enter-from,
.calc-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.calc-list-move {
  transition: transform 0.8s ease;
}

</style>
