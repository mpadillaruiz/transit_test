//Importing neccesary packages
var express = require('express');
const _ = require('underscore');
var fs = require('fs');

//Global variables that will store each entities once loaded from txt file
var stops = [];

//Initializing application
var app= express();

//Middleware to allow cors (if neccesary)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

//Reading stops from the file system and process it into a javascript array of objects
fs.readFile('data/stops.txt', 'utf8', function(err,data) {

  //Variable to store the file header
  let header=[];

  //Split each line of the file
  let lines = data.split("\r\n");

  for (let i = 0; i<lines.length; i++) {
      //If the line is empty, continue
      if(lines[i]==""){
          continue
      }
      //Read each field value in the line
      let fieldValues= lines[i].split(",");
        //Create a stop objects
        var stop={}
        //Go through all the fields
        for (let h = 0; h<fieldValues.length; h++) {
            //If it is the first line, we are in the header.
            if (i==0){
              //Store header values.
              header.push(fieldValues[h])}
            else{
              //Else, the line is a stop.
              //Take field names from header
              let field = header[h];
              //Add field to the object
              stop[field] = fieldValues[h];
            }
        }
      //If the stop object is not empty, add it to the stops array
      if(_.isEmpty(stop)){}else{
          stops.push(stop);
        }
      }

      //After loading stops, start listening to upcoming connections
      app.listen(3001,()=>{
        console.log('Started on port 3001');
      });

});

//Set route to get the subway stops
app.get('/stops',(req,res)=>{
    res.contentType('application/json');
    res.send(JSON.stringify(stops));
});
