import React, { useState, useEffect } from 'react';
import { app } from '../auth.js';

const UpdateDuesByDate = ({ userId }) => {
  const [monthlyDues, setMonthlyDues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Initialize Firebase app (assuming you've already done this)
    const db = app.firestore();

    // Fetch the monthly dues data from Firestore for the specified user
    db.collection('users')
      .doc(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setMonthlyDues(doc.data().duesByDate);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching monthly dues:', error);
      });
  }, [userId]);

  const handleInputChange = (month, value) => {
    setMonthlyDues(prevMonthlyDues => ({
      ...prevMonthlyDues,
      [month]: value,
    }));
  };

  const handleSave = () => {
    setIsSaving(true);

    // Update the monthly dues data in Firestore for the specified user
    const db = app.firestore();
    db.collection('users')
      .doc(userId)
      .update({ duesByDate: monthlyDues })
      .then(() => {
        setIsSaving(false);
        console.log('Monthly dues updated successfully.');
      })
      .catch(error => {
        console.error('Error updating monthly dues:', error);
        setIsSaving(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Monthly Dues</h2>
      <form>
        {Object.entries(monthlyDues).map(([month, value]) => (
          <div key={month}>
            <label>{month}</label>
            <input
              type="number"
              value={value}
              onChange={e => handleInputChange(month, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UpdateDuesByDate;
