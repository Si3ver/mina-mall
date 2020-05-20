let initData = 'this       is first line\nthis &lt;is&gt; second line'
Page({
  extraLine:[],
  data: {
    text: initData
  },
add: function(e) {
  this.extraLine.push('other line')
  this.setData({
    text: initData + '\n' + this.extraLine.join('\n')
  })
},
  remove: function(e) {
    if (this.extraLine.length > 0) {
      this.extraLine.pop()
      this.setData({
        text: initData + '\n' + this.extraLine.join('\n')
      })
    }
  }
})