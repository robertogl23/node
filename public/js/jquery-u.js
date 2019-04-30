var use = $('#usuarios');

function renderUse( personas ){

    //console.log(personas);
    var html = '';
    
    html += '<h1>Usuarios Conectados</h1>';

    for( var i = 0; i < personas.length; i++){

        html +=    '<div class="li">';
        html +=       '<div class="im">';
        html +=       '</div>';
        html +=        '<div class="na">';
        html +=            '<img style="width:50px; height:50px;" src="'+personas[i].img+'">';
        html +=            '<a data-id="'+ personas[i].id+'">'+ personas[i].nombre +'</a>';
        html +=        '</div>';
        html +=    '</div>';

    }

    use.html(html);

}