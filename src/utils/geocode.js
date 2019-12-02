const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmFtcmF0YXZpY3RvcnkiLCJhIjoiY2szMW93eXhzMGFoazNtbzJxNzdpM2xpaiJ9.RpBSYhAWs2iaX4XTThjU5Q'


const request=require('request');
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to server',undefined);
    }
    else if(body.features.length == 0){
        callback("Try different location unable to find the current one",undefined);
    }
    else{
    const latitude=body.features[0].center[1];
    const longitude=body.features[0].center[0];
    const location=body.features[0].place_name;
    callback(undefined,{
        latitude:latitude,
        longitude:longitude,
        location:location

    });
}
  
})
}
module.exports=geocode