// pages/hot-song-list/hot-song-list.js
import {getHotSongList} from "../../service/mainMusicService"
Page({
  data:{
    songList:[]
  },
  onLoad(){
    getHotSongList().then(res=>{
      this.setData({
        songList:res.data.playlists
      })
    })
  }
})