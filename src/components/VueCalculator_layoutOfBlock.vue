<template>
  <keep-alive>
  <div class="calculator__wrapper" @mouseover="isHoveredOn" @mouseleave="isHoveredOff">
    <h4>{{data.dataCalculated.workName}}</h4>
    <vue-input
      v-model="data.dataInner.name"
      title="Название работы"
    ></vue-input>

    <vue-input-number
      title="Количество блоков"
      :calcId="data.id"
    ></vue-input-number>

    <vue-checkbox
      :thisId="data.dataInner.isLayoutPc.id"
      :labelText="data.dataInner.isLayoutPc.name"
      :value="data.dataInner.isLayoutPc.name"
      v-model="data.dataInner.isLayoutPc.isDone"

    ></vue-checkbox>

    <vue-checkbox
      :thisId="data.dataInner.isLayoutTable.id"
      :labelText="data.dataInner.isLayoutTable.name"
      :value="data.dataInner.isLayoutPc.name"
      v-model="data.dataInner.isLayoutTable.isDone"
    ></vue-checkbox>

    <vue-checkbox
      :thisId="data.dataInner.isLayoutMobile.id"
      :labelText="data.dataInner.isLayoutMobile.name"
      :value="data.dataInner.isLayoutPc.name"
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

    <personal-discount
      v-model="discountValue"
      v-model:typeDiscount="discountType"
    ></personal-discount>

    <vue-spoiler
      @click.stop
      v-if="data.result.costWorkData"
      title="Показать результаты:"
      titleExpanded="Скрыть результаты:"
    >
      <result-block
        :dataValue="this.data.result"
      ></result-block>
    </vue-spoiler>

    <delete-calc :calcId="this.data.id"></delete-calc>
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
import personalDiscount from "@/UI/VuePersonalDiscount";

export default {
  name:'layoutOfBlock',
  components: {
    VueInput,
    VueCheckbox,
    VueInputNumber,
    VueInputAdd,
    VueCheckboxRemove,
    deleteCalc,
    VueSpoiler,
    resultBlock,
    personalDiscount
  },
  mixins: [MDataCalculator],
}
</script>

<style scoped>
.calculator__wrapper {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  flex: 0 1 30%;
}

@media all and (max-width:1250px) {
  .calculator__wrapper {
    flex: 1 1 40%;
  }
}

@media all and (max-width: 1050px) {
  .calculator__wrapper {
    flex: 1 1 100%;
  }
}
</style>
