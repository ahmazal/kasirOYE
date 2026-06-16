const defaultMenuItems = [
    {
        id: 1,
        name: "Americano",
        category: "coffee",
        price: 15000,
        image: "assets/americano.png"
    },
    {
        id: 2,
        name: "Cappuccino",
        category: "coffee",
        price: 18000,
        image: "assets/cappuccino.png"
    },
    {
        id: 3,
        name: "Matcha Latte",
        category: "non-coffee",
        price: 20000,
        image: "assets/matcha.png"
    },
    {
        id: 4,
        name: "Croissant",
        category: "food",
        price: 12000,
        image: "assets/croissant.png"
    },
    {
        id: 5,
        name: "French Fries",
        category: "snack",
        price: 10000,
        image: "assets/fries.png"
    },
    {
        id: 6,
        name: "Cheesecake",
        category: "dessert",
        price: 22000,
        image: "assets/cheesecake.png"
    }
];

let menuItems =
    JSON.parse(
        localStorage.getItem("menuItems")
    ) || defaultMenuItems;