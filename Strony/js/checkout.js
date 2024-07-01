document.addEventListener('DOMContentLoaded', function () {
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Produkt ${item.name} - Cena: ${item.price} PLN`;
        orderSummary.appendChild(li);
        total += item.price;
    });

    totalAmount.textContent = `${total} PLN`;

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toString()
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Dziękujemy za złożenie zamówienia, ' + details.payer.name.given_name + '!');
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            });
        }
    }).render('#paypal-button-container');
});
