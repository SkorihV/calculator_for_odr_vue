<template>
  <div class="input-group mb-1 input-group-sm mt-1">
    <input
      v-model="inputValue"
      class="form-control"
      type="text"
      @keyup.enter="returnValue"
      placeholder="Название макета"
    >
    <button
      type="button"
      class="btn btn-outline-secondary"
      @click="returnValue"
    >+</button>
  </div>
</template>

<script>
export default {
  name: 'vue-input-add',
  emits: ['returnValue'],
  data() {
    return {
      inputValue: null
    }
  },
  methods: {
    returnValue() {
      if (this.inputValue !== null && this.inputValue.length > 5) {
        this.$emit('returnValue', this.inputValue)
        this.inputValue = '';
      }
    }
  }
}
</script>

<style scoped>

</style>
