const express = require ("express");
const bodyParser  = require ("body-parser");
const https = require("https");

const app = express();
app.use(express.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){

    const place = req.body.cname
    const id = "32d74271d9c3fe90c1fefebbf641b57e"
    const unit ="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + id + "&units=" + unit +""
    https.get(url,function(response){
        console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        res.send("<h1>The local temperature of " + req.body.cname + " " + "is" +" " + temp +" " + "Celsius</h1>");
    })
})
})


app.listen(3000,function(){
    console.log("Server is running on LocalHost 3000");
});
