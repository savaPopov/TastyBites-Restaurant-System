import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useFormValidation } from "../../hooks/useFormValidation";
import "./Auth.css";
import { useLogin } from "../../hooks/useAuth";

const initialValues = { email: '', password: '' };

const Login = () => {
  const [submitError, setSubmitError] = useState("");
  const login = useLogin();
  const navigate = useNavigate();



  const { values, changeHandler, submitHandler } = useForm(initialValues, loginHandler);


  const { errors, touched, handleBlur, markAllTouched, isFormValid } = useFormValidation(values);

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

  const testLogin = async (email, password) => {
    try {
      console.log('🔧 Direct fetch test with:', { 
        email: `'${email}'`, 
        password: `'${password}'`,
        emailLength: email.length,
        passwordLength: password.length
      });
      
      const payload = {
        email: email,
        password: password
      };
      
      console.log('📤 Sending payload:', JSON.stringify(payload));
      
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      console.log('📨 Response status:', response.status);
      console.log('📨 Response headers:', response.headers);
      
      const result = await response.json();
      console.log('📨 Response body:', result);
      
      if (response.ok) {
        console.log('✅ Direct login successful!');
        navigate('/');
      } else {
        console.log('❌ Direct login failed:', result);
        setSubmitError(result.message);
      }
    } catch (err) {
      console.log('❌ Direct fetch error:', err);
      setSubmitError(err.message);
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