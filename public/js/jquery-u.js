var use = $('#usuarios');

function renderUse( personas ){

    //console.log(personas);
    var html = '';
    
    html += '<h1>Usuarios Conectados</h1>';

    for( var i = 0; i < personas.length; i++){

        html += '<a data-id="'+ personas[i].id+'"><img src="'+personas[i].img+'">'+ personas[i].nombre +'</a>';

    }

    use.html(html);

}