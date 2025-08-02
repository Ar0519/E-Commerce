package com.shopease.service;

import com.shopease.entity.Product;
import com.shopease.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    // Get all active products with pagination
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findByIsActiveTrue(pageable);
    }
    
    // Get product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
    
    // Search products
    public Page<Product> searchProducts(String searchTerm, Pageable pageable) {
        return productRepository.searchProducts(searchTerm, pageable);
    }
    
    // Get products by category
    public Page<Product> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategoryAndIsActiveTrue(category, pageable);
    }
    
    // Get products by price range
    public List<Product> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceBetweenAndIsActiveTrue(minPrice, maxPrice);
    }
    
    // Get featured products (top rated)
    public List<Product> getFeaturedProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return productRepository.findFeaturedProducts(pageable);
    }
    
    // Get all categories
    public List<String> getAllCategories() {
        return productRepository.findDistinctCategories();
    }
    
    // Save product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
    
    // Delete product (soft delete)
    public void deleteProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product p = product.get();
            p.setIsActive(false);
            productRepository.save(p);
        }
    }
    
    // Update stock quantity
    public boolean updateStock(Long productId, Integer quantity) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            if (product.getStockQuantity() >= quantity) {
                product.setStockQuantity(product.getStockQuantity() - quantity);
                productRepository.save(product);
                return true;
            }
        }
        return false;
    }
    
    // Check if product is in stock
    public boolean isInStock(Long productId, Integer quantity) {
        Optional<Product> product = productRepository.findById(productId);
        return product.map(p -> p.getStockQuantity() >= quantity).orElse(false);
    }
    
    // Get low stock products
    public List<Product> getLowStockProducts(Integer threshold) {
        return productRepository.findByStockQuantityLessThanAndIsActiveTrue(threshold);
    }
    
    // Update product rating
    public void updateProductRating(Long productId, Double newRating, Integer reviewCount) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            product.setAverageRating(newRating);
            product.setReviewCount(reviewCount);
            productRepository.save(product);
        }
    }
}
