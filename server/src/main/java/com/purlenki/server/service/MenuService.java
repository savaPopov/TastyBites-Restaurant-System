package com.purlenki.server.service;

import com.purlenki.server.model.MenuItem;
import com.purlenki.server.repository.implementations.MenuItemRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepositoryImpl menuItemRepository;


    private static final int MAX_NAME_LENGTH = 100;
    private static final int MAX_DESCRIPTION_LENGTH = 500;
    private static final int MAX_CATEGORY_LENGTH = 50;
    private static final int MAX_IMAGE_URL_LENGTH = 255;
    private static final BigDecimal MAX_PRICE = new BigDecimal("1000.00");
    private static final BigDecimal MIN_PRICE = new BigDecimal("0.01");


    private static final List<String> VALID_CATEGORIES = Arrays.asList(
        "appetizers", "mains", "desserts", "drinks"
    );

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.getAllMenuItems();
    }

    public Optional<MenuItem> getMenuItemById(int id) {
        if (id <= 0) {
            throw new RuntimeException("Invalid menu item ID: " + id);
        }
        return menuItemRepository.getMenuItemById(id);
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        validateMenuItem(menuItem);
        checkForDuplicateName(menuItem.getName(), -1); 
        return menuItemRepository.addMenuItem(menuItem);
    }

    public MenuItem updateMenuItem(int id, MenuItem menuItem) {
        if (id <= 0) {
            throw new RuntimeException("Invalid menu item ID: " + id);
        }
        

        Optional<MenuItem> existingItem = menuItemRepository.getMenuItemById(id);
        if (existingItem.isEmpty()) {
            throw new RuntimeException("Menu item not found with ID: " + id);
        }

        menuItem.setId(id);
        validateMenuItem(menuItem);
        checkForDuplicateName(menuItem.getName(), id); 
        
        return menuItemRepository.updateMenuItem(menuItem);
    }

    public void deleteMenuItem(int id) {
        if (id <= 0) {
            throw new RuntimeException("Invalid menu item ID: " + id);
        }


        Optional<MenuItem> existingItem = menuItemRepository.getMenuItemById(id);
        if (existingItem.isEmpty()) {
            throw new RuntimeException("Menu item not found with ID: " + id);
        }

        menuItemRepository.deleteMenuItem(id);
    }

    private void validateMenuItem(MenuItem menuItem) {

        if (menuItem.getName() == null || menuItem.getName().trim().isEmpty()) {
            throw new RuntimeException("Menu item name cannot be empty");
        }
        String name = menuItem.getName().trim();
        if (name.length() > MAX_NAME_LENGTH) {
            throw new RuntimeException("Menu item name cannot exceed " + MAX_NAME_LENGTH + " characters");
        }
        if (name.length() < 2) {
            throw new RuntimeException("Menu item name must be at least 2 characters");
        }
        menuItem.setName(name);


        if (menuItem.getPrice() == null) {
            throw new RuntimeException("Price cannot be null");
        }
        if (menuItem.getPrice().compareTo(MIN_PRICE) < 0) {
            throw new RuntimeException("Price must be at least $" + MIN_PRICE);
        }
        if (menuItem.getPrice().compareTo(MAX_PRICE) > 0) {
            throw new RuntimeException("Price cannot exceed $" + MAX_PRICE);
        }

        if (menuItem.getDescription() != null) {
            String description = menuItem.getDescription().trim();
            if (description.length() > MAX_DESCRIPTION_LENGTH) {
                throw new RuntimeException("Description cannot exceed " + MAX_DESCRIPTION_LENGTH + " characters");
            }
            menuItem.setDescription(description.isEmpty() ? null : description);
        }

        if (menuItem.getCategory() == null || menuItem.getCategory().trim().isEmpty()) {
            throw new RuntimeException("Category cannot be empty");
        }
        String category = menuItem.getCategory().trim().toLowerCase();
        if (!VALID_CATEGORIES.contains(category)) {
            throw new RuntimeException("Invalid category. Must be one of: " + VALID_CATEGORIES);
        }
        if (category.length() > MAX_CATEGORY_LENGTH) {
            throw new RuntimeException("Category name too long");
        }
        menuItem.setCategory(category);


        if (menuItem.getImageUrl() != null) {
            String imageUrl = menuItem.getImageUrl().trim();
            if (imageUrl.length() > MAX_IMAGE_URL_LENGTH) {
                throw new RuntimeException("Image URL too long");
            }
            if (!imageUrl.startsWith("/images/")) {
                throw new RuntimeException("Image URL must start with /images/");
            }
            if (!imageUrl.matches("^/images/[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|gif)$")) {
                throw new RuntimeException("Invalid image URL format");
            }
            menuItem.setImageUrl(imageUrl);
        }

    }

    private void checkForDuplicateName(String name, int excludeId) {
        List<MenuItem> allItems = menuItemRepository.getAllMenuItems();
        boolean duplicateExists = allItems.stream()
            .filter(item -> item.getId() != excludeId)
            .anyMatch(item -> item.getName().equalsIgnoreCase(name.trim()));
            
        if (duplicateExists) {
            throw new RuntimeException("Menu item with name '" + name + "' already exists");
        }
    }
}