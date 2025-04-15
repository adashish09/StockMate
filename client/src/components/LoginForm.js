import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="container mt-5 bg-light p-4 rounded">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="col-12">
          <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
        </div>
        {error && <div className="col-12 text-danger">{error}</div>}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </div>
        <div className="col-12 text-center">
          <p className="mt-3">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
