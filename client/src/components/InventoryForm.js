import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';

function InventoryForm({onItemAdded}) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    price: '',
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await axios.post('http://localhost:5000/api/items', {
        ...formData,
        userId: user.uid,
      });
      if (onItemAdded) {
        onItemAdded(res.data);
      }
      setFormData({ name: '', quantity: '', category: '', price: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="container my-4">
      <h4>Add Item</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input type="number" name="quantity" className="form-control" placeholder="Qty" value={formData.quantity} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input type="text" name="category" className="form-control" placeholder="Category" value={formData.category} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <input type="number" name="price" className="form-control" placeholder="Price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InventoryForm;
