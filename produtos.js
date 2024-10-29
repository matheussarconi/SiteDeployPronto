function loadProducts() {
    const images = 'http://localhost:3002/uploads/';
    fetch('http://localhost:3002/produtos/listar')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            const productList = document.getElementById('productList'); 
            data.data.forEach(produto => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                
                productItem.innerHTML = `
                    <img src="${images + produto.imagemProduto}" alt="">
                    <h3>${produto.nomeProduto}</h3>
                    <p>${produto.precoProduto}</p>
                    <p><strong>Preço:</strong> R$${produto.precoProdutos.toFixed(2)}</p>
                `;
                
                productList.appendChild(productItem);
            });
        })
        // .catch(error => console.error('Erro ao carregar produtos:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts()
});
