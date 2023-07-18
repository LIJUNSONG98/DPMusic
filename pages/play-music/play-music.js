// pages/play-music/play-music.js
import {getSingleSong,getSongUrl,getLyric} from "../../service/mainMusicService";
import formatLyric from "../../utils/formatLyric"
import userStore from "../../store/index"
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
Page({
  data:{
    tabTitles:["歌曲","歌词"],
    tabIndex:0,

    swiperHeight:0,

    statusBarHeight:0,

    songId:0,
    songDetail:{},
    songUrl:"",
    currentTime:0,
    play:true,
    playMode:0,

    lyric:{},
    currentLyricIndex:-1,

    lyricScrollTop:"",

    songList:[],
    currentSongIndex:-1,

    isShowPlayList:false
  },
  onLoad(){
    console.log("触发onLoad");
    // 发送网络请求获取数据
    this.fetchData(this.options.id)
    //监听全局状态管理中的歌曲列表数据的变化
    userStore.onStates(["songList","currentSongId","currentSongIndex"],(v)=>{
      if(!v.songList && !v.currentSongIndex) return
      this.setData({
        songList:v.songList,
        currentSongIndex:v.currentSongIndex
      })
    })
    //innerAudioContext的onCanPlay事件
    const pauseIt = ()=>{
      innerAudioContext.pause()
    }
    innerAudioContext.onCanplay(()=>{
      if(!this.data.play) return
      innerAudioContext.offWaiting(pauseIt)
      innerAudioContext.play()
    })
    //监听歌曲时间改变事件
    innerAudioContext.onTimeUpdate(()=>{
      this.setData({
        currentTime:Math.floor(innerAudioContext.currentTime*1000)
      })
      innerAudioContext.onWaiting(pauseIt)
      // if(innerAudioContext.currentTime*1000 - this.data.songDetail.dt < 500 && innerAudioContext.currentTime*1000 - this.data.songDetail.dt>-500) {
      //   this.setData({
      //     play:false
      //   })
      // }
      //根据歌曲播放时间匹配歌词
      let currentIndex = this.data.lyric.length-1
      for(let i = 0; i<this.data.lyric.length ;i++) {
        if(innerAudioContext.currentTime*1000>this.data.lyric[i].time) continue
        currentIndex = i - 1
        break
      } 
      if(this.data.currentLyricIndex === currentIndex) return
      this.setData({
        currentLyricIndex:currentIndex,
        lyricScrollTop:`${currentIndex*64}rpx`
      })
    })
    // 监听歌曲自然播放结束事件
    innerAudioContext.onEnded(()=>{
      this.switchSong(this.data.currentSongIndex)
    })
    // 获取状态栏高度，计算出页面轮播的高度
    this.setData({
      statusBarHeight:app.globalData.statusBarHeight,
      swiperHeight:app.globalData.screenHeight - app.globalData.statusBarHeight -44
    })
    // 从页面跳转URL的query中获取歌曲id
    this.setData({
      songId:this.options.id
    })

  },
  //点击返回键
  onBackTap(){
    wx.navigateBack()
  },
  //轮播图滚动事件
  onSwiperChange(e){
    this.setData({
      tabIndex:e.detail.current
    })
  },
  // 点击头部标签栏事件
  onTabbarTap(e){
    this.setData({
      tabIndex:e.currentTarget.dataset.index
    })
  },
  // 点击或拖动进度条
  onSliderChange(e) {;
    this.setData({
      currentTime:(e.detail.value/1000)*this.data.songDetail.dt,
      // play:true
    })
    if(this.data.play) {
      innerAudioContext.seek(this.data.currentTime/1000)
    } else {
      innerAudioContext.seek(this.data.currentTime/1000)
      innerAudioContext.pause()
    }
  },
  // 点击播放/暂停按钮
  onPlayTap(){
    this.setData({
      play:!this.data.play
    })
    switch(this.data.play) {
      case true:
        innerAudioContext.play()
        break;
      case false:
        innerAudioContext.pause();
    }
  },
  // 点击上一首
  onPreSong(){
    this.switchSong(this.data.currentSongIndex,"pre")
  },

  // 点击下一首
  onNextSong(){
    this.switchSong(this.data.currentSongIndex,"next")
  },

  // 上一首/下一首
  switchSong(currentIndex,mode) {
    let _index = -1
    switch(this.data.playMode) {
      //顺序播放
      case 0:
        _index = ((mode === "pre") ? (currentIndex -1) : (currentIndex + 1))
        if(_index === this.data.songList?.length) _index = 0
        if(_index === -1) _index = this.data.songList.length - 1 
        innerAudioContext.loop = false
        break
      //单曲循环
      case 1:
        _index = currentIndex
        innerAudioContext.loop = true
        break
      // 随机播放
      case 2:
        _index = Math.floor(Math.random()*this.data.songList.length)
        innerAudioContext.loop = false
        break
    }
    this.setData({
      currentSongIndex:_index
    })
    this.fetchData(this.data.songList[_index].id)

  },
  // 发送网络请求获取数据
  fetchData(songId){
    userStore.setState("currentSongId",songId)
    getSingleSong(songId).then(res=>{
      this.setData({
        songDetail:res.data.songs[0]
      })
    })
    getSongUrl(songId).then(res=>{
      this.setData({
        songUrl:res.data.data[0].url,
        play:true
      })
      innerAudioContext.stop()
      innerAudioContext.src = this.data.songUrl
      innerAudioContext.autoplay = true
    })
    getLyric(songId).then(res=>{
      this.setData({
        lyric:formatLyric(res.data.lrc.lyric)
      })
    })
  },
  // 更改播放模式
  onChangeMode(){
    let mode =  this.data.playMode + 1
    if(mode === 3) mode = 0
    this.setData({
      playMode:mode
    })
  },
  // 显示/隐藏播放列表
  onPlayListTap(){
    this.setData({
      isShowPlayList:!this.data.isShowPlayList
    })
    console.log(this.data.isShowPlayList);
  },
  onVisibleChange(e) {
    this.setData({
      isShowPlayList: e.detail.visible,
    });
  },

  onSongItemTap(e) {
    userStore.setState("currentSongId",e.currentTarget.dataset.id)
    this.fetchData(e.currentTarget.dataset.id)
  }
})