import React, { useState, useEffect } from "react";
import "../j.js/index.css";

function AApp({user}) {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        console.log("Current user:", user);

        // Fetch top users
        const topUsersResponse = await fetch("http://localhost:5000/daily-top");
        console.log("Top users response status:", topUsersResponse.status);
        
        if (!topUsersResponse.ok) {
          throw new Error(`HTTP error! status: ${topUsersResponse.status}`);
        }
        
        const topUsersData = await topUsersResponse.json();
        console.log("Top users data:", topUsersData);
        

        setTopUsers(topUsersData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
        <p className="mt-4 text-pink-500">Loading rankings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">⚠️</div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-pink-500 text-3xl font-bold mb-6 text-center">
        Most favorite Users
      </h2>
      
      {topUsers.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">No ratings yet today. Be the first to rate!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <div 
              key={`${user.displayName}-${index}`} 
              className="flex items-center bg-white p-4 rounded-xl shadow-md border border-pink-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full text-pink-600 font-bold mr-4">
                {index + 1}
              </div>
              
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-pink-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-gray-500">👤</span>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                  {user.displayName || 'Anonymous User'}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">Avg Rating:</span>
                  <span className="font-bold text-pink-600">
                    {user.averageDailyRating?.toFixed(1) || '0.0'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{user.ratingsCount || 0} ratings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AApp;