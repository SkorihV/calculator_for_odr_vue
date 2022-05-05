<template>
  <keep-alive>
  <div class="calculator__wrapper" @mouseover="isHoveredOn" @mouseleave="isHoveredOff">
    <div class="calculator__title">{{data.dataCalculated.workName}}
      <vue-modal
        typeWork="true"
        currentType="true"
        :textPrompt="data.dataCalculated.prompt"
      ></vue-modal>
    </div>
    <vue-input
      v-model="data.dataInner.name"
      title="Название работы"
    ></vue-input>

    <vue-input-number
      :calcId="data.id"
      :title="data.dataCalculated.extraWorkName"
      :minimalExtraWork="data.dataCalculated.minimalExtraWork"
    ></vue-input-number>

    <vue-checkbox
      :calcType="data.dataCalculated.type"
      :thisId="data.dataInner.isLayoutPc.id"
      :labelText="data.dataInner.isLayoutPc.name"
      v-model="data.dataInner.isLayoutPc.isDone"
    ></vue-checkbox>

    <vue-checkbox
      :calcType="data.dataCalculated.type"
      :thisId="data.dataInner.isLayoutTable.id"
      :labelText="data.dataInner.isLayoutTable.name"
      v-model="data.dataInner.isLayoutTable.isDone"
    ></vue-checkbox>

    <vue-checkbox
      :calcType="data.dataCalculated.type"
      :thisId="data.dataInner.isLayoutMobile.id"
      :labelText="data.dataInner.isLayoutMobile.name"
      v-model="data.dataInner.isLayoutMobile.isDone"
    ></vue-checkbox>

    <template v-for="layout in data.dataInner.extraLayouts">
      <vue-checkbox-remove
        :calcType="data.dataCalculated.type"
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
      v-if="data.dataCalculated.isPersonalDiscount"
      v-model="discountValue"
      v-model:typeDiscount="discountType"
    ></personal-discount>

    <vue-spoiler
      @click.stop
      v-if="costTotal"
      title="Показать результаты:"
      titleExpanded="Скрыть результаты:"
    >
      <result-block
        :extraWorkName="data.dataCalculated.extraWorkName"
        :dataValue="this.data.result"
      ></result-block>
    </vue-spoiler>

    <delete-calc
      :calcId="this.data.id"
      @click="removeAllLayoutInData"
    ></delete-calc>
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
import VueModal from "@/UI/VueModal";
import {mapGetters} from "vuex";

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
    personalDiscount,
    VueModal
  },
  mixins: [MDataCalculator],
  computed: {
    costWorks() {
      let cost = parseFloat(this.data.dataCalculated.nominalCost);
      let minimalExtraWork = this.data.dataCalculated.minimalExtraWork ?? 0;


      if (this.allLayouts.length > 1 ) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          cost += parseFloat(this.data.dataCalculated.extraLayoutCost);
        }
      }

      if (this.countBlocks > minimalExtraWork) {
        for (let i = minimalExtraWork; i < this.data.dataInner.countBlocks; i++) {
          cost += parseFloat(this.data.dataCalculated.extraBlockCost);
        }
      }

      if (this.allLayouts.length === 0 ) {
        cost = 0
      }
      return cost;
    },
  },
}
</script>

<style scoped>
.calculator__wrapper {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  flex: 0 1 30%;
}
.calculator__title {
  display: flex;
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
