// components/recommend-movie/recommend-movie.js
Component({
   properties:{
     coverUrl:String,
     name:String,
     mvId:Number,
     artistId:Number,
     artistName:String,
     playCount:Number,
     publishTime:String,
     mvs:Array
   },
   data:{
     coverUrlData:"",
     nameData:"",
     mvIdData:0,
     artistIdData:0,
     artistNameData:"",
     playCountData:0,
     publishTimeData:"",
   },
   observers:{
     "coverUrl":function(nv) {
       if(!nv) return
       this.setData({
         coverUrlData:nv
       })
     },
     "name":function(nv) {
      if(!nv) return
      this.setData({
        nameData:nv
      })
    },
    "mvId":function(nv) {
      if(!nv) return
      this.setData({
        mvIdData:nv
      })
    },
    "artistId":function(nv) {
      if(!nv) return
      this.setData({
        artistIdData:nv
      })
    },
    "artistName":function(nv) {
      if(!nv) return
      this.setData({
        artistNameData:nv
      })
    },
    "playCount":function(nv) {
      if(!nv) return
      this.setData({
        playCountData:nv
      })
    },
    "publishTime":function(nv) {
      if(!nv) return
      this.setData({
        publishTimeData:nv
      })
    },
   },
   methods:{
     itemTapHandle(e) {
       const id = this.data.mvId
       const title = this.data.nameData
       const artistName = this.data.artistNameData
       const artistId = this.data.artistIdData
       const playCount = this.data.playCountData
       wx.navigateTo({
         url: `/pages/play-video/play-video?id=${id}&title=${title}&artistName=${artistName}&playCount=${playCount}&artistId=${artistId}`,
       })
     }
   }
})
