const BACKEND_URL = 'https://kasir-production-1526.up.railway.app';
const BACKEND_API = `${BACKEND_URL}/api`;

const menuItems = [];

function normalizeCategory(category) {
  if (!category) return 'all';
  const key = category.toLowerCase();
  if (key === 'coffee') return 'coffee';
  if (key === 'non-coffee') return 'non-coffee';
  if (key === 'makanan berat') return 'food';
  if (key === 'snack & roti') return 'snack';
  if (key === 'dessert') return 'dessert';
  return key.replace(/\s+/g, '-');
}

function normalizeProduct(product) {
  return {
    id: product.id,
    name: product.nama,
    kode_produk: product.kode_produk,
    kategori_id: product.kategori_id,
    nama_kategori: product.nama_kategori,
    category: normalizeCategory(product.nama_kategori),
    price: Number(product.harga) || 0,
    stok: Number(product.stok) || 0,
    satuan: product.satuan || 'porsi',
    gambar: product.gambar,
    image: product.gambar ? `${BACKEND_URL}/${product.gambar}` : 'assets/placeholder.png',
  };
}

async function loadMenuItems() {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${BACKEND_API}/produk`, { headers });
    const data = await response.json();

    if (!data.success) {
      console.warn('Gagal memuat produk backend:', data.message);
      return [];
    }

    menuItems.splice(0, menuItems.length, ...data.data.map(normalizeProduct));
    return menuItems;
  } catch (error) {
    console.error('Error loadMenuItems:', error);
    return [];
  }
}
