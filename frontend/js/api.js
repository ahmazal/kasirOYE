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

async function getProdukById(id) {
  try {
    const response = await fetch(`${API_BASE}/produk/${id}`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetch produk:", error);
    return null;
  }
}

// ============================================
// PELANGGAN
// ============================================

async function getPelanggan() {
  try {
    const response = await fetch(`${API_BASE}/pelanggan`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetch pelanggan:", error);
    return [];
  }
}

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

  const result = await response.json();

  console.log("Status:", response.status);
  console.log("Response:", result);

  return result;
}

// ============================================
// USER
// ============================================

async function getUsers() {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetch users:", error);
    return [];
  }
}
