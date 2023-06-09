"use strict";

const productSelectorEl = document.getElementById('productSelector')
const productDisplay = document.getElementById('productDisplay')
const productTable = document.getElementById('productTable')
const tbody = document.querySelector('#productTable tbody');


// async function fetchUrl(url) {
//     const response = await fetch(url)
//     const data = await response.json()

//     return data
// }

// // fetch("http://localhost:8081/api/categories").then(response => response.json()).then(data => {

// // })

// async function productOptions() {

// const urlPromise = await fetchUrl("http://localhost:8081/api/categories");

// const data = await urlPromise.json()

//     data.forEach((category) => {
//     const productDropdown = new Option(category.name, category.categoryId);
//     productSelectorEl.appendChild(productDropdown);
//     })

// };

// productSelectorEl.addEventListener('change', () => {

//     const selectedCategory = productSelectorEl.value;

//     console.log(selectedCategory)

//     // const productCategory = data.filter((category) => category.categoryId === selectedCategory)
//     // console.log(productCategory);

// })

fetch('http://localhost:8081/api/categories').then(response => response.json()).then(data => {
    data.forEach((category) => {
    const productDropdown = new Option(category.name, category.categoryId);
    productSelectorEl.appendChild(productDropdown);
    })

    productSelectorEl.addEventListener('change', () => {
        const selectedCategory = productSelectorEl.value;
        
        if (selectedCategory === 'all') {
            fetch('http://localhost:8081/api/products').then(response => response.json()).then(products => {
                products.forEach((product) => {
                    buildProductDisplay(tbody,product)
                })
            })
        }

    })
})

function buildProductDisplay(table,item) {
    const row = table.insertRow()

    const nameCell = row.insertCell();
    nameCell.innerHTML = item.productName;

    const priceCell = row.insertCell();
    priceCell.innerHTML = `$${item.unitPrice}`;

    const supplierCell = row.insertCell();
    supplierCell.innerHTML = item.supplier;

    const productView = row.insertCell();
    productView.innerHTML = `<a href="./product-details.html?productid=${item.productId}" class="btn btn-primary">View Product</a>`
}

// https://stackoverflow.com/questions/73672814/dynamic-bootstrap-cards-with-javascript