import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Header from "./header";
import Footer from "./footer";
import CardComponent from './card'; 
import '@splidejs/react-splide/css'; 
import bannerImage from '../data/foodbg1.jpg';
import cafeImage from '../data/breakkie.jpg';
import breakfastpic from '../data/bfcard.jpg';
import asianFood from '../data/asianFoodCardPic.jpg';
import funFact1 from '../data/vegemite.jpg';
import funFact2 from '../data/coffee.jpg';
import funFact3 from '../data/melb_multiculture.jpg';
import funFact4 from '../data/man_eating.jpg';

function RestaurantDetails({ name, cuisine, phone, address, rating, web_url }) {
  console.log('Cuisine:', cuisine);
  console.log('Phone:', phone);
  console.log('Address:', address);
  return (
    <a className="max-w-md mx-auto flex justify-around flex-col group bg-white rounded-lg overflow-hidden hover:shadow-lg transition" href={web_url} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 300px' }}>
      <div className="relative pt-[40%] sm:pt-[50%] lg:pt-[60%] rounded-t-lg overflow-hidden">
        <img className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl" src={cafeImage} alt="Breakfast Suggestions" />
      </div>
      <div className="p-2 md:p-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-black">{name}</h3>
        <p className="mt-1 text-xs md:text-sm text-black">{cuisine ? cuisine.map(c => c.name).join(', ') : 'Not available'}</p>
        <p className="mt-1 text-xs md:text-sm text-black">{phone}</p>
        <p className="mt-1 text-xs md:text-sm text-black">{address}</p>
        <p className="mt-1 text-xs md:text-sm text-black">Ratings: {rating}</p>
      </div>
    </a>
  );
}
  
function BreakfastRestaurants() {
  const [breakfastRestaurants, setBreakfastRestaurants] = useState([]);
  const [asianRestaurants, setAsianRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMorningDetails, setShowMorningDetails] = useState(false);
  const [showAsianDetails, setShowAsianDetails] = useState(false);
  const [showFunFacts, setShowFunFacts] = useState(false); // Define showFunFacts state

  // Array of location IDs for the top 10 breakfast restaurants
  const breakfastLocationIds = ['10536000', '2416757', '4230172', '1971945', '4096822', '2432079', '7911768', '2458396', '2511491', '6740127'];
  
  const asianLocationIds = ['5539081','16894781','3348084','9554485','528619'];

  useEffect(() => {
    const fetchRestaurantDetails = async (locationIds) => {
      try {
        const apiKey = process.env.REACT_APP_TRIPADVISOR_API_KEY;
        const restaurantData = [];
        for (const locationId of locationIds) {
          const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}`;
          const response = await fetch(url);
          const data = await response.json();
          restaurantData.push(data);
        }
        console.log('Restaurant Details:', restaurantData);
        return restaurantData;
        
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        return [];
      }
    };

    const fetchBreakfastDetails = async () => {
      const breakfastData = await fetchRestaurantDetails(breakfastLocationIds);
      setBreakfastRestaurants(breakfastData);
      console.log('Breakfast Data:', breakfastData);
    };
    const fetchAsianDetails = async () => {
      const asianData = await fetchRestaurantDetails(asianLocationIds);
      setAsianRestaurants(asianData);
      console.log('Asian Data:', asianData);
    };
  
    fetchBreakfastDetails();
    fetchAsianDetails();
    setLoading(false);
  }, []);

  const [factIndex, setFactIndex] = useState(null);

  // Array of fun food facts
  const funFacts = [
    "Did you know that the iconic Australian spread Vegemite was invented in Melbourne in 1922?!",
    "Melbourne is known for its vibrant coffee culture, boasting more cafes and coffee roasters per capita than any other city in the world.",
    "Melbourne's diverse culinary scene includes influences from around the globe, with renowned dining precincts offering everything from authentic Italian pasta to spicy Sichuan cuisine!",
    "Melbourne is known for its love of brunch, with cafes serving up innovative and Instagram-worthy dishes like smashed avocado toast, colorful smoothie bowls, and decadent pancakes.",
  ];

  const handleClick = (index) => {
    setFactIndex(index);
  };

  const renderFunFacts = () => {
    const funFactImages = [funFact1, funFact2, funFact3, funFact4];
  
    return (
      <div className="container mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-black"> FOOD FACTS </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-xl">
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
              {funFactImages.map((image, index) => (
                <SplideSlide key={index} className="hover:scale-105">
                  <img src={image} alt={`Fun Fact ${index + 1}`} onClick={() => handleClick(index)} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
        {factIndex !== null && (
          <div className="relative mt-16">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-amber-200 rounded-lg p-4 shadow-md">
                <p className="text-lg font-medium font-comic-sans text-gray-800">{funFacts[factIndex]}</p>
              </div>
            </div>
        </div>   
        )}
      </div>
    );
  };
           
        
  return (
    <div>
      <Header />
      <div className="relative bg-cover bg-center h-64 flex flex-col justify-center items-center text-white">
        <img
          src={bannerImage}
          alt="Restaurants"
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

      {/* Render food facts */}
      {renderFunFacts()}

      <div className="mt-16"></div>
      <div className="container mx-auto py-4">
       <h1 className="text-4xl font-bold mb-4 text-black"> UNCOVER THE BEST CAFES AND FINEST ASIAN CUISINES</h1>
       <div className="flex justify-center">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
          <CardComponent
            title="Cafes"
            description="Explore Best Cafes in Melbourne CBD"
            image={breakfastpic}
            toggleDetails={() => setShowMorningDetails(!showMorningDetails)}
           
          />
          {/* Card 2: Lunch & Dinner */}
          <CardComponent
            title="Asian restaurants"
            description="Top Asian restaurants in Melbourne CBD"
            image={asianFood}
            toggleDetails={() => setShowAsianDetails(!showAsianDetails)}
            
          />
        </div>
        </div>
      </div>
  
      {showMorningDetails && (
        <div className="bg-yellow-300">
          <div className="container mx-auto py-4 py-6 relative">
            <h1 className="text-5xl font-bold mb-4 text-center text-black">Morning Delights: Best Cafes</h1>
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
                {breakfastRestaurants.map((restaurant, index) => (
                  <SplideSlide key={index}>
                    <RestaurantDetails
                      name={restaurant.name}
                      cuisine={restaurant.cuisine}
                      phone={restaurant.phone}
                      address={`${restaurant.address_obj ? restaurant.address_obj.street1 : 'Address not available'}, ${restaurant.address_obj ? restaurant.address_obj.city : ''}, ${restaurant.address_obj ? restaurant.address_obj.state : ''}, ${restaurant.address_obj ? restaurant.address_obj.country : ''}, ${restaurant.address_obj ? restaurant.address_obj.postalcode : ''}`}
                      rating={restaurant.rating}
                      web_url={restaurant.web_url}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>
        </div>
      )}
  
      {showAsianDetails && (
        <div className="bg-yellow-300">
          {/* Slider */}
          <div className="container mx-auto py-4 py-6 relative">
            <h1 className="text-5xl font-bold mb-4 text-center text-black">Top 5 Asian Restaurants</h1>
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
                {asianRestaurants.map((restaurant, index) => (
                  <SplideSlide key={index}>
                    <RestaurantDetails
                      name={restaurant.name}
                      cuisine={restaurant.cuisine}
                      phone={restaurant.phone}
                      address={`${restaurant.address_obj ? restaurant.address_obj.street1 : 'Address not available'}, ${restaurant.address_obj ? restaurant.address_obj.city : ''}, ${restaurant.address_obj ? restaurant.address_obj.state : ''}, ${restaurant.address_obj ? restaurant.address_obj.country : ''}, ${restaurant.address_obj ? restaurant.address_obj.postalcode : ''}`}
                      rating={restaurant.rating}
                      web_url={restaurant.web_url}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>
        </div>
      )}
  
      <Footer />
    </div>
  );
}

export default BreakfastRestaurants;
