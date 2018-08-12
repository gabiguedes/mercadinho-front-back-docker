let token = localStorage.getItem("token_mercadinho");

if (!token) {
    window.location = "../login/login.html";
}

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return '';
    } else {
        let id = (decodeURI(results[1]) || 0);
        if (id != 0) {
            return id;
        } else {
            return '';
        }

    }
}

$.ajax({
    type: "GET",
    url: "http://localhost:8080/produtos/" + $.urlParam('id'),
    dataType: 'json',
    async: false,
    headers: {
        "Authorization": token,
    },
    success: function(data) {
        $("#img").attr("src", `../assets/img/${data.id}.png`);
        $("#nome_produto").append(data.nomeProduto);
        $("#valor").append(data.valor);
        $("#categoria").append(data.categoria.nome);
    },
    error: function(err) {

        if (err.status == "403") {
            alert("Sessão expirada");
            window.location = "../login/login.html";
        }
        alert("Produto não existe");
        window.location = "../categoria/categoria.html";
    }
});