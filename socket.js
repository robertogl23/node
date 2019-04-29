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
        
        client.broadcast.emit('listaPersona', usuarios.getPersonas());


        callback(personas);
        console.log(data);
    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);
        console.log('Usuario desconectado');

        client.broadcast.emit('crearMensaje', { usuario: 'Administrador', mensaje: `${ personaBorrada.nombre} abandono el chat`});
        client.broadcast.emit('listaPersona', usuarios.getPersonas());
    });

});