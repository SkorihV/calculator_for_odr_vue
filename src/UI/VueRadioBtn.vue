<template>
  <div class="form-check">
    <label class="form-check-label">
      <input @change="$emit('update:change', $event.target.value)" :value="value" class="form-check-input" :checked="checked || isChecked" type="radio" :name="name">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'radio-btn',
  emits:['update:change'],
  props: {
    modelValue: { default: "" },
    value: { type: String, default: undefined },
    name: { type: String, default: undefined },
    checked: {type: Boolean, default: false}

  },
  computed: {
    isChecked() {
      return this.modelValue == this.value
    }
  }
}
</script>

<style scoped>

</style>
