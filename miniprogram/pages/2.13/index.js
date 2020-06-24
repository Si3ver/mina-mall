// 该示例来源于https://developers.weixin.qq.com/community/develop/article/doc/00048e5ed784b037b959757385b413
// 有少量修改

Page({
  data: {
    loading: false,
    active: true
  },
  //点击back事件处理
  goBack: function () {
    wx.navigateBack();
    this.triggerEvent('back');
  },
  //返回首页
  goHome:function(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
onPageScroll(res) {
  console.log(res);
  
  if (res.scrollTop > 400) {
    if (!this.data.active) {
      this.setData({
        active: true
      })
    }
  } else {
    if (this.data.active) {
      this.setData({
        active: false
      })
    }
  }
}

})



