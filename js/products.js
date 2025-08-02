// Products JavaScript for ShopEase

// Sample product data (in a real app, this would come from an API)
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: 99.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop&crop=center",
        rating: 4.5,
        reviews: 128,
        description: "High-quality wireless Bluetooth headphones with noise cancellation and 30-hour battery life.",
        specifications: {
            "Battery Life": "30 hours",
            "Connectivity": "Bluetooth 5.0",
            "Weight": "250g",
            "Color": "Black"
        },
        inStock: true,
        sizes: null
    },
    {
        id: 2,
        name: "Premium Cotton T-Shirt",
        price: 24.99,
        originalPrice: 34.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=250&fit=crop&crop=center",
        rating: 4.2,
        reviews: 89,
        description: "Comfortable premium cotton t-shirt available in multiple sizes and colors.",
        specifications: {
            "Material": "100% Cotton",
            "Fit": "Regular",
            "Care": "Machine Washable",
            "Origin": "Made in USA"
        },
        inStock: true,
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "JavaScript: The Complete Guide",
        price: 39.99,
        originalPrice: 49.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=250&fit=crop&crop=center",
        rating: 4.8,
        reviews: 245,
        description: "Comprehensive guide to JavaScript programming from beginner to advanced level.",
        specifications: {
            "Pages": "850",
            "Publisher": "Tech Books",
            "Language": "English",
            "Edition": "2024"
        },
        inStock: true,
        sizes: null
    },
    {
        id: 4,
        name: "Smart LED Light Bulb",
        price: 19.99,
        originalPrice: 29.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=250&fit=crop&crop=center",
        rating: 4.3,
        reviews: 67,
        description: "Smart WiFi-enabled LED light bulb with color changing and dimming features.",
        specifications: {
            "Wattage": "9W",
            "Brightness": "800 lumens",
            "Connectivity": "WiFi",
            "Lifespan": "25,000 hours"
        },
        inStock: true,
        sizes: null
    },
    {
        id: 5,
        name: "Gaming Mechanical Keyboard",
        price: 129.99,
        originalPrice: 159.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=250&fit=crop&crop=center",
        rating: 4.6,
        reviews: 156,
        description: "RGB mechanical gaming keyboard with customizable keys and macro support.",
        specifications: {
            "Switch Type": "Cherry MX Blue",
            "Backlight": "RGB",
            "Connectivity": "USB-C",
            "Layout": "Full Size"
        },
        inStock: true,
        sizes: null
    },
    {
        id: 6,
        name: "Denim Jeans",
        price: 59.99,
        originalPrice: 79.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=250&fit=crop&crop=center",
        rating: 4.1,
        reviews: 92,
        description: "Classic fit denim jeans made from premium quality denim fabric.",
        specifications: {
            "Material": "98% Cotton, 2% Elastane",
            "Fit": "Regular",
            "Wash": "Dark Blue",
            "Origin": "Made in Turkey"
        },
        inStock: true,
        sizes: ["28", "30", "32", "34", "36"]
    },
    {
        id: 7,
        name: "Python Programming Cookbook",
        price: 44.99,
        originalPrice: 54.99,
        category: "books",
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=250&fit=crop&crop=center",
        rating: 4.7,
        reviews: 189,
        description: "Practical Python programming recipes and solutions for real-world problems.",
        specifications: {
            "Pages": "720",
            "Publisher": "Code Press",
            "Language": "English",
            "Edition": "3rd Edition"
        },
        inStock: true,
        sizes: null
    },
    {
        id: 8,
        name: "Indoor Plant Pot Set",
        price: 34.99,
        originalPrice: 44.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=250&fit=crop&crop=center",
        rating: 4.4,
        reviews: 73,
        description: "Set of 3 ceramic plant pots with drainage holes, perfect for indoor plants.",
        specifications: {
            "Material": "Ceramic",
            "Sizes": "Small, Medium, Large",
            "Color": "White",
            "Drainage": "Yes"
        },
        inStock: true,
        sizes: null
    }
];

let allProducts = [];
let filteredProducts = [];
let currentFilters = {
    category: '',
    priceRange: '',
    search: '',
    sort: 'name'
};

document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
});

function initializeProducts() {
    // Load products (in a real app, this would be an API call)
    allProducts = [...sampleProducts];
    filteredProducts = [...allProducts];
    
    // Initialize filters from URL parameters
    initializeFiltersFromURL();
    
    // Setup event listeners
    setupProductEventListeners();
    
    // Display products
    displayProducts();
    
    // Load featured products on home page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadFeaturedProducts();
    }
}

function initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    currentFilters.category = urlParams.get('category') || '';
    currentFilters.search = urlParams.get('search') || '';
    
    // Update filter controls
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (categoryFilter && currentFilters.category) {
        categoryFilter.value = currentFilters.category;
    }
    
    if (searchInput && currentFilters.search) {
        searchInput.value = currentFilters.search;
    }
}

function setupProductEventListeners() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            applyFilters();
        });
    }
    
    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            currentFilters.priceRange = this.value;
            applyFilters();
        });
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyFilters();
        });
    }
    
    // Search
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentFilters.search = searchInput.value.trim();
        applyFilters();
    }
}

function applyFilters() {
    filteredProducts = [...allProducts];
    
    // Apply category filter
    if (currentFilters.category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentFilters.category
        );
    }
    
    // Apply price range filter
    if (currentFilters.priceRange) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (currentFilters.priceRange) {
                case '0-50':
                    return price <= 50;
                case '50-100':
                    return price > 50 && price <= 100;
                case '100-500':
                    return price > 100 && price <= 500;
                case '500+':
                    return price > 500;
                default:
                    return true;
            }
        });
    }
    
    // Apply search filter
    if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply sorting
    sortProducts();
    
    // Display filtered products
    displayProducts();
}

function sortProducts() {
    switch (currentFilters.sort) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }
}

function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    
    if (!productsGrid) return;
    
    // Update product count
    if (productCount) {
        productCount.textContent = `${filteredProducts.length} products found`;
    }
    
    // Clear existing products
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    // Display products
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => viewProductDetail(product.id);
    
    const discount = product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display: none; align-items: center; justify-content: center; height: 100%; font-size: 3rem; color: #dee2e6;">
                <i class="fas fa-image"></i>
            </div>
            ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span>(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="event.stopPropagation(); addProductToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('featuredProducts');
    if (!featuredProducts) return;
    
    // Get top-rated products as featured
    const featured = allProducts
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    
    featuredProducts.innerHTML = '';
    featured.forEach(product => {
        const productCard = createProductCard(product);
        featuredProducts.appendChild(productCard);
    });
}

function viewProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

function addProductToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        if (window.ShopEase && window.ShopEase.addToCart) {
            window.ShopEase.addToCart(product);
        } else {
            // Fallback if main.js hasn't loaded yet
            console.log('Adding to cart:', product.name);
        }
    }
}

// Utility functions
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        } else {
            stars += '<i class="far fa-star star"></i>';
        }
    }
    return stars;
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Export functions for use in other files
window.ProductsModule = {
    allProducts,
    getProductById: (id) => allProducts.find(p => p.id === parseInt(id)),
    sampleProducts
};
