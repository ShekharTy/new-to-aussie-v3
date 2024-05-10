import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Header from "./header";
import Footer from "./footer";
import CardComponent from './card'; // Import the card component
import '@splidejs/react-splide/css'; // Import default Splide CSS
import bannerImage from '../data/foodbg1.jpg';
import breakkieImage from '../data/breakkie.jpg';
import breakfastpic from '../data/bfcard.jpg';

function RestaurantDetails({ name, cuisine, phone, address, rating, web_url }) {
  return (
    <a className="max-w-md mx-auto flex justify-around flex-col group bg-white border shadow-sm rounded-lg overflow-hidden hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" href="#" style={{ flex: '1 1 300px' }}>
      <div className="relative pt-[40%] sm:pt-[50%] lg:pt-[60%] rounded-t-lg overflow-hidden">
        <a href={web_url} target="_blank" rel="noopener noreferrer">
          <img className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl" src={breakkieImage} alt="Image Description" />
        </a>
      </div>
      <div className="p-2 md:p-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {name}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-white">Cuisine: {cuisine ? cuisine.map(c => c.name).join(', ') : 'Not available'}</p>
        <p className="mt-1 text-xs md:text-sm text-white">Phone: {phone}</p>
        <p className="mt-1 text-xs md:text-sm text-white">Address: {address}</p>
        <p className="mt-1 text-xs md:text-sm text-white">Rating: {rating}</p>
      </div>
    </a>
  );
}

function BreakfastRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Array of location IDs for the top 10 breakfast restaurants
  const locationIds = ['10536000', '2416757', '4230172', '1971945', '4096822', '2432079', '7911768', '2458396', '2511491', '6740127'];

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_TRIPADVISOR_API_KEY;
        const proxyUrl = 'http://localhost:5000/api?url=';

        const restaurantData = [];

        for (const locationId of locationIds) {
          const url = `${proxyUrl}https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();

          restaurantData.push(data);
        }

        console.log('Restaurant Details:', restaurantData); // Log fetched data

        setRestaurants(restaurantData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantDetails();
  }, []); // Run only once on component mount

  return (
    <div>
      <Header />
      {/* Banner */}
      <div className="relative bg-cover bg-center h-64 flex flex-col justify-center items-center text-white">
        <img
          src={bannerImage}
          alt="Banner"
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        />
        <div className="absolute top-1/3 transform -translate-y-1/2 text-center">
          <div className="bg-black bg-opacity-50 text-white text-5xl font-bold py-2 px-4 rounded">
            ALL ABOUT FOOD IN MELBOURNE
          </div>
          <p className="bg-black bg-opacity-50 text-white text-xl font-bold py-2 px-4 rounded">
            Discover the best food spots
          </p> 
        </div>
      </div>
      {/* Conditionally render the cards */}
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardComponent
            title="Breakfast "
            description="Explore Best Breakfast Spots in Melbourne CBD."
            image={breakfastpic} // Pass the uploaded image data
            />
          

          {/* Card 2: Lunch & Dinner */}
          <CardComponent
            title="Lunch"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            imageUrl={breakkieImage} // Assuming you have the breakfast image
          />

          {/* Card 3: Dessert */}
          <CardComponent
            title="Dessert"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            imageUrl="https://example.com/lunch_dinner_image.jpg" // Provide the lunch & dinner image URL
          />
        </div>
      </div>

      <div className="bg-yellow-300">
        {/* Slider */}
        <div className="container mx-auto py-4 py-6 relative">
          <h1 className="text-3xl font-bold mb-4 text-black">Morning Delights: Best Breakfast Spots</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Splide options={{
              perPage: 3,
              rewind: true,
              width: '100%',
              gap: '1rem',
              padding: { right: '5rem', left: '5rem' },
              autoplay: true,
              pauseOnHover: true,
              autoplaySpeed: 3000,
              type: 'loop'
            }}>
              {restaurants.map((restaurant, index) => (
                <SplideSlide key={index}>
                  <RestaurantDetails
                    name={restaurant.name}
                    cuisine={restaurant.cuisine}
                    phone={restaurant.phone}
                    address={restaurant.address}
                    rating={restaurant.rating}
                    web_url={restaurant.web_url}
                  />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BreakfastRestaurants;
