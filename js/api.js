// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// API Utility Functions
class ApiService {
    
    // Get auth token from localStorage
    static getAuthToken() {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return user.token || null;
    }
    
    // Get auth headers
    static getAuthHeaders() {
        const token = this.getAuthToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }
    
    // Generic API request method
    static async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: this.getAuthHeaders(),
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    // Authentication APIs
    static async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }
    
    static async signup(userData) {
        return this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
    
    static async logout() {
        return this.request('/auth/logout', {
            method: 'POST'
        });
    }
    
    // Product APIs
    static async getProducts(page = 0, size = 12, sort = 'name') {
        return this.request(`/products?page=${page}&size=${size}&sort=${sort}`);
    }
    
    static async getProduct(id) {
        return this.request(`/products/${id}`);
    }
    
    static async searchProducts(query, page = 0, size = 12) {
        return this.request(`/products/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
    }
    
    static async getProductsByCategory(category, page = 0, size = 12) {
        return this.request(`/products/category/${encodeURIComponent(category)}?page=${page}&size=${size}`);
    }
    
    static async getFeaturedProducts(limit = 8) {
        return this.request(`/products/featured?limit=${limit}`);
    }
    
    static async getCategories() {
        return this.request('/products/categories');
    }
    
    // Cart APIs
    static async getCartItems(userId) {
        return this.request(`/cart/${userId}`);
    }
    
    static async addToCart(cartItem) {
        return this.request('/cart/add', {
            method: 'POST',
            body: JSON.stringify(cartItem)
        });
    }
    
    static async updateCartItem(cartItemId, quantity) {
        return this.request(`/cart/update/${cartItemId}?quantity=${quantity}`, {
            method: 'PUT'
        });
    }
    
    static async removeFromCart(cartItemId) {
        return this.request(`/cart/remove/${cartItemId}`, {
            method: 'DELETE'
        });
    }
    
    static async clearCart(userId) {
        return this.request(`/cart/clear/${userId}`, {
            method: 'DELETE'
        });
    }
    
    static async getCartItemCount(userId) {
        return this.request(`/cart/count/${userId}`);
    }
}

// Export for use in other files
window.ApiService = ApiService;
