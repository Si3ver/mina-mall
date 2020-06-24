
var base64 = require("../../images/base64");
Page({
  data: {
    x: 0,
    y: 0,
    scale: 2,
    // 当前x的值
    currentX: 0
  },
  onLoad: function(){
    this.widget = this.selectComponent('.widget')
    this.setData({
        icon: base64.icon20,
        slideButtons: [{
          text: '普通1',
          src: '/images/icon_love.svg', // icon的路径
        },{
          text: '普通2',
          extClass: 'test',
          src: '/images/icon_star.svg', // icon的路径
        },{
          type: 'warn',
          text: '警示3',
          extClass: 'test',
            src: '/images/icon_del.svg', // icon的路径
        }],
    });
},
  handleMovableChange(e) {
    this.currentX = e.detail.x;
  },
  handleTouchend(e) {
    this.isMove = true;
    if (this.currentX < -46) {
      this.x = -92;
      this.setData({
        x: this.x
      });
    } else {
      this.x = 0;
      this.setData({
        x: this.x
      });
    }
  },
  handleTouchestart(e) {},
  onMovableViewChange(e){
    console.log("change",e.detail)
  },
  tap(e) {
    let kind =  parseInt(e.currentTarget.dataset.kind)
    if (!kind){
      this.setData({
        x: 30,
        y: 30
      })
    }else{
      this.setData({
        x: 0,
        y: 0
      })
    }
    
  },
  tap2(e) {
    let kind =  parseInt(e.currentTarget.dataset.kind)
    if (!kind){
      this.setData({
        scale: 3
      })
    }else{
      this.setData({
        scale: 0
      })
    }
    
  },
  onChange(e) {
    console.log(e.detail)
  },
  onScale(e) {
    console.log(e.detail)
  }
})