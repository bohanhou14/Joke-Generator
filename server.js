const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const ejs = require('ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');

// Setting up the main page
app.get("/", function(req, res){
    res.render("pages/start.ejs");
});

// Joke page
app.post("/", (req, res) => {
    const joke_url = "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=racist,sexist";

    const request = https.get(joke_url, function (response){

        if(response.statusCode === 200) {
            response.on("data", function (data) {
                var JsonData = JSON.parse(data);
                const setup = JsonData['setup'];
                const delivery = JsonData['delivery'];
                res.render("pages/joke.ejs", {
                    setup: setup,
                    delivery: delivery
                 });
            });
         } else {
             res.render("pages/failure.ejs")
         }

        
    });

})

app.post("/another-joke", function(req, res){
    const joke_url = "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=racist,sexist";

    const request = https.get(joke_url, function (response){

        if(response.statusCode === 200) {
            response.on("data", function (data) {
                var JsonData = JSON.parse(data);
                var setup = JsonData['setup'];
                var delivery = JsonData['delivery'];
                if(setup===undefined ){
                    setup = "Sorry, JokeAPI just made a mistake. I would go punish the author. Please find another joke~";
                    delivery = "-- Bohan";
                }
                res.render("pages/joke.ejs", {
                    setup: setup,
                    delivery: delivery
                 });
            });
         } else {
             res.render("pages/failure.ejs")
         }
    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.post("/back-to-main", function(req, res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

