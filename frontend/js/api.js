// ============================================
// API - Fungsi untuk fetch data dari backend

// Header dengan token untuk request yang perlu autentikasi
function getHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

// ============================================
// KATEGORI
// ============================================

async function getKategori() {
  try {
    const response = await fetch(`${API_BASE}/kategori`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetch kategori:", error);
    return [];
  }
}

// ============================================
// PRODUK
// ============================================

async function getProduk() {
  try {
    const response = await fetch(`${API_BASE}/produk`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetch produk:", error);
    return [];
  }
}

async function createProduk(formData) {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/produk`, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error create produk:', error);
    return { success: false, message: error.message };
  }
}

async function updateProduk(id, formData) {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/produk/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('Error update produk:', error);
    return { success: false, message: error.message };
  }
}

async function removeProduk(id) {
  try {
    const response = await fetch(`${API_BASE}/produk/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return await response.json();
  } catch (error) {
    console.error('Error remove produk:', error);
    return { success: false, message: error.message };
  }
}

// ============================================
// PELANGGAN
// ============================================

// ============================================
// TRANSAKSI
// ============================================

async function getTransaksi() {
  try {
    const response = await fetch(`${API_BASE}/transaksi`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetch transaksi:", error);
    return [];
  }
}

// ============================================
// USER
// ============================================

