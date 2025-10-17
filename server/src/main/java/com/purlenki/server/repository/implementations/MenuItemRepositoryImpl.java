package com.purlenki.server.repository.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.purlenki.server.model.MenuItem;
import com.purlenki.server.repository.MenuItemRepository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class MenuItemRepositoryImpl implements MenuItemRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<MenuItem> getAllMenuItems() {
        String sql = "SELECT * FROM menu_items";
        return jdbcTemplate.query(sql, new MenuItemRowMapper());
    }

    @Override
    public Optional<MenuItem> getMenuItemById(int id) {
        String sql = "SELECT * FROM menu_items WHERE id = ?";
        try {
            MenuItem menuItem = jdbcTemplate.queryForObject(sql, new MenuItemRowMapper(), id);
            return Optional.of(menuItem);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public void addMenuItem(MenuItem item) {
        String sql = "INSERT INTO menu_items (name, description, price,category, spicy, vegetarian, image_url) VALUES (?, ?, ?,?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                item.getName(),
                item.getDescription(),
                item.getPrice(),
                item.getCategory(),
                item.isSpicy(),
                item.isVegetarian(),
                item.getImageUrl());
    }

    @Override
    public void updateMenuItem(MenuItem item) {
        String sql = "UPDATE menu_items SET name = ?, description = ?, price = ?, spicy = ?, vegetarian = ?, image_url = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                item.getName(),
                item.getDescription(),
                item.getPrice(),
                item.isSpicy(),
                item.isVegetarian(),
                item.getImageUrl(),
                item.getId());
    }

    @Override
    public void deleteMenuItem(int id) {
        String sql = "DELETE FROM menu_items WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private static class MenuItemRowMapper implements RowMapper<MenuItem> {
        @Override
        public MenuItem mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new MenuItem(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getBigDecimal("price"),
                    rs.getString("category"),
                    rs.getBoolean("spicy"),
                    rs.getBoolean("vegetarian"),
                    rs.getString("image_url"));
        }
    }
}