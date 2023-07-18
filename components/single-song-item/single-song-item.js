// components/single-song-item/single-song-item.js
import userStore from "../../store/index";
Component({
  properties: {
    index: Number,
    name: String,
    artistName: Array,
    albumName: String,
    songId: Number,
    otherInfo: {
      optionalTypes: [String, undefined, Object, Array],
      value: "",
    }
  },
    data: {
      currentId: 0,
    },
    lifetimes: {
      created(){

      },
      attached() {
        this.setData({
          currentId:userStore.state.currentSongId
        })
        userStore.onState("currentSongId",(v)=>{
          if(!v) return
          this.setData({
            currentId:v
          })
        })
      }
    },
});
