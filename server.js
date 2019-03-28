const express = require('express');

//const socketIO = require('socket.io');

const http = require('http');

const app = express();

const hbs = require('hbs');

let server = http.createServer(app);



const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('index');

});



server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});