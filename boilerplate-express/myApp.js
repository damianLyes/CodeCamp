let express = require('express');
let app = express();
let bodyParser = require("body-parser");

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  let logger = req.method + " " + req.path + " - " + req.ip;
  console.log(logger)
  next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", function (req, res){
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({"message": "Hello json".toUpperCase()});
  }
  else{
    res.json({"message": "Hello json"});
  }
  
});

app.get("/now", function (req, res, next){
  req.time = new Date().toString();
  next();
}, function (req, res){
    res.json({"time": req.time});
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({echo: word});
});

// app.get("/name", (req, res) => {
//   const {first, last} = req.query;
//   res.json({name: `${first} ${last}`});
// });

app.post("/name", (req, res) => {
  const {first, last} = req.body;
  res.json({name: `${first} ${last}`});
})



























module.exports = app;
