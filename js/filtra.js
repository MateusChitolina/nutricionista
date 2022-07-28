var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function() {
    var paciente = document.querySelectorAll(".paciente");

    if(this.value.length > 0) {
            paciente.forEach(function(paciente) {
            var tdNome = paciente.querySelector(".info-nome");
            var nome = tdNome.textContent;
            var expressao = new RegExp(campoFiltro.value, "i");
            //expressao.test(nome) é uma função derivada d o objeto RegExp()
            if (!expressao.test(nome)) {
                paciente.classList.add("invisivel")
            } else {
                paciente.classList.remove("invisivel")
            }
        });
    } else {
        paciente.forEach(function(paciente) {
            paciente.classList.remove("invisivel")
        })
    }
});