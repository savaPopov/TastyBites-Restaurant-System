import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateFormValidation } from "../../../hooks/useCreateFormValidation";
import { useForm } from "../../../hooks/useForm";
import { create } from "../../../api/menu-api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";



const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    spicy: false,
    vegetarian: false,
};

const CreateMenuItem = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const { values, changeHandler, submitHandler } = useForm(initialValues, handleSubmit);
    const { errors, touched, handleBlur, markAllTouched, isFormValid } = useCreateFormValidation(values);

    async function handleSubmit(formValues) {
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


            const result = await create(menuItemData);
            // const result  = menuItemData
            toast.success(`Item ${result.name} created successfully`)
            navigate(`/menu/${result.id}`)

            Object.keys(initialValues).forEach(key => {
                changeHandler({ target: { name: key, value: initialValues[key] } });
            });

        } catch (error) {
            console.error('Error creating menu item:', error);


            if (error.message?.includes('403') || error.status === 403) {
                setSubmitError("Access denied: Admin privileges required");
            } else if (error.message) {
                setSubmitError(`Failed to create menu item: ${error.message}`);
            } else {
                setSubmitError("Failed to create menu item. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="create-section">
            <div className="create-header">
                <Plus className="create-icon" />
                <h2 className="create-title">Create New Menu Item</h2>
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

                <button
                    type="submit"
                    className="btn btn-hero btn-lg submit-btn"
                    disabled={isSubmitting || !isFormValid()}
                >
                    {isSubmitting ? "Creating..." : "Create Menu Item"}
                </button>
            </form>
        </div>
    );
};

export default CreateMenuItem;