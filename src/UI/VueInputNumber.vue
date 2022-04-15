<template>
    <div class="input-group input-group-sm mb-1 input__group__number">
      <div
        class="input-group-text"
        id="inputGroup-sizing-sm"
      >{{title}}</div>
      <div class="control__wrapper">
        <input
          pattern="/[0-9]/"
          v-model.number="value"
          type="text"
          class="form-control input__number"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        >
        <div class="btn__wrapper">
          <button type="button" @click="minusCount" class="btn btn-danger btn-sm mx-1">-</button>
          <button type="button" @click="plusCount" class="btn btn-success btn-sm">+</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'vue-input-number',
  props: {
    modelValue:{
      type: [String,Number],
      default: 0,
    },
    title: [String, Number]
  },
  emits: ['update:modelValue', 'plus', 'minus', 'returnValue'],
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    plusCount() {
      this.value = parseInt(this.value) + 1;
    },
    minusCount() {
      this.value = parseInt(this.value) - 1;
    },
  },
  watch: {
    value() {
      if (isNaN(parseInt(this.value)) || this.value < 0) {
        this.value = 0;
      }
      this.$emit('returnValue', this.value);
    }
  }
}
</script>

<style scoped>
.input-group-text {
  flex-grow: 1;
}
.control__wrapper {
  display: flex;

}
.btn__wrapper {
  display: flex;
}
.input__number {
  width: 60px;
}

@media all and (max-width: 980px) {
  .input__group__number {
    flex-direction: column;
  }
  .input__number {
    width: 100%;
  }
}

</style>
