let cart = [];

function addToCart(id) {
  const item = menuItems.find((menu) => menu.id === id);
  const existing = cart.find((product) => product.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      ...item,
      qty: 1,
    });
  }
  updateCart();
}

function increaseQty(id) {
  const item = cart.find((product) => product.id === id);
  item.qty++;
  updateCart();
}

function decreaseQty(id) {
  const item = cart.find((product) => product.id === id);
  if (item.qty > 1) {
    item.qty--;
  } else {
    removeItem(id);
    return;
  }
  updateCart();
}

function removeItem(id) {
  if (!confirm("Hapus item ini dari keranjang?")) {
    return;
  }

  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  cartItems.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = `
        <div class="cart-empty">
            <div class="empty-icon">🛒</div>
            <p>
                Keranjang masih kosong.<br>
                Silakan tambahkan menu.
            </p>
        </div>
    `;

    cartSummary.style.display = "none";

    document.getElementById("place-order-btn").disabled = true;

    return;
  }

  cart.forEach((item) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
    <div class="cart-item">

      <div class="cart-top">

        <div class="ci-name">
          ${item.name}
        </div>

        <div class="ci-qty">

          <button onclick="decreaseQty(${item.id})">−</button>

          <span>${item.qty}</span>

          <button onclick="increaseQty(${item.id})">+</button>

        </div>

      </div>

      <div class="cart-bottom">

        <div class="ci-price">
          Rp ${(item.price * item.qty).toLocaleString("id-ID")}
        </div>

        <button
          class="remove-btn"
          onclick="removeItem(${item.id})">

          🗑

        </button>

      </div>

    </div>
  `;
  });

  document.getElementById("s-items").textContent = `${cart.length} Item`;

  document.getElementById("s-total").textContent =
    `Rp ${total.toLocaleString("id-ID")}`;

  document.getElementById("s-discount").textContent = "-Rp 0";

  cartSummary.style.display = "block";

  document.getElementById("place-order-btn").disabled = false;
}

console.log(document.getElementById("payment-amount"));

let orderType = "Delivery";

async function placeOrder() {
  console.trace("PLACE ORDER");

  if (cart.length === 0) {
    alert("Keranjang kosong");
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
  });

  const metode = document.getElementById("payment-method").value;

  let bayar;

  if (metode === "tunai") {
    bayar = parseInt(document.getElementById("payment-amount").value);

    if (!bayar || bayar < total) {
      alert("Nominal pembayaran kurang");

      return;
    }
  } else {
    bayar = total;
  }

  const btn = document.getElementById("place-order-btn");

  btn.disabled = true;
  btn.innerText = "Memproses...";

  const transaksiData = {
    bayar: bayar,
    metode_bayar: metode,
    jenis_pesanan: orderType,
    items: cart.map((item) => ({
      produk_id: item.id,
      jumlah: item.qty,
    })),
  };

  try {
    const result = await createTransaksi(transaksiData);

    console.log("RESULT:", result);

    if (result.success) {
      printReceipt(result.data.no_transaksi, total, bayar, metode);

      alert("Pembayaran berhasil!");

      cart = [];

      updateCart();

      document.getElementById("payment-amount").value = "";

      document.getElementById("payment-amount").focus();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat memproses transaksi.");
  } finally {
    btn.disabled = false;
    btn.innerText = "Bayar & Cetak Struk";
  }
}

function calculateChange() {
  const metode = document.getElementById("payment-method").value;

  const changeText = document.getElementById("change-text");

  if (metode !== "tunai") {
    changeText.innerText = "Tidak ada kembalian";
    return;
  }

  const bayar = parseInt(document.getElementById("payment-amount").value) || 0;

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
  });

  if (bayar === 0) {
    changeText.innerText = "Masukkan nominal pembayaran";
  } else if (bayar < total) {
    changeText.innerText = `Kurang Rp ${(total - bayar).toLocaleString("id-ID")}`;
  } else if (bayar === total) {
    changeText.innerText = "Uang pas";
  } else {
    changeText.innerText = `Kembalian: Rp ${(bayar - total).toLocaleString("id-ID")}`;
  }
}

function printReceipt(noTransaksi, total, bayar, metode) {
  const tanggal = new Date().toLocaleString("id-ID");

  let itemsHTML = "";

  cart.forEach((item) => {
    itemsHTML += `
      <div style="display:flex;justify-content:space-between;margin:6px 0;">
        <span>${item.name} x${item.qty}</span>
        <span>Rp ${(item.price * item.qty).toLocaleString("id-ID")}</span>
      </div>
    `;
  });

  const html = `
    <div style="width:320px;margin:auto;font-family:monospace;background:white;padding:20px;color:black;">
      <div style="text-align:center;">
        <h2 style="margin:0;">☕ OYEcoffee</h2>
        <small>Fresh Coffee & Happiness</small>
      </div>

      <hr>

      <p style="margin:4px 0;">No Transaksi : ${noTransaksi}</p>
      <p style="margin:4px 0;">Tanggal : ${tanggal}</p>
      <p style="margin:4px 0;">Pesanan : ${orderType}</p>
      <p style="margin:4px 0;">Pembayaran : ${metode.toUpperCase()}</p>

      <hr>

      ${itemsHTML}

      <hr>

      <div style="display:flex;justify-content:space-between;font-weight:bold;">
        <span>TOTAL</span>
        <span>Rp ${total.toLocaleString("id-ID")}</span>
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:8px;">
        <span>Bayar</span>
        <span>Rp ${bayar.toLocaleString("id-ID")}</span>
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:8px;">
        <span>Kembalian</span>
        <span>Rp ${(bayar - total).toLocaleString("id-ID")}</span>
      </div>

      <hr>

      <p style="text-align:center;margin-top:14px;">
        Terima kasih sudah ngopi ☕
      </p>

      <p style="text-align:center;font-size:12px;">
        "Ngopi santai, kerja sampai jadi."
      </p>
    </div>
  `;

  const receiptWindow = window.open("", "_blank", "width=400,height=700");

  receiptWindow.document.write(`
    <html>
    <head>
      <title>Struk</title>
      <style>
        body { font-family: monospace; padding:20px; }
        .btn-print {
          width:100%;
          padding:12px;
          margin-top:20px;
          cursor:pointer;
          border:none;
          border-radius:8px;
          font-weight:bold;
        }
        @media print {
          .btn-print { display:none; }
          body { margin:0; }
        }
      </style>
    </head>
    <body>
      ${html}

      <button class="btn-print" onclick="window.print()">
        🖨 Cetak Struk
      </button>
    </body>
    </html>
  `);

  receiptWindow.document.close();
  receiptWindow.focus();
}

async function createTransaksi(data) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/transaksi", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },

    body: JSON.stringify(data),
  });

  return await response.json();
}

function clearCart() {
  if (cart.length === 0) {
    return;
  }

  if (!confirm("Kosongkan seluruh keranjang?")) {
    return;
  }

  cart = [];

  updateCart();
}

function setOrderType(btn) {
  document
    .querySelectorAll(".otype-btn")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");

  orderType = btn.innerText;
}

function togglePaymentInput() {
  const metode = document.getElementById("payment-method").value;

  const paymentInput = document.getElementById("payment-amount");

  const changeText = document.getElementById("change-text");

  if (metode === "tunai") {
    paymentInput.disabled = false;

    paymentInput.value = "";

    paymentInput.placeholder = "Rp 0";

    changeText.innerText = "Masukkan nominal pembayaran";
  } else {
    paymentInput.disabled = true;

    paymentInput.value = "";

    changeText.innerText = "Tidak ada kembalian";
  }
}
