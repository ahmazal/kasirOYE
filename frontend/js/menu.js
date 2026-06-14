let currentCategory = "all";

function renderMenu(category = "all") {

    const menuGrid = document.getElementById("menu-grid");

    let filteredItems = menuItems;

    if(category !== "all"){
        filteredItems = menuItems.filter(
            item => item.category === category
        );
    }

    menuGrid.innerHTML = "";

    filteredItems.forEach(item => {

        menuGrid.innerHTML += `
            <div class="menu-card">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="menu-image"
                >

                <div class="menu-info">

                    <h3>${item.name}</h3>

                    <p class="price">
                        Rp ${item.price.toLocaleString("id-ID")}
                    </p>

                    <button
                        class="add-btn"
                        onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;
    });
}

function setTab(element, category){

    document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.remove("active");
    });

    element.classList.add("active");

    currentCategory = category;

    document.getElementById("section-title")
        .textContent =
        category === "all"
        ? "All Menu"
        : category.replace("-", " ");

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
        filteredItems = filteredItems.filter(
            item => item.category === currentCategory
        );
    }

    filteredItems = filteredItems.filter(
        item => item.name
        .toLowerCase()
        .includes(keyword)
    );

    menuGrid.innerHTML = "";

    filteredItems.forEach(item => {

        menuGrid.innerHTML += `
            <div class="menu-card">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="menu-image"
                >

                <div class="menu-info">

                    <h3>${item.name}</h3>

                    <p class="price">
                        Rp ${item.price.toLocaleString("id-ID")}
                    </p>

                    <button
                        class="add-btn"
                        onclick="addToCart(${item.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded",()=>{
    renderMenu("all");
});