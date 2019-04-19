const express = require('express');

const socketIO = require('socket.io');

const http = require('http');

const app = express();

const hbs = require('hbs');

let server = http.createServer(app);



const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

let io = socketIO(server);
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {

        console.log('Usuario desconectado');
    });

});

hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('index');

});
app.get('/verbs', (req, res) => {

    res.render('verbs');

});



require('./sockets');

server.listen(port, (err) => {

    if (err) throw new Error(err);
    console.log(`Escuchando peticiones en el puerto ${ port }`);
    
});