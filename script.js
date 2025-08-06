// Enhanced JavaScript for Solar Hub Website

// Global variables
let currentUser = null;
let cart = [];
let products = [];

// Gift products data with stock images
const giftProducts = [
    {
        id: 1,
        name: "Beautiful Jewelry Set",
        price: 2999,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        description: "Elegant jewelry set perfect for Sanchita Didi"
    },
    {
        id: 2,
        name: "Handcrafted Silk Saree",
        price: 4999,
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=400&h=400&fit=crop",
        description: "Premium silk saree with beautiful patterns"
    },
    {
        id: 3,
        name: "Artisan Handbag",
        price: 1999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        description: "Handcrafted leather handbag"
    },
    {
        id: 4,
        name: "Crystal Perfume Set",
        price: 1499,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
        description: "Luxurious perfume collection"
    },
    {
        id: 5,
        name: "Traditional Bangles",
        price: 899,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e0?w=400&h=400&fit=crop",
        description: "Beautiful traditional bangles set"
    },
    {
        id: 6,
        name: "Decorative Photo Frame",
        price: 699,
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
        description: "Elegant photo frame for memories"
    },
    {
        id: 7,
        name: "Scented Candle Set",
        price: 1299,
        image: "https://images.unsplash.com/photo-1602874801006-926cfe1ea2a1?w=400&h=400&fit=crop",
        description: "Aromatherapy candles for relaxation"
    },
    {
        id: 8,
        name: "Chocolate Gift Box",
        price: 999,
        image: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&h=400&fit=crop",
        description: "Premium chocolate assortment"
    },
    {
        id: 9,
        name: "Flower Vase Set",
        price: 1799,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        description: "Beautiful ceramic vase collection"
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    products = [...giftProducts];
    setupEventListeners();
    loadProducts();
});

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Close success messages when clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.success-message')) {
            hideSuccessMessage();
        }
    });
}

// Handle login validation
function handleLogin(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value.trim();
    const userPhone = document.getElementById('userPhone').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear any existing error message
    errorMessage.classList.add('hidden');
    
    // Validate both fields are filled
    if (!userName || !userPhone) {
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Basic phone number validation (must contain numbers)
    if (!/\d/.test(userPhone)) {
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Success - login user
    currentUser = {
        name: userName,
        phone: userPhone
    };
    
    // Switch to shop page
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('shopPage').classList.add('active');
    
    // Update welcome message
    document.getElementById('welcomeUser').textContent = `Welcome, ${userName}! 🎉`;
}

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showSuccessMessage('Item Added to Cart Successfully!', 'Keep shopping for more amazing gifts!');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} x ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    
    // Add overlay for mobile
    if (window.innerWidth <= 768) {
        let overlay = document.querySelector('.cart-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'cart-overlay';
            overlay.onclick = toggleCart;
            document.body.appendChild(overlay);
        }
        overlay.classList.toggle('active');
    }
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    
    // Close cart
    toggleCart();
    
    // Show success message
    showOrderSuccess();
}

// Show success message
function showSuccessMessage(title, message) {
    const successDiv = document.getElementById('successMessage');
    const titleElement = successDiv.querySelector('h3');
    const messageElement = successDiv.querySelector('p');
    
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    successDiv.classList.remove('hidden');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        successDiv.classList.add('hidden');
    }, 3000);
}

// Show order success
function showOrderSuccess() {
    const orderSuccess = document.getElementById('orderSuccess');
    orderSuccess.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        orderSuccess.classList.add('hidden');
    }, 5000);
}

// Hide success message
function hideSuccessMessage() {
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('orderSuccess').classList.add('hidden');
}

// Handle responsive behavior
window.addEventListener('resize', function() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (window.innerWidth > 768 && overlay) {
        overlay.classList.remove('active');
    }
});

// Add some fun animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add floating animation to creative images
    const creativeImages = document.querySelectorAll('.creative-img');
    creativeImages.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.5}s`;
        img.classList.add('floating');
    });
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .product-card {
            animation: slideInUp 0.6s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Add some Easter eggs and fun interactions
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('creative-img')) {
        clickCount++;
        if (clickCount === 5) {
            alert('🎉 You found the secret! Sanchita Didi will love this surprise! 🎉');
            clickCount = 0;
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'C' to toggle cart
    if (e.key.toLowerCase() === 'c' && !e.target.matches('input')) {
        toggleCart();
    }
    
    // Press 'Escape' to close cart
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Add welcome message with current time
function addTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Welcome to SP Shop';
    
    if (hour < 12) {
        greeting = '🌅 Good Morning! Welcome to SP Shop';
    } else if (hour < 17) {
        greeting = '☀️ Good Afternoon! Welcome to SP Shop';
    } else {
        greeting = '🌙 Good Evening! Welcome to SP Shop';
    }
    
    const shopTitle = document.querySelector('.shop-title');
    if (shopTitle) {
        shopTitle.innerHTML = greeting;
    }
}

// Initialize time-based greeting
document.addEventListener('DOMContentLoaded', addTimeBasedGreeting);