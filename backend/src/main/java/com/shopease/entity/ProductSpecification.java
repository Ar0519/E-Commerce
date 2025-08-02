package com.shopease.entity;

import jakarta.persistence.*;

@Embeddable
public class ProductSpecification {
    
    @Column(name = "spec_key")
    private String key;
    
    @Column(name = "spec_value")
    private String value;
    
    // Constructors
    public ProductSpecification() {}
    
    public ProductSpecification(String key, String value) {
        this.key = key;
        this.value = value;
    }
    
    // Getters and Setters
    public String getKey() { return key; }
    public void setKey(String key) { this.key = key; }
    
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }
}
