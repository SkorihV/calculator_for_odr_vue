<template>
  <div
    v-if="typeWork === currentType && textPrompt.length > 0"
    class="visibleModalBtn"
    @click="showModal"
   >?</div>
  <div
    v-if="isVisible"
    :class="{showModal: isVisible, show: isVisible}"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Особенности работы</h5>
          <button @click="hideModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{textPrompt}}
        </div>
        <div class="modal-footer">
          <button @click="hideModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ок</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  workName: 'vue-modal',
  props: {
    typeWork: {
      type: String,
      require: true
    },
    currentType: {
      type: String,
      require: false
    },
    textPrompt: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    hideModal() {
      this.isVisible = false;
    },
    showModal() {
      this.isVisible = true;
    }
  }
}
</script>

<style scoped>
.visibleModalBtn {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid #86b7fe;
  margin-left: 10px;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%)
}

.visibleModalBtn {
  cursor: pointer;
}
.showModal {
  display: block;
  opacity: 1;
  background: #0000003d;
}

</style>
