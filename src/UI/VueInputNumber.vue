<template>
    <div class="input-group input-group-sm mb-1">
      <span
        class="input-group-text"
        id="inputGroup-sizing-sm"
      >{{title}}</span>
      <input
        readonly
        :value="modelValue"
        ref="inputValue"
        @input="updateInput"
        :placeholder="title"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      >
    <button type="button" @click="minusCount" class="btn btn-danger btn-sm mx-1">-</button>
    <button type="button" @click="plusCount" class="btn btn-success btn-sm">+</button>
  </div>
</template>

<script>
export default {
  name: 'vue-input-number',
  props: {
    modelValue:{
      type: [String, Number],
      default: 0,
    },
    title: [String, Number]
  },
  emits: ['update:modelValue', 'returnValue'],
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', parseInt(e.target.value));
    },
    plusCount() {
      this.$refs.inputValue.value = parseInt(this.$refs.inputValue.value) + 1;
      this.$emit('returnValue',this.$refs.inputValue.value);
    },
    minusCount() {
      if (this.$refs.inputValue.value > 0) {
        this.$refs.inputValue.value = parseInt(this.$refs.inputValue.value) - 1;
        this.$emit('returnValue', this.$refs.inputValue.value);
      }
    }

  }
}
</script>

<style scoped>

</style>
