function openAddModal() {

    document.getElementById("modal-title").innerText = "Add Menu";

    document.getElementById("menu-id").value = "";
    document.getElementById("menu-name").value = "";
    document.getElementById("menu-price").value = "";
    document.getElementById("menu-image").value = "";
    document.getElementById("menu-category").value = "coffee";

    document.getElementById("menu-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("menu-modal").style.display = "none";
}

function saveMenu() {

    const id = document.getElementById("menu-id").value;

    const name = document.getElementById("menu-name").value;

    const price = parseInt(
        document.getElementById("menu-price").value
    );

    const image = document.getElementById("menu-image").value;

    const category =
        document.getElementById("menu-category").value;

    if (!name || !price) {
        alert("Nama dan harga wajib diisi!");
        return;
    }

    if (id) {

        const menu =
            menuItems.find(item => item.id == id);

        menu.name = name;
        menu.price = price;
        menu.image = image;
        menu.category = category;

    } else {

        menuItems.push({
            id: Date.now(),
            name,
            price,
            image,
            category
        });
    }

    localStorage.setItem(
        "menuItems",
        JSON.stringify(menuItems)
    );

    renderMenu(currentCategory);

    closeModal();
}

function editMenu(id) {

    const menu =
        menuItems.find(item => item.id === id);

    document.getElementById("modal-title").innerText =
        "Edit Menu";

    document.getElementById("menu-id").value =
        menu.id;

    document.getElementById("menu-name").value =
        menu.name;

    document.getElementById("menu-price").value =
        menu.price;

    document.getElementById("menu-image").value =
        menu.image;

    document.getElementById("menu-category").value =
        menu.category;

    document.getElementById("menu-modal").style.display =
        "flex";
}

function deleteMenu(id) {

    const confirmDelete =
        confirm("Yakin hapus menu?");

    if (!confirmDelete) return;

    menuItems =
        menuItems.filter(item => item.id !== id);

    localStorage.setItem(
        "menuItems",
        JSON.stringify(menuItems)
    );

    renderMenu(currentCategory);
}