// Enhanced JavaScript for Solar Hub Website

// Global variables
let cart = [];
let products = [
    {
        id: 1,
        name: "Beautiful Gift Box",
        price: 599,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop",
        description: "Elegant gift box with premium packaging"
    },
    {
        id: 2,
        name: "Chocolate Bouquet",
        price: 899,
        image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop",
        description: "Delicious chocolate arrangement"
    },
    {
        id: 3,
        name: "Teddy Bear",
        price: 499,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        description: "Soft and cuddly teddy bear"
    },
    {
        id: 4,
        name: "Flower Bouquet",
        price: 799,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
        description: "Fresh and beautiful flower arrangement"
    },
    {
        id: 5,
        name: "Jewelry Box",
        price: 1299,
        image: "https://images.unsplash.com/photo-1515562141207-7d88a7be3f6a?w=400&h=300&fit=crop",
        description: "Elegant jewelry storage box"
    },
    {
        id: 6,
        name: "Cake",
        price: 699,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        description: "Delicious homemade cake"
    },
    {
        id: 7,
        name: "Perfume Set",
        price: 1599,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
        description: "Luxury perfume collection"
    },
    {
        id: 8,
        name: "Photo Frame",
        price: 399,
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
        description: "Beautiful photo frame for memories"
    }
];

// DOM elements
const loginModal = document.getElementById('loginModal');
const mainWebsite = document.getElementById('mainWebsite');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const orderSuccessModal = document.getElementById('orderSuccessModal');
const closeSuccess = document.getElementById('closeSuccess');
const productsGrid = document.getElementById('productsGrid');

// Show login modal on page load
document.addEventListener('DOMContentLoaded', function() {
    loginModal.style.display = 'block';
    loadProducts();
});

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userName = document.getElementById('userName').value.trim();
    const userNumber = document.getElementById('userNumber').value.trim();
    
    // Validation
    if (!userName || !userNumber) {
        showLoginMessage('Please enter both name and phone number!', 'error');
        return;
    }
    
    if (userName.length < 2) {
        showLoginMessage('Name must be at least 2 characters long!', 'error');
        return;
    }
    
    if (userNumber.length < 10) {
        showLoginMessage('Please enter a valid phone number!', 'error');
        return;
    }
    
    // Success login
    showLoginMessage('Login successful! Welcome to SP Shop!', 'success');
    
    // Hide login modal and show main website after 2 seconds
    setTimeout(() => {
        loginModal.style.display = 'none';
        mainWebsite.classList.remove('hidden');
        showWelcomeMessage();
    }, 2000);
});

// Show login message
function showLoginMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = `login-message ${type}`;
    loginMessage.style.display = 'block';
}

// Show welcome message
function showWelcomeMessage() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        z-index: 2000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: welcomeSlideIn 0.5s ease-out;
    `;
    welcomeDiv.innerHTML = `
        <div style="margin-bottom: 20px;">
            <i class="fas fa-gift" style="font-size: 3rem; color: #ffd700;"></i>
        </div>
        <div>Welcome to SP Shop!</div>
        <div style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">
            Come back next year for Rakshabandhan!
        </div>
    `;
    
    document.body.appendChild(welcomeDiv);
    
    // Remove welcome message after 4 seconds
    setTimeout(() => {
        welcomeDiv.remove();
    }, 4000);
}

// Load products
function loadProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartMessage('Item added to cart successfully!');
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show cart message
function showCartMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Open cart modal
cartBtn.addEventListener('click', function() {
    displayCart();
    cartModal.style.display = 'block';
});

// Close cart modal
closeCart.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === orderSuccessModal) {
        orderSuccessModal.style.display = 'none';
    }
});

// Display cart items
function displayCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            displayCart();
            updateCartCount();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
    updateCartCount();
}

// Place order
placeOrderBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Show success modal
    orderSuccessModal.style.display = 'block';
    
    // Clear cart
    cart = [];
    updateCartCount();
    displayCart();
    
    // Close cart modal
    cartModal.style.display = 'none';
});

// Close success modal
closeSuccess.addEventListener('click', function() {
    orderSuccessModal.style.display = 'none';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes welcomeSlideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
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

// Add loading animation for products
function addLoadingAnimation() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize loading animation
setTimeout(addLoadingAnimation, 100);

// Add hover effects for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Add scroll effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cartModal.style.display = 'none';
        orderSuccessModal.style.display = 'none';
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll handling code here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);