import React, { useState, useEffect } from 'react';
import { app, handleMonthChange, handleSave } from '../auth.js';

function ManageDues() {
  const [monthlyDues, setMonthlyDues] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {

    // Fetch the monthly dues data from Firestore for the current user
    const currentUser = app.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      db.collection('monthly-dues')
        .doc(userId)
        .get()
        .then(doc => {
          if (doc.exists) {
            setMonthlyDues(doc.data().monthlyDues);
          } else {
            setMonthlyDues([]);
          }
        })
        .catch(error => {
          console.error('Error fetching monthly dues:', error);
        });
    }
  }, []);


  return (
    <div className="container px-4 pb-8 pt-[100px] mx-auto">
      <h2 className="mb-4 text-lg font-medium text-gray-600">Manage Monthly Dues</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <table className="w-full mb-4 border-collapse table-auto">
          <thead>
            <tr>
              {[...Array(12)].map((_, i) => (
                <th key={i} className="px-4 py-2 font-medium text-gray-600 border border-gray-500">{`${i+1}`.padStart(2, '0')}-2022</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {monthlyDues.map((monthlyDue, i) => (
                <td key={i} className="px-4 py-2 border border-gray-500">
                  <input type="number" value={monthlyDue} onChange={event => handleMonthChange(i, event)} className="w-full text-gray-600 outline-none" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md" onClick={handleSave(setIsSaving)} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

export default ManageDues;
