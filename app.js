const express = require("express");

const https = require("https"); //native node module no need to install using npm like express
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "b478f0d6449c65eb18b9d317d8f29543";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url,function(response){
    //console.log(response);
    //console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      res.write("<p>The weather is currently " + weatherDescription +"<p>");
      res.write("<h1> The temperature in " + query +" is " + temp + " degree celcius.</h1>");
      res.write("<img src=" +imageURL +">");
      res.send();
    });
  });
});


app.listen(3000,function(){
  console.log("Server started on port 3000");
});
