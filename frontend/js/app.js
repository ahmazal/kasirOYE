function setOrderType(button){

    document
        .querySelectorAll(".otype-btn")
        .forEach(btn=>{
            btn.classList.remove("active");
        });

    button.classList.add("active");
}

// Logout handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    logout();
    window.location.href = 'login.html';
  });
}

// Tampilkan nama user jika ada elemen userName
const user = getUser();
if (user && document.getElementById('userName')) {
  document.getElementById('userName').textContent = `Hello, ${user.nama}`;
}

// Sidebar & cart toggle handlers for mobile
function setupToggles(){
  const hamburger = document.querySelectorAll('#hamburgerBtn');
  const cartToggles = document.querySelectorAll('#cartToggleBtn');

  hamburger.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.body.classList.toggle('sidebar-open');
    });
  });

  cartToggles.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.body.classList.toggle('cart-open');
    });
  });

  // Close when clicking overlay
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', ()=>{
    document.body.classList.remove('sidebar-open');
    document.body.classList.remove('cart-open');
  });

  // Close button inside cart
  const closeCartBtns = document.querySelectorAll('#closeCartBtn');
  closeCartBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.body.classList.remove('cart-open');
    });
  });
}

document.addEventListener('DOMContentLoaded', setupToggles);
