import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { getAllMenuItems } from '../../api/menu-api';


const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' }
];

export const Menu = () => {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const navigate = useNavigate();


  const handleCardClick = (itemId) => {
    navigate(`/menu/${itemId}`);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllMenuItems()

      setMenuItems(data)

    }

    fetchData();

  }, [])

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, menuItems]);

  return (
    <div className="menu-container">
      {/* Header */}
      <header className="menu-header">
        <div className="container py-8">
          <h1 className="menu-title">Tasty Bites</h1>
          <p className="menu-subtitle">
            Delicious food delivered fresh to your door
          </p>
        </div>
      </header>

      <div className="container py-8">
        {/* Search and Filters */}
        <div className="filters-section">
          <div className="filters-row">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input search-input"
              />
            </div>

            <div className="category-filters">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  className={`btn ${selectedCategory === category.id
                    ? 'btn-primary'
                    : 'btn-secondary'
                    }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map(item => {
            const quantity = getItemQuantity(item.id);

            return (
              <div key={item.id} className="menu-card" onClick={() => handleCardClick(item.id)} >
                <div className="menu-card-image-container">
                  {/* <img src={`http://localhost:8080/${item.image}`} alt={item.name} /> */}
                  <img
                    src={`http://localhost:8080${item.imageUrl}`}
                    alt={item.name}
                    className="menu-card-image"
                  />
                </div>

                <div className="menu-card-content">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <span className="menu-item-price">${item.price}</span>
                  </div>

                  <p className="menu-item-description">{item.description}</p>

                  <div className="menu-item-badges">
                    {item.spicy && (
                      <span className="badge badge-destructive">🌶️ Spicy</span>
                    )}
                    {item.vegetarian && (
                      <span className="badge badge-secondary">
                        🌱 Vegetarian
                      </span>
                    )}
                  </div>

                  <div className="menu-item-actions">
                    {quantity > 0 ? (
                      <div className="quantity-controls">
                        <button
                          className="btn quantity-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, quantity - 1)
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                          className="btn btn-primary quantity-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item)
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="btn btn-primary add-to-cart-btn"
                      >
                        <Plus className="h-4 w-4" /> Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredItems.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">
              No items found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
