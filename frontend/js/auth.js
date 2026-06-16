// AUTENTIKASI - Login & Token Management
const API_BASE = 'http://localhost:3000/api';

// Login function
async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      // Simpan token ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    return { success: false, message: 'Error: ' + error.message };
  }
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Cek apakah user sudah login
function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

// Ambil user data
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Ambil token
function getToken() {
  return localStorage.getItem('token');
}

// Proteksi halaman - redirect ke login jika belum login
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}
