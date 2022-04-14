<template>
  <div v-if="dataValue.costWorkTotalData > 0">
    <h3>{{mainTitle}}</h3>
    <div v-if="(dataValue.countWorksData)">Количество блоков: {{dataValue.countWorksData}}</div>
    <template v-if="dataValue.allLayoutsData.length > 0">
      <div>Будут реализованы следующие макеты: </div>
      <div v-for="layout in dataValue.allLayoutsData">
        {{layout}}
      </div>
    </template>
    <div>Внутренние сроки: {{dataValue.allWorksTimeInnerData}}</div>
    <div>Сроки для клиента: {{dataValue.allWorksTimeOutData}}</div>
    <div>{{dataValue.displayValue }}</div>

    <div v-if="dataValue.discountType === 'present' && parseFloat(dataValue.discountValue) > 0">
      Персональная скидка - {{dataValue.discountValue}}%
    </div>

    <div v-if="dataValue.discountType === 'cash' && parseFloat(dataValue.discountValue) > 0">
      Персональная скидка - {{dataValue.discountValue}}₽
    </div>

    <div v-if="dataValue.discountType && parseFloat(dataValue.discountValue) > 0">
      <p>Сумма без скидки - {{dataValue.costWorkData}}</p>
      <p>Сумма персональной скидки за работу - {{dataValue.costWorkData - dataValue.costWorkInDiscountData}}₽</p>
      Общая стоимость работ: {{dataValue.costWorkTotalData}}₽
    </div>
    <div v-else-if="dataValue.costWorkData">Общая стоимость работы: {{dataValue.costWorkTotalData}}₽</div>
    <hr />
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
    }
  }
}
</script>

<style scoped>

</style>
