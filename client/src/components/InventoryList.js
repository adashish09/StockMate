import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import InventoryForm from './InventoryForm';


function InventoryList() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleNewItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };


  const fetchItems = async () => {
    if (!user) return;
    try {
      const res = await axios.get('http://localhost:5000/api/items', {
        params: { userId: user.uid },
      });
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [user]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      price: item.price,
    });
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    await axios.put(`http://localhost:5000/api/items/${id}`, editValues);
    setEditingId(null);
    fetchItems();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const filteredItems = items
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === 'price' || sortField === 'quantity') {
        return sortOrder === 'asc'
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else {
        return sortOrder === 'asc'
          ? a[sortField]?.localeCompare(b[sortField])
          : b[sortField]?.localeCompare(a[sortField]);
      }
    });

  return (
    <div className="container mt-4">
      <InventoryForm onItemAdded={handleNewItem} />
      <h4>Your Inventory</h4>

      {/* Search and Sort Controls */}
      <div className="row mb-3 mt-3">
        <div className="col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Search by name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) =>
                editingId === item.id ? (
                  <tr key={item.id}>
                    <td><input name="name" value={editValues.name} onChange={handleEditChange} className="form-control" /></td>
                    <td><input name="quantity" value={editValues.quantity} onChange={handleEditChange} className="form-control" /></td>
                    <td><input name="category" value={editValues.category} onChange={handleEditChange} className="form-control" /></td>
                    <td><input name="price" value={editValues.price} onChange={handleEditChange} className="form-control" /></td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(item.id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InventoryList;
