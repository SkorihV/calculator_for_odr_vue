<template>
  <div class="form-check form-switch">
    <input class="form-check-input" @input="checked" type="checkbox" :id="thisId">
    <label class="form-check-label"  :for="thisId">{{labelText}}</label>
  </div>
</template>

<script>
export default {
  workName: 'vue-checkbox',
  emits:['update:modelValue'],
  props: {
    labelText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      thisId: null
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
.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}
</style>
