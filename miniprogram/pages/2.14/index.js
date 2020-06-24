const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appear: false,
    qrcode: 'https://cdn.nlark.com/yuque/0/2020/jpeg/1252071/1590847767698-f511e86d-f183-4f75-a04d-1b99cd9f0bd7.jpeg'
  },
  onLoad: function () {
    // 直接加载短链接网址，返回403
    // 403代表资源不可用
    wx.downloadFile({
      url: 'http://t.cn/A622upBw',
      complete(res){
        console.log(res);
        
      }
    })

    // IntersectionObserver示例
    this._observer = wx.createIntersectionObserver(this)
    this._observer
      .relativeTo('.scroll-view')
      .observe('.ball', (res) => {
        this.setData({
          appear: res.intersectionRatio > 0
        })
      })

    // ------------
    // 加载图片数据
    wx.request({
      url: 'https://wxapi.kkgoo.cn/live/discover?type=hot',
      method: 'POST',
      success: (res) => {
        this.setDis(res);
      }
    })
  },
  setDis(r) {
    let newData = r.data.data;
    this.data.nextKey = newData.nextkey ? newData.nextkey : this.data.nextKey;
    this.setData({
      content: newData.discover ? newData.discover : this.data.content,
      banneritem: newData.cards ? newData.cards.slice(0, newData.cards.length - 1) : this.data.banneritem
    })
  },
  previewImage(e) {
    console.log(e);
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current: url,
      urls: [url],
    })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  },
  
})