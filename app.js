const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

// Setting up the main page
app.get("/", function(req, res){
    res.sendFile(__dirname + "/start.html");
});

// Joke page
app.post("/", (req, res) => {
    const joke_url = "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=racist,sexist";

    const request = https.get(joke_url, function (response){
        if(response.statusCode === 200) {
             res.sendFile(__dirname + "/joke.html")
         } else {
             res.sendFile(__dirname + "/failure.html")
         }

        response.on("data", function (data) {
            const JsonData = JSON.parse(data);
            const setup = JsonData.setup;
            const delivery = JsonData.delivery;
        });
    });

})

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.post("/back-to-main", function(req, res){
    res.redirect("/");
});



app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

