<template>
  <h5>Персональная скидка:</h5>
  <div class="discount">
    <radio-btn
      :checked="isChecked"
      :name="radioName"
      v-model:change="typeDiscount"
      value="no"
    >Нет!</radio-btn>

    <radio-btn
      :name="radioName"
      v-model:change="typeDiscount"
      value="cash"
    >В рублях!</radio-btn>

    <radio-btn
      :name="radioName"
      v-model:change="typeDiscount"
      value="present"
    >В процентах!</radio-btn>

  </div>
  <div v-if="typeDiscount === 'present' || typeDiscount === 'cash'" class="input-group input-group-sm mb-3">
    <input type="text" ref="inputDiscount" v-model="modelValue" @input="updateDiscount" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
</template>

<script>
import radioBtn from "@/UI/VueRadioBtn";

export default {
  name: 'personal-discount',
  components:{
    radioBtn
  },
  emits:['update:modelValue', 'update:typeDiscount'],
  props: {
    value: {
      type: String,
      default: null
    },
    modelValue: {
      type: String,
      default: null
    },
    typeDiscount: {
      type: String,
      default: null
    }
  },
  created() {
    this.localId = Math.random();
  },
  data() {
    return {
      localId: null,
      isChecked: true
    }
  },
  methods: {
    updateDiscount(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  },
  computed: {
    radioName() {
      return `isDiscount-${this.localId}`;
    },
  },
  watch: {
    typeDiscount() {
      if (this.typeDiscount === 'no') {
        this.$emit('update:modelValue', null);
        this.$emit('update:typeDiscount', null);
      } else {
        this.$emit('update:typeDiscount', this.typeDiscount);

      }
    }
  }
}
</script>

<style scoped>

.discount {
  display: flex;
  justify-content: space-between;
}
</style>
