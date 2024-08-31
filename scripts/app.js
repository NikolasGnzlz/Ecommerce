// URL de la API
const apiUrl = 'https://fakestoreapi.com/products';

// Elementos del DOM
const productList = document.getElementById('product-list');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
const modalBody = document.querySelector('.modal-body');
const addToCartBtn = document.getElementById('add-to-cart-btn');

// Función para listar los productos
async function listProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4');
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary" onclick="showProductDetails(${product.id})">Ver Detalles</button>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al listar los productos:', error);
    }
}

// Función para mostrar detalles del producto
async function showProductDetails(productId) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`);
        const product = await response.json();

        modalBody.innerHTML = `
            <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
            <h5>${product.title}</h5>
            <p>$${product.price}</p>
            <p>${product.description}</p>
        `;

        addToCartBtn.onclick = () => addToCart(product);
        productModal.show();
    } catch (error) {
        console.error('Error al mostrar detalles del producto:', error);
    }
}

// Función para agregar el producto al carrito
function addToCart(product) {
    // Aquí puedes implementar la lógica para agregar el producto al localstorage
    productModal.hide();
    alert(`El producto "${product.title}" ha sido agregado al carrito.`);
}

// Llama a la función para listar los productos al cargar la página
document.addEventListener('DOMContentLoaded', listProducts);

//Actualizar el contador del carrito cada vez que se agregue un producto
let cart = [];

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    productModal.hide();
    alert(`El producto "${product.title}" ha sido agregado al carrito.`);
}


//Implementa la lógica para abrir el modal y mostrar los productos en el carrito

const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const cartItemsList = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

document.getElementById('cart-icon').addEventListener('click', () => {
    showCartItems();
    cartModal.show();
});

function showCartItems() {
    cartItemsList.innerHTML = '';

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <img src="${item.image}" alt="${item.title}" width="50" class="me-3">
                    <span>${item.title}</span>
                </div>
                <span>$${item.price}</span>
            </div>
        `;
        cartItemsList.appendChild(listItem);
    });
}


//Eliminar Productos del Carrito

clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartCount();
    showCartItems();
    alert('Todos los productos han sido eliminados del carrito.');
});


//Finalizar la Compra

checkoutBtn.addEventListener('click', () => {
    cart = [];
    updateCartCount();
    showCartItems();
    alert('Gracias por su compra. Su carrito ha sido vaciado.');
    cartModal.hide();
});

//Manejo del Local Storage

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Después de agregar un producto:
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    updateCartCount();
    saveCartToLocalStorage();
    alert(`El producto "${product.title}" ha sido agregado al carrito.`);
}

//Después de cambiar la cantidad

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCartCount();
    saveCartToLocalStorage();
    showCartItems();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCartCount();
        saveCartToLocalStorage();
        showCartItems();
    }
}


//Después de eliminar un producto

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCartToLocalStorage();
    showCartItems();
}

//Después de limpiar el carrito

clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartCount();
    saveCartToLocalStorage();
    showCartItems();
    alert('Todos los productos han sido eliminados del carrito.');
});

checkoutBtn.addEventListener('click', () => {
    cart = [];
    updateCartCount();
    saveCartToLocalStorage();
    showCartItems();
    alert('Gracias por su compra. Su carrito ha sido vaciado.');
    cartModal.hide();
});


// Cargar el Carrito desde Local Storage
//Esta función para cargar el carrito al inicio
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
        showCartItems();
    }
}

//Llama a esta función cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
});

