
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
