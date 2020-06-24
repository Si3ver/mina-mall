const app = getApp()
let viewId = 5
const createRecycleContext = require('miniprogram-recycle-view')
function rpx2px(rpx) {
  return (rpx / 750) * wx.getSystemInfoSync().windowWidth
}

Page({
  data: {
    arr: [],
    triggered: false,
    scrollTopValue:0,
    scrollIntoViewId:'',
    pullingMessage:'下拉刷新',//下拉刷新,释放更新,加新中...
    refresherTriggered:false,//
    tabs:[]
  },
willCompleteRefresh(){
  console.log('更新中')
  let intervalId = setInterval(()=>{
    let pullingMessage = this.data.pullingMessage
    console.log(pullingMessage,pullingMessage == '更新中')
    if (pullingMessage.length < 7){
      pullingMessage += '.'
    }else{
      pullingMessage = '更新中'
    }
    this.setData({
      pullingMessage
    })
  },500)
  setTimeout(()=>{
    console.log('更新完成了')
    clearInterval(intervalId)
    this.setData({
      pullingMessage:"已刷新",
      refresherTriggered:false,
    })
  },2000)
},
  unshiftOnePic(){
    let arr = this.data.arr
    arr.unshift(arr.length+1)
    this.setData({
      arr
    })
  },
  scrollToView1(){
    viewId += 2
    this.setData({
      scrollIntoViewId:'childview'+viewId
    })
    console.log(this.data.scrollIntoViewId)
  },
  
  onReady: function () {
var ctx = createRecycleContext({
  id: 'recycleId',
  dataKey: 'recycleList',
  page: this,
  itemSize: {
    width: rpx2px(650),
    height: rpx2px(100)
  }
})
let newList = []
for (let i = 0; i < 20; i++) {
  newList.push({
    id: i,
    name: `标题${i + 1}`
  })
}
ctx.append(newList)

    // 
    const arr = []
    for (let i = 0; i < 20; i++) arr.push(i)
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
    // 
    let activeTab = 0, page=1, res = {something:''}
    let tabsData = this.data.tabs[activeTab] || {list:[]}
    tabsData.page = page+1
    tabsData.list.push(res)
    let key = `tabs[${activeTab}]`
    this.setData({
      [key]: tabsData
    })
    console.log(this.data.tabs)
  },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },
  onScroll(e){
    console.log(e.detail.scrollTop, e.detail.scrollLeft, e.detail.scrollHeight,e.detail.scrollWidth)
  },
  onScrolltoupper(e){
    console.log('已达顶部后，小于50，是一种状态')
  },
  plusScrollUpValue(){
    this.setData({
      scrollTopValue:this.data.scrollTopValue+50
    })
  },
  viewScrollToUpperEvent(e){
    console.log('测试scrolltoupper事件',e.detail);
    
  }
})

