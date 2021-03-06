import {mapGetters, mapMutations, mapState} from "vuex";

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
    ...mapMutations([
      'switchStateFromUpdateModuleOff',
      'switchStateFromUpdateModuleOn',
      'removeLayoutIdForCalc'
    ]),
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
      this.removeLayoutIdForCalc({nameDataArray:this.data.dataCalculated.type, layoutId: id});
      this.data.dataInner.extraLayouts = this.data.dataInner.extraLayouts.filter(item => {
        return item.id !== id;
      })
    },
    removeAllLayoutInData() {
      this.allLayouts.forEach(layout => {
        this.removeLayoutIdForCalc({nameDataArray:this.data.dataCalculated.type, layoutId: layout.id});

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
    },
    discoverIsFirst() {
      setTimeout(() => {
        let lastIsFirst = this.isFirst;
        let findCurrentId = this.data.result.allLayoutsData.filter( item =>  item.id === this.layoutIdForNameType(this.data.dataCalculated.type)[0]);
        this.isFirst = Boolean(findCurrentId.length);

        if ((!lastIsFirst && this.isFirst) || (lastIsFirst && !this.isFirst)) {
          this.switchStateFromUpdateModuleOn(this.data.dataCalculated.type);
          setTimeout(() => {
            this.switchStateFromUpdateModuleOff(this.data.dataCalculated.type);
          }, 100)
        }
      },0)
    },
  },
  computed: {
    ...mapGetters(['workList', 'work', 'stateUpdateFromNameType', 'layoutIdForNameType']),
    costWorks() {
      let cost = 0;
      let minimalExtraWork = this.data.dataCalculated.minimalExtraWork ?? 0;
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

      if (this.countBlocks > minimalExtraWork) {
        for (let i = minimalExtraWork; i < this.countBlocks; i++) {
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
        return this.timeInner;
    },
    allWorksTimeOut() {
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
    updateData() {
      return this.stateUpdateFromNameType(this.data.dataCalculated.type);
    }
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
    updateData() {
      this.computedTime();
      setTimeout(() => {
        this.updateResultData();
      })
    },
  },
}
