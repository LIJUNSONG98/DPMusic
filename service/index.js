class JSRequest {
constructor(baseUrl) {
	this.baseUrl = baseUrl
}

	request(options) {
		const { url } = options
		return new Promise((resolve,reject)=>{
			wx.request({
				...options,
				url:this.baseUrl + url,
				success:(res)=>{
					resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			})
		})
	}
	get(options){
    return this.request({...options,method:"GET"})
	}
	post(options) {
		return this.request({...options,method:"POST"})
	}
}

export const jsRequest = new JSRequest("http://162.14.73.163:3000")