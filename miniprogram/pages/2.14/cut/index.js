// miniprogram/pages/2.14/cut/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    width: 250, //宽度
    height: 250, //高度
  },
  startCuting() {
    //获取到image-cropper对象
    this.cropper = this.selectComponent("#image-cropper");
    //开始裁剪
    this.setData({
      src: "https://cdn.nlark.com/yuque/0/2020/jpeg/1252071/1590847767698-f511e86d-f183-4f75-a04d-1b99cd9f0bd7.jpeg",
    });
    wx.showLoading({
      title: '加载中'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startCuting()
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    console.log(e.detail.url)
    //点击裁剪框阅览图片
    wx.previewImage({
        current: e.detail.url, // 当前显示图片的http链接
        urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})