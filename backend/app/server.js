const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');

const Player = db.Player;

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Player.sync().then(() => {
    const players = [
      { firstname: 'Jack', lastname: 'Smith', 
                age: 23},
      { firstname: 'Adam', lastname: 'Johnson', 
                age: 31},
      { firstname: 'Dana', lastname: 'Bay', 
                age: 46},
    ]
    
    for(let i=0; i<players.length; i++){
      Player.create(players[i]);
    }
  })
}); 