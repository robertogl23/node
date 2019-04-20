

var params = new URLSearchParams(window.location.search);

var socket = io();


socket.on('connect', function() {
  
    console.log('Conectado con el servidor');

    socket.emit('entrar', { usuario: 'Roberto'})

  
});

socket.on('disconnect', function() {
  
    console.log('Perdimos conexion con el servidor');

  
});
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

let leerLogin = () => {
 
    const usuario = document.querySelector('#usuario').value,
        contraseña = document.querySelector('#contraseña').value;


    if (usuario=== '' || contraseña === '') {
        console.log('Campos vacios');

    } else {

        const data = new FormData();
        data.append('use', usuario);
        data.append('pass', contraseña);

        loginUsuario(data) ;
        
    }
}
 let loginUsuario = (datos) => {
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/servicios-web/login.php', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);
            if(respuesta.respuesta === 'correcto'){
                window.location.href = 'verbs';
            }
        } else {

            console.log("error servidor");
        }

    }
    xhr.send(datos)

 }

let saveUsuario = () => {

    const nombre = document.querySelector('#nombre').value,
        edad = document.querySelector('#edad').value,
        correo = document.querySelector('#correo').value,
        con = document.querySelector('#con').value;

    if(nombre === '' || edad === '' || correo === '' || con === ''){
        console.log("vacio");
    }else{
        const dataRegistro = new FormData();
        dataRegistro.append('name', nombre);
        dataRegistro.append('edad', edad);
        dataRegistro.append('mail', correo);
        dataRegistro.append('pass', con);
        insertarBD(dataRegistro);

    }


}

let insertarBD = (datos) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/servicios-web/insert.php', true);
    xhr.onload = function() {
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText); 
            console.log(respuesta);
        }
    }
    xhr.send(datos)
}
let btn1 = () => {
    window.location = 'login';
}