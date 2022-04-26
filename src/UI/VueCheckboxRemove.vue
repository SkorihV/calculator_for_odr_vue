<template>
  <div class="form-check form-switch form-switch-layout">
    <input class="form-check-input" @change="checked" type="checkbox" :id="thisId">
    <label class="form-check-label"   :for="thisId">{{labelText}}</label>
    <button
      type="button"
      class="btn btn-outline-secondary small-btn trash__btn"
      @click.stop="removeData"
    ><i class="fa-solid fa-trash"></i></button>
  </div>
</template>

<script>
export default {
  name: 'vue-checkbox-remove',
  emits:['update:modelValue', 'removeData'],
  props: {
    labelText: {
      type: String,
      require: true
    },
    thisId:[Number],
    modelValue: Boolean,
    calcType: {
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    checked(e) {
      this.$emit('update:modelValue', e.target.checked)
    },
    removeData(e) {
      this.$emit('removeData', this.thisId)
    }
  },
  watch: {
    modelValue() {
      if (this.calcType) {
        if (this.modelValue) {
          this.$store.commit("addLayoutIdForCalcs", {nameDataArray:  this.calcType, layoutId: this.thisId});
        } else {
          this.$store.commit("removeLayoutIdForCalcs", {nameDataArray:  this.calcType, layoutId: this.thisId});
        }
      }
    }
  }
}
</script>

<style scoped>

.form-check-input {
  flex: 0 0 33px;
  margin-right: 7px;
}
.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}
.btn.small-btn {
  padding: 0.1rem 0.5rem;
}
.form-switch-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.trash__btn {
  margin-left: auto;
}


</style>
