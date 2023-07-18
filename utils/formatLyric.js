const formatLyric = function(lyric){
   const lrcReg = /\[(\d\d):(\d\d)\.(\d{2,3})\]/
   if(!lyric) return
   const lrcArr = lyric.split(/\n/)
   let lrcResult = []
   lrcArr.forEach((item,index)=>{
      if(!item) return
      const result = lrcReg.exec(item)
      const text = item.replace(lrcReg,"")
      const minute = result[1]*60*1000
      const second = result[2]*1000
      const mSecond = result[3]*1
      const time = minute + second + mSecond
      lrcResult.push({time,text})
   })
   return lrcResult
}

export default formatLyric