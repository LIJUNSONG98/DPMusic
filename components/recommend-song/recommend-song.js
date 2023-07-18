// components/recommend-song/recommend-song.js
Component({
  properties:{
    imgUrl:String,
    name:String,
    artistName:Array,
    id:Number,
    albumName:String
  },
  data:{
    imgUrlData:"",
    nameData:"",
    artistNameData:"",
    idData:0,
    albumNameData:""
  },
  observers:{
    "imgUrl":function(nv) {
      if(!nv) return
      this.setData({
        imgUrlData:nv
      })
    },
    "name":function(nv) {
      if(!nv) return
      this.setData({
        nameData:nv
      })
    },
    "artistName":function(nv) {
      if(!nv) return
      if(nv.length>=2){
        let _name = ""
        nv.forEach(item=>{
          _name=_name + '/' +item.name
        })
        _name = _name.slice(1,_name.length)
        this.setData({
          artistNameData:_name
        })
      }else {
        this.setData({
          artistNameData:nv[0].name
        })
      }

    },
    "id":function(nv) {
      if(!nv) return
      this.setData({
        idData:nv
      })
    },
    "albumName":function(nv) {
      if(!nv) return
      this.setData({
        albumNameData:nv
      })
    }
  }
})
