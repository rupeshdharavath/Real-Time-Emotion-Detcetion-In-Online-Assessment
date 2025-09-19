import React, { useState } from 'react';

const AuthForm = ({ isRegistering, toggleAuthMode, handleAuth }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    const authData = isRegistering 
      ? { username: formData.username, password: formData.password }
      : { username: formData.username, password: formData.password };
    
    handleAuth(e, authData);
  };

  return (
        <div className="container-fluid  d-flex align-items-center justify-content-center" style={{marginTop:"80px"}}>
      <form onSubmit={handleSubmit} className="w-50">
        <div className='row'>
            <div className='col-3'>
            <img src='ed1.png' style={{height:"60px",width:"90px"}}></img>
            </div>
            <div className='col-5 p-1'>
            <h2 className="text-center mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
            </div>
        </div>
        
        
        
        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder='enter user name'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            name="password"
            placeholder='enter password'
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isRegistering && (
          <div className="mb-3">
            <label className="form-label fw-bold">Confirm Password</label>
            <input
              type="password"
              placeholder='confirm password'
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-dark">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </div>

        <div className="text-center mt-3">
          <button type="button" className="btn btn-link" onClick={toggleAuthMode}>
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </form>
    </div>

  );
};

export default AuthForm;
