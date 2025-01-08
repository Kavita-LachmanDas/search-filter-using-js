 /////////first cards display krwane hai page pr
async function data(){
    let fetchapi = await fetch(`https://dummyapi.online/api/products`);
    let jsonData = await fetchapi.json();
    return jsonData;
}

async function GenerateCards(product) {
    let dtaa = await data()
    // console.log(dtaa);
    
    return `
    <div class="product-card">
            <div class="product-info">
              <div class="product-price">${product.productCategory}</div>
              <div class="product-title">${product.name}</div>
              <div class="product-price">${product.brand}</div>
              <div class="product-title">${product.description}</div>
              <div class="product-price">${product.basePrice}</div>
            </div>
          </div>
    `;
}

async function renderProducts() {
    let getdiv = document.getElementById('productSection');
    let productData = await data(); // Array of products
    let productCards = productData.map(product => GenerateCards(product));
    let resolvedCards = await Promise.all(productCards); // Resolve all async calls
    getdiv.innerHTML = resolvedCards.join(""); // Join all cards
}

renderProducts();


//////////////hogaye cards display page pr







////////////////sec step/////////////////////
function filterdata(products, itemToSearch) {
    let item = itemToSearch.toLowerCase();
    let result = products.filter((product) => {
        let category = product.productCategory.toLowerCase()||product.brand.toLowerCase()||product.name.toLowerCase(); // Corrected category property
        return category.includes(item);
    });
    return result;
}

async function handle(searchTerm) {
    let getdiv = document.getElementById('productSection');
    let products = await data(); // Get all products
    let searchResults = filterdata(products, searchTerm); // Filter products based on search term
    
    if (searchResults.length > 0) {
        // Generate cards for the filtered products
        let productCards = searchResults.map(product => GenerateCards(product));
        let resolvedCards = await Promise.all(productCards); // Resolve all cards
        getdiv.innerHTML = resolvedCards.join(""); // Display filtered cards
    } else {
        // Display "No match found" message
        getdiv.innerHTML = `<div class="no-match">No match found</div>`;
    }
}



/////assscending /////descending
async function handleSort(order) {
    let getdiv = document.getElementById('productSection');
    let products = await data(); // Fetch products

    // Sort products based on order
    let sortedProducts = products.sort((a, b) => {
        return order === "ascending" ? a.basePrice - b.basePrice : b.basePrice - a.basePrice;
    });

    // Generate and render sorted product cards
    let productCards = sortedProducts.map(product => GenerateCards(product));
    let resolvedCards = await Promise.all(productCards);
    getdiv.innerHTML = resolvedCards.join("");
}
