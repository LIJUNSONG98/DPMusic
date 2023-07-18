// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected:0,
    "list": [{
      "pagePath": "/pages/main_music/main-music",
      "text": "音乐",
      "iconPath": "/assets/music_default.png",
      "selectedIconPath": "/assets/music_active.png"
    },
    {
      "pagePath": "/pages/main-video/main-video",
      "text": "视频",
      "iconPath": "/assets/mv_default.png",
      "selectedIconPath": "/assets/mv_active.png"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
tapHandle(e){
  wx.switchTab({
    url: e.currentTarget.dataset.pagepath,
  })
  this.setData({
    selected:e.currentTarget.dataset.index
  })

}
  }
})
