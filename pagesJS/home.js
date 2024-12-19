var userName = document.getElementById("userName");
var logoutButton = document.getElementById("logoutButton");

// استرجاع اسم المستخدم من localStorage
var username = localStorage.getItem('username');

if (username) {
    userName.textContent = username; 
} else {
    
    window.location.href = "../pagesHTML/login.html";
}


logoutButton.addEventListener("click", function () {

    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    
    
    window.location.href = "../pagesHTML/login.html";
});


// slider 

const arr = ['../images/IMG.jpg','../images/img3.avif','../images/pic3.avif','../images/pic10.avif','../images/image1.jpg'];
let currentIndex = 0;
let count;
let image = document.getElementById("slider-img");

function next() {
    currentIndex = (currentIndex + 1) % arr.length;
    image.src = arr[currentIndex];
}

function prev() {
    currentIndex = (((currentIndex - 1) % arr.length) + arr.length) % arr.length;
    image.src = arr[currentIndex];
}

function play() {
    count = setInterval(function () {
        currentIndex = (currentIndex + 1) % arr.length;
        image.src = arr[currentIndex];
    }, 2000);
}

play();

function stop() {
    clearInterval(count);
}

// products API
const apiUrl = "https://fakestoreapi.com/products";

let card = [];
function updateCardCount() {
    const CardCountElement = document.getElementById("card-count");
    CardCountElement.textContent = card.length;
}

function addToCard(product) {
    const productExist = card.find(item => item.id === product.id);
    if (!productExist) {
        product.cutomcount = 1;
         
        card.push(product);
        
        localStorage.setItem("card", JSON.stringify(card));
        updateCardCount();
        console.log(`${product.title} added to cart`);
    } else {
       // product.cutomcount++
        console.log(`${product.title} is already in the cart`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const storedCart = localStorage.getItem("card");
    if (storedCart) {
        card = JSON.parse(storedCart);
        updateCardCount();
    }

    const productsContainer = document.getElementById("products-container");
    const buttons = document.querySelectorAll('.buttons button');
let products;
    async function fetchProducts(url) {
        try {
            const response = await fetch(url);
             products = await response.json();
            console.log(products);
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    }

    function displayProducts(products) {
        productsContainer.innerHTML = ' ';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price}$</p>
                <div class="card-buttons">
                    <button class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
                    <button class="view-details"><i class="fa-solid fa-eye"></i></button>
                </div>
            `;

            const addToCardButton = productCard.querySelector('.add-to-cart');
            addToCardButton.addEventListener("click", () => {
                addToCard(product);
            });

            const viewDetailsButton = productCard.querySelector(".view-details");
            viewDetailsButton.addEventListener("click", () => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "detailsProduct.html"; // الانتقال لصفحة التفاصيل
            });

            productsContainer.appendChild(productCard);
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.id;
            if (category == "all_Products") {
                fetchProducts(apiUrl);
            } else {
                fetchProducts(`${apiUrl}/category/${category}`);
            }
        });
    });

    fetchProducts(apiUrl);
});

document.addEventListener("DOMContentLoaded", () => {
    const productData = localStorage.getItem("selectedProduct");

    if (productData) {
        const product = JSON.parse(productData);
        displayProductDetails(product);

        const buy = document.getElementById("buy");
        buy.addEventListener("click", () => {
            addToCard(product);
            window.location="../pagesHTML/home.html";
        });
    } else {
        console.error("No product selected!");
        document.getElementById("product-details").innerHTML = "<p>No product details found!</p>";
    }
});

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById("product-details");

    if (!productDetailsDiv) {
        console.error("Element with ID 'product-details' not found!");
        return;
    }

    productDetailsDiv.innerHTML = `
        <div class="card-details"> 
        <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="child">        
                <h2>Name: ${product.title}</h2>
                <p class="Price">Price: ${product.price}</p>
                <p class="category">Category: ${product.category}</p>
                <p class="description">Description: ${product.description}</p>
                  
        </div>
        <button id="buy">Add to Card</button>
          
       
    `;
}

   