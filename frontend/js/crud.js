async function openAddModal() {

    document.getElementById("modal-title").innerText = "Add Menu";

    document.getElementById("menu-id").value = "";
    document.getElementById("menu-name").value = "";
    document.getElementById("menu-code").value = "";
    document.getElementById("menu-price").value = "";
    document.getElementById("menu-stock").value = "0";
    document.getElementById("menu-unit").value = "porsi";
    document.getElementById("menu-image").value = "";
    document.getElementById("menu-category").value = "";

    await loadMenuCategories();

    document.getElementById("menu-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("menu-modal").style.display = "none";
}

async function loadMenuCategories() {
    const categories = await getKategori();
    const select = document.getElementById("menu-category");
    select.innerHTML = '<option value="">Pilih kategori</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.nama;
        select.appendChild(option);
    });
}

async function saveMenu() {

    const id = document.getElementById("menu-id").value;
    const name = document.getElementById("menu-name").value.trim();
    const code = document.getElementById("menu-code").value.trim();
    const price = parseFloat(document.getElementById("menu-price").value);
    const stock = parseInt(document.getElementById("menu-stock").value, 10);
    const unit = document.getElementById("menu-unit").value.trim() || 'porsi';
    const imageInput = document.getElementById("menu-image");
    const imageFile = imageInput.files[0];
    const categoryId = document.getElementById("menu-category").value;

    if (!name || !code || !categoryId || !price) {
        alert("Nama, kode, kategori, dan harga wajib diisi!");
        return;
    }

    const formData = new FormData();
    formData.append('nama', name);
    formData.append('kode_produk', code);
    formData.append('kategori_id', categoryId);
    formData.append('harga', price);
    formData.append('stok', isNaN(stock) ? 0 : stock);
    formData.append('satuan', unit);
    if (imageFile) {
        formData.append('gambar', imageFile);
    }

    try {
        let result;
        if (id) {
            result = await updateProduk(id, formData);
        } else {
            if (!imageFile) {
                alert('Silakan pilih gambar produk.');
                return;
            }
            result = await createProduk(formData);
        }

        if (!result.success) {
            alert(result.message || 'Gagal menyimpan produk.');
            return;
        }

        closeModal();
        await loadMenuItems();
        renderMenu(currentCategory);
        alert(result.message || 'Produk berhasil disimpan.');
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan produk.');
    }
}

async function editMenu(id) {
    const product = menuItems.find(item => item.id === id);
    if (!product) {
        alert('Produk tidak ditemukan');
        return;
    }

    document.getElementById("modal-title").innerText =
        "Edit Menu";

    document.getElementById("menu-id").value =
        product.id;

    document.getElementById("menu-name").value =
        product.name;

    document.getElementById("menu-code").value =
        product.kode_produk || '';

    document.getElementById("menu-price").value =
        product.price;

    document.getElementById("menu-stock").value =
        product.stok || 0;

    document.getElementById("menu-unit").value =
        product.satuan || 'porsi';

    document.getElementById("menu-image").value = "";

    await loadMenuCategories();
    document.getElementById("menu-category").value =
        product.kategori_id || '';

    document.getElementById("menu-modal").style.display =
        "flex";
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

async function deleteMenu(id) {
    const confirmDelete = confirm("Yakin hapus menu?");
    if (!confirmDelete) return;

    try {
        const result = await removeProduk(id);
        if (!result.success) {
            alert(result.message || 'Gagal menghapus produk.');
            return;
        }

        await loadMenuItems();
        renderMenu(currentCategory);
        alert(result.message || 'Produk berhasil dihapus.');
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menghapus produk.');
    }
}