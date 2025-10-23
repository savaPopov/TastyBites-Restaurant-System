import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import './Menu.css';
import { getAllMenuItems } from '../../api/menu-api';
import MenuItem from './MenuItem/MenuItem';



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

      <header className="menu-header">
        <div className="container py-8">
          <h1 className="menu-title">Tasty Bites</h1>
          <p className="menu-subtitle">
            Delicious food delivered fresh to your door
          </p>
        </div>
      </header>

      <div className="container py-8">

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

        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuItem
              key={item.id}
              item={item}
            />
          ))}
        </div>


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
