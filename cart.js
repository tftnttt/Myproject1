document.addEventListener("DOMContentLoaded", function () {
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;
        
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    function updateCart(index, action) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (action === "increase") {
            cart[index].quantity++;
        } else if (action === "decrease" && cart[index].quantity > 1) {
            cart[index].quantity--;
        } else if (action === "remove") {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("increase")) {
            updateCart(event.target.dataset.index, "increase");
        } else if (event.target.classList.contains("decrease")) {
            updateCart(event.target.dataset.index, "decrease");
        } else if (event.target.classList.contains("remove")) {
            updateCart(event.target.dataset.index, "remove");
        }
    });

    loadCart();
});
