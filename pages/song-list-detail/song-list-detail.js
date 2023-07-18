// pages/song-list-detail/song-list-detail.js
import {getSongListDetail,getAllSongs} from "../../service/songListDetailService"
import userStore from "../../store/index"
Page({
  data:{
    songListDetail:{},
    visible:false,
    briefArray:[],
    page:1,
    allSongs:[],
    isLoading:false
  },
  onLoad(){
    getSongListDetail(this.options.id).then(res=>{
      console.log(res.data.playlist);
      this.setData({
        songListDetail:res.data.playlist,
        briefArray:res.data.playlist.description.split(/[\n\n]/)
      })
    })
    getAllSongs(this.options.id,this.data.page).then(res=>{
      console.log(res);
      this.setData({
        allSongs:res.data.songs
      })
    })
  },
  onBriefTap(){
    this.setData({
      visible:!this.data.visible
    })
  },
  onConfirmTap(){
    this.setData({
      visible:!this.data.visible
    })
  },
  onReachBottom(){
    this.setData({
      page:this.data.page+1,
      isLoading:true
    })
    getAllSongs(this.options.id,this.data.page).then(res=>{
      res.data.songs.forEach(item=>{
        this.data.allSongs.push(item)
      })
      this.setData({
        allSongs:this.data.allSongs,
        isLoading:false
      })
    })
  },
  onSongItemTap(e){
    // 将歌曲列表以及歌曲id信息写入全局状态管理中
    userStore.setState("songList",this.data.allSongs)
    userStore.setState("currentSongId",e.currentTarget.dataset.id)
    userStore.setState("currentSongIndex",e.currentTarget.dataset.index)
    wx.navigateTo({
      url: `/pages/play-music/play-music?id=${e.currentTarget.dataset.id}`,
    })
  }
})