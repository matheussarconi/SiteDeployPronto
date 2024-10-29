async function criarConta (event) {
    event.preventDefault();
    const nomeUsuario = document.querySelector('#nomeUsuario').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const data ={nomeUsuario, email, senha}
    const response = await fetch('http://localhost:3002/usuario/cadastrar', {
        method: "POST",
        headers:{
            "Content-Type":"appLication/json"
        },
        body:JSON.stringify(data)
    })
    
        const results = await response.json()

        if(results.success){
            window.location.href ="../paginaInicial/index.html"
        }
};


async function logar(event){
    event.preventDefault(); // Adicionado para evitar o reset da página

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = { email, senha };

    const response = await fetch('http://localhost:3002/logar/usuario', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    let results = await response.json();

    if(results.success){
        let userData = results.data;
        localStorage.setItem('infoUsuario', JSON.stringify(userData)); // Corrigido aqui
        window.location.href = "index.html";
        alert(results.message);
    } else {
        alert(results.message);
    }
}
    // Função para listar produtos


// Função para adicionar produto e atualizar a lista
async function cadastrarProduto(event) {

    event.preventDefault();
    const nomeProduto = document.querySelector('#nome').value;
    const precoProduto = document.querySelector('#preco').value;
    const descricao = document.querySelector('#descricao').value;
    const qtdDisponivel = document.querySelector('#quantidade').value;
    const imagemProduto = document.querySelector('#file').files[0];
    

    let formData = new FormData();

    formData.append('nomeProduto', nomeProduto);
    formData.append('precoProduto', precoProduto);
    formData.append('descricao', descricao);
    formData.append('qtdDisponivel', qtdDisponivel);
    formData.append('imagemProduto', imagemProduto);

    const response = await fetch('http://localhost:3002/cadastrar/produto', {
        method: "POST",
        body: formData
    });


    const results = await response.json();

    if (results.success) {
        alert(results.message);
    } else {
        alert(results.message);
    }
}
