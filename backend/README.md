# ShopEase Backend

Spring Boot REST API backend for the ShopEase e-commerce application.

## Features

- User authentication with JWT tokens
- Product catalog management
- RESTful API endpoints
- MySQL database integration
- Sample data initialization
- CORS configuration for frontend integration

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup

1. **Database Setup**
   ```sql
   CREATE DATABASE shopease_db;
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON shopease_db.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Configuration**
   - Update `src/main/resources/application.yml` with your database credentials
   - JWT secret is configured for development (change for production)

3. **Run the Application**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

   The API will be available at `http://localhost:8080/api`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search?q={query}` - Search products
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/featured` - Get featured products

## Sample Data

The application automatically creates:
- Admin user: `admin@shopease.com` / `admin123`
- Demo customer: `john@example.com` / `password123`
- Sample products with real images

## Database Schema

The application uses JPA/Hibernate with automatic schema generation. Key entities:
- User (authentication and profile)
- Product (catalog items)
- Order (purchase records)
- CartItem (shopping cart)
- Address (shipping addresses)
- Review (product reviews)

## Development

- The application runs on port 8080
- CORS is configured to allow requests from localhost:8000 (frontend)
- JWT tokens expire after 24 hours
- File uploads are stored in the configured directory
