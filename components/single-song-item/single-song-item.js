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
  // observers:{
  //   "artistName":(nv)=>{
  //     console.log(nv[0].name);
  //   }
  // }
    data: {
      currentId: 0,
    },
    lifetimes: {
      attached() {
        this.setData({
          currentId:userStore.state.currentSongId
        })
        userStore.onState("currentSongId", (v) => {
          if (!v.currentSongId) return;
          console.log(v.currentSongId);
          this.setData({
            currentId: v.currentSongId,
          });
        });
      },
      ready(){
        console.log(`歌曲id：${this.properties.songId}`);
        console.log(`正在播放：${this.data.currentId}`);
      }
    },
});
