let token = localStorage.getItem("token_mercadinho");
let email = localStorage.getItem("user_mercadinho");
let id;

if (!token) {
    window.location = "../login/login.html";
}

$.ajax({
    type: "GET",
    url: "http://localhost:8080/usuarios/email/" + email,
    dataType: 'json',
    async: false,
    headers: {
        "Authorization": token,
    },
    success: function (data) {
        $("#nome").val(data.nome);
        $("#email").val(data.email);
        id = data.id;
    },
    error: function (err) {
        console.log(err);
    }
});

$(function () {
    // submit do formulario
    $("#editar_perfil").submit(function (event) {

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token
            },
            'type': 'PUT',
            'url': "http://localhost:8080/usuarios/" + id,
            'data': JSON.stringify({
                "nome": $("#nome").val(),
                "email": $("#email").val(),
                "senha": $("#senha").val()
            }),
            success: function (response, textStatus, request) {
                alert("Perfil atualizado")
                window.location = "../categoria/categoria.html";
            },
            error: function (error) {
                alert("Usuário inválido");
            }
        });
        event.preventDefault();
    });
});