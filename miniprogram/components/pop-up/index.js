
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  ready(){
    this.triggerEvent('ready')
  },

  /**
   * 组件的方法列表
   */
  methods: {
    popPreventTouchmove() { },
    popPreventTouchmove2() { },
    popPreventTouchmove3() { },
    cityChange() { },
    close() {
      this.triggerEvent('close')
    },
    handleClickMask(e) {
      // console.log(e)
      if (e.target.dataset.type !== 'unclose') this.close()
    }
  }
})
