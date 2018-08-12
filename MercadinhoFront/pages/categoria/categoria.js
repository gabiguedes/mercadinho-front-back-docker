let token = localStorage.getItem("token_mercadinho");

if (!token) {
	window.location = "../login/login.html";
}

$.urlParam = function (name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results == null) {
		return '';
	} else {
		let id = (decodeURI(results[1]) || 0);
		if (id != 0) {
			return "/categoria/" + id;
		} else {
			return '';
		}

	}
}

$.ajax({
	type: "GET",
	url: "http://localhost:8080/produtos" + $.urlParam('id'),
	dataType: 'json',
	async: false,
	headers: {
		"Authorization": token,
	},
	success: function (data, textStatus, request) {
		$.each(data, function (key, value) {
			var newRow = $("<tr>");
			var cols = "";
			cols += '<td>' + value.nomeProduto + '</td>';
			cols += '<td><a href="../produtos/produtos.html?id=' + value.id + '" class="btn btn-primary">ver mais</a></td>';
			newRow.append(cols);
			$(".table > tbody").append(newRow);
		});
	},
	error: function (err, textStatus) {
		if (err.status == "403") {
			alert("Sessão expirada");
			window.location = "../login/login.html";
		}
		console.log(err);
	}

});

$.ajax({
	type: "GET",
	url: "http://localhost:8080/categorias",
	dataType: 'json',
	async: false,
	headers: {
		"Authorization": token,
	},
	success: function (data, textStatus, request) {
		$.each(data, function (key, value) {
			var li = '<li><a href="?id=' + value.id + '">' + value.nome + '</a></li>';
			$("#categorias").append(li);
		});
	},
	error: function (err) {
		if (err.status == "403") {
			alert("Sessão expirada");
			window.location = "../login/login.html";
		}
	}

});