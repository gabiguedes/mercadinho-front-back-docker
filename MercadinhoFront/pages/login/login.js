function setStorage(token,email) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("token_mercadinho", token);
        localStorage.setItem("user_mercadinho",email);
    } else {
        alert("Seu navegador não suporta LocalStorage");
    }
}

function getToken() {
    return localStorage.getItem("token_mercadinho");
}

$(function () {
    // submit do formulario
    $("#login").submit(function (event) {

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'type': 'POST',
            'url': "http://localhost:8080/login",
            'data': JSON.stringify(
                {
                    "email": $("#email").val(),
                    "senha": $("#senha").val()
                }
            ),
            success: function (response, textStatus, request) {
                // setToken(); coloca aqui request do Authorization	
                setStorage(request.getResponseHeader('Authorization'), $("#email").val());
                window.location = "../perfil/perfil.html";
            },
            error: function (error) {
                alert("Usuário inválido");
            }
        });

        event.preventDefault();
    });
});

function logIn() {
    FB.login(function (response) {
        if (response.status == "connected") {
            FB.api('/me?fields=name,email', function (userData) {
                console.log(userData);

                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    'type': 'POST',
                    'dataType': "text",
                    'url': "http://localhost:8080/auth/facebook",
                    'data': JSON.stringify(
                        {
                            "email": userData.email,
                            "nome": userData.name,
                            "senha": userData.id,
                        }
                    ),
                    success: function (response, textStatus, request) {
                        setStorage(request.getResponseHeader('Authorization'), userData.email);
                        window.location = "../perfil/perfil.html";
                    },
                    error: function (error) {                        
                        alert("Usuário inválido");
                    }
                });
            });
        }
    }, { scope: 'public_profile, email ' });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1873838009592390',
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));