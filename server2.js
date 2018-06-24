//Express to deploy API
var express = require('express');

var bodyParser=require('body-parser');
const _ = require('underscore');
let keys;

var fs = require('fs');

var foo = require('./data/markers.json');

//var t2j = require('text-2-json');

var regex = new RegExp("[^, ]+");

//Initializing application
var app= express();
//Get subway stops
app.get('/stops',(req,res)=>{

res.send({foo});

});


function getJson(req, res, next){
    res.send(foo);
}

//Reading files from file system
fs.readFile('data/stops.txt', 'utf8', function(err,data) {

  let obj = {};
  let splitted = data.toString().split("\n");
  splitted = splitted.toString().match(regex);


  var jsonOut = fs.createWriteStream('data/stops.json');
  //Define header
  for (let i = 0; i<splitted.length; i++) {
    if (i==0){
        console.log(splitted[0])
        setHeaderRowAsKeys(splitted[0]);
        splitted[i] = addKeys(splitted[i]);
        console.log(splitted[0])
    }
    jsonOut.write(JSON.stringify(splitted[i]));

  }
  jsonOut.on('error', function(err) { console.log(err); });
  jsonOut.end();
});

function setHeaderRowAsKeys(line){
	keys = line;
}

function addKeys(line){
	return _.object(keys, line);
}

app.listen(3000,()=>{
  console.log('Started on port 3000');
});
