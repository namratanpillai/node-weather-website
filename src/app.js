const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast')
const app=express()


//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../template/views');
const partialsPath=path.join(__dirname,'../template/partials');



//Setup handlebars engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup sraric directories to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Namrata Pillai'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'All about me!',
        name:'Namrata Pillai'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        res.send({
            error: 'You must provide a location'
        })
        return;
    }

const place=req.query.address;
    if(place){
        geocode(place,(error,{latitude,longitude,location}={})=>{
            if(error){
               res.send({
                   errorMessage: 'Try another location'
               })
            }
            forecast(latitude,longitude,(error,{forecast})=>{
                if(error){
                    return console.log(error);
                } 
                res.send({
                    forecast,
                    location
                })
            })
        })
        }else{
            console.log('Please provide a location')
        }
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessage:'You are in the right place for help!',
        name:'Namrata Pillai'
    })
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         res.send({
//             error:'You must provide a search term'
//         })
//         return;
//     }
//     console.log(req.query.search)
//    res.send({products:[]})
//     })

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage:'Help article not found'
    })
    })

app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'Blaah keep looking and looking! Page not found!'
    })
})

app.listen(3000,()=>{
    console.log('The server is up on port 3000')
});

