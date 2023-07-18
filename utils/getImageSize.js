export const getImageSize = function(className) {
		return new Promise((resolve,reject)=>{
			const query = wx.createSelectorQuery()
			query.select(className).boundingClientRect()
			query.exec(res=>{
					resolve(res)
			})
		})
}