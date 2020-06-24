// miniprogram/pages/2.18/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login(e){
    wx.login({
      success (res0) {
        if (res0.code) {

          wx.getUserInfo({
            withCredentials:true,
            success: function(res) {
              
              var {userInfo,encryptedData,iv} = res

              // console.log(userInfo,encryptedData,iv);
                            //发起网络请求
          wx.request({
            url: 'http://localhost:3000/user/wexin-login2',
            method:'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res0.code,
              userInfo,
              encryptedData,
              iv
            },
            success (res) {
              console.log('请求成功',res.data)
              getApp().globalData.token = res.data.data.authorizationToken
              console.log('authorization',getApp().globalData.token )
            },
            fail (err) {
              console.log('请求异常',err)
            }
          })

            }
          })

          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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