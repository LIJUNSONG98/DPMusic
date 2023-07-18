// components/title-tab/title-tab.js
Component({
  properties:{
    showMore:String,
    navigateTo:String
  },
  data:{
    showMoreData:"show"
  },
  lifetimes:{
    attached(){
      this.setData({
        showMoreData:this.data.showMore
      })
    }
  },
  methods:{
    onMoreTap(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})
