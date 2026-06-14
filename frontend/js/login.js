// Handler untuk form login
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  // Ambil nilai input
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Panggil fungsi login dari auth.js
  const result = await login(email, password);

  if (result.success) {
    alert('Login berhasil!');
    // Redirect ke menu.html
    window.location.href = 'index.html';
  } else {
    alert('Login gagal: ' + result.message);
  }
});