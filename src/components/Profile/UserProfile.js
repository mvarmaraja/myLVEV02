import React, { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      {/* Add more profile information and edit functionality */}
    </div>
  );
};

export default UserProfile;