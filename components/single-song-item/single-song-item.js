// components/single-song-item/single-song-item.js
Component({
  properties:{
    index:Number,
    name:String,
    artistName:Array,
    albumName:String,
    otherInfo:{
      optionalTypes:[String,undefined,Object,Array],
      value:""
    }
  },
  // observers:{
  //   "artistName":(nv)=>{
  //     console.log(nv[0].name);
  //   }
  // }
})
