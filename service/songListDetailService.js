import {jsRequest} from "./index"
import cookieData from "./cookie"

export const getSongListDetail = (id)=>{
	return jsRequest.post({
		url:`/playlist/detail?id=${id}`,
		data:{
			cookie:cookieData.cookie
		}
	})
}

export const getAllSongs = (id,page)=>{
	return jsRequest.post({
		url:`/playlist/track/all?id=${id}&limit=50&offset=${(page-1)*50}`,
		data:{
			cookie:cookieData.cookie
		}
	})
}