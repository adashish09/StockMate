import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import InventoryList from './InventoryList';
import 'bootstrap-icons/font/bootstrap-icons.min.css';


function Dashboard() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4 mb-5 bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold text-primary mb-1">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </h3>
            <p className="mb-0 fs-5 text-muted">
              Welcome, <strong>{user?.displayName || user?.email}</strong> 👋
            </p>
          </div>
          <button className="btn btn-danger fw-bold" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 bg-white">
        <h4 className="text-secondary fw-semibold mb-4">
          <i className="bi bi-boxes me-2"></i>Your Inventory
        </h4>
        <InventoryList />
      </div>
    </div>
  );
}

export default Dashboard;
