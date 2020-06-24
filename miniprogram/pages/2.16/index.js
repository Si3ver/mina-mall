var md5 = require('blueimp-md5/index')

// rtmp://64400.livepush.myqcloud.com/live/default?txSecret=034f506211aca7002ceab7e33fada61c&txTime=5ED4C4BF
function generatePushUrl(domain, streamName, key, time = null){
  if (!time){
    // one day more
    time = Math.round( Date.now()/1000 )
    time += 24 * 60 * 60 * 1000
  } 
  var txTime = time.toString(16).toUpperCase()
  var txSecret = md5(key+streamName+txTime);
  var ext_str = `?txSecret=${txSecret}&txTime=${txTime}`
  return `rtmp://${domain}/live/${streamName}${ext_str}`
}

Page({
  data:{
    // rtmp://64400.livepush.myqcloud.com/live/default?txSecret=7ed234039073374299e49dd5d1d46e70&txTime=5ED3D47F
    livePushUrl:'',
    videoHeight:220
  },
  
  onReady(res) {
    var videoHeight = wx.getSystemInfoSync().windowHeight
    this.setData({videoHeight})

    let url = generatePushUrl('64400.livepush.myqcloud.com','default','dc5f17d4089d60cd1591c96860d2f1b7')
    console.log('url',url);
    this.setData({
      livePushUrl:url
    })
    
    this.ctx = wx.createLivePusherContext('pusher')
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  },
  bindStart() {
    this.ctx.start({
      success: res => {
        console.log('start success')
      },
      fail: res => {
        console.log('start fail')
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
  bindSwitchCamera() {
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  }
})

/**
 
ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -i "FaceTime HD Camera:Built-in Microphone" -vcodec libx264 -preset ultrafast -acodec libmp3lame -ar 44100 -ac 1 -f flv "rtmp://64400.livepush.myqcloud.com/live/default?txSecret=56dd7f9d4a3f2a8aba89097576a574cf&txTime=63FA6BCB"

ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -i "0:0" -vcodec libx264 -preset ultrafast -acodec libmp3lame -ar 44100 -ac 1 -f flv "rtmp://64400.livepush.myqcloud.com/live/default?txSecret=56dd7f9d4a3f2a8aba89097576a574cf&txTime=63FA6BCB"

[0] FaceTime HD Camera
[0] Built-in Microphone

 */