// ===============================
// Chalet Café Digital Menu
// ===============================

const menuContainer = document.getElementById("menu-container");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

let products = [];

// ===============================
// Load Products
// ===============================

async function loadProducts() {

    try {

        const response = await fetch("assets/data/menu.json");

        products = await response.json();

        displayProducts(products);

    } catch (error) {

        menuContainer.innerHTML = `
            <div class="alert alert-danger text-center">
                Impossible de charger le menu.
            </div>
        `;

        console.error(error);

    }

}

// ===============================
// Display Products
// ===============================

function displayProducts(items) {

    menuContainer.innerHTML = "";

    if (items.length === 0) {

        menuContainer.innerHTML = `
            <div class="col-12 text-center">

                <h4>Aucun produit trouvé.</h4>

            </div>
        `;

        return;

    }

    items.forEach(product => {

        const popularBadge = product.popular
            ? `<span class="badge bg-warning text-dark mb-2">⭐ Populaire</span>`
            : "";

        const availableBadge = product.available
            ? `<span class="badge bg-success">Disponible</span>`
            : `<span class="badge bg-danger">Indisponible</span>`;

        menuContainer.innerHTML += `

        <div class="card shadow-sm border-0">

            <img
                src="${product.image}"
                class="card-img-top"
                alt="${product.name}"
                onerror="this.src='https://placehold.co/600x400?text=Image';"
            >

            <div class="card-body">

                ${popularBadge}

                <h4 class="card-title">

                    ${product.name}

                </h4>

                <p class="text-muted">

                    ${product.description}

                </p>

                <p>

                    <strong>

                        ${product.category}

                    </strong>

                </p>

                <h5 class="text-success">

                    ${product.price} ${product.currency}

                </h5>

                ${availableBadge}

            </div>

        </div>

        `;

    });

}

// ===============================
// Search
// ===============================

if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}

// ===============================
// Filter
// ===============================

if (filterSelect) {

    filterSelect.addEventListener("change", filterProducts);

}

// ===============================
// Search + Filter
// ===============================

function filterProducts() {

    const keyword = searchInput.value.toLowerCase();

    const category = filterSelect.value;

    const filtered = products.filter(product => {

        const matchName = product.name
            .toLowerCase()
            .includes(keyword);

        const matchCategory =

            category === "Tous"

            ||

            product.category === category;

        return matchName && matchCategory;

    });

    displayProducts(filtered);

}

// ===============================

loadProducts();