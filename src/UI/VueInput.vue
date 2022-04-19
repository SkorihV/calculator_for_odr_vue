<template>
  <div class="input-group mb-1">
    <input
      :value="modelValue"
      @input="this.$emit('update:modelValue', $event.target.value)"
      class="form-control"
      type="text"
      :placeholder="title"
    >
  </div>
</template>

<script>
export default {
  name: 'vue-input',
  props: {
    modelValue: [String],
    title: [String],
  }
}
</script>

<style scoped>

</style>
