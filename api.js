const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var express = require('express');
var app = express();
//var fs = require("fs");

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 8001; 


var bodyParser = require('body-parser');
const StockDetails = require('./StockDetails.js');
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  extended: true }));

function validateToken(token){
   
   let jwtSecretKey = process.env.JWT_SECRET_KEY;
   try {        
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return true;
        } else {
            // Access Denied
            return false;
        }
   } catch (error) {
        // Access Denied
        return false;
   }
}


/** Application level middleware */
app.use((req, res, next) => {
   //validate JWT
   console.log(req.originalUrl);
   if(req.originalUrl != "/generateToken"){
      let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
      const token = req.header(tokenHeaderKey);
      let isTokenValidated =  validateToken(token);
      if(isTokenValidated == true){
         next();
      }else{
         res.end(JSON.stringify({"code":401,"error":"Invalid JWT token"}));    
      }   
   }else{
      next();
   }   
});


/* Route level middleware */
app.get("/generateToken/", (req, res) => {
   // Then generate JWT Token
   let jwtSecretKey = process.env.JWT_SECRET_KEY;
   let data = {
       time: Date(),
       userId: process.env.DEFAULT_USER,
   }
   const token = jwt.sign(data, jwtSecretKey,{expiresIn:180}); //expire in 180 seconds
   res.send(token);
});

app.post('/stocksdetails/', function (req, res) {   
   let details = new StockDetails();
   details.getStockDetails(req.body.symbol).then(function(result){
      res.end(JSON.stringify(result));
   });   
});

app.post('/priceDetails/', function (req, res) {   
   let details = new StockDetails();
   details.getStockPriceDetails(req.body.symbol).then(function(result){
      res.end(JSON.stringify(result));
   });      
});

app.post('/resultDetails/', function (req, res) {   
   let details = new StockDetails();
   details.getStockResultDetails(req.body.symbol).then(function(result){
      res.end(JSON.stringify(result));
   });  
});

app.post('/corpActions/', function (req, res) {   
   let details = new StockDetails();
   details.getStockCorpActions(req.body.symbol).then(function(result){
      res.end(JSON.stringify(result));
   });  
});

app.post('/histPrices/', function (req, res) {   
   let details = new StockDetails();
   details.getStockHistPrices(req.body.symbol).then(function(result){
      res.end(JSON.stringify(result));
   });
});

app.post('/peerslist/', function (req, res) {   
   let details = new StockDetails();
   details.getPeersList(req.body.sector).then(function(result){
      res.end(JSON.stringify(result));
   }); 
});

app.get('/topScoresList/', function (req, res) {   
   let details = new StockDetails();
   details.getTopScoreList().then(function(result){
      res.end(JSON.stringify(result));
   }); 
});

app.post('/getScore/', function (req, res) {   
   let details = new StockDetails();
   details.getStockScore(req.body.symbol).then(function(result){
      res.end(JSON.stringify(result));
   });      
});

var server = app.listen(PORT, function () {
   console.log("Express App running at http://127.0.0.1:"+PORT+"/");
})
