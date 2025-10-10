package com.purlenki.server.model;

import java.math.BigDecimal;

public class MenuItem {
    private int id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private boolean spicy;
    private boolean vegetarian;
    private String imageUrl;

    public MenuItem(int id, String name, String description, BigDecimal price, String category, boolean spicy,
            boolean vegetarian,
            String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.spicy = spicy;
        this.vegetarian = vegetarian;
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isSpicy() {
        return spicy;
    }

    public void setSpicy(boolean spicy) {
        this.spicy = spicy;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public void setVegetarian(boolean vegetarian) {
        this.vegetarian = vegetarian;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return id + ": " + name + " | " + description + " | $" + price + " | 🌶️ " + spicy + " | 🌱 " + vegetarian
                + imageUrl + " | " + category;
    }

}
