document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.name} - Cena: ${product.price} PLN
                <button class="edit-product" data-id="${product.id}">Edytuj</button>
                <button class="delete-product" data-id="${product.id}">Usuń</button>
            `;
            productList.appendChild(li);

            li.querySelector('.edit-product').addEventListener('click', function () {
                editProduct(product.id);
            });

            li.querySelector('.delete-product').addEventListener('click', function () {
                deleteProduct(product.id);
            });
        });
    }

    function editProduct(id) {
        const product = products.find(p => p.id === id);
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
    }

    function deleteProduct(id) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const productId = document.getElementById('product-id').value;
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;

        if (productId) {
            const product = products.find(p => p.id === parseInt(productId));
            product.name = productName;
            product.price = parseFloat(productPrice);
        } else {
            const newProduct = {
                id: products.length ? products[products.length - 1].id + 1 : 1,
                name: productName,
                price: parseFloat(productPrice)
            };
            products.push(newProduct);
        }

        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        productForm.reset();
    });

    renderProducts();
});
