package com.example.productapi.service;

import com.example.productapi.model.Product;
import com.example.productapi.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository repository;

    public List<Product> findAll() { return repository.findAll(); }
    public Product findById(String id) { return repository.findById(id).orElseThrow(); }
    public Product save(Product product) { return repository.save(product); }
    public void delete(String id) { repository.deleteById(id); }
    
    public Product update(String id, Product details) {
        Product product = findById(id);
        product.setName(details.getName());
        product.setDescription(details.getDescription());
        product.setPrice(details.getPrice());
        return repository.save(product);
    }
}
