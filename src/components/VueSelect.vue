<template>
  <div class="select__wrapper mb-3">
    <div class="input-group">
      <label class="input-group-text" for="inputGroupSelect01">Добавить вид работы:</label>
      <select
        @change="changeSelect"
        class="form-select" aria-label="Вид работы"
        id="inputGroupSelect01"
      >
        <option :selected="selectedSelect" value="false">Работа не выбрана</option>
        <option
          v-for="(select, index) in selectList"
          :value="select.type"
          :key="index"
        >{{ select.workName }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import VueModal from "@/UI/VueModal";

export default {
  workName: 'vue-select',
  components: {
    VueModal
  },
  emits: ['changeSelectOut', 'update:selectedSelect'],
  props: {
    selectList: {
      type: Array,
      require: false
    },
    isVisible: {
      type: Boolean,
      require: true
    },
    selectedSelect: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentTypeWork: ''
    }
  },
  methods: {
    changeSelect(e) {
      this.$emit('update:selectedSelect', false)
      this.currentTypeWork = e.target.value;
      this.$emit('changeSelectOut', e.target.value);
    },
  }
}
</script>

<style scoped>
.select__wrapper {
  display: flex;
  align-items: center;
  max-width: 450px;
}
.form-select {
  width: 30%;
}
@media all and (max-width: 500px) {
  .input-group {
    flex-direction: column;
  }
  .form-select {
    width: 100%;
  }
}
</style>
