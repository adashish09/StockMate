import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Account = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        setFormData({
          displayName: currentUser.displayName || '',
          email: currentUser.email || '',
          phoneNumber: currentUser.phoneNumber || 'N/A',
          address: userData.address || '',
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
        });

        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          address: formData.address,
        }, { merge: true });

        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg border-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary"><i className="bi bi-person-circle me-2"></i>Your Account</h2>
          {user && !isEditing && (
            <span className="badge bg-success fs-6">Logged In</span>
          )}
        </div>

        {user ? (
          <>
            <div className="mb-3">
              <label className="form-label"><i className="bi bi-person-fill me-2"></i><strong>Full Name</strong></label>
              <input
                type="text"
                name="displayName"
                className="form-control"
                value={formData.displayName}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><i className="bi bi-envelope-fill me-2"></i><strong>Email</strong></label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><i className="bi bi-telephone-fill me-2"></i><strong>Phone Number</strong></label>
              <input
                type="text"
                className="form-control"
                value={formData.phoneNumber}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><i className="bi bi-geo-alt-fill me-2"></i><strong>Address</strong></label>
              <textarea
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                readOnly={!isEditing}
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <i className="bi bi-pencil-fill me-1"></i>Edit Profile
                </button>
              ) : (
                <>
                  <button className="btn btn-success" onClick={handleSave}>
                    <i className="bi bi-check-circle me-1"></i>Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    <i className="bi bi-x-circle me-1"></i>Cancel
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="text-muted">Please log in to view your account details.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
