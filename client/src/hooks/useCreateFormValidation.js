import { useState } from 'react';

export const menuValidationRules = {
    name: (value) => {
        if (!value) return 'Item name is required';
        if (value.trim().length < 3) return 'Item name must be at least 3 characters';
        return '';
    },

    description: (value) => {
        if (!value) return 'Description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        return '';
    },

    price: (value) => {
        if (!value) return 'Price is required';
        const priceNum = parseFloat(value);
        if (isNaN(priceNum)) return 'Price must be a valid number';
        if (priceNum <= 0) return 'Price must be greater than 0';
        if (priceNum > 1000) return 'Price must be less than $1000';
        return '';
    },

    category: (value) => {
        if (!value) return 'Category is required';
        return '';
    },

    imageUrl: (value) => {
        if (!value) return 'Image URL is required';
        const imagePathRegex = /^\/images\/[a-zA-Z0-9_]+\.(jpg|jpeg|png|gif|webp)$/i;

        if (!imagePathRegex.test(value)) {
            return 'Image path must be in format: /images/filename.jpg (jpg, jpeg, png, gif, webp only)';
        }
        
        return '';
    }
};

export const useCreateFormValidation = (values) => {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (name, value) => {
        if (menuValidationRules[name]) {
            return menuValidationRules[name](value);
        }
        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(values).forEach(key => {
            if (key !== 'spicy' && key !== 'vegetarian') {
                newErrors[key] = validateField(key, values[key]);
            }
        });
        return newErrors;
    };

    const isFormValid = () => {
        const formErrors = validateForm();
        return !Object.values(formErrors).some(error => error);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const markAllTouched = () => {
        const newTouched = {};
        Object.keys(values).forEach(key => {
            if (key !== 'spicy' && key !== 'vegetarian') {
                newTouched[key] = true;
            }
        });
        setTouched(newTouched);
        return validateForm();
    };

    return {
        errors,
        touched,
        handleBlur,
        markAllTouched,
        isFormValid,
        setErrors,
        setTouched
    };
};