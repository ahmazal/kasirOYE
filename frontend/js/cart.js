let cart = [];

function addToCart(id){
    const item = menuItems.find(
        menu => menu.id === id
    );
    const existing = cart.find(
        product => product.id === id
    );
    if(existing){
        existing.qty++;
    }else{
        cart.push({
            ...item,
            qty:1
        });
    }
    updateCart();
}

function increaseQty(id){
    const item = cart.find(
        product => product.id === id
    )
    item.qty++;
    updateCart();
}

function decreaseQty(id){
    const item = cart.find(
        product => product.id === id
    );
    if(item.qty > 1){
        item.qty--;
    }else{
        removeItem(id);
        return;
    }
    updateCart();
}

function removeItem(id){
    cart = cart.filter(
        item => item.id !== id
    );
    updateCart();
}

function clearCart(){
    cart = [];
    updateCart();
}

function updateCart(){
    const cartItems =
        document.getElementById("cart-items");
    const cartSummary =
        document.getElementById("cart-summary");
    cartItems.innerHTML = "";
    let total = 0;
    if(cart.length === 0){
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Keranjang masih kosong</p>
            </div>
        `;
        cartSummary.style.display = "none";
        document.getElementById(
            "place-order-btn"
        ).disabled = true;
        return;
    }

    cart.forEach(item => {

        total += item.price * item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="ci-info">
                    <div class="ci-name">
                        ${item.name}
                    </div>

                    <div class="ci-price">
                        Rp ${item.price.toLocaleString("id-ID")}
                    </div>

                    <div class="ci-qty">
                        <button onclick="decreaseQty(${item.id})">
                            -
                        </button>
                        <span>${item.qty}</span>
                        <button onclick="increaseQty(${item.id})">
                            +
                        </button>
                        <button
                            class="remove-btn"
                            onclick="removeItem(${item.id})">
                            🗑
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("s-items")
        .textContent = `${cart.length} Item`;

    document.getElementById("s-total")
        .textContent =
        `Rp ${total.toLocaleString("id-ID")}`;

    document.getElementById("s-discount")
        .textContent = "-Rp 0";

    cartSummary.style.display = "block";

    document.getElementById(
        "place-order-btn"
    ).disabled = false;
}

function placeOrder(){
    if(cart.length === 0){
        alert("Keranjang kosong");
        return;
    }
    alert("Pesanan berhasil dibuat");
    cart = [];
    updateCart();
}