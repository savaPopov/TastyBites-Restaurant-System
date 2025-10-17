import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useAuthFormValidation } from "../../hooks/useAuthFormValidation";
import "./Auth.css";
import { useLogin } from "../../hooks/useAuth";

const initialValues = { email: '', password: '' };

const Login = () => {
  const [submitError, setSubmitError] = useState("");
  const login = useLogin();
  const navigate = useNavigate();



  const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);


  const { errors, touched, handleBlur, markAllTouched, isFormValid } = useAuthFormValidation(values);

  async function loginHandler(formValues) {

    const formErrors = markAllTouched();
    if (Object.values(formErrors).some(error => error)) return;

    try {

      
      // await testLogin(formValues.email,formValues.password);
      await login(formValues.email, formValues.password);
      navigate("/");
    } catch (err) {
      setSubmitError('Invalid email or password. Please try again.');
    }
  }

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">🍔</div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your account to continue</p>
            </div>

            <form onSubmit={submitHandler} className="auth-form">
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

              {submitError && <div className="auth-error">{submitError}</div>}

              <button
                type="submit"
                className="btn btn-hero btn-lg auth-submit"
                disabled={!isFormValid()}
              >
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-switch-text">
                Don't have an account?
                <Link to="/register" className="auth-switch-link">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;