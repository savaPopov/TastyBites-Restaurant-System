import { Link } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../../context/CartContext";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="cart-empty">
                        <div className="cart-empty-icon">🛒</div>
                        <h2 className="cart-empty-title">Your cart is empty</h2>
                        <p className="cart-empty-description">
                            Looks like you haven't added any delicious items to your cart yet.
                        </p>
                        <Link to="/menu" className="btn btn-hero btn-lg">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <Link to="/menu" className="cart-back-link">
                        ← Back to Menu
                    </Link>
                    <h1 className="cart-title">Shopping Cart</h1>
                    <p className="cart-subtitle">Review your order before checkout</p>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image}></img>
                                </div>
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">{item.price} each</p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    ${(parseFloat(item.price * item.quantity)).toFixed(2)}
                                </div>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="cart-summary-content">
                            <h3 className="cart-summary-title">Order Summary</h3>

                            <div className="cart-summary-line">
                                <span>Subtotal:</span>
                                <span>${getTotalPrice().toFixed(2)}</span>
                            </div>

                            <div className="cart-summary-line">
                                <span>Delivery Fee:</span>
                                <span>$3.99</span>
                            </div>

                            <div className="cart-summary-line">
                                <span>Tax:</span>
                                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                            </div>

                            <div className="cart-summary-divider"></div>

                            <div className="cart-summary-total">
                                <span>Total:</span>
                                <span>${(getTotalPrice() + 3.99 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                            </div>

                            <div className="cart-actions">
                                <button className="btn btn-outline btn-lg" onClick={clearCart}>
                                    Clear Cart
                                </button>
                                <button className="btn btn-hero btn-lg">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;