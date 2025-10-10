package com.purlenki.server.repository;

import com.purlenki.server.model.MenuItem;
import java.util.List;
import java.util.Optional;

public interface MenuItemRepository {

    List<MenuItem> getAllMenuItems();

    Optional<MenuItem> getMenuItemById(int id);

    // List<MenuItem> findByCategory(String category);//TODO 

    void addMenuItem(MenuItem menuItem);

    void updateMenuItem(MenuItem menuItem);

    void deleteMenuItem(int id);

    // boolean existsById(int id);//TODO 

    // long count();//TODO
}