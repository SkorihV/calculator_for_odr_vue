<template>
  <keep-alive>
  <div class="calculator__wrapper" @mouseover="isHoveredOn" @mouseleave="isHoveredOff">
    <h4>{{data.dataCalculated.workName}}</h4>
    <vue-input
      v-model="data.dataInner.name"
      title="Название работы"
    ></vue-input>

<!--    <vue-input-number-->
<!--      title="Количество шаблонов страниц"-->
    <!--:calcId="data.id"-->
<!--    ></vue-input-number>-->

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
    personalDiscount
  },
  data() {
    return {
      isFirst: false,
    }
  },
  mixins: [MDataCalculator],
  computed: {
    ...mapGetters(['layoutIdForShops']),
    costWorks() {
      let cost = 0;

      if( this.allLayouts.length) {
        let isLayoutFirst = this.allLayouts.filter(item => item.id === this.layoutIdForShops[0]);
        if (isLayoutFirst.length) {
          cost += parseFloat(this.data.dataCalculated.nominalCost);
          this.isFirst = true;
        } else {
          this.isFirst = false;
        }
      }

      if (this.allLayouts.length > 1 && this.isFirst) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          cost += parseFloat(this.data.dataCalculated.extraLayoutCost);
        }
      } else if (this.allLayouts.length && !this.isFirst) {
        for (let i = 0; i < this.allLayouts.length; i++) {
          cost += parseFloat(this.data.dataCalculated.extraLayoutCost);
        }
      }

      if (!this.allLayouts.length) {
        cost = 0;
        this.isFirst = false;
        return cost;
      }

      return cost;
    },
    allWorksTimeInner() {
      if (!this.costWorks) {
        return 0;
      }
      let innerTime = 0;

      if (this.isFirst) {
        innerTime = parseInt(this.data.dataCalculated.innerTime);
      } else {
        innerTime = parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
      }
      if (this.allLayouts.length > 1) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          innerTime += parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
        }
      }
      return innerTime;
    },
    allWorksTimeOut() {
      if (!this.costWorks) {
        return 0;
      }
      let outerTime = 0;

      if (this.isFirst) {
        outerTime = parseInt(this.data.dataCalculated.outerTime);
      } else {
        outerTime = parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
      }

      if (this.allLayouts.length > 1) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          outerTime += parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
        }
      }
      return outerTime;
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
