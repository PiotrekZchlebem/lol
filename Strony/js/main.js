document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<li>Twój koszyk jest pusty</li>';
            checkoutButton.style.display = 'none';
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `Produkt ${item.name} - Cena: ${item.price} PLN <button class="remove-from-cart" data-index="${index}">Usuń</button>`;
                cartItems.appendChild(li);
            });

            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });
            });

            checkoutButton.style.display = 'block';
        }
    }

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product';
            div.setAttribute('data-id', product.id);
            div.innerHTML = `
                <h3>${product.name}</h3>
                <p>Cena: ${product.price} PLN</p>
                <button class="add-to-cart">Dodaj do koszyka</button>
            `;
            productList.appendChild(div);

            div.querySelector('.add-to-cart').addEventListener('click', function () {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
    }

    if (productList) {
        renderProducts();
    }

    if (cartItems) {
        updateCart();
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });
    }
});
