// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/", (req, res) => {
  const dateNow = Date.now();
  res.json({unix: dateNow, utc: new Date(dateNow).toUTCString()});
});

app.get("/api/:date", (req, res) => {
  const {date} = req.params;
  // check if 'date' contains 5 or more digits and convert to integer
  if(/\d{5,}/.test(date)){
    const dateInt = parseInt(date);
    // console.log({unix: dateInt, utc: new Date(dateInt).toUTCString()});
    res.json({unix: dateInt, utc: new Date(dateInt).toUTCString()});
  } else{
    const parsedDate = new Date(date);
    if(parsedDate.toString() === 'Invalid Date') {
      // console.log({error: "invalid date"});
      res.json({error: "Invalid Date"});
    }
    else{
      // console.log({"unix": parsedDate.valueOf(), "utc" : parsedDate.toUTCString()});
    res.json({unix: parsedDate.valueOf(), utc: parsedDate.toUTCString()});
    }
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
