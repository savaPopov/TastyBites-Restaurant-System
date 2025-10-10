package com.purlenki.server;

import java.util.List;

import com.purlenki.server.model.MenuItem;
import com.purlenki.server.repository.implementations.MenuItemRepositoryImpl;

public class App {
    public static void main(String[] args) {
        MenuItemRepositoryImpl dao = new MenuItemRepositoryImpl();
        List<MenuItem> menuItems = dao.getAllMenuItems();

        for (MenuItem item : menuItems) {
            System.out.println(item);
        }
    }
}
