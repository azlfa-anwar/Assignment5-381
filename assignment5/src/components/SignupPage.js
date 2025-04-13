import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';

const SignupPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />

      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#003366',
        color: 'white',
        padding: '10px'
      }}>
        <a href="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          margin: '0 10px' 
        }}>Homepage</a>
      </nav>

      <main style={{
        backgroundColor: '#eeeeee', 
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
      }}>

        <h2 style={{
          fontSize: '24px',
          color: '#003366',
          margin: '20px 0 25px 0'
        }}>
          Sign Up
        </h2>
        <RegForm />
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage;
