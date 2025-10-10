import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Details.css';


const MENU_ITEMS = [
    {
        id: '1',
        name: 'Spicy Buffalo Wings',
        description: 'Crispy chicken wings tossed in our signature buffalo sauce, served with ranch dip',
        price: 12.99,
        category: 'appetizers',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFOyHRpEQAp6j1g_pWR9FcFWgPmIABV_85g&s',
        spicy: true
    },
    {
        id: '2',
        name: 'Loaded Nachos Supreme',
        description: 'Tortilla chips loaded with cheese, jalapeños, sour cream, and guacamole',
        price: 10.99,
        category: 'appetizers',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFOyHRpEQAp6j1g_pWR9FcFWgPmIABV_85g&s',
        vegetarian: true
    },
    {
        id: '3',
        name: 'BBQ Bacon Burger',
        description: 'Juicy beef patty with crispy bacon, BBQ sauce, lettuce, and tomato on a brioche bun',
        price: 16.99,
        category: 'mains',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFOyHRpEQAp6j1g_pWR9FcFWgPmIABV_85g&s'
    },
    {
        id: '4',
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon grilled to perfection with lemon herb butter and seasonal vegetables',
        price: 22.99,
        category: 'mains',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFOyHRpEQAp6j1g_pWR9FcFWgPmIABV_85g&s'
    },
    {
        id: '5',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        price: 8.99,
        category: 'desserts',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFOyHRpEQAp6j1g_pWR9FcFWgPmIABV_85g&s',
        vegetarian: true
    },
    {
        id: '6',
        name: 'Orange Mango Smoothie',
        description: 'Fresh orange and mango blended with ice and a hint of mint',
        price: 6.99,
        category: 'drinks',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFOyHRpEQAp6j1g_pWR9FcFWgPmIABV_85g&s',
        vegetarian: true
    }
];

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getItemQuantity, updateQuantity } = useCart();

    const item = MENU_ITEMS.find(menuItem => menuItem.id === id);
    const quantity = item ? getItemQuantity(item.id) : 0;

    if (!item) {
        return (
            <div className="details-container">
                <div className="container py-8">
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-secondary mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Menu
                    </button>
                    <h1>Item not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="details-container">
            <div className="container py-8">
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-secondary mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Menu
                </button>

                <div className="details-content">
                    <div className="details-image-container">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="details-image"
                        />
                    </div>

                    <div className="details-info">
                        <div className="details-header">
                            <h1 className="details-title">{item.name}</h1>
                            <span className="details-price">${item.price}</span>
                        </div>

                        <div className="details-badges">
                            {item.spicy && (
                                <span className="badge badge-destructive">🌶️ Spicy</span>
                            )}
                            {item.vegetarian && (
                                <span className="badge badge-secondary">🌱 Vegetarian</span>
                            )}
                        </div>

                        <p className="details-description">{item.description}</p>

                        <div className="details-category">
                            <span className="category-label">Category:</span>
                            <span className="category-value">
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                        </div>

                        <div className="details-actions">
                            {quantity > 0 ? (
                                <div className="quantity-controls">
                                    <button
                                        className="btn quantity-btn"
                                        onClick={() => updateQuantity(item.id, quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button
                                        className="btn btn-primary quantity-btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(item)}
                                    className="btn btn-primary add-to-cart-btn"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
