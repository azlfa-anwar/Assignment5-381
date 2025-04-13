import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Simulate signup process
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('User signed up:', formData);
      navigate('/login'); // Redirect to login page after signup
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* Username */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {/* Confirm Password */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          color: '#D32F2F', 
          backgroundColor: '#FFEBEE', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          {error}
        </div>
      )}

      {/* Signup Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isSubmitting ? '#A5D6A7' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '10px',
          opacity: isSubmitting ? 0.6 : 0.5,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
        }}
        onMouseOver={(e) => {
          if (!isSubmitting) {
            e.target.style.backgroundColor = '#45A049';
            e.target.style.opacity = '1.0';
          }
        }}
        onMouseOut={(e) => {
          if (!isSubmitting) {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.opacity = '0.5';
          }
        }}
      >
        {isSubmitting ? 'Signing up...' : 'Signup'}
      </button>
    </form>
  );
};

export default RegForm;
