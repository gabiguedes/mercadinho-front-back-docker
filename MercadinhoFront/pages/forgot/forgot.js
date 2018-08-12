class Forgot {

    constructor() {}

    _submitForgot() {

        let email = $("#email").val();

        if (!email) {
            alert("Preencha o campo email")
            return;
        }

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/usuarios/recuperar/senha/" + email,
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnYWJyaWVsYV9yYXlzc2FAaG90bWFpbC5jb20iLCJleHAiOjE1MzQ3MDAzNDh9.CBydrqX6iSj3FvLCLEol_x_9UkvfQcs3ZmNSHhDrLgy6OdaS6u4Ks0hP4RepY7STM4lLijX_IY87PTEFnfj90Q"
            },
            success: function (data, textStatus, request) {
                alert(`Sua nova senha é: ${data.senha}`);
            },
            error: function (err) {
                if (err.status == "403") {
                    alert("Sessão expirada");
                    window.location = "../login/login.html";
                }
            }

        });
    }

}