const express               = require("express");
const request               = require('request');
const bodyParser            = require("body-parser");
var app = express();
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/public', express.static('public')); 
app.set("view engine","ejs");
app.get("/",function(req,res)
{
    res.render("landing");
})
app.get("/news/:key",function(req,res)
{
    var key = req.params.key;
    var art;
    var url = 'http://newsapi.org/v2/everything?' +
          'q=' + key + '&' +
          'from=2020-06-16&' +
          'apiKey=d43a57d42659440190c62c563fb36344';

    request(url, { json: true }, (err, res, body) => {
    if (err) 
    {
        return console.log(err); 
    }
    art=body.articles;
    });
    setTimeout( function()
    {
        res.render("news.ejs",{articles:art});
    },4000);
})
app.listen(port ,function()  //replace process.env.PORT, process.env.IP with 5000 if running in local
{
    console.log("on 5000");
})
