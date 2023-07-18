import { JSEventStore } from "js-mini-store";

const userStore = new JSEventStore({
  state: {
    songList: [],
    currentSongId: 0,
    currentSongIndex: -1,
    currentTime: 0,
    isPlay: false,
  },
});

export default userStore;
