import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateFormValidation } from "../../../hooks/useCreateFormValidation";
import { useForm } from "../../../hooks/useForm";
import { getMenuItemById, update } from "../../../api/menu-api";
import Spinner from "../../Spinner/Spinner";
import { useAuthContext } from "../../../context/AuthContext";
import { toast } from "sonner";

const EditMenuItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { localLogout } = useAuthContext();
    const [submitError, setSubmitError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [menuItem, setMenuItem] = useState(
        {
            name: "",
            description: "",
            price: "",
            category: "",
            imageUrl: "",
            spicy: false,
            vegetarian: false
        });




    const { changeHandler, submitHandler, values } = useForm(menuItem, editHandler, true)
    const { errors, touched, handleBlur, markAllTouched, isFormValid } = useCreateFormValidation(values);

    useEffect(() => {


        const fetchMenuItem = async () => {
            try {

                const item = await getMenuItemById(id);
                console.log(item)
                setMenuItem(item);


                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching menu item:', error);
                setSubmitError("Failed to load menu item");
                setIsLoading(false);
            }
        };

        if (id) {
            fetchMenuItem();
        }
    }, [id]);

    async function editHandler(formValues) {
        const formErrors = markAllTouched();

        if (Object.values(formErrors).some(error => error)) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const menuItemData = {
                ...formValues,
                price: parseFloat(formValues.price)
            };
            console.log("MenuItemData to send:")
            console.log(menuItemData)
            const result = await update(id, menuItemData);
            console.log('Success:', result);
            toast.success(`Item ${result.name} updated successfully`)

            navigate("/menu");

        } catch (error) {
            console.error('Error updating menu item:', error);

            if (error.message?.includes('403') || error.status === 403) {
                console.log('1')
                setSubmitError("Access denied: Admin privileges required");
            } else if (error.message == 'Unauthorized' || error.status === 401) {
                console.log('3')
                localLogout()
                navigate('/login')

            } else if (error.message) {
                console.log('2')
                setSubmitError(`Failed to update menu item: ${error.message}`);
            } else {
                console.log('4')
                setSubmitError("Failed to update menu item. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return <Spinner size="lg" />
    }

    return (
        <div className="admin-page">
            <div className="admin-container">
                <div className="admin-header">
                    <h1 className="admin-title">Edit Menu Item</h1>
                    <p className="admin-subtitle">Update menu item details</p>
                </div>

                <div className="create-section">
                    <div className="create-header">
                        <Edit className="create-icon" />
                        <h2 className="create-title">Edit Menu Item</h2>
                    </div>

                    {submitError && (
                        <div className="error-banner">
                            <span className="error-icon">⚠️</span>
                            <p className="error-text">{submitError}</p>
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="create-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Item Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                    className={`form-input ${touched.name && errors.name ? "form-input-error" : ""}`}
                                    placeholder="e.g., Spicy Buffalo Wings"
                                />
                                {touched.name && errors.name && (
                                    <div className="field-error">{errors.name}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Price ($)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={values.price}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                    className={`form-input ${touched.price && errors.price ? "form-input-error" : ""}`}
                                    placeholder="12.99"
                                    step="0.01"
                                    min="0"
                                />
                                {touched.price && errors.price && (
                                    <div className="field-error">{errors.price}</div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={values.description}
                                onChange={changeHandler}
                                onBlur={handleBlur}
                                className={`form-textarea ${touched.description && errors.description ? "form-input-error" : ""}`}
                                placeholder="Describe the menu item..."
                                rows={3}
                            />
                            {touched.description && errors.description && (
                                <div className="field-error">{errors.description}</div>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={values.category}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                    className={`form-select ${touched.category && errors.category ? "form-input-error" : ""}`}
                                >
                                    <option value="appetizers">Appetizers</option>
                                    <option value="mains">Main Courses</option>
                                    <option value="desserts">Desserts</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                                {touched.category && errors.category && (
                                    <div className="field-error">{errors.category}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={values.imageUrl}
                                    onChange={changeHandler}
                                    onBlur={handleBlur}
                                    className={`form-input ${touched.imageUrl && errors.imageUrl ? "form-input-error" : ""}`}
                                    placeholder="images/image.jpg"
                                />
                                {touched.imageUrl && errors.imageUrl && (
                                    <div className="field-error">{errors.imageUrl}</div>
                                )}
                            </div>
                        </div>

                        <div className="form-checkboxes">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="spicy"
                                    checked={values.spicy}
                                    onChange={changeHandler}
                                    className="checkbox-input"
                                />
                                <span className="checkbox-text">🌶️ Spicy</span>
                            </label>

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="vegetarian"
                                    checked={values.vegetarian}
                                    onChange={changeHandler}
                                    className="checkbox-input"
                                />
                                <span className="checkbox-text">🌱 Vegetarian</span>
                            </label>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate(`/menu/${id}`)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={isSubmitting || !isFormValid()}
                            >
                                {isSubmitting ? "Updating..." : "Update Menu Item"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMenuItem;