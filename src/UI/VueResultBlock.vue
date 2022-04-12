<template>
  <div>
    <h3>Результаты:</h3>
    <div v-if="data.countWorksData">Количество блоков: {{data.countWorksData}}</div>
    <template v-if="data.allLayoutsData.length > 0">
      <div>Будут реализованы следующие макеты: </div>
      <div v-for="layout in data.allLayoutsData">
        {{layout}}
      </div>
    </template>
    <div v-if="data.allWorksTimeInnerData">Внутренние сроки: {{data.allWorksTimeInnerData}}</div>
    <div v-if="data.allWorksTimeOutData">Сроки для клиента: {{data.allWorksTimeOutData}}</div>
    <div v-if="data.costWorkData">Общая стоимость работ: {{data.costWorkData}}</div>
  </div>
</template>

<script>
export default {
  name: 'result-block',
  props: {
    data: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>

</style>
