<template>
  <div  class="result__block mb-2" :class="{isHover: isHovered}" v-if="dataValue.costWorkTotalData > 0">
    <h2 class="m-size-h2" v-if="workName">{{workName}}</h2>
    <h3 class="m-size-h3" v-if="mainTitle">{{mainTitle}}</h3>
    <div class="text__block">
      <div class="m-size" v-if="(dataValue.countWorksData) && extraWorkName.length > 0">{{extraWorkName}} {{dataValue.countWorksData}}</div>
      <div class="m-size pt-1 pb-2 " v-if="dataValue.allLayoutsData.length > 0">
        <div>Будут реализованы следующие макеты: </div>
        <div v-for="layout in dataValue.allLayoutsData">
          {{layout.name}}
        </div>
      </div>
      <div class="m-size">Внутренние сроки: {{dataValue.allWorksTimeInnerData}}</div>
      <div class="m-size">Сроки для клиента: {{dataValue.allWorksTimeOutData}}</div>
      <div class="m-size">{{dataValue.displayValue }}</div>

      <div class="m-size text-warning bg-dark p-1" v-if="dataValue.discountType === 'present' && parseFloat(dataValue.discountValue) > 0">
        Персональная скидка - {{dataValue.discountValue}}%
      </div>

      <div class="m-size text-warning bg-dark p-1" v-if="dataValue.discountType === 'cash' && parseFloat(dataValue.discountValue) > 0">
        Персональная скидка - {{dataValue.discountValue}}₽
      </div>
      <div v-if="dataValue.discountType && dataValue.discountValue > 0">
        <p class="m-size">Цена без скидки - {{dataValue.costWorkData}}</p>
        <p class="m-size text-warning bg-dark p-1">Сумма персональной скидки за работу - {{dataValue.costWorkData - dataValue.costWorkInDiscountData}}₽</p>
        <div class="text-success ">Общая стоимость работ: {{dataValue.costWorkTotalData}}₽</div>
      </div>
      <div class="text-success" v-else-if="dataValue.costWorkData">
        <p>Общая стоимость работы: {{dataValue.costWorkTotalData}}₽</p>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'result-block',
  props: {
    dataValue: {
      type: Object,
      require: true
    },
    workName: {
      type: String,
      default: ''
    },
    mainTitle: {
      type: String,
      default: ''
    },
    isHovered: {
      type:Boolean,
      require: false
    },
    extraWorkName: {
      type: String,
      default: ''
    },
  },
}
</script>

<style scoped>
  .m-size {
    font-size: 0.8rem;
  }
  .m-size-h3 {
    font-size: 1rem;
  }
  .m-size-h2 {
    font-size: 1.3rem;
  }
  .result__block {
    border-bottom: 1px solid black;
    padding: 5px 0;
    max-width: 350px;
  }
  @media all and (max-width: 1460px) {
    .result__block {
      max-width: 320px;
    }
  }
  @media all and (max-width: 1460px) {
    .result__block {
      max-width: 290px;
    }
  }
  @media all and (max-width: 768px) {
    .result__block {
      max-width: 100%;
    }
  }

  .text__block {
    padding-left: 10px;
  }
  .isHover {
    animation: isHover 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes isHover {
    0%,
    50% {
      background-color: rgba(236, 230, 230, 0.94);
      box-shadow: 0 0 10px 10px rgba(236, 230, 230, 0.94);
    }
    51%, 100% {
      background-color: white;
      box-shadow: 0 0 10px 10px white;
    }
  }
</style>
