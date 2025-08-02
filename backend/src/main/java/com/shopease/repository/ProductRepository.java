package com.shopease.repository;

import com.shopease.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find active products
    List<Product> findByIsActiveTrue();
    
    // Find active products with pagination
    Page<Product> findByIsActiveTrue(Pageable pageable);
    
    // Find by category
    List<Product> findByCategoryAndIsActiveTrue(String category);
    
    // Find by category with pagination
    Page<Product> findByCategoryAndIsActiveTrue(String category, Pageable pageable);
    
    // Search products by name or description
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Product> searchProducts(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    // Find by price range
    List<Product> findByPriceBetweenAndIsActiveTrue(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Find featured products (top rated)
    @Query("SELECT p FROM Product p WHERE p.isActive = true ORDER BY p.averageRating DESC, p.reviewCount DESC")
    List<Product> findFeaturedProducts(Pageable pageable);
    
    // Find by stock quantity less than threshold
    List<Product> findByStockQuantityLessThanAndIsActiveTrue(Integer threshold);
    
    // Find by brand
    List<Product> findByBrandAndIsActiveTrue(String brand);
    
    // Get distinct categories
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.isActive = true")
    List<String> findDistinctCategories();
    
    // Find products by SKU
    Optional<Product> findBySkuAndIsActiveTrue(String sku);
}
