// app.js
App({
	globalData:{
		 screenWidth:0,
		 screenHeight:0,
		 statusBarHeight:0
	},
	onLaunch(){
		//获取屏幕尺寸
		wx.getSystemInfo({
			success:res=>{
				this.globalData.screenHeight = res.screenHeight
				this.globalData.screenWidth = res.screenWidth
				this.globalData.statusBarHeight = res.statusBarHeight
			}
		})
		wx.setInnerAudioOption({
			obeyMuteSwitch:false
		})
	}
})
