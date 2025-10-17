import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, ShoppingBag, Plus, TrendingUp, DollarSign, Package } from "lucide-react";

import "./ControlPanel.css";
import CreateMenuItem from "../CreateMenuItem/CreateMenuItem";

const ControlPanel = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "appetizers",
        image: "",
        spicy: false,
        vegetarian: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);


        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "appetizers",
                image: "",
                spicy: false,
                vegetarian: false,
            });
            alert("Menu item created! (Backend integration pending)");
        }, 1500);
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = e.target.checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="admin-page">

            <div className="admin-container">
                <div className="admin-header">
                    <h1 className="admin-title">Control Panel</h1>
                    <p className="admin-subtitle">Manage your restaurant operations</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon stat-icon-primary">
                            <TrendingUp className="icon" />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Orders</p>
                            <p className="stat-value">1,234</p>
                            <p className="stat-change positive">+12% from last month</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon stat-icon-success">
                            <DollarSign className="icon" />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Revenue</p>
                            <p className="stat-value">$45,678</p>
                            <p className="stat-change positive">+8% from last month</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon stat-icon-info">
                            <Users className="icon" />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Users</p>
                            <p className="stat-value">892</p>
                            <p className="stat-change positive">+5% from last month</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon stat-icon-warning">
                            <Package className="icon" />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Menu Items</p>
                            <p className="stat-value">42</p>
                            <p className="stat-change neutral">No change</p>
                        </div>
                    </div>
                </div>


                <div className="quick-actions">
                    <Link to="/admin/users" className="action-card">
                        <div className="action-icon action-icon-primary">
                            <Users />
                        </div>
                        <div className="action-content">
                            <h3 className="action-title">Manage Users</h3>
                            <p className="action-description">View and manage user accounts</p>
                        </div>
                    </Link>

                    <Link to="/admin/orders" className="action-card">
                        <div className="action-icon action-icon-success">
                            <ShoppingBag />
                        </div>
                        <div className="action-content">
                            <h3 className="action-title">Manage Orders</h3>
                            <p className="action-description">Track and process customer orders</p>
                        </div>
                    </Link>
                </div>


                <CreateMenuItem></CreateMenuItem>
            </div>
        </div>
    );
};

export default ControlPanel;