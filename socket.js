const { io } = require('./server');
const { Usuarios } = require('./usuarios');

const usuarios = new Usuarios();
io.on('connection', (client) => {

    client.on('entrar', (data, callback) => {
        
        if( !data.nombre){
            return callback({
                error: true,
                mensaje: 'el nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona(client.id, data.nombre,data.img,data.email);
        
        
        callback(personas);
        console.log(data);
    })

    client.on('disconnect', () => {

        console.log('Usuario desconectado');
    });

});