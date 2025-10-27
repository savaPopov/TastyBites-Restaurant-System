package com.purlenki.server.repository.implementations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.purlenki.server.model.MenuItem;
import com.purlenki.server.repository.MenuItemRepository;

import java.sql.PreparedStatement;
import java.sql.Statement;
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
    public MenuItem addMenuItem(MenuItem item) {
        String sql = "INSERT INTO menu_items (name, description, price, category, spicy, vegetarian, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, item.getName());
            ps.setString(2, item.getDescription());
            ps.setBigDecimal(3, item.getPrice());
            ps.setString(4, item.getCategory());
            ps.setBoolean(5, item.isSpicy());
            ps.setBoolean(6, item.isVegetarian());
            ps.setString(7, item.getImageUrl());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key != null) {
            item.setId(key.intValue());
        }
        return item;
    }

    @Override
    public MenuItem updateMenuItem(MenuItem item) {
        String sql = "UPDATE menu_items SET name = ?, description = ?, price = ?, spicy = ?, vegetarian = ?, image_url = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                item.getName(),
                item.getDescription(),
                item.getPrice(),
                item.getCategory(),
                item.isSpicy(),
                item.isVegetarian(),
                item.getImageUrl(),
                item.getId());
        return item;
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