
$(function () {
    // submit do formulario
    $("#novo_usuario").submit(function (event) {

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': "http://localhost:8080/usuarios",
            'data': JSON.stringify({
                "nome": $("#nome").val(),
                "email": $("#email").val(),
                "senha": $("#senha").val()
            }),
            success: function (response, textStatus, request) {
                alert("Usuario criado com sucesso!")
                window.location = "../login/login.html";
            },
            error: function (error) {
                alert("Usuário inválido");
            }
        });
        event.preventDefault();
		
    });
});