<template>
  <keep-alive>
  <div class="calculator__wrapper w-25">
    <h4>{{data.dataCalculated.workName}}</h4>
    <vue-input
      v-model="data.dataInner.name"
      title="Название работы"
    ></vue-input>

    <vue-input-number
      v-model="data.dataInner.countBlocks"
      @returnValue="updateValueCountBlock"
      title="Количество блоков"
    ></vue-input-number>

    <vue-checkbox
      :thisId="data.dataInner.isLayoutPc.id"
      :labelText="data.dataInner.isLayoutPc.name"
      v-model="data.dataInner.isLayoutPc.isDone"
    ></vue-checkbox>

    <vue-checkbox
      :thisId="data.dataInner.isLayoutTable.id"
      :labelText="data.dataInner.isLayoutTable.name"
      v-model="data.dataInner.isLayoutTable.isDone"
    ></vue-checkbox>

    <vue-checkbox
      :thisId="data.dataInner.isLayoutMobile.id"
      :labelText="data.dataInner.isLayoutMobile.name"
      v-model="data.dataInner.isLayoutMobile.isDone"
    ></vue-checkbox>

    <template v-for="layout in data.dataInner.extraLayouts">
      <vue-checkbox-remove
        :labelText="layout.name"
        v-model="layout.isDone"
        :thisId="layout.id"
        @removeData="removeLayoutData"
      ></vue-checkbox-remove>
    </template>

    <vue-input-add
      @returnValue="addNewLayout"
    ></vue-input-add>

    <vue-spoiler
      v-if="data.result.costWorkData"
      title="Показать результаты:"
      titleExpanded="Скрыть результаты:"
    >
      <result-block :data="this.resultData"></result-block>
    </vue-spoiler>

    <delete-calc @deleteCalc="this.$emit('deleteCalc', this.data.id)"></delete-calc>
  </div>
    </keep-alive>
</template>
<script>
import VueInput from "@/UI/VueInput";
import VueCheckbox from "@/UI/VueCheckbox";
import VueInputNumber from "@/UI/VueInputNumber";
import VueInputAdd from "@/UI/VueInputAdd";
import VueCheckboxRemove from "@/UI/VueCheckboxRemove";
import MDataCalculator from "@/mixins/m-dataCalculator";
import deleteCalc from "@/UI/VueDeleteBtn";
import VueSpoiler from "@/UI/VueSpoiler";
import resultBlock from "@/UI/VueResultBlock";

export default {
  name: 'titleForBusiness',
  components: {
    VueInput,
    VueCheckbox,
    VueInputNumber,
    VueInputAdd,
    VueCheckboxRemove,
    deleteCalc,
    VueSpoiler,
    resultBlock
  },
  mixins: [MDataCalculator],
  emits:['deleteCalc'],
  created() {
    this.data.dataInner = this.createBaseData();
    this.data.result = null;
    this.data.result = this.resultData;
  },
  beforeUpdate() {
    this.data.result = this.resultData;
  },
  data() {
    return {
    }
  },
  methods: {
    createBaseData() {
      return  {
        name: '',
        countBlocks: 0,
        isLayoutPc: {
          isDone: false,
          name: 'Макет для ПК.',
          id: this.getRandomId()
        },
        isLayoutTable: {
          isDone: false,
          name: 'Макет для Планшета.',
          id: this.getRandomId()
        },
        isLayoutMobile: {
          isDone: false,
          name: 'Макет для Смартфона.',
          id: this.getRandomId()
        },
        extraLayouts: [],
      }
    },
  },
}
</script>

<style scoped>
.calculator__wrapper {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
}
</style>
