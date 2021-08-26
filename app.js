
//jshint exversion:6
const express = require('express');
const https = require("https");
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apikey = "ee9eb9b5a6b9edad6e25043d90ebc3a6"
  const units = "metric"

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=" + units + "&appid=" + apikey;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescripition = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescripition + "</p>");
      res.write("<h1>The temperature in "+ query +" " + temp + " degree.</h1>");
      res.write("<img src="+ imageURL + ">");
      res.send();
    });
  })
})


app.listen(3000,function(){
  console.log("the server is running on port 3000");
})
