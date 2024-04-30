// Simula um banco de dados em memória
var alunos = [];

// Guarda o objeto que está sendo alterado
var alunoAlterado = null;

function adicionar() {
    // Libera para digitar o RA
    document.getElementById("RA").disabled = false;
    alunoAlterado = null;
    mostrarModal();
    limparform();
}

function alterar(RA) {
    // Procura o ALUNO que tem o RA clicado para alterar
    for (let i = 0; i < alunos.length; i++) {
        let aluno = alunos[i];
        if (aluno.ra == RA) {
            // Achou o aluno, então preenche o form
            document.getElementById("RA").value = aluno.ra;
            document.getElementById("nome").value = aluno.nome;
            document.getElementById("curso").value = aluno.curso;
            document.getElementById("cidade").value = aluno.cidade;
            document.getElementById("estado").value = aluno.estado;
            alunoAlterado = aluno;
        }
    }
    // Bloquear o RA para não permitir alterá-lo
    document.getElementById("RA").disabled = true;
    mostrarModal();
}

function excluir(RA) {
    if (confirm("Você deseja realmente excluir?")) {
        for (let i = 0; i < alunos.length; i++) {
            let aluno = alunos[i];
            if (aluno.ra == RA) {
                // Remove o elemento encontrado na posição "i"
                alunos.splice(i, 1);
            }
        }
        exibirDados();
    }
}

function mostrarModal() {
    let containerModal = document.getElementById("container-modal");
    containerModal.style.display = "flex";
}

function ocultarModal() {
    let containerModal = document.getElementById("container-modal");
    containerModal.style.display = "none";
}

function cancelar() {
    ocultarModal();
    limparform();
}

function salvar() {
    let ra = document.getElementById("RA").value;
    let nome = document.getElementById("nome").value;
    let curso = document.getElementById("curso").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;

    // Validar se todos os campos estão preenchidos
    if (!ra || !nome || !curso || !cidade || !estado) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validar o campo RA para garantir que contenha apenas números
    if (!/^[\d]+$/.test(ra)) {
        alert("O campo RA deve conter apenas números.");
        return;
    }

    // Se não estiver alterando ninguém, adiciona no vetor
    if (alunoAlterado == null) {
        let aluno = {
            "ra": ra,
            "nome": nome,
            "curso": curso,
            "cidade": cidade,
            "estado": estado
        };
        // Adiciona o objeto aluno no vetor de alunos
        alunos.push(aluno);
    } else {
        alunoAlterado.ra = ra;
        alunoAlterado.nome = nome;
        alunoAlterado.curso = curso;
        alunoAlterado.cidade = cidade;
        alunoAlterado.estado = estado;
    }

    alunoAlterado = null;

    // Limpar o formulário
    limparform();

    ocultarModal();

    exibirDados(); // Cria as linhas na tabela
    
    // Exibir mensagem de cadastro feito com sucesso
    alert("Cadastro feito com sucesso!");
}

// Função para excluir um aluno
function exibirDados() {
    let tbody = document.querySelector("#table-customers tbody");

    // Antes de listar os alunos, limpa todas as linhas
    tbody.innerHTML = "";

    for (let i = 0; i < alunos.length; i++) {
        let linha = `
        <tr>
            <td>${alunos[i].ra}</td>
            <td>${alunos[i].nome}</td>
            <td>${alunos[i].curso}</td>
            <td>${alunos[i].cidade}</td>
            <td>${alunos[i].estado}</td>
            <td>
                <button onclick="alterar('${alunos[i].ra}')">Alterar</button>
                <button onclick="excluir('${alunos[i].ra}')">Excluir</button>
            </td>
        </tr>`;

        let tr = document.createElement("tr");
        tr.innerHTML = linha;

        tbody.appendChild(tr);
    }
}
function limparform() {
    document.getElementById("RA").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
}

