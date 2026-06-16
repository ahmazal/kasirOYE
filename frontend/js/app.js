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
