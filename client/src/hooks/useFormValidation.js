import { useState } from 'react';

export const validationRules = {
  email: (value) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    return '';
  },
  
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  },
  
  username: (value) => {
    if (!value) return 'Username is required';
    if (value.length < 2) return 'Username must be at least 2 characters';
    return '';
  },
  
  repassword: (value, allValues) => {
    if (!value) return 'Confirm password is required';
    if (value !== allValues.password) return 'Passwords do not match';
    return '';
  }
};

export const useFormValidation = (values) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    if (validationRules[name]) {
      return validationRules[name](value, values);
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach(key => {
      newErrors[key] = validateField(key, values[key]);
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
    const newTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
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