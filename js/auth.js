// Authentication JavaScript for GreenCart

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize form handlers
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    try {
        showAuthMessage('Logging in...', 'info');
        
        // Try API login first
        try {
            const response = await ApiService.login(email, password);
            
            // Login successful with API
            const userSession = {
                id: response.id,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                role: response.role,
                token: response.token,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userSession));
            showAuthMessage('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            return;
        } catch (apiError) {
            console.log('API login failed, trying localStorage fallback:', apiError.message);
        }
        
        // Fallback to localStorage for offline mode
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login successful with localStorage
            const userSession = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userSession));
            showAuthMessage('Login successful! (Offline mode) Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAuthMessage('Invalid email or password', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAuthMessage('Login failed. Please try again.', 'error');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthMessage('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAuthMessage('Please enter a valid email address', 'error');
        return;
    }
    
    try {
        showAuthMessage('Creating account...', 'info');
        
        // Try API signup first
        try {
            const signupData = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber: phone
            };
            
            await ApiService.signup(signupData);
            showAuthMessage('Account created successfully! Redirecting to login...', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            return;
        } catch (apiError) {
            console.log('API signup failed, trying localStorage fallback:', apiError.message);
            
            // If API fails due to existing user, show the error
            if (apiError.message.includes('already in use')) {
                showAuthMessage('User with this email already exists', 'error');
                return;
            }
        }
        
        // Fallback to localStorage for offline mode
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showAuthMessage('User with this email already exists', 'error');
            return;
        }
        
        // Create new user in localStorage
        const newUser = {
            id: generateUserId(),
            firstName,
            lastName,
            email,
            phone,
            password,
            createdAt: new Date().toISOString(),
            addresses: [],
            orders: []
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        showAuthMessage('Account created successfully! (Offline mode) Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        console.error('Signup error:', error);
        showAuthMessage('Account creation failed. Please try again.', 'error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showAuthMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.auth-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `auth-message message ${type}`;
    messageEl.textContent = message;
    
    // Add to form
    const form = document.querySelector('.auth-form');
    const formElement = form.querySelector('form');
    form.insertBefore(messageEl, formElement);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 5000);
}

// Demo users for testing (you can remove this in production)
function createDemoUsers() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (existingUsers.length === 0) {
        const demoUsers = [
            {
                id: 'user_demo_1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                password: 'password123',
                createdAt: new Date().toISOString(),
                addresses: [
                    {
                        id: 'addr_1',
                        type: 'home',
                        firstName: 'John',
                        lastName: 'Doe',
                        address: '123 Main St',
                        city: 'New York',
                        state: 'NY',
                        zipCode: '10001',
                        phone: '+1234567890',
                        isDefault: true
                    }
                ],
                orders: []
            },
            {
                id: 'user_demo_2',
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                phone: '+0987654321',
                password: 'password123',
                createdAt: new Date().toISOString(),
                addresses: [],
                orders: []
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(demoUsers));
    }
}

// Create demo users on page load
createDemoUsers();
