<template>
  <div  class="result__block mb-2" :class="{isHover: isHovered}" v-if="dataValue.costWorkTotalData > 0">
    <h4>{{mainTitle}}</h4>
    <div class="text__block">
      <div v-if="(dataValue.countWorksData)">Количество блоков: {{dataValue.countWorksData}}</div>
      <div class="m-size pt-1 pb-2 " v-if="dataValue.allLayoutsData.length > 0">
        <div>Будут реализованы следующие макеты: </div>
        <div v-for="layout in dataValue.allLayoutsData">
          {{layout}}
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

      <div v-if="dataValue.discountType && parseFloat(dataValue.discountValue) > 0">
        <p class="m-size">Сумма без скидки - {{dataValue.costWorkData}}</p>
        <p class="m-size text-warning bg-dark p-1">Сумма персональной скидки за работу - {{dataValue.costWorkData - dataValue.costWorkInDiscountData}}₽</p>
        <div class="text-success ">Общая стоимость работ: {{dataValue.costWorkTotalData}}₽</div>
      </div>
      <div class="text-success" v-else-if="dataValue.costWorkData">Общая стоимость работы: {{dataValue.costWorkTotalData}}₽</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result-block',
  props: {
    dataValue: {
      type: Object,
      require: true
    },
    mainTitle: {
      type: String,
      default: ''
    },
    isHovered: {
      type:Boolean,
      require: false
    }
  }
}
</script>

<style scoped>
  .m-size {
    font-size: 0.8rem;
  }
  .result__block {
    border-bottom: 1px solid black;
    padding: 5px 0;
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
