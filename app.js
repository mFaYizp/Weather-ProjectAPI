const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const unit =  "metric"
    const apiKey = "3e8fd2fcaa186fce8e3e887a327c9e81"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=" +unit+ "&appid=" +apiKey
    
    https.get(url, function(response){
        console.log(response.statusCode)
        
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" +icon+ "@2x.png"
            res.write("<p>The weather is currently <i><b>"+ weatherDescription +"</b></i></p>");
            res.write("<h1> The temperature in " +query+ " is " +temp+ " Degrees Celsius.</h1>")
            res.write("<img src=" +imageUrl+">")
            res.send()
        })
    })
})    







app.listen(3000,function(){
    console.log("server is working on port 3000.")
})