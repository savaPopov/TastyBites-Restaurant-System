package com.purlenki.server.controllers;

import com.purlenki.server.model.MenuItem;
import com.purlenki.server.service.MenuService;

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
    private MenuService menuService;

    // GET all menu items
    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        try {
            List<MenuItem> menuItems = menuService.getAllMenuItems();
            return ResponseEntity.ok(menuItems);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable int id) {
        Optional<MenuItem> menuItem = menuService.getMenuItemById(id);

        if (menuItem.isPresent()) {
            return ResponseEntity.ok(menuItem.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST new menu item
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> addMenuItem(@RequestBody MenuItem menuItem) {
        try {
            MenuItem savedItem = menuService.addMenuItem(menuItem);
            return ResponseEntity.ok(savedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // PUT update menu item
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMenuItem(@PathVariable int id, @RequestBody MenuItem menuItem) {
        try {

            MenuItem updatedItem = menuService.updateMenuItem(id, menuItem);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // DELETE menu item
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenuItem(@PathVariable int id) {
        try {
            menuService.deleteMenuItem(id);
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