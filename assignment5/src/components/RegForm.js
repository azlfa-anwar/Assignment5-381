import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validate = () => {
    const newErrors = [];

    if (!/^[A-Za-z][A-Za-z0-9-_]{2,19}$/.test(formData.username)) {
      newErrors.push("Username must be 3–20 characters, start with a letter, and may only contain letters, numbers, hyphens, or underscores.");
    }

    if (!/^[^\s@]+@[^\s@]+\.(com|net|io)$/.test(formData.email)) {
      newErrors.push("Email must be valid and end with .com, .net, or .io.");
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=+[\]{}|;:'\",.<>?/`~]).{8,}$/.test(formData.password)) {
      newErrors.push("Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.");
    }

    if (/\s/.test(formData.password)) {
      newErrors.push("Password cannot contain spaces.");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      if (!res.ok) {
        const result = await res.json();
        setErrors([result.message || "Signup failed."]);
        return;
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setErrors(["Could not connect to server. Try again."]);
    }
  };

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        style={{
          backgroundColor: '#d4d4d4',
          padding: '30px',
          margin: '0 150px 30px 150px',
          borderRadius: '30px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: 'calc(100% - 300px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        {['username', 'password', 'confirmPassword', 'email'].map((field, index) => {
          const isPassword = field.toLowerCase().includes('password');
          const label = field
            .replace('confirmPassword', 'Confirm Password')
            .replace('username', 'Username')
            .replace('email', 'Email')
            .replace('password', 'Password');

          return (
            <div key={index} style={{
              marginBottom: '25px',
              textAlign: 'center',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <label 
                htmlFor={field} 
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                {label}:
              </label>
              <input 
                type={isPassword ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: 'lightyellow',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '3px solid darkgrey',
                  width: '300px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          );
        })}

        <button 
          type="submit" 
          style={{
            backgroundColor: '#008000',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#006600';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#008000';
          }}
        >
          Sign Up
        </button>
      </form>

      {(errors.length > 0 || success) && (
      <div style={{
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid black',
        margin: '25px auto',
        padding: '15px',
        width: 'fit-content',
        maxWidth: '500px',
        borderRadius: '8px',
        textAlign: success ? 'center' : 'left',
        fontSize: '14px',
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)'
      }}>
        {success ? (
          <strong>{success}</strong>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}
      </div>
    )}


      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link to="/login" style={{ 
          color: '#4b0082', 
          textDecoration: 'none', 
          fontSize: '14px' 
        }}>
          Already have an account? Login here
        </Link>
      </div>
    </>
  );
};

export default RegForm;
