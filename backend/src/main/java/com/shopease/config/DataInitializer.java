package com.shopease.config;

import com.shopease.entity.Product;
import com.shopease.entity.ProductImage;
import com.shopease.entity.ProductSpecification;
import com.shopease.entity.User;
import com.shopease.repository.ProductRepository;
import com.shopease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeProducts();
    }
    
    private void initializeUsers() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@shopease.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            admin.setIsActive(true);
            userRepository.save(admin);
            
            // Create demo customer
            User customer = new User();
            customer.setFirstName("John");
            customer.setLastName("Doe");
            customer.setEmail("john@example.com");
            customer.setPassword(passwordEncoder.encode("password123"));
            customer.setPhoneNumber("+1234567890");
            customer.setRole(User.Role.CUSTOMER);
            customer.setIsActive(true);
            userRepository.save(customer);
            
            System.out.println("Demo users created successfully!");
        }
    }
    
    private void initializeProducts() {
        if (productRepository.count() == 0) {
            // Create sample products
            createProduct(
                "Wireless Bluetooth Headphones",
                "High-quality wireless Bluetooth headphones with noise cancellation and 30-hour battery life.",
                new BigDecimal("79.99"),
                new BigDecimal("99.99"),
                50,
                "electronics",
                "AudioTech",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop&crop=center",
                Arrays.asList(
                    new ProductSpecification("Battery Life", "30 hours"),
                    new ProductSpecification("Connectivity", "Bluetooth 5.0"),
                    new ProductSpecification("Weight", "250g"),
                    new ProductSpecification("Color", "Black")
                )
            );
            
            createProduct(
                "Premium Cotton T-Shirt",
                "Comfortable premium cotton t-shirt available in multiple sizes and colors.",
                new BigDecimal("24.99"),
                new BigDecimal("34.99"),
                100,
                "clothing",
                "FashionCo",
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=250&fit=crop&crop=center",
                Arrays.asList(
                    new ProductSpecification("Material", "100% Cotton"),
                    new ProductSpecification("Fit", "Regular"),
                    new ProductSpecification("Care", "Machine Washable"),
                    new ProductSpecification("Origin", "Made in USA")
                ),
                Arrays.asList("S", "M", "L", "XL")
            );
            
            createProduct(
                "JavaScript: The Complete Guide",
                "Comprehensive guide to JavaScript programming from beginner to advanced level.",
                new BigDecimal("39.99"),
                new BigDecimal("49.99"),
                25,
                "books",
                "Tech Books",
                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=250&fit=crop&crop=center",
                Arrays.asList(
                    new ProductSpecification("Pages", "850"),
                    new ProductSpecification("Publisher", "Tech Books"),
                    new ProductSpecification("Language", "English"),
                    new ProductSpecification("Edition", "2024")
                )
            );
            
            createProduct(
                "Smart LED Light Bulb",
                "Smart WiFi-enabled LED light bulb with color changing and dimming features.",
                new BigDecimal("19.99"),
                new BigDecimal("29.99"),
                75,
                "home",
                "SmartHome",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=250&fit=crop&crop=center",
                Arrays.asList(
                    new ProductSpecification("Wattage", "9W"),
                    new ProductSpecification("Brightness", "800 lumens"),
                    new ProductSpecification("Connectivity", "WiFi"),
                    new ProductSpecification("Lifespan", "25,000 hours")
                )
            );
            
            createProduct(
                "Gaming Mechanical Keyboard",
                "RGB mechanical gaming keyboard with customizable keys and macro support.",
                new BigDecimal("129.99"),
                new BigDecimal("159.99"),
                30,
                "electronics",
                "GameTech",
                "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=250&fit=crop&crop=center",
                Arrays.asList(
                    new ProductSpecification("Switch Type", "Cherry MX Blue"),
                    new ProductSpecification("Backlight", "RGB"),
                    new ProductSpecification("Connectivity", "USB-C"),
                    new ProductSpecification("Layout", "Full Size")
                )
            );
            
            System.out.println("Sample products created successfully!");
        }
    }
    
    private void createProduct(String name, String description, BigDecimal price, BigDecimal originalPrice,
                             Integer stock, String category, String brand, String imageUrl,
                             java.util.List<ProductSpecification> specs) {
        createProduct(name, description, price, originalPrice, stock, category, brand, imageUrl, specs, null);
    }
    
    private void createProduct(String name, String description, BigDecimal price, BigDecimal originalPrice,
                             Integer stock, String category, String brand, String imageUrl,
                             java.util.List<ProductSpecification> specs, java.util.List<String> sizes) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setOriginalPrice(originalPrice);
        product.setStockQuantity(stock);
        product.setCategory(category);
        product.setBrand(brand);
        product.setSku(generateSku(name));
        product.setAverageRating(4.0 + Math.random()); // Random rating between 4.0-5.0
        product.setReviewCount((int)(Math.random() * 200) + 50); // Random review count
        product.setSpecifications(specs);
        if (sizes != null) {
            product.setSizes(sizes);
        }
        
        Product savedProduct = productRepository.save(product);
        
        // Add product image
        ProductImage image = new ProductImage();
        image.setImageUrl(imageUrl);
        image.setAltText(name);
        image.setIsPrimary(true);
        image.setProduct(savedProduct);
        
        savedProduct.addImage(image);
        productRepository.save(savedProduct);
    }
    
    private String generateSku(String productName) {
        return productName.replaceAll("[^a-zA-Z0-9]", "")
                         .toUpperCase()
                         .substring(0, Math.min(8, productName.length())) + 
               System.currentTimeMillis() % 10000;
    }
}
