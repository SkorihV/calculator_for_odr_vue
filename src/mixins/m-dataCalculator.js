export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
    isAddWork: {
      type:Boolean,
      default: false
    }
  },
  methods: {
    updateValueCountBlock(value) {
      this.data.dataInner.countBlocks = value;
    },
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
  },
  computed: {
    resultData() {
      return {
        allLayoutsData: this.allLayouts,
        costWorkData: this.costWorks,
        countWorksData: this.countBlocks,
        allWorksTimeInnerData: this.allWorksTimeInner,
        allWorksTimeOutData: this.allWorksTimeOut,
        blockName: this.blockName
      }
    },
    costWorks() {
      let cost = 0;
      if (this.data.dataInner.countBlocks === 0 || this.allLayouts.length === 0) {
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
      if (this.data.dataInner.countBlocks > 1) {
        for (let i = 1; i < this.data.dataInner.countBlocks; i++) {
          cost += this.data.dataCalculated.extraBlockCost;
        }
      }
      return cost;
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
      return this.data.dataInner.countBlocks;
    }
  }
}
