// components/song-list-swiper/song-list-swiper.js
const app =getApp()
Component({
    properties:{
      playList:Array
    },
    data:{
      style:`width:${app.globalData.screenWidth}px`
    },
    methods:{
      onItemTap(e){
        wx.navigateTo({
          url: `/pages/song-list-detail/song-list-detail?id=${e.currentTarget.dataset.id}`,
        })
      }
    }
})
