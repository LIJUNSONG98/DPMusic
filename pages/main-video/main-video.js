// pages/main-video/main-video.js
import {jsRequest} from "../../service/index"
import cookieData from "../../service/cookie"
import {getVideoList} from "../../service/getVideoList"

Page({
  data: {
    page:1,
    movieList:[],
    currentIndex:0,
    navData:[{
      name:"热门推荐",
      type:"全部"
    },
  {
    name:"官方MV",
    type:"官方版"
  }
],
    type:"全部"
  },

  onPullDownRefresh(){
    this.setData({
      page:1,
      movieList:[]
    })
    getVideoList(this.data.page,this.data.type).then(res=>{
      wx.stopPullDownRefresh()
      const list = res.data.data.map((item)=>{
        let playCount = String(item.playCount)
        if(playCount.length>=5){
           playCount = playCount.slice(0,playCount.length-4)+"万"
           item.playCount = playCount
        }
        let minute = Math.floor(item.duration/1000/60)
        let second = Math.floor(item.duration/1000-minute*60)
        if(String(minute).length < 2){
          minute = `0${minute}`
        }
        if(String(second).length < 2){
          second = `0${second}`
        }
        const duration = `${minute}:${second}`
        item.duration = duration
        return item
      })
      this.setData({
        movieList:list
      })
    })
  },

  navTapHandle(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.index,
      type:e.currentTarget.dataset.type
    })
    getVideoList(this.data.page,this.data.type).then(res=>{
      const list = res.data.data.map((item)=>{
        // let playCount = String(item.playCount)
        // if(playCount.length>=5){
        //    playCount = playCount.slice(0,playCount.length-4)+"万"
        //    item.playCount = playCount
        // }

        let countNum = parseInt(item.playCount)
        if(countNum >= 100000000){
          countNum = (countNum/100000000).toFixed(1) + '亿'
        }
        else {
          if (countNum >= 10000) {
            countNum = (countNum/10000).toFixed(1) + '万'
          }
        }
        item.playCount = countNum
        
        let minute = Math.floor(item.duration/1000/60)
        let second = Math.floor(item.duration/1000-minute*60)
        if(String(minute).length < 2){
          minute = `0${minute}`
        }
        if(String(second).length < 2){
          second = `0${second}`
        }
        const duration = `${minute}:${second}`
        item.duration = duration

        return item
      })
      this.setData({
        movieList:list
      })

    })
  },

  onReachBottom() {
    let page = this.data.page + 1
    this.setData({
      page:page
    })
    getVideoList(this.data.page,this.data.type).then(res=>{
      const list = res.data.data.map((item)=>{
        let playCount = String(item.playCount)
        if(playCount.length>=5){
           playCount = playCount.slice(0,playCount.length-4)+"万"
           item.playCount = playCount
        }
        let minute = Math.floor(item.duration/1000/60)
        let second = Math.floor(item.duration/1000-minute*60)
        if(String(minute).length < 2){
          minute = `0${minute}`
        }
        if(String(second).length < 2){
          second = `0${second}`
        }
        const duration = `${minute}:${second}`
        item.duration = duration
        return item
      })
      this.data.movieList.push(...list);
      let movieList = this.data.movieList
      this.setData({
        movieList:movieList
      })
    })
  },

  onLoad(options) {
    getVideoList(this.data.page,this.data.type).then(res=>{
      const list = res.data.data.map((item)=>{
        let playCount = String(item.playCount)
        if(playCount.length>=5){
           playCount = playCount.slice(0,playCount.length-4)+"万"
           item.playCount = playCount
        }
        let minute = Math.floor(item.duration/1000/60)
        let second = Math.floor(item.duration/1000-minute*60)
        if(String(minute).length < 2){
          minute = `0${minute}`
        }
        if(String(second).length < 2){
          second = `0${second}`
        }
        const duration = `${minute}:${second}`
        item.duration = duration

        return item
      })
      this.setData({
        movieList:list
      })
    })
  },

  onShow() {
     this.getTabBar().setData({
       selected:1
     })
  },

})