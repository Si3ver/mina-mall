Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 100],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],
    iconName:'icon-sun',
    percentValue: 80
  },
  onProgressActiveEnd(e){
    console.log(e)
  },
onTapProgressBar(e){
  console.log(e)
  let progress = this.data.percentValue
  if (progress < 100){
    progress += 5
    this.setData({percentValue:Math.min(100, progress)})
  }
},
onTapReloadBtn(e){
  this.setData({percentValue:0})
  this.setData({percentValue:50})
},
drawProgress(){
  if (this.data.percentValue >= 100){
    this.setData({
      percentValue:0
    })
  }
  this.setData({
    percentValue:this.data.percentValue+10
  })
}
})