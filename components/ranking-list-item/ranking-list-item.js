// components/ranking-list-item/ranking-list-item.js
import {getAllSongs} from "../../service/songListDetailService"
Component({
  properties:{
    listId:Number,
    name:String,
    updateFrequency:String,
  },
  data:{
    songList:[]
  },
  lifetimes:{
    attached(){
      getAllSongs(this.properties.listId,1).then(res=>{
        this.setData({
          songList:res.data.songs.slice(0,3)
        })
      })
    }
  },
  methods:{
    onItemTap(e){
      wx.navigateTo({
        url: `/pages/song-list-detail/song-list-detail?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
