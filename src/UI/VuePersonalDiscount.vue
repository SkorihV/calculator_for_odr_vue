<template>
  <h5>Персональная скидка:</h5>
  <div class="discount">
    <div class="form-check">
      <input @change="checkedDiscount" value="no" class="form-check-input" checked type="radio" name="isDiscount" id="flexRadioDefault1">
      <label class="form-check-label" for="flexRadioDefault1">
        Нет!
      </label>
    </div>
    <div class="form-check">
      <input @change="checkedDiscount" value="cash" class="form-check-input" type="radio" name="isDiscoun" id="flexRadioDefault2">
      <label class="form-check-label" for="flexRadioDefault2">
        В рублях!
      </label>
    </div>
    <div class="form-check">
      <input @change="checkedDiscount" value="present" class="form-check-input" type="radio" name="isDiscount" id="flexRadioDefault3">
      <label class="form-check-label" for="flexRadioDefault3">
        В процентах!
      </label>
    </div>
  </div>
  <div v-if="discount === 'present' || discount === 'cash'" class="input-group input-group-sm mb-3">
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
</template>

<script>
export default {
  name: 'personal-discount',
  props: {
    value: {
      type: String,
      default: null
    },
    modelValue: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      discount: null
    }
  },
  methods: {
    checkedDiscount(e) {
      this.discount = e.target.value;
      console.log(e.target.value)
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
