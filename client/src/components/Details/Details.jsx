import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Edit, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Details.css';
import { getMenuItemById, remove } from '../../api/menu-api';
import Spinner from '../Spinner/Spinner';
import { useAuthContext } from '../../context/AuthContext';
import DeleteMenuItemModal from '../Admin/DeleteMenuItemModal/DeleteMenuItemModal';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getItemQuantity, updateQuantity } = useCart();
    const [item, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, role } = useAuthContext();
    const [isModalOpen, setModalOpen] = useState(false);


    async function deleteConfirmHandler() {
        try {
            await remove(id)

            navigate('/menu')
            setModalOpen(false)
        } catch (err) {
            console.log(err.message)
        }

    }

    function addToCartHandler(item) {
        if (!isAuthenticated) {
            navigate('/login')
            return;
        }

        addToCart(item)

    }

    function handleEdit() {
        navigate(`/edit/${id}`)
    }

    function handleDelete() {
        setModalOpen(true)
    }


    useEffect(() => {
        async function fetchData() {
            try {

                const data = await getMenuItemById(id);
                console.log('data -', data)
                setMenuItem(data);
            } catch (err) {
                if (err.message && err.message.includes('404')) {
                    setError('Item not found');
                } else {
                    setError('Failed to load menu item');
                }
                setMenuItem(null);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="details-container">
                <div className="container py-8">
                    <button
                        onClick={() => navigate('/menu')}
                        className="btn btn-secondary mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Menu
                    </button>
                    <div className="flex flex-col items-center justify-center py-12">
                        <Spinner size="lg" className="mb-4" />
                        <p className="text-lg text-gray-600">Loading menu item...</p>
                    </div>
                </div>
            </div>
        );
    }

    // const item = MENU_ITEMS.find(menuItem => menuItem.id === id);
    const quantity = item ? getItemQuantity(item.id) : 0;

    if (!item) {
        return (
            <div className="details-container">
                <div className="container py-8">
                    <button
                        onClick={() => navigate('/menu')}
                        className="btn btn-secondary mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Menu
                    </button>
                    <h1>{error}</h1>
                </div>
            </div>
        );
    }


    return (
        <div className="details-container">
            <div className="container py-8">
                <button
                    onClick={() => navigate('/menu')}
                    className="btn btn-secondary mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Menu
                </button>

                <div className="details-content">
                    <div className="details-image-container">
                        <img
                            src={`http://localhost:8080${item.imageUrl}`}
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


                        {role === 'ADMIN' && (
                            <div className="details-actions admin-controls">
                                <button
                                    onClick={handleEdit}
                                    className="btn btn-default btn-default-size"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Item
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-outline btn-default-size"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Item
                                </button>
                            </div>
                        )}

                        <DeleteMenuItemModal isOpen={isModalOpen} itemName={item.name} onConfirm={deleteConfirmHandler} onCancel={() => setModalOpen(false)} />

                        {role !== 'ADMIN' &&
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
                                        onClick={() => addToCartHandler(item)}
                                        className="btn btn-primary add-to-cart-btn"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
