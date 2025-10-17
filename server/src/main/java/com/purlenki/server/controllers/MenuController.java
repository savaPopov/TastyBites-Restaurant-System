package com.purlenki.server.controllers;

import com.purlenki.server.model.MenuItem;
import com.purlenki.server.repository.implementations.MenuItemRepositoryImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*") // TODO cjange
public class MenuController {

    @Autowired
    private MenuItemRepositoryImpl menuItemDAO;

    // GET all menu items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        try {
            List<MenuItem> menuItems = menuItemDAO.getAllMenuItems();
            return ResponseEntity.ok(menuItems);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable int id) {
        Optional<MenuItem> menuItem = menuItemDAO.getMenuItemById(id);

        if (menuItem.isPresent()) {
            return ResponseEntity.ok(menuItem.get());
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    // POST new menu item
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<String> addMenuItem(@RequestBody MenuItem menuItem) {
        try {
            menuItemDAO.addMenuItem(menuItem);
            return ResponseEntity.ok("Menu item added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // PUT update menu item
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMenuItem(@PathVariable int id, @RequestBody MenuItem menuItem) {
        try {
            menuItem.setId(id);
            menuItemDAO.updateMenuItem(menuItem);
            return ResponseEntity.ok("Menu item updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // DELETE menu item
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable int id) {
        try {
            menuItemDAO.deleteMenuItem(id);
            return ResponseEntity.ok("Menu item deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Menu API is running!");
    }
}