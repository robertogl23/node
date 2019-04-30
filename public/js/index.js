
function start(datos) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(datos).style.display = "block";  
}

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
  .then(reg => console.log("Registro",reg))
  .catch(err=>console.log('Error',err))
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); 
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  var id_token = googleUser.getAuthResponse().id_token;

  //console.log(id_token);

  var xhr = new XMLHttpRequest();
    xhr.open('POST', '/google');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);

    if (this.status === 200){
      //console.log('correcto');
      //window.location.href = 'verbs';
      var socket = io();
      var use = {
        id: profile.getId(),
        nombre: profile.getName(),
        img: profile.getImageUrl(),
        email: profile.getEmail()


      };

      socket.on('connect', function() {
        
        console.log('Conectado con el servidor');

        socket.emit('entrar', use, function( resp ){
          //console.log('Usuarios conectados', resp);
          renderUse(resp);

        });

        
      });

      socket.on('crearMensaje', function(mensaje){
        console.log('servidor:', mensaje);
      });
      socket.on('listaPersona', function(personas){
        console.log( personas);
        renderUse(personas);
      });



      
    }else{
      
      socket.on('disconnect', function() {
        
        console.log('Perdimos conexion con el servidor');

        
      });
    }
  };
  xhr.send('idtoken=' + id_token);
}



function signOut() {
 
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    

  });
}



