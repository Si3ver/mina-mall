Component({
  behaviors: [],
properties: {
  percent: {
    type: Number,
    value: 50, 
    observer: function (newVal, oldVal) { 
      this.draw(newVal);
    }
  },
},
  data: {
    percentage: '', //百分比
    animTime: '', // 动画执行时间
  }, // 私有数据，可用于模版渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },
  created(){},

  ready(){
    if (this.data.percent) this.draw(this.data.percent);
  },

  methods: {
    // 绘制圆形进度条方法
    run(c, w, h) {
      let that = this;
      var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
      that.ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num)
      that.ctx2.setStrokeStyle("#09bb07");
      that.ctx2.setLineWidth("16");
      that.ctx2.setLineCap("butt");
      that.ctx2.stroke();
      that.ctx2.beginPath();
      that.ctx2.setFontSize(40); //注意不要加引号
      that.ctx2.setFillStyle("#09bb07");
      that.ctx2.setTextAlign("center");
      that.ctx2.setTextBaseline("middle");
      that.ctx2.fillText(c + "%", w, h);
      that.ctx2.draw();
    },
    // 动画效果实现
    canvasTap(start, end, time, w, h) {
      var that = this;
      start++;
      if (start > end) {
        return false;
      }
      that.run(start, w, h);
      setTimeout(function() {
        that.canvasTap(start, end, time, w, h);
      }, time);
    },

    draw(percent) {
      const id = 'runCanvas'
      const animTime = 2000
      if (percent > 100) return
      if (!this.ctx2){
        const ctx2 = wx.createCanvasContext(id, this)
        this.ctx2 = ctx2
      }

      let oldPercentValue = this.data.percentage
      this.setData({
        percentage: percent,
        animTime: animTime
      });
      var time = this.data.animTime / this.data.percentage;

const query = wx.createSelectorQuery().in(this)
query.select('#'+id).boundingClientRect((res)=>{
  var w = parseInt(res.width / 2); 
  var h = parseInt(res.height / 2); 
  this.canvasTap(oldPercentValue, percent, time, w, h)
}).exec()
    }
  }
})