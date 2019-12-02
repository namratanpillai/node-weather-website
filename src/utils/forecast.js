const forecast=(latitude,longitude,callback)=>{
    const coordinates=latitude+','+longitude;
    const url='https://api.darksky.net/forecast/c015417d5f8fb00a2f8b00d1eddfc78a/'+coordinates
const request=require('request');

request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to server',undefined);
    }
    else if(body.error){
        console.log('Unable to find location',undefined)
    }
    else{
    const summary=body.daily.data[0].summary;
    const temprature=body.currently.temperature;
    const precipitationProbability=body.currently.precipProbability;
    callback(undefined,{
        forecast:summary+' It is currently '+temprature+' degrees out. There is a '+precipitationProbability+"% chance of rains."
    });
} 
})
}

module.exports=forecast