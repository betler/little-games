// Shorthand for $( document ).ready()
$(function() {
    $('#startButton').on('click', function () {
        lanzarJuego();
    })

    $('#adivinaButton').on('click', function () {
        adivinar();
    })
});

function lanzarJuego() {
    let valor = Math.floor(Math.random() * 100);
    $('#barraProgreso').css('width', valor + '%').attr('aria-valuenow', valor);
    $('#adivinaInput').val('');  
    $('#adivinaInput').focus();  
    $('#startButton').addClass("disabled");
}

function adivinar() {
    // Get the real size
    let real = $('#barraProgreso').attr('aria-valuenow');
    
    // Get the entered number
    let guessed = $('#adivinaInput').val();
    if (isNaN(guessed)){
        alert("Hey cowgirl! That's not a number!");
    }

    // Get the difference between the real one and the guessed one
    let difference = Math.abs(real - guessed);
    if (difference <= 5) {
        $('#realValueSpan').html(real + '%');
        $('#sucessModal').modal('show');
        $('#startButton').removeClass("disabled");
    } else {
        $('#errorModal').modal('show');
    }
}