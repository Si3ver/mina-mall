var pageData = {}
for (var i = 1; i < 5; ++i) {
  (function (index) {
    pageData[`slider${index}change`] = function (e) {
      console.log(`slider${index}发生change事件，携带值为`, e.detail.value)
    }
  })(i);
}
Page(Object.assign({
  data:{},
  onSliderChanging(e){
    console.log(e.type, e.detail.value);
    
  },
  slider1change: function (e) {
    console.log("change：",e)
  },
  slider1changing: function (e) {
    console.log("changing：",e)
  }
}, pageData))