// pages/recommend-song-page/recommend-song-page.js
import {getRecommendSong} from "../../service/mainMusicService"
import userStore from "../../store/index"
Page({
  data:{
    songList:[]
  },
  onLoad(){
    getRecommendSong().then(res=>{
      this.setData({
        songList:res.data.songs
      })
      console.log(res.data.songs[0].id);
    })
  },
  onSongItemTap(e){
    userStore.setState("currentSongId",e.currentTarget.dataset.id)
    userStore.setState("songList",this.data.songList)
    userStore.setState("currentSongIndex",e.currentTarget.dataset.index)
    wx.navigateTo({
      url: `/pages/play-music/play-music?id=${e.currentTarget.dataset.id}`
    })
  }
})