let productName = document.querySelector("#productName");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let productCategory = document.querySelector("#productCategory");
let searchInput = document.querySelector("#searchInput");
let createProduct = document.querySelector("#createProduct");
let searchByName = document.querySelector("#searchByName");
let searchByCategory = document.querySelector("#searchByCategory");
let deleteAll = document.querySelector("#deleteAll");
let updateProduct = document.querySelector("#updateProduct");
let updateBtn = document.querySelector("#updateBtn");
let dataList = [];
let tmp;

let myMOdal = new bootstrap.Modal(document.getElementById("exampleModal"));

/////////////////////// Button Create Product
createProduct.addEventListener("click", function () {
    getProduct();
});

/////////////////////// Check if product is already In Local Storage
if (localStorage.getItem("addProduct") !== null) {
    dataList = JSON.parse(localStorage.getItem("addProduct"));
    displayData(dataList);
}

/////////////////////// Get Total Price After Discount
function getTotal() {
    let total = 0;
    let productPrice = price.value ? parseFloat(price.value) : 0;
    let productTaxes = taxes.value ? parseFloat(taxes.value) : 0;
    let productAds = ads.value ? parseFloat(ads.value) : 0;
    let productDiscount = discount.value ? parseFloat(discount.value) : 0;

    total = productPrice + productTaxes + productAds - productDiscount;
    return total;
}

/////////////////////// Get Products Value
function getProduct() {
    if (checkInputs() == true) {
        let total = getTotal();
        let product = {
            name: productName.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            category: productCategory.value,
            total: total,
        };
        dataList.push(product);
        displayData(dataList);
        localStorage.setItem("addProduct", JSON.stringify(dataList));
        clearData();
    } else {
        myMOdal.show();
    }
}

/////////////////////// Show The Products List
function displayData(list) {
    let cartona = "";
    for (let i = 0; i < list.length; i++) {
        cartona += `    <tr>
                        <td>${[i + 1]}</td>
                        <td>${list[i].name}</td>
                        <td>${list[i].price}</td>
                        <td>${list[i].taxes}</td>
                        <td>${list[i].ads}</td>
                        <td>${list[i].discount}</td>
                        <td id="total">${list[i].total}</td>
                        <td>${list[i].category}</td>
                        <td><button id="updateBtn" onclick="updateData(${i})" class="update btn btn-info">Update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete btn btn-danger">Delete</button></td>
                        </tr>
        `;
    }
    document.querySelector("#productList").innerHTML = cartona;
}

/////////////////////// After Fill Up the Product Clear the Input
function clearData() {
    productName.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    productCategory.value = "";
    searchInput.value = "";
}

/////////////////////// Delete One Product
function deleteData(index) {
    dataList.splice(index, 1);
    displayData(dataList);
    localStorage.setItem("addProduct", JSON.stringify(dataList));
}

/////////////////////// When a click on Update Button
function updateData(index) {
    tmp = index;
    createProduct.classList.add("d-none");
    updateProduct.classList.remove("d-none");
    productName.value = dataList[index].name;
    price.value = dataList[index].price;
    taxes.value = dataList[index].taxes;
    ads.value = dataList[index].ads;
    discount.value = dataList[index].discount;
    productCategory.value = dataList[index].category;
    getTotal();
}

/////////////////////// Update Data After Update
function updateDataSubmit() {
    updateProduct.classList.add("d-none");
    createProduct.classList.remove("d-none");
    dataList[tmp] = {
        name: productName.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        category: productCategory.value,
        total: getTotal(),
    };
    displayData(dataList);
    localStorage.setItem("addProduct", JSON.stringify(dataList));
    clearData();
}

/////////////////////// Update Data in Product Button
if (updateProduct) {
    updateProduct.addEventListener("click", function () {
        updateDataSubmit();
    });
}

/////////////////////// Delete All Products
deleteAll.addEventListener("click", function () {
    dataList = [];
    displayData(dataList);
    localStorage.clear();
});

/////////////////////// Check Input Is Not existing
function checkInputs() {
    if (
        productName.value == "" ||
        price.value == "" ||
        taxes.value == "" ||
        ads.value == "" ||
        discount.value == "" ||
        productCategory.value == ""
    ) {
        return false;
    } else {
        return true;
    }
}

/////////////////////// Search Inputs By Name
searchByName.addEventListener("click", function () {
    searchInput.placeholder = "Search By Name";
    searchInput.focus();
    searchInput.addEventListener("keyup", function () {
        let cartona = "";
        for (let i = 0; i < dataList.length; i++) {
            if (
                dataList[i].name
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            ) {
                cartona += `    <tr>
                <td>${[i + 1]}</td>
                <td>${dataList[i].name}</td>
                <td>${dataList[i].price}</td>
                <td>${dataList[i].taxes}</td>
                <td>${dataList[i].ads}</td>
                <td>${dataList[i].discount}</td>
                <td id="total">${dataList[i].total}</td>
                <td>${dataList[i].category}</td>
                <td><button id="updateBtn" onclick="updateData(${i})" class="update btn btn-info">Update</button></td>
                <td><button onclick="deleteData(${i})" class="delete btn btn-danger">Delete</button></td>
                </tr>`;
            }
            document.querySelector("#productList").innerHTML = cartona;
        }
    });
});

/////////////////////// Search Inputs By Category
searchByCategory.addEventListener("click", function () {
    searchInput.placeholder = "Search By Category";
    searchInput.focus();
    searchInput.addEventListener("keyup", function () {
        let cartona = "";
        for (let i = 0; i < dataList.length; i++) {
            if (
                dataList[i].category
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            ) {
                cartona += `    <tr>
                <td>${[i + 1]}</td>
                <td>${dataList[i].name}</td>
                <td>${dataList[i].price}</td>
                <td>${dataList[i].taxes}</td>
                <td>${dataList[i].ads}</td>
                <td>${dataList[i].discount}</td>
                <td id="total">${dataList[i].total}</td>
                <td>${dataList[i].category}</td>
                <td><button id="updateBtn" onclick="updateData(${i})" class="update btn btn-info">Update</button></td>
                <td><button onclick="deleteData(${i})" class="delete btn btn-danger">Delete</button></td>
                </tr>`;
            }
            document.querySelector("#productList").innerHTML = cartona;
        }
    });
});

/////////////////////// Search Inputs
(function search() {
    searchInput.addEventListener("keyup", function () {
        let cartona = "";
        for (let i = 0; i < dataList.length; i++) {
            if (
                dataList[i].name
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase())
            ) {
                cartona += `    <tr>
                <td>${[i + 1]}</td>
                <td>${dataList[i].name}</td>
                <td>${dataList[i].price}</td>
                <td>${dataList[i].taxes}</td>
                <td>${dataList[i].ads}</td>
                <td>${dataList[i].discount}</td>
                <td id="total">${dataList[i].total}</td>
                <td>${dataList[i].category}</td>
                <td><button id="updateBtn" onclick="updateData(${i})" class="update btn btn-info">Update</button></td>
                <td><button onclick="deleteData(${i})" class="delete btn btn-danger">Delete</button></td>
                </tr>`;
            }
            document.querySelector("#productList").innerHTML = cartona;
        }
    });
})();
