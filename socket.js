const {io} = require('./server');
io.on('connection', (client) => {

    client.on('entrar', (usuario) => {
        
        console.log(usuario);
    })

    client.on('disconnect', () => {

        console.log('Usuario desconectado');
    });

});