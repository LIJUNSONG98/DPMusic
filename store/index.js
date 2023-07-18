import {JSEventStore} from "js-mini-store"

const userStore = new JSEventStore({
	state:{
		songList:[],
		currentSongId:0,
		currentSongIndex:-1
	}
})

export default userStore