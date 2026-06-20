let currentCategory = "all";

function renderMenu(category = "all") {

    const menuGrid =
        document.getElementById("menu-grid");

    let filteredItems = menuItems;

    if(category !== "all"){

        filteredItems =
            menuItems.filter(
                item =>
                item.category === category
            );
    }

    menuGrid.innerHTML = "";

    if(filteredItems.length === 0){

        menuGrid.innerHTML =
        `
        <p>
            Menu tidak ditemukan
        </p>
        `;

        return;
    }

    filteredItems.forEach(item => {

        menuGrid.innerHTML +=
        `
        <div class="menu-card">

            <img
                src="${item.image}"
                alt="${item.name}"
                class="menu-image">

            <div class="menu-info">

                <h3>
                    ${item.name}
                </h3>

                <p class="price">
                    Rp ${item.price.toLocaleString("id-ID")}
                </p>

                <div class="menu-buttons">

                    <button
                        class="add-btn"
                        onclick="addToCart(${item.id})">

                        tambah

                    </button>

                    <button
                        class="edit-btn"
                        onclick="editMenu(${item.id})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteMenu(${item.id})">

                        Delete

                    </button>

                </div>

            </div>

        </div>
        `;
    });
}

function setTab(tab, category){

    document
        .querySelectorAll(".tab")
        .forEach(t =>
            t.classList.remove("active")
        );

    tab.classList.add("active");

    currentCategory = category;

    document.getElementById(
        "section-title"
    ).textContent =
        category === "all"
        ? "All Menu"
        : category;

    renderMenu(category);
}

function filterMenu(){

    const keyword =
        document
        .getElementById("search-input")
        .value
        .toLowerCase();

    const menuGrid =
        document.getElementById("menu-grid");

    let filteredItems = menuItems;

    if(currentCategory !== "all"){

        filteredItems =
            filteredItems.filter(
                item =>
                item.category === currentCategory
            );
    }

    filteredItems = filteredItems.filter(
        item => item.name
        .toLowerCase()
        .includes(keyword)
    );
    menuGrid.innerHTML = "";
    filteredItems.forEach(item => {

        menuGrid.innerHTML +=
        `
        <div class="menu-card">

            <img
                src="${item.image}"
                class="menu-image">

            <div class="menu-info">

                <h3>${item.name}</h3>

                <p class="price">
                    Rp ${item.price.toLocaleString("id-ID")}
                </p>

            <div class="menu-buttons">

            <button
                class="edit-btn"
                onclick="editMenu(${item.id})">

                Edit

            </button>

            <button
                class="add-btn"
                onclick="addToCart(${item.id})">

                Tambah

            </button>

            <button
                class="delete-btn"
                onclick="deleteMenu(${item.id})">

                Delete

            </button>

        </div>

            </div>

        </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadMenuItems();
    renderMenu("all");
});
