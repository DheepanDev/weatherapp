const request = require('request')
const forecast = (lat,long,callback) =>{
    const url ='https://api.darksky.net/forecast/7eca751dbe528942a56103b770e5f4a3/'+lat+','+long
    request({url,json:true},(error,{body}) =>{
      if(error){
        callback('check connection',undefined)

      }else if(body.error){

        callback('provide valid string',undefined)
      }else{
        callback(undefined,body.daily.data[0].summary+' It is currently pleasent weather out with '+ body.currently.temperature + 
        ' .There is a ' + body.currently.precipProbability + ' % chance for rain .The High temperature today is ' + body.daily.data[0].temperatureHigh + 
        ' The Low temperature is ' + body.daily.data[0].temperatureLow )

      }
    
    
})

}

module.exports=forecast