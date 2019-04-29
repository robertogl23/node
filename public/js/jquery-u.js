var use = $('#usuarios');

function renderUse( personas ){

    //console.log(personas);
    var html = '';
    
    html += '<h1>Usuarios Conectados</h1>';

    for( var i = 0; i < personas.length; i++){

        html += '<h2 data-id="'+ personas[i].id+'">Usuarios '+ personas[i].nombre +'</h2>';

    }

    use.html(html);

}