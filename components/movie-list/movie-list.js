// components/movie-list/movie-list.js
import cookieData from "../../service/cookie"
import {jsRequest} from "../../service/index"
Component({
  properties: {
    listData:{
      type:Array,
      value:[]
    },
  },

  data: {
    movieList:[]
  },

  methods: {
     itemTapHandle(e){
        const id = e.currentTarget.dataset.item.id
        const title = e.currentTarget.dataset.item.name
        const artistName = e.currentTarget.dataset.item.artistName
        const artistId = e.currentTarget.dataset.item.artists[0].id
        const playCount = e.currentTarget.dataset.item.playCount
        wx.navigateTo({
          url: `/pages/play-video/play-video?id=${id}&title=${title}&artistName=${artistName}&playCount=${playCount}&artistId=${artistId}`,
        })
     }
  },

observers:{
  "listData":function(nv) {
    if(nv === null) return
    this.setData({
      movieList:nv
    })
  },
},

lifetimes:{
   detached:()=>{
     wx.pageScrollTo({
       scrollTop:0,
       duration:0
     })
   }
},

pageLifetimes:{
  show(){
      
    }
  },

})
