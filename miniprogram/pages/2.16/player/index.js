var md5 = require('blueimp-md5/index')

// https://www.ffmpeg.org/
// ffplay `url`

// rtmp://live.rixingyike.com/live/StreamName?txSecret=Md5(key+StreamName+hex(time))&txTime=hex(time)
function generatePlayUrl(domain, streamName, key, time = null){
  if (!time){
    // one day more
    time = Math.round( Date.now()/1000 ) // get Unix时间戳(Unix timestamp)
    time += 24 * 60 * 60 * 1000
  } 
  var txTime = time.toString(16).toUpperCase()
  var txSecret = md5(key+streamName+txTime);
  var ext_str = `?txSecret=${txSecret}&txTime=${txTime}`
  return `http://${domain}/live/${streamName}.flv${ext_str}`
}

Page({
  data:{
    // 开发者工具暂不支持 rtmp 协议，请到客户端调试。
    // http://live.rixingyike.com/live/default.flv
    // livePlayUrl:'rtmp://live.rixingyike.com/live/default',
    // flv也需要在手机端预览
    // rtmp://live.rixingyike.com/live/default?txSecret=f0ddef58264f943d6d648db5e9b33eac&txTime=5ED3D47F
    livePlayUrl:'',
    videoHeight:220,
    showFullScreenExitButton:false
  },
  exitFullScreen(){
    if (this.ctx) this.ctx.exitFullScreen({
      success: res => {
        this.setData({
          showFullScreenExitButton:false
        })
        console.log('exitFullScreen success')
      },
      fail: res => {
        console.log('exitFullScreen fail',res)
      }
    })
  },
  // 全屏
  requestFullScreen(){
    if (this.ctx) this.ctx.requestFullScreen({
      success: res => {
        this.setData({
          showFullScreenExitButton:true
        })
        console.log('requestFullScreen success')
      },
      fail: res => {
        // operateLivePlayer:fail 开发者工具暂时不支持此 API 调试，请使用真机进行开发
        console.log('requestFullScreen fail',res)
      }
    })
  },
  onReady(res) {
    var videoHeight = wx.getSystemInfoSync().windowHeight
    this.setData({videoHeight})

    let url = generatePlayUrl('live.rixingyike.com','default','dc5f17d4089d60cd1591c96860d2f1b7')
    console.log('url',url);
    this.setData({
      livePlayUrl:url
    })

    this.ctx = wx.createLivePlayerContext('player')
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  bindPlay() {
    this.ctx.play({
      success: res => {
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
  bindMute() {
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  }
})