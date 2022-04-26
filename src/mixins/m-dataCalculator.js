import {mapGetters, mapState} from "vuex";

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      discountValue: null,
      discountType: null,
      timeInner: 0,
      timeOuter: 0,
      isFirst: true,
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
      this.$store.dispatch('updatedAllDataResult', {
        costWorkInDiscountData: this.costWorkInDiscount,
        allWorksTimeInnerData:  this.allWorksTimeInner,
        allWorksTimeOutData:    this.allWorksTimeOut,
        costWorkTotalData:      this.costTotal,
        countWorksData:         this.countBlocks,
        discountValue:          this.personalDiscount,
        discountType:           this.typeDiscount,
        costWorkData:           this.costWorks,
        allLayouts:             this.allLayouts,
        blockName:              this.blockName,
        id:                     this.data.id,
      });
    },
    isHoveredOn() {
      this.$store.dispatch('updatedIsHoveredOn', this.data.id)
    },
    isHoveredOff() {
      this.$store.dispatch('updatedIsHoveredOff', this.data.id)
    },
    computedTime() {

        this.$nextTick(() => {
          this.discoverIsFirst();
        })

        this.$nextTick(() => {
          let timeInner = parseInt(this.data.dataCalculated.innerTime);
          let timeOuter = parseInt(this.data.dataCalculated.outerTime);

          if (!this.isFirst) {
            timeInner = parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
            timeOuter = parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
          }

          if (this.allLayouts.length > 1) {
            for (let i = 1; i < this.allLayouts.length; i++) {
              timeInner += parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
              timeOuter += parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
            }
          }
          this.timeInner = timeInner;
          this.timeOuter = timeOuter;

      })


      //   this.$nextTick(() => {
      //   this.discoverIsFirst();
      //   let timeInner = parseInt(this.data.dataCalculated.innerTime);
      //   let timeOuter = parseInt(this.data.dataCalculated.outerTime);
      //
      //   if (!this.isFirst) {
      //     timeInner = parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
      //     timeOuter = parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
      //   }
      //
      //   if (this.allLayouts.length > 1) {
      //     for (let i = 1; i < this.allLayouts.length; i++) {
      //       timeInner += parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
      //       timeOuter += parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
      //     }
      //   }
      //   this.timeInner = timeInner;
      //   this.timeOuter = timeOuter;
      // });
    },


  },
  computed: {
    ...mapGetters(['layoutIdForShops', 'workList', 'work']),
    costWorks() {
      let cost = 0;
      if (this.data.dataInner.countBlocks === 0 || this.allLayouts.length === 0 ) {
        cost = 0
        return cost;
      }

      if (this.allLayouts.length && this.data.dataInner.countBlocks > 0) {
        cost += parseFloat(this.data.dataCalculated.nominalCost);
      }
      if (this.allLayouts.length > 1 && this.data.dataInner.countBlocks > 0) {
        for (let i = 1; i < this.allLayouts.length; i++) {
          cost += parseFloat(this.data.dataCalculated.extraLayoutCost);
        }
      }

      if (this.countBlocks > 1) {
        for (let i = 1; i < this.countBlocks; i++) {
          cost += parseFloat(this.data.dataCalculated.extraBlockCost);
        }
      }
      return cost;
    },
    costWorkInDiscount() {
      let costInDiscount = 0;
      if (this.discountType === 'present' && this.discountValue) {
        costInDiscount = this.costWorks - ( this.costWorks / 100 * parseFloat(this.discountValue));
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
      if (costTotal < 0 ) { costTotal = 0;}
      this.computedTime();
      return costTotal;
    },
    allLayouts() {
      let layouts = [];
      if (this.data.dataInner.isLayoutPc.isDone) {
        layouts.push({name: this.data.dataInner.isLayoutPc.name, id: this.data.dataInner.isLayoutPc.id});
      }
      if (this.data.dataInner.isLayoutTable.isDone) {
        layouts.push({name: this.data.dataInner.isLayoutTable.name, id: this.data.dataInner.isLayoutTable.id});
      }
      if (this.data.dataInner.isLayoutMobile.isDone) {
        layouts.push({name: this.data.dataInner.isLayoutMobile.name, id: this.data.dataInner.isLayoutMobile.id});
      }
      this.data.dataInner.extraLayouts.map(layout => {
        if (layout.isDone) {
          layouts.push({name:layout.name, id:layout.id});
        }
      });
      return layouts;
    },
    allWorksTimeInner() {
          // let timeInner = parseInt(this.data.dataCalculated.innerTime);
          //
          // if (this.allLayouts.length > 1) {
          //   for (let i = 1; i < this.allLayouts.length; i++) {
          //     timeInner += parseInt(this.data.dataCalculated.innerTimeForExtraLayout);
          //   }
          // }
          return this.timeInner;

    },
    allWorksTimeOut() {
      // let outerTime = parseInt(this.data.dataCalculated.outerTime);
      //
      // if (this.allLayouts.length > 1) {
      //   for (let i = 1; i < this.allLayouts.length; i++) {
      //     outerTime += parseInt(this.data.dataCalculated.outerTimeForExtraLayout);
      //   }
      // }
      return this.timeOuter;
    },
    blockName() {
      return this.data.dataInner.name;
    },
    countBlocks() {
        return parseInt(this.data.dataInner.countBlocks)
    },
    personalDiscount() {
      return parseFloat(this.discountValue);
    },
    typeDiscount() {
      return this.discountType;
    },
  },
  watch: {
    costTotal() {
      setTimeout(() => {
        this.updateResultData();
      })
    },
    discountValue() {
      setTimeout(() => {
        this.updateResultData();
      })
    },
    isFirst() {
      this.computedTime();
      setTimeout(() => {
        this.updateResultData();
      })
    },
  },
}
