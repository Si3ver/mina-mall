// 该竖向组件来源于：https://developers.weixin.qq.com/community/develop/article/doc/0002c8ac9603d0600e09b003b56413
// 仅有少量修改
Component({
  properties: {
    blockColor: {
      type: String,
      value: "#ffffff"
    },
    blockSize: {
      type: Number,
      value: 28
    },
    backgroundColor: {
      type: String,
      value: "#e9e9e9"
    },
    activeColor: {
      type: String,
      value: "#1aad19"
    },
    step: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 100
    },
    value: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      value: false
    },
    showValue: {
      type: Boolean,
      value: false
    },
  },
  observers: {
    'blockSize': function(blockSize) {
      // 这个地方是规范blockSize的最大、最小值
      if (blockSize > 28) {
        this.setData({
          blockSize: 28
        })
      } else if (blockSize < 12) {
        this.setData({
          blockSize: 12
        })
      }
    },
    'showValue': function(){
      this.queryHeight() // 由于显示数字后，滑动区域变化，需要重新查询可滑动高度
      // 如果被设置了，相应的observer是自动触发的
      // 因为这个组件在使用时，设置了showValue属性，所以queryHeight被调用了
      // 如果没有设置，这个函数是不会被调用的
      console.log('showValue----',this.properties.showValue);
    }
  },
  data: {
    totalTop: null,
    totalHeight: null,
    currentValue: 0,
  },
  ready(){
    // 适合在这里调用
    this.queryHeight()
  },
  methods: {
    // 设置当前值是多少，是加上最小值之后的当前值
    setCurrent: function(e){
      this.setData({
        currentValue: e
      })
    },
    queryHeight: function(){
      // 这个地方是为了取出滚动容器在页面中的起点，距离页面顶边的y距离是多少totalTop
      // totalTop相当于startY
      // 还有整个滑动容器的高度totalHeight，相当于sliderHeight
      // 因在wxs模块中组件或页面描述对象，没有createSelectorQuery方法，所以这个查询只能放在逻辑层js中进行，好在这个查询并不需要重复执行
      // 整个totalHeight，要被min,max的差，以step为粒度平分掉
      wx.createSelectorQuery().in(this).select('.slider-container').boundingClientRect((res) => {
        this.setData({
          totalTop: res.top,
          totalHeight: res.height
        })
      }).exec()
    },
    empty: function(){},
  }
})


