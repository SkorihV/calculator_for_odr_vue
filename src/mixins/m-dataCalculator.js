export default {
  props: {
    isAddWork: {
      type:Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  beforeUpdate() {
    this.updateResultData();
  },
  data() {
    return {
      discountValue: null,
      discountType: null,
    }
  },
  methods: {
    getRandomId() {
      return Math.random();
    },
    addNewLayout(value) {
      let valueIsEmpty = this.data.dataInner.extraLayouts.filter(layout => {
        return layout.name === value
      })
      if (valueIsEmpty.length === 0) {
        this.data.dataInner.extraLayouts.push({
          isDone: false,
          name: value,
          id:  this.getRandomId(),
        })
      }
    },
    removeLayoutData(id) {
      this.data.dataInner.extraLayouts = this.data.dataInner.extraLayouts.filter(item => {
        return item.id !== id;
      })
    },
    updateResultData() {
      this.$store.dispatch('updatedAllLayoutsData',{ id: this.data.id, allLayouts: this.allLayouts });
      this.$store.dispatch('updatedCostWorkData',{ id: this.data.id, costWorkData: this.costWorks });
      this.$store.dispatch('updatedCostWorkInDiscountData',{ id: this.data.id, costWorkInDiscountData: this.costWorkInDiscount });
      this.$store.dispatch('updatedCountWorksData',{ id: this.data.id, countWorksData: this.countBlocks });
      this.$store.dispatch('updatedCostWorkTotalData',{ id: this.data.id, costWorkTotalData: this.costTotal });
      this.$store.dispatch('updatedAllWorksTimeInnerData',{ id: this.data.id, allWorksTimeInnerData: this.allWorksTimeInner });
      this.$store.dispatch('updatedAllWorksTimeOutData',{ id: this.data.id, allWorksTimeOutData: this.allWorksTimeOut });
      this.$store.dispatch('updatedBlockName',{ id: this.data.id, blockName: this.blockName });
      this.$store.dispatch('updatedDiscountValue',{ id: this.data.id, discountValue: this.personalDiscount });
      this.$store.dispatch('updatedDiscountType',{ id: this.data.id, discountType: this.typeDiscount });
    },
    isHoveredOn() {
      this.$store.dispatch('updatedIsHoveredOn', this.data.id)
    },
    isHoveredOff() {
      this.$store.dispatch('updatedIsHoveredOff', this.data.id)
    }
  },
  computed: {
    costWorks() {
      let cost = 0;
      if (this.data.dataInner.countBlocks === 0 || this.allLayouts.length === 0 ) {
        cost = 0
        return cost;
      }

      if (this.allLayouts.length && this.data.dataInner.countBlocks > 0) {
        cost += this.data.dataCalculated.nominalCost;
      }
      if (this.allLayouts.length > 1 && this.data.dataInner.countBlocks > 0) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          cost += this.data.dataCalculated.extraLayoutCost;
        }
      }

      if (this.countBlocks > 1) {
        for (let i = 1; i < this.countBlocks; i++) {
          cost += this.data.dataCalculated.extraBlockCost;
        }
      }
      return cost;
    },
    costWorkInDiscount() {
      let costInDiscount = 0;
      if (this.discountType === 'present' && this.discountValue) {
        costInDiscount = this.costWorks - ( this.costWorks / 100 * this.discountValue);
      }

      if (this.discountType === 'cash' && this.discountValue) {
        costInDiscount = this.costWorks - parseFloat(this.discountValue);
      }
      if (this.discountType === null) {
        costInDiscount =  0
      }

      return costInDiscount;
    },
    costTotal() {
      let costTotal = this.costWorks;
      if (this.costWorkInDiscount !== 0) {
        costTotal = costTotal - (costTotal - this.costWorkInDiscount);
      }
      return costTotal;
    },
    allLayouts() {
      let layouts = [];
      if (this.data.dataInner.isLayoutPc.isDone) {
        layouts.push(this.data.dataInner.isLayoutPc.name);
      }
      if (this.data.dataInner.isLayoutTable.isDone) {
        layouts.push(this.data.dataInner.isLayoutTable.name);
      }
      if (this.data.dataInner.isLayoutMobile.isDone) {
        layouts.push(this.data.dataInner.isLayoutMobile.name);
      }
      this.data.dataInner.extraLayouts.map(layout => {
        if (layout.isDone) {
          layouts.push(layout.name);
        }
      });
      return layouts;
    },
    allWorksTimeInner() {
      if (!this.costWorks) {
        return 0;
      }
      let innerTime = parseInt(this.data.dataCalculated.innerTime);
      if (this.allLayouts.length > 1) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          innerTime += parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
        }
      }
      return innerTime;
    },
    allWorksTimeOut() {
      if (!this.costWorks) {
        return 0;
      }
      let innerTime = parseInt(this.data.dataCalculated.outerTime);

      if (this.allLayouts.length > 1) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          innerTime += parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
        }
      }
      return innerTime;
    },
    blockName() {
      return this.data.dataInner.name;
    },
    countBlocks() {
        return parseInt(this.data.dataInner.countBlocks)
    },
    personalDiscount() {
      return this.discountValue;
    },
    typeDiscount() {
      return this.discountType;
    }
  },
  watch: {
    costWorks() {
      this.updateResultData();
    }
  },

}
