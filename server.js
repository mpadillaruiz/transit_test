//Express to deploy API
var express = require('express');

var bodyParser=require('body-parser');
const _ = require('lodash');

var express = require('text-2-json');

//Reading files from file system
fs.readfile('data/stops.txt', 'utf8', function(err,data) {
    if(err) throw err;
    let obj = {};
    let splitted = data.toString().split("\n");
    for (let i = 0; i<splitted.length; i++) {
        let splitLine = splitted[i].split(",");
        obj[splitLine[0]] = obj.splittLine[1].split(" ");
    }
    console.log(obj);
});

//Converting to JSON file


//Initializing application
var app= express();

app.use(bodyParser.json());

//Get subway stops
app.get('/stops',(req,res)=>{

  Stops.find().then((musicObjects)=>{
      res.send({stops});
    }).catch((e)=>res.status(400).send());

});

//Get all music items around an user on a fixed distance
app.post('/geofences',(req,res)=>{

var body = _.pick(req.body, ['lat', 'lng']);


console.log(body);
//Transform km to radians 1km
var distance = 1/111.12;


  MusicObject.find( {
   geo: { $near: [ body.lat , body.lng ],  $maxDistance: distance}
}).then((musicObjects)=>{
	console.log(musicObjects);
      if(!musicObjects){
        return res.status(404).send();
      }
        res.send({musicObjects});
    }).catch((e)=>res.status(400).send());

});

//POST /users
app.post('/users', (req, res) => {

var body = _.pick(req.body, ['userName','email', 'password']);

var user = new User(body);


console.log(user);
user.save().then(() => {

return user.generateAuthToken();

}).then((token) => {

res.header('x-auth', token).send(user);

}).catch((e) => {

res.status(400).send(e);
  })
});


app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

//POST /user/login

app.post('/users/login', (req, res) => {

var body = _.pick(req.body, ['email', 'password']);


console.log(body);
User.findByCredentials(body.email, body.password).then((user) => {

return user.generateAuthToken().then((token) => {

res.header('x-auth', token).send(user);

});

}).catch((e) => {

res.status(400).send();
  });
});

app.delete('/users/me/token',authenticate,(req,res)=>{

  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
	res.send(req.token);
  }).catch((e)=>{
    res.status(400).send();
  })
});

app.get('/musicObjects/:id',(req,res)=>{
  var id = req.params.id;

  MusicObject.find({
      _id: id
  }).then((musicObject)=>{
      if(!musicObject){
        return res.status(404).send();
      }
        res.send({musicObject});
    }).catch((e)=>res.status(400).send());

});

app.patch('/musicObjects/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['messages']);

  MusicObject.findOneAndUpdate({
    _id: id
  }, {$set: body}, {new: true}).then((musicObject) => {
    if (!musicObject) {
      return res.status(404).send();
    }

    res.send({musicObject});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(3000,()=>{
  console.log('Started on port 3000');
});
