<template>
  <button
    type="button"
    class="btn btn-outline-secondary small-btn btn-danger delete__calc"
    @click.stop="deleteCalc"
  ><i class="far fa-trash-alt"></i></button>
</template>

<script>
export default {
  name: 'delete-calc',
  props: {
    calcId: [Number]
  },
  methods: {
    deleteCalc() {
      this.$store.commit('deleteCalc', this.calcId);
    }
  }
}
</script>

<style scoped>
.delete__calc {
  width: 30%;
  align-self: center;
}

.delete__calc.btn-outline-secondary {
  color: #ffffff;
}

</style>
