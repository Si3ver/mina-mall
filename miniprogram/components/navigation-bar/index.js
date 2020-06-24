"use strict";
var app = getApp();

Component({
  options: {
    // 多插槽支持
    multipleSlots: true
    // ,addGlobalClass: true
  },
properties: {
  'ext-class': {
    type: String,
    value: ''
  },
    loading: {
      type: Boolean,
      value: false
    },
    active: {
      type: Boolean,
      value: false
      // ,observer: '_showChange'
    }  
  },
  data: {},
attached: function attached() {
  // 组件被加载时，计算ios、android两个平台的尺寸差异
  var _this = this;        
  //动态计算导航栏尺寸
  var isSupport = !!wx.getMenuButtonBoundingClientRect;
  var rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
  wx.getSystemInfo({
      success: function success(res) {
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        var statusBarHeight=res.statusBarHeight;
        var topBarHeight=ios ? (44 + statusBarHeight) : (48 + statusBarHeight);

        _this.setData({
            ios: ios,
            topBarHeight:topBarHeight,
            statusBarHeight:statusBarHeight,
            innerWidth: isSupport ? 'width:' + rect.left + 'px' : '',
            innerPaddingRight: isSupport ? 'padding-right:' + (res.windowWidth - rect.left) + 'px' : '',
            leftWidth: isSupport ? 'width:' + (res.windowWidth - rect.left) + 'px' : ''
        }); 
        // 这是为了在外面注入wxss变量，这个设计并不太好
        // _this.triggerEvent('getBarInfo', {topBarHeight,statusBarHeight});               
      }
  });

    //back箭头处理的显示
    var pages=getCurrentPages()      
    if(pages.length>1){
      this.setData({showBack:true})
    }
  },
  methods: {
    // _showChange: function _showChange(active) {           
    //   var displayStyle = 'opacity: ' + (active ? '1' : '0') + ';-webkit-transition:opacity 0.5s;transition:opacity 0.5s;';           
    //   this.setData({
    //       displayStyle: displayStyle
    //   });
    // },
    //双击返回顶部
    doubleClick(e) {
      if (this.timeStamp && (e.timeStamp - this.timeStamp < 300)) {
        this.timeStamp = 0
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      } else {
        this.timeStamp = e.timeStamp
      }
    }
  }
});