import "./Auth.css";
import React, { useState } from 'react';
import { useRegister } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useFormValidation } from '../../hooks/useFormValidation';

const initialValues = { username: '', email: '', password: '', repassword: '' }; // Fixed

const Register = () => {
  const [submitError, setSubmitError] = useState('');
  const register = useRegister();
  const navigate = useNavigate();

  const { values, changeHandler, submitHandler } = useForm(initialValues, registerHandler);
  const { errors, touched, handleBlur, markAllTouched, isFormValid } = useFormValidation(values);

  async function registerHandler(formValues) {
    const formErrors = markAllTouched();
    if (Object.values(formErrors).some(error => error)) return;

    try {
      const { username, email, password } = formValues;
      await register(username, email, password);
      navigate('/');
    } catch (err) {
      if (err.error?.code === 409) {
        setSubmitError(err.error.message);
      } else {
        setSubmitError(err.message || 'Registration failed. Please try again.');
      }
    }
  }



  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">🍔</div>
              <h1 className="auth-title">Join Tasty Bites</h1>
              <p className="auth-subtitle">Create an account to get started</p>
            </div>

            <form onSubmit={submitHandler} className="auth-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  className={`form-input ${touched.username && errors.username ? "form-input-error" : ""}`}
                  placeholder="Enter your username"
                />
                {touched.username && errors.username && (
                  <div className="field-error">{errors.username}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  className={`form-input ${touched.email && errors.email ? "form-input-error" : ""}`}
                  placeholder="Enter your email"
                />
                {touched.email && errors.email && (
                  <div className="field-error">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  className={`form-input ${touched.password && errors.password ? "form-input-error" : ""}`}
                  placeholder="Enter your password"
                />
                {touched.password && errors.password && (
                  <div className="field-error">{errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="repassword" className="form-label">Confirm Password</label>
                <input
                  id="repassword"
                  type="password"
                  name="repassword"
                  value={values.repassword}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  className={`form-input ${touched.repassword && errors.repassword ? "form-input-error" : ""}`}
                  placeholder="Confirm your password"
                />
                {touched.repassword && errors.repassword && (
                  <div className="field-error">{errors.repassword}</div>
                )}
              </div>

              {submitError && <div className="auth-error">{submitError}</div>}

              <button
                type="submit"
                className="btn btn-hero btn-lg auth-submit"
                disabled={!isFormValid()}
              >
                Create Account
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-switch-text">
                Already have an account?
                <Link to="/login" className="auth-switch-link">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;