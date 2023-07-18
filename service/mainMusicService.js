import {jsRequest} from "./index"
import cookieData from "./cookie"
//获取轮播图数据
export const getBanner = function() {
	return jsRequest.post({
		url:"/banner?type=0",
		data:{
			cookie:cookieData.cookie
		}
	})
}
// 获取推荐歌曲的列表数据
export const getRecommendSong = async (id)=>{
	let res = await jsRequest.post({
		url:"/topList",
		data:{
			cookie:cookieData.cookie
		}
	})
	const list = res.data.list
	let listId=0
	list.forEach(item=>{
		if(item.name==="热歌榜"){
			listId=item.id
		}
	})

   return jsRequest.post({
		 url:`/playlist/track/all?id=${listId}`,
		 data:{
			 cookie:cookieData.cookie
		 }
	 })
}
// 获取热门歌单的数据
export const getHotSongList = ()=>{
	return jsRequest.post({
		url:"/top/playlist/highquality",
		data:{
			cookie:cookieData.cookie
		}
	})
}
// 获取推荐歌单的数据
export const getRecommendSongList = ()=>{
	return jsRequest.post({
		url:"/personalized",
		data:{
			cookie:cookieData.cookie
		}
	})
}
// 获取排行榜单的数据
export const getRankingList = ()=>{
	return jsRequest.post({
		url:"/toplist",
		data:{
			cookie:cookieData.cookie
		}
	})
}
// 获取单个歌曲的详细数据
export const getSingleSong = (songId)=>{
	return jsRequest.post({
		url:`/song/detail?ids=${songId}`,
		data:{
			cookie:cookieData.cookie
		}
	})
}
// 获取音乐url
export const getSongUrl = (songId)=>{
	return jsRequest.post({
		url:`/song/url/v1?id=${songId}&level=exhigh`,
		data:{
			cookie:cookieData.cookie
		}
	})
}
//获取歌词
export const getLyric = (songId)=>{
	return jsRequest.post({
		url:`/lyric?id=${songId}`,
		data:{
			cookie:cookieData.cookie
		}
	})
}