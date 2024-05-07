import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch'; // Import fetch for Node.js environment

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const apiKey = process.env.TRIPADVISOR_API_KEY; // Replace with your TripAdvisor API key
        const url = `https://api.tripadvisor.com/restaurant/list?location_id=255100&limit=10&currency=USD&key=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();

        // Extract relevant restaurant information
        const extractedRestaurants = data.data.map(restaurant => ({
          name: restaurant.name,
          rating: restaurant.rating,
          location: restaurant.location_string,
          photo: restaurant.photo ? restaurant.photo.images.small.url : '' // Check if photo exists and extract URL
        }));

        setRestaurants(extractedRestaurants);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="container">
      <h1>Restaurant List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index}>
              <h2>{restaurant.name}</h2>
              <p>Rating: {restaurant.rating}</p>
              <p>Location: {restaurant.location}</p>
              {restaurant.photo && <img src={restaurant.photo} alt={restaurant.name} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantList;
