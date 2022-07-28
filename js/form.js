var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obterPacienteDoFormulario(form);

    var erro = validaPaciente(paciente);

    if(erro.length > 0) {
        exibeMensagemDeErro(erro);
        form.reset();
        return;
    }

    adicionarPacienteNaTabela(paciente);

    form.reset();
    var listaErros = document.querySelector("#mensagem-erro");
    listaErros.innerHTML = "";
});

function adicionarPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagemDeErro(erro) {
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";

    erro.forEach(function(erro) {
        var li = document.createElement("li");
        li.classList.add("paciente-form-invalido")
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obterPacienteDoFormulario(form) {

        //é possível acessar elementos dentro de um query des de que tenha um 'name', assim é possivel chamar diretamente pelo 'name'
        var paciente = {
            nome: form.nome.value,
            peso: form.peso.value,
            altura: form.altura.value,
            gordura: form.gordura.value,
            imc: calculaImc(form.peso.value, form.altura.value)
        }
        return paciente;
}

function montaTr(paciente) {

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");   

    //adicionando os valores obtidos no formulário dentro do conteudo de texto dos elemntos criados

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    
    var erros = [];

    if(paciente.nome.length == 0) {
        erros[0] = "Nome inválido"
    }
    
    if(!validaPeso(paciente.peso) || paciente.peso.length == 0) {
        erros[1] = "O peso é inválido!";
    }
    if(!validaAltura(paciente.altura) || paciente.altura.length == 0) {
        if(erros[1] = "O peso é inválido!"){
           erros[2] = "A altura é inválida!";
        } else {
            erros[1] = "A altura é inválida!"
        }
        
    }

    if(paciente.gordura.length == 0) {
        erros[3] = "% de gordura inválida"
    }
    return erros;
}