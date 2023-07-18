// pages/main_music/main-music.js
import { getBanner,getRecommendSong,getHotSongList,getRecommendSongList,getRankingList } from "../../service/mainMusicService"
import {getImageSize} from "../../utils/getImageSize.js"
import userStore from "../../store/index"
Page({
data:{
    swiperList:[],
    swiperHeight:0,
    recommendSong:[],
    hotSongList:[],
    allHotSongList:[],
    recommendSongList:[],
    rankingList:[]
},

  onLoad(){
  //获取轮播图数据
  getBanner().then(res=>{
    this.setData({
      swiperList:res.data.banners
    })
  })
  //获取推荐歌曲数据
  getRecommendSong().then(res=>{
    const songList = res.data.songs.slice(0,6)
    this.setData({
      recommendSong:songList,
      allHotSongList:res.data.songs
    })
  })
  //获取热门歌单数据
  getHotSongList().then(res=>{
    this.setData({
      hotSongList:res.data.playlists.slice(0,6)
    })
  })
  //获取推荐歌单数据
  getRecommendSongList().then(res=>{
    this.setData({
      recommendSongList:res.data.result.slice(0,6)
    })
  })
  //获取排行榜数据
  getRankingList().then(res=>{
    this.setData({
      rankingList:res.data.list.slice(0,4)
    })
  })
  },

  onShow() {
     this.getTabBar().setData({
       selected:0
     })
  },

  searchBoxTapHandle(){
    wx.navigateTo({
      url: '/pages/search-page/search-page',
    })
  },

  onImageLoad(e){
    getImageSize(".swiper-img").then(res=>{
      this.setData({
        swiperHeight:res[0].height
      })
    })
  },
  //点击歌曲推荐中的元素跳转到歌曲播放页面
  onSingleSongTap(e){
    userStore.setState("songList",this.data.allHotSongList)
    userStore.setState("currentSongId",e.currentTarget.dataset.id)
    userStore.setState("currentSongIndex",e.currentTarget.dataset.index)
    wx.navigateTo({
      url: `/pages/play-music/play-music?id=${e.currentTarget.dataset.id}`,
    })
  }
})