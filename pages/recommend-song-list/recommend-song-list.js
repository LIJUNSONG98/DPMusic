// pages/recommend-song-list/recommend-song-list.js
import {getRecommendSong, getRecommendSongList} from "../../service/mainMusicService"
Page({
  data:{
    songList:[]
  },
  onLoad(){
    getRecommendSongList().then(res=>{
      this.setData({
        songList:res.data.result
      })
    })
  }
})