package com.shopease.service;

import com.shopease.dto.CartItemRequest;
import com.shopease.entity.CartItem;
import com.shopease.entity.Product;
import com.shopease.entity.User;
import com.shopease.repository.CartRepository;
import com.shopease.repository.ProductRepository;
import com.shopease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public CartItem addToCart(CartItemRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        // Check if item already exists in cart
        Optional<CartItem> existingItem = cartRepository.findByUserIdAndProductIdAndSelectedSizeAndSelectedColor(
                request.getUserId(), request.getProductId(), request.getSelectedSize(), request.getSelectedColor());
        
        if (existingItem.isPresent()) {
            // Update quantity
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
            return cartRepository.save(cartItem);
        } else {
            // Create new cart item
            CartItem cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setSelectedSize(request.getSelectedSize());
            cartItem.setSelectedColor(request.getSelectedColor());
            return cartRepository.save(cartItem);
        }
    }
    
    public CartItem updateCartItem(Long cartItemId, Integer quantity) {
        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cartRepository.delete(cartItem);
            return null;
        }
        
        cartItem.setQuantity(quantity);
        return cartRepository.save(cartItem);
    }
    
    public void removeFromCart(Long cartItemId) {
        CartItem cartItem = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartRepository.delete(cartItem);
    }
    
    public void clearCart(Long userId) {
        List<CartItem> cartItems = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(cartItems);
    }
    
    public Integer getCartItemCount(Long userId) {
        return cartRepository.countByUserId(userId);
    }
}
