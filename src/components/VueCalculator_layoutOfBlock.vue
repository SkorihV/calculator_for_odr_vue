<template>
  <div class="calculator__wrapper w-25">
    <vue-input
      v-model="dataInner.name"
      title="Название работы"
    ></vue-input>
    <vue-input-number
      v-model="dataInner.countBlocks"
      @returnValue="updateValueCountBlock"
      title="Количество блоков"
    ></vue-input-number>
    <vue-checkbox
      labelText="Макет для ПК ?"
      v-model="dataInner.isLayoutPc"
    ></vue-checkbox>
    <vue-checkbox
      labelText="Макет для Планшета ?"
      v-model="dataInner.isLayoutTable"
    ></vue-checkbox>
    <vue-checkbox
      labelText="Макет для Смартфона ?"
      v-model="dataInner.isLayoutMobile"
    ></vue-checkbox>
  </div>
  <div>{{test}}</div>
</template>

<script>
import VueInput from "@/UI/VueInput";
import VueCheckbox from "@/UI/VueCheckbox";
import VueInputNumber from "@/UI/VueInputNumber";

export default {
  components: {
    VueInput,
    VueCheckbox,
    VueInputNumber
  },
  props: {
    data: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      dataInner: {
        name: '',
        countBlocks: 0,
        isLayoutPc: false,
        isLayoutTable: false,
        isLayoutMobile: false,
      }
    }
  },
  computed: {
    test() {
      return this.dataInner;
    }
  },
  methods: {
    updateValueCountBlock(value) {
      this.dataInner.countBlocks = value;
    }
  }
}
</script>

<style scoped>

</style>
