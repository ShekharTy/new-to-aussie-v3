
import React, { useState, useEffect } from 'react';


function RestaurantDetails() {
 const [restaurant, setRestaurant] = useState(null);
 const [loading, setLoading] = useState(true);


 useEffect(() => {
   const fetchRestaurantDetails = async () => {
     try {
       const apiKey = process.env.REACT_APP_TRIPADVISOR_API_KEY;
       const locationId = '5539081';
       const proxyUrl = 'http://localhost:5000/api?url=';
       const url = `${proxyUrl}https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}`;
      
       const response = await fetch(url);
       const data = await response.json();


       setRestaurant(data);
       setLoading(false);
     } catch (error) {
       console.error('Error fetching restaurant data:', error);
     }
   };


   fetchRestaurantDetails();
 }, []);


 return (
   <div className="container">
     <h1>Restaurant Details</h1>
     {loading ? (
       <p>Loading...</p>
     ) : (
       <div>
         {restaurant && (
           <>
             <p>Name: {restaurant.name}</p>
             <p>Cuisine: {restaurant.cuisine.map(c => c.name).join(', ')}</p>
             <p>Phone: {restaurant.phone}</p>
             <p>Address: {restaurant.address_obj.street1}, {restaurant.address_obj.city}, {restaurant.address_obj.state}, {restaurant.address_obj.country}, {restaurant.address_obj.postalcode}</p>
             <p>Ratings: {restaurant.rating}</p>
             <p>Web URL: <a href={restaurant.web_url} target="_blank" rel="noopener noreferrer">{restaurant.web_url}</a></p>
           </>
         )}
       </div>
     )}
   </div>
 );
}


export default RestaurantDetails;





