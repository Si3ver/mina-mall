Page({
  data: {
nodes: [{
  name: 'div',
  attrs: {
    class: 'div_class',
    style: 'line-height: 20px;padding:20px;'
  },
  children: [{
    type: 'text',
    text: '中文Hello&nbsp;World!'
  },{
    name: 'span',
    attrs:{
      style: 'color: green;'
    },
    children: [{
      type: 'text',
      text: 'message'
    }]
  },{
    name:'br',
  },{
    name:'br',
  },{
    name:'img',
    attrs:{
      src:'https://www.yishulun.com/favicon.ico',
      style:'width:50px'
    }
  },{
    name:'img',
    attrs:{
      src:'https://www.yishulun.com/image/篆刻-茹意.png',
      style:'width:100%;',
      class: 'img'
    }
  },{
    name:'img',
    attrs:{
      src:'https://www.yishulun.com/image/篆刻-茹意.png',
      style:'width:100%;'
    }
  }]
}],
urls:[],
tagStyle:{
  img: 'font-size:0;display:block;',
},
html:"<div>中文Hello World!<span>message</span><img src='https://www.yishulun.com/favicon.ico' /><img src='https://www.yishulun.com/image/篆刻-茹意.png' /><img src='https://www.yishulun.com/image/篆刻-茹意.png' /></div>"
  },
tap(e) {
  // return
  console.log('tap',e)
  console.log('urls',this.data.urls)
  let urls = this.data.urls
  wx.previewImage({
    current: urls[0],
    urls: urls
  })
},
  onReady(){
function findUrl(nodes){
  let urls = []
  nodes.forEach(item=>{
    if (item.attrs){
      for (const key in item.attrs) {
        if (key == 'src') {
          urls.push(item.attrs[key])
        }
      }
    }
    if (item.children){
      urls = urls.concat( findUrl(item.children) )
    }
  })
  return urls
}
this.data.urls = findUrl(this.data.nodes)
    // console.log('urls',this.data.urls)
  },
onTapImage(e){
  console.log('iamge url', e.detail.src)
}
})