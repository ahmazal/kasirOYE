// ============================================
// API - Fungsi untuk fetch data dari backend

const API_BASE = 'http://localhost:3000/api';

// Header dengan token untuk request yang perlu autentikasi
function getHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

// ============================================
// KATEGORI
// ============================================

async function getKategori() {
  try {
    const response = await fetch(`${API_BASE}/kategori`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetch kategori:', error);
    return [];
  }
}

// ============================================
// PRODUK
// ============================================

async function getProduk() {
  try {
    const response = await fetch(`${API_BASE}/produk`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetch produk:', error);
    return [];
  }
}

async function getProdukById(id) {
  try {
    const response = await fetch(`${API_BASE}/produk/${id}`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetch produk:', error);
    return null;
  }
}

// ============================================
// PELANGGAN
// ============================================

async function getPelanggan() {
  try {
    const response = await fetch(`${API_BASE}/pelanggan`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetch pelanggan:', error);
    return [];
  }
}

// ============================================
// TRANSAKSI
// ============================================

async function getTransaksi() {
  try {
    const response = await fetch(`${API_BASE}/transaksi`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetch transaksi:', error);
    return [];
  }
}

async function createTransaksi(transaksiData) {
  try {
    const response = await fetch(`${API_BASE}/transaksi`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(transaksiData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error create transaksi:', error);
    return { success: false, message: error.message };
  }
}

// ============================================
// USER
// ============================================

async function getUsers() {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      headers: getHeaders()
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetch users:', error);
    return [];
  }
}
