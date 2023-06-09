const productDetailsDiv = document.getElementById('productDetails')
const productImage = document.getElementById('productImage')

fetch('http://localhost:8081/api/products').then(response => response.json()).then(data => {
    const urlParams = new URLSearchParams(location.search);

    data.forEach((product) => {
        let id = -1;
        if(urlParams.has("productid") === true) {
            id = urlParams.get("productid");

            if(id === product.productId) {
                buildCardDisplay(productDetailsDiv, product)
            }
        }
    })
})

function buildCardDisplay(display, item) {
    const content = `
    <div class="card">
    <img src="https://loremflickr.com/400/400/groceries,food?lock=${item.productId}" class="card-img-top">
    <div class="card-header">
    <h5 class="card-title">${item.productName}</h5>
    
    </div>

    <div class="card-body py-2">
    <p style="font-size: 20px">$${item.unitPrice}</p>
    <p> Supplier: ${item.supplier}</p>
    <p> Units in Stock: ${item.unitsInStock}</p>
    <p>
    </div>
    </div>
    
    `
    display.innerHTML += content
}