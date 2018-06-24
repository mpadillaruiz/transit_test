//Express to deploy API
var express = require('express');

const _ = require('underscore');

var fs = require('fs');

var stops = [];
var header=[];

//Initializing application
var app= express();

//Reading stops from the file system and process it into a javascript array of objects
fs.readFile('data/stops.txt', 'utf8', function(err,data) {

  let splitted = data.split("\r\n");

  for (let i = 0; i<splitted.length; i++) {
      //If the line is empty, continue
      if(splitted[i]==""){
          continue
      }
      //Read each field value in the line
      let splitted3= splitted[i].split(",");
        //Create a stop
        var stop={}
        //Go through all the fields
        for (let h = 0; h<splitted3.length; h++) {
            //If it is the first line, we are in the header.
            if (i==0){
              //Store header values.
              header.push(splitted3[h])}
            else{
              //Else, the line is a stop.
              //Take field names from header
              let field = header[h];
              //Add field to the object
              stop[field] = splitted3[h];

            }
        }
      //If the stop object is not empty, add it to the stops array
      if(_.isEmpty(stop)){}else{
          stops.push(stop);
        }
      }

      //After loading stops, start listening to upcoming connections
      app.listen(3000,()=>{
        console.log('Started on port 3000');
      });

});

//Set route to get the subway stops
app.get('/stops',(req,res)=>{
    res.contentType('application/json');
    res.send(JSON.stringify(stops));
});
