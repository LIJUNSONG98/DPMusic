import {jsRequest} from "./index"
import cookieData from "./cookie"
export const getVideoList = (page,type)=>{
   return jsRequest.post({
		 url:`/mv/all?offset=${(page-1)*30}&order=最热&type=${type}`,
		 data:{
			 cookie:cookieData.cookie
		 }
	 })
}