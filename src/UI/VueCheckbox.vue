<template>
  <div class="form-check form-switch">
    <input class="form-check-input"
           type="checkbox"
           @change="checked"
           :value="value"
           :checked="modelValue"
           :id="thisId">
    <label class="form-check-label"  :for="thisId">{{labelText}}</label>
  </div>
</template>

<script>
export default {
  name: 'vue-checkbox',
  emits:['update:modelValue'],
  props: {
    labelText: {
      type: String,
      require: true
    },
    thisId: [Number],
    value: Boolean,
    modelValue: Boolean
  },
  data() {
    return {
      isDone: false
    }
  },
  methods: {
    checked(e) {
      this.$emit('update:modelValue', e.target.checked)
    }
  }
}
</script>

<style scoped>
.form-check-input {
  flex: 1 0 30px;
}
.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}
</style>
