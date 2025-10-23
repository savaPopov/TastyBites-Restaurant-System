import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MenuItem.css';
import { useCart } from '../../../context/CartContext';
import { useAuthContext } from '../../../context/AuthContext';

const MenuItem = ({ item }) => {
    const { addToCart, getItemQuantity, updateQuantity } = useCart();
    const navigate = useNavigate();
    const authContext = useAuthContext();
    let isAdmin = false;
    let isLogged = false;

    if (authContext.role === "ADMIN") {
        isAdmin = true;
    } else if (authContext.role === "USER") {
        isLogged = true;
    }

    const quantity = getItemQuantity(item.id);

    const handleCardClick = () => {
        navigate(`/menu/${item.id}`);
    };

    const handleCartAction = (e, action) => {
        e.stopPropagation();

        if (!isLogged) {
            navigate('/login');
            return;
        }

        action();
    };

    return (
        <div className="menu-card" onClick={handleCardClick}>
            <div className="menu-card-image-container">
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
                        <span className="badge badge-secondary">🌱 Vegetarian</span>
                    )}
                </div>


                {!isAdmin && (
                    <div className="menu-item-actions">
                        {quantity > 0 ? (
                            <div className="quantity-controls">
                                <button
                                    className="btn quantity-btn"
                                    onClick={(e) => handleCartAction(e, () => updateQuantity(item.id, quantity - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="quantity-display">{quantity}</span>
                                <button
                                    className="btn btn-primary quantity-btn"
                                    onClick={(e) => handleCartAction(e, () => addToCart(item))}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={(e) => handleCartAction(e, () => addToCart(item))}
                                className="btn btn-primary add-to-cart-btn"
                            >
                                <Plus className="h-4 w-4" /> Add to Cart
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuItem;