// ============================================
// STATE MANAGEMENT
// ============================================

const appState = {
    currentStep:      1,
    orderType:        null,
    cartItems:        [],
    totalPrice:       0,
    selectedCategory: 'paket-nasi',
    paymentMethod:    'qris',
    queueNumber:      null
};

// ============================================
// MENU DATA
// ============================================

const menuData = {
    'paket-nasi': [
        { id: 'p1', name: 'Paket Rendang',       price: 35000, image: '🍛', category: 'paket-nasi' },
        { id: 'p2', name: 'Paket Ayam Pop',      price: 32000, image: '🍗', category: 'paket-nasi' },
        { id: 'p3', name: 'Paket Gulai Ikan',    price: 30000, image: '🐟', category: 'paket-nasi' },
        { id: 'p4', name: 'Paket Dendeng Balado', price: 38000, image: '🥩', category: 'paket-nasi' },
        { id: 'p5', name: 'Paket Ayam Goreng',   price: 28000, image: '🍗', category: 'paket-nasi' },
        { id: 'p6', name: 'Paket Ikan Bakar',    price: 33000, image: '🐟', category: 'paket-nasi' }
    ],
    'lauk-pauk': [
        { id: 'l1', name: 'Rendang Daging',      price: 25000, image: '🥩', category: 'lauk-pauk'  },
        { id: 'l2', name: 'Ayam Pop',            price: 22000, image: '🍗', category: 'lauk-pauk'  },
        { id: 'l3', name: 'Gulai Ikan',          price: 20000, image: '🐟', category: 'lauk-pauk'  },
        { id: 'l4', name: 'Dendeng Balado',      price: 28000, image: '🥩', category: 'lauk-pauk'  },
        { id: 'l5', name: 'Telur Balado',        price: 8000,  image: '🥚', category: 'lauk-pauk'  },
        { id: 'l6', name: 'Perkedel',            price: 5000,  image: '🥔', category: 'lauk-pauk'  },
        { id: 'l7', name: 'Sambal Ijo',          price: 3000,  image: '🌶️', category: 'lauk-pauk'  },
        { id: 'l8', name: 'Sayur Nangka',        price: 10000, image: '🥗', category: 'lauk-pauk'  }
    ],
    'minuman': [
        { id: 'm1', name: 'Es Teh Manis',        price: 5000,  image: '🧋', category: 'minuman'    },
        { id: 'm2', name: 'Es Jeruk',            price: 8000,  image: '🍊', category: 'minuman'    },
        { id: 'm3', name: 'Teh Panas',           price: 3000,  image: '☕', category: 'minuman'    },
        { id: 'm4', name: 'Kopi Hitam',          price: 5000,  image: '☕', category: 'minuman'    },
        { id: 'm5', name: 'Air Mineral',         price: 3000,  image: '💧', category: 'minuman'    },
        { id: 'm6', name: 'Es Kelapa Muda',      price: 12000, image: '🥥', category: 'minuman'    }
    ],
    'dessert': [
        { id: 'd1', name: 'Es Campur',           price: 15000, image: '🍧', category: 'dessert'    },
        { id: 'd2', name: 'Es Teler',            price: 18000, image: '🍨', category: 'dessert'    },
        { id: 'd3', name: 'Kolak Pisang',        price: 12000, image: '🍌', category: 'dessert'    },
        { id: 'd4', name: 'Bubur Kacang Hijau',  price: 10000, image: '🥣', category: 'dessert'    },
        { id: 'd5', name: 'Pisang Goreng',       price: 8000,  image: '🍌', category: 'dessert'    }
    ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatIDR(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function generateQueueNumber() {
    const letters = 'ABCDEFGH';
    const letter  = letters[Math.floor(Math.random() * letters.length)];
    const number  = String(Math.floor(Math.random() * 900) + 100);
    return `${letter}-${number}`;
}

function calculateTotal() {
    appState.totalPrice = appState.cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
}

function resetState() {
    appState.currentStep      = 1;
    appState.orderType        = null;
    appState.cartItems        = [];
    appState.totalPrice       = 0;
    appState.selectedCategory = 'paket-nasi';
    appState.paymentMethod    = 'qris';
    appState.queueNumber      = null;
}

// ============================================
// SCREEN SWITCHER
// ============================================

function renderStep(stepNumber) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen-section');
    screens.forEach(screen => {
        screen.classList.remove('active', 'animate__animated', 'animate__fadeIn');
    });

    // Show target screen with animation
    const targetScreen = document.querySelectorAll('.screen-section')[stepNumber - 1];
    if (targetScreen) {
        targetScreen.classList.add('active', 'animate__animated', 'animate__fadeIn');
        appState.currentStep = stepNumber;
    }
}

// ============================================
// CART MANAGEMENT
// ============================================

function addToCart(product) {
    const existingItem = appState.cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cartItems.push({
            id:       product.id,
            name:     product.name,
            price:    product.price,
            quantity: 1,
            image:    product.image
        });
    }

    calculateTotal();
    updateCartDisplay();
}

function updateQuantity(productId, delta) {
    const item = appState.cartItems.find(item => item.id === productId);

    if (item) {
        item.quantity += delta;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            calculateTotal();
            updateCartDisplay();
            renderCheckoutItems();
        }
    }
}

function removeFromCart(productId) {
    appState.cartItems = appState.cartItems.filter(item => item.id !== productId);
    calculateTotal();
    updateCartDisplay();
    renderCheckoutItems();
}

function updateCartDisplay() {
    const totalItems = appState.cartItems.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('cart-total').textContent = formatIDR(appState.totalPrice);

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = totalItems > 0 ? false : true;
}

// ============================================
// MENU RENDERING
// ============================================

function renderMenuItems(category) {
    const menuGrid = document.getElementById('menu-grid');
    const items    = menuData[category] || [];

    menuGrid.innerHTML = items.map(item => `
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105">
            <div class="text-8xl text-center py-8 bg-gray-50">
                ${item.image}
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
                <p class="text-2xl font-bold sederhana-red-text mb-4">${formatIDR(item.price)}</p>
                <button onclick='addToCart(${JSON.stringify(item)})' class="w-full sederhana-red text-white py-3 rounded-full font-bold hover:bg-red-700 transition">
                    Tambah
                </button>
            </div>
        </div>
    `).join('');
}

function selectCategory(category) {
    appState.selectedCategory = category;
    renderMenuItems(category);

    // Update active state
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('sederhana-red', 'text-white');
            btn.classList.remove('hover:bg-gray-100');
        } else {
            btn.classList.remove('sederhana-red', 'text-white');
            btn.classList.add('hover:bg-gray-100');
        }
    });
}

// ============================================
// CHECKOUT RENDERING
// ============================================

function renderCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');

    if (appState.cartItems.length === 0) {
        checkoutItems.innerHTML = '<p class="text-center text-gray-500 text-xl">Keranjang kosong</p>';
        document.getElementById('checkout-total').textContent = formatIDR(0);
        return;
    }

    checkoutItems.innerHTML = appState.cartItems.map(item => `
        <div class="flex items-center justify-between bg-gray-50 rounded-xl p-6">
            <div class="flex items-center space-x-4 flex-1">
                <div class="text-5xl">${item.image}</div>
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
                    <p class="text-lg sederhana-red-text font-semibold">${formatIDR(item.price)}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <button onclick="updateQuantity('${item.id}', -1)" class="w-12 h-12 bg-gray-300 hover:bg-gray-400 rounded-full text-2xl font-bold transition">
                    −
                </button>
                <span class="text-2xl font-bold w-12 text-center">${item.quantity}</span>
                <button onclick="updateQuantity('${item.id}', 1)" class="w-12 h-12 sederhana-red hover:bg-red-700 text-white rounded-full text-2xl font-bold transition">
                    +
                </button>
            </div>
            <div class="ml-8 text-right">
                <p class="text-2xl font-bold sederhana-red-text">${formatIDR(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');

    document.getElementById('checkout-total').textContent = formatIDR(appState.totalPrice);
}

// ============================================
// PAYMENT HANDLING
// ============================================

function selectPayment(method) {
    appState.paymentMethod = method;

    // Update UI
    document.querySelectorAll('.payment-option').forEach(option => {
        if (option.dataset.payment === method) {
            option.classList.add('border-sederhana-red', 'bg-red-50');
            option.classList.remove('border-gray-200');
        } else {
            option.classList.remove('border-sederhana-red', 'bg-red-50');
            option.classList.add('border-gray-200');
        }
    });

    // Show/hide QRIS display
    const qrisDisplay = document.getElementById('qris-display');
    method === 'qris' ? qrisDisplay.classList.remove('hidden') : qrisDisplay.classList.add('hidden');
}

function confirmPayment() {
    // Show loading state
    document.getElementById('confirm-text').classList.add('hidden');
    document.getElementById('loading-text').classList.remove('hidden');

    // Simulate payment processing
    setTimeout(() => {
        appState.queueNumber = generateQueueNumber();
        document.getElementById('queue-number').textContent = appState.queueNumber;

        // Reset loading state
        document.getElementById('confirm-text').classList.remove('hidden');
        document.getElementById('loading-text').classList.add('hidden');

        renderStep(6);
    }, 2000);
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function startOrder() {
    renderStep(2);
}

function selectFulfillment(type) {
    appState.orderType = type;
    renderStep(3);
    selectCategory('paket-nasi'); 
}

function goToCheckout() {
    if (appState.cartItems.length > 0) {
        renderCheckoutItems();
        renderStep(4);
    }
}

function goToPayment() {
    selectPayment('qris'); 
    renderStep(5);
}

function finishOrder() {
    resetState();
    updateCartDisplay();
    renderStep(1);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Set initial category active state
    selectCategory('paket-nasi');

    // Initialize cart display
    updateCartDisplay();
});