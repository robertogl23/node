const express = require('express');

const socketIO = require('socket.io');

const http = require('http');

const app = express();

const hbs = require('hbs');

let server = http.createServer(app);

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

process.env.CLIENT_ID = process.env.CLIENT_ID || '133982771167-4pqvk30vklglgbimbpo3hvl3fp6nf122.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);

app.use(express.static(__dirname + '/public'));

module.exports.io = socketIO(server);

require('./socket.js');


hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('index');

});

app.get('/verbs', (req, res) => {

    res.render('verbs');

});

async function verify( token ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    console.log(payload.name);

    
  }
  

app.post('/google', (req,res) => {

    let token = req.body.idtoken;

    verify( token );

    res.json({
        token
    });

});





server.listen(port, (err) => {

    if (err) throw new Error(err);
    console.log(`Escuchando peticiones en el puerto ${ port }`);
    
});