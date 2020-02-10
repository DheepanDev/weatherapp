const request = require('request')
const geocode = (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGhlZXAiLCJhIjoiY2s2OThramxsMDBhcTNrbXN3cTUyYnVsMSJ9.vA-mqOh7oX7DVHIqw9m0BA'
 
    request({url,json:true}, (error,{body}) =>{
      if(error){
         callback('unable to connect',undefined)
      }else if(body.features.length ===0){
          callback('location not found',undefined)
      }else{
         callback(undefined,{
            lat: body.features[0].center[0],
            long: body.features[0].center[1],
            loca: body.features[0].place_name
         })
      }
    })
 
 }

 module.exports=geocode