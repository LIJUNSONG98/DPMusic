import {jsRequest} from "./index"
import cookieData from "./cookie"
export const getVideoUrl = (id)=>{
   return jsRequest.post({
		 url:`/mv/url?id=${id}`,
		 data:{
			 cookie:cookieData.cookie
		 }
	 })
}
export const getVideoInfo = (id)=>{
	return jsRequest.post({
		url:`/mv/detail?mvid=${id}`,
		data:{
			cookie:cookieData.cookie
		}
	})
}
export const getRecommendMovie = (id)=>{
	return jsRequest.post({
		url:`/artist/mv?id=${id}&limit=25`,
		data:{
			cookie:cookieData.cookie
		}
	})
}