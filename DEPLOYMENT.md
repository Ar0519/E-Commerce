# ShopEase Deployment Guide

This guide will help you deploy and run the complete ShopEase e-commerce application with both frontend and backend.

## Prerequisites

### For Backend (Spring Boot)
- **Java 17 or higher** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
- **MySQL 8.0+** (Optional - H2 database is configured for testing)
- **Maven 3.6+** (Optional - Maven wrapper is included)

### For Frontend
- **Python 3.x** (for simple HTTP server) or any web server
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Quick Start (Development Mode)

### Option 1: Frontend Only (Offline Mode)
If you want to test the frontend without setting up the backend:

```bash
# Navigate to project directory
cd E-Commerce

# Start frontend server
python -m http.server 8000

# Open browser and go to: http://localhost:8000
```

The frontend will work in offline mode using localStorage for data persistence.

### Option 2: Full Stack (Frontend + Backend)

#### Step 1: Setup Backend

1. **Install Java 17+**
   - Download and install Java 17 or higher
   - Set JAVA_HOME environment variable
   - Verify: `java -version`

2. **Start Backend Server**
   ```bash
   # Navigate to backend directory
   cd E-Commerce/backend
   
   # Run with H2 database (no MySQL setup needed)
   ./mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=test
   
   # Or with MySQL (requires MySQL setup)
   ./mvnw.cmd spring-boot:run
   ```

3. **Verify Backend**
   - Backend runs on: http://localhost:8080/api
   - H2 Console (if using test profile): http://localhost:8080/api/h2-console
   - Test endpoint: http://localhost:8080/api/products

#### Step 2: Start Frontend

```bash
# In a new terminal, navigate to project root
cd E-Commerce

# Start frontend server
python -m http.server 8000

# Open browser and go to: http://localhost:8000
```

## Database Setup (Optional - for MySQL)

If you want to use MySQL instead of H2:

1. **Install MySQL 8.0+**
2. **Create Database**
   ```sql
   CREATE DATABASE shopease_db;
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON shopease_db.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. **Update Configuration**
   - Edit `backend/src/main/resources/application.yml`
   - Update database credentials if needed

## Demo Accounts

### API Users (Backend)
- **Admin:** admin@shopease.com / admin123
- **Customer:** john@example.com / password123

### LocalStorage Users (Frontend Offline)
- **Customer 1:** john@example.com / password123
- **Customer 2:** jane@example.com / password123

## Features Available

### ✅ Completed Features
- **Frontend:** Complete responsive UI with all pages
- **Backend:** REST APIs for authentication and products
- **Authentication:** JWT-based login/signup with localStorage fallback
- **Product Catalog:** Browse, search, filter products
- **Shopping Cart:** Add/remove items (frontend only)
- **User Management:** Registration, login, profile
- **Database:** Sample data initialization

### 🔄 Partially Implemented
- **Cart Integration:** Frontend cart with backend API structure ready
- **Order Management:** Backend entities created, frontend integration pending

### 📋 Next Steps
- Complete cart backend integration
- Implement order processing
- Add payment gateway integration
- Image upload functionality
- Admin panel
- Email notifications

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?q={query}` - Search products
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/featured` - Get featured products

### Cart (Backend Ready)
- `GET /api/cart/{userId}` - Get user's cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/{id}` - Update cart item quantity
- `DELETE /api/cart/remove/{id}` - Remove item from cart

## Troubleshooting

### Backend Issues
1. **Java not found:** Install Java 17+ and set JAVA_HOME
2. **Port 8080 in use:** Change port in application.yml
3. **Database connection:** Use H2 profile for testing: `-Dspring-boot.run.profiles=test`

### Frontend Issues
1. **CORS errors:** Ensure backend is running on port 8080
2. **API calls failing:** Check browser console, backend will fallback to localStorage
3. **Port 8000 in use:** Use different port: `python -m http.server 8001`

### Browser Compatibility
- Use modern browsers (Chrome, Firefox, Safari, Edge)
- Enable JavaScript
- Clear browser cache if experiencing issues

## Development Mode

For development, both servers support hot reload:
- **Frontend:** Changes to HTML/CSS/JS are immediately visible
- **Backend:** Use `spring-boot-devtools` for automatic restart

## Production Deployment

For production deployment:
1. Build frontend assets and serve via nginx/Apache
2. Package backend as JAR: `./mvnw clean package`
3. Use production database (MySQL/PostgreSQL)
4. Configure proper CORS origins
5. Set up HTTPS and security headers
6. Use environment variables for sensitive configuration

## Support

If you encounter issues:
1. Check the console logs (browser and backend)
2. Verify all prerequisites are installed
3. Ensure ports 8000 and 8080 are available
4. Try the H2 database profile for backend testing

The application is designed to work in offline mode (frontend only) or full-stack mode with graceful fallbacks.
