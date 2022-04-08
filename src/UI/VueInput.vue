<template>
  <div class="input-group mb-1">
    <input
      :value="modelValue"
      @input="updateInput"
      class="form-control"
      type="text"
      :placeholder="title"
    >
  </div>
</template>

<script>
export default {
  workName: 'vue-input',
  props: {
    modelValue: [String, Number],
    title: [String]
  },
  emits: ['update:modelValue'],
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>

</style>
