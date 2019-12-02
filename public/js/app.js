function getWeatherInfoForPlace(place){   
    messageOne.textContent='Loading...';
    messageTwo.textContent=""
    const url='http://localhost:3000/weather?address='+place;
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=""
            messageTwo.textContent=data.error
        }else{
            console.log(data)
            messageTwo.textContent=""
            messageOne.textContent=data.forecast+" "+data.location;
        
        }
    })
})
}

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')


const messageOne=document.querySelector('#dataOnSuccess');
const messageTwo=document.querySelector('#dataOnError');


weatherForm.addEventListener('submit',(event)=>{
    //prevents the browser from reloading
    const location=search.value;
    event.preventDefault()
    getWeatherInfoForPlace(location)
});