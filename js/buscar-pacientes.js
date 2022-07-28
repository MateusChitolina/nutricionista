var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function () {
    //Método AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //Configurando a requisição que vc vai enviar

    xhr.addEventListener("load", function () {
            var erroAjax = document.querySelector("#erro-ajax")
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            erroAjax.classList.remove("erro-visivel");
            var resposta = xhr.responseText;
            var pacientes = JSON.parse(resposta); //tansforma o JSON (String) em um objeto JS, se possui mais de um objeto no JSON ele cria um array de objetos
            pacientes.forEach(function (paciente) {
                adicionarPacienteNaTabela(paciente);
            });
        } else {
            
            erroAjax.classList.remove("invisivel");
            erroAjax.classList.add("erro-visivel");
            console.log(xhr.status);
            console.log(xhr.responseText)
        }



    });

    xhr.send(); //pega a requisição e envia 

});