import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Header from "./header";
import Footer from "./footer";
import CardComponent from './card'; 
import '@splidejs/react-splide/css'; 
import RestaurantSearch from './restaurant1';
import bannerImage from '../data/foodbg1.jpg';
import cafeImage from '../data/breakkie.jpg';
import breakfastpic from '../data/bfcard.jpg';
import asianFood from '../data/asianFoodCardPic.jpg';
import funFact1 from '../data/vegemite.jpg';
import funFact2 from '../data/coffee.jpg';
import funFact3 from '../data/tramcar.jpg';
import funFact4 from '../data/coffee.jpg';
import funFact5 from '../data/melb_multiculture.jpg';
import funFact6 from '../data/lamington.jpg';
import funFact7 from '../data/seafood.jpg';
import funFact8 from '../data/meatpie.jpg';
import funFact9 from '../data/kangaroo.jpg';
import funFact10 from '../data/melb_multiculture.jpg';
import funFact11 from '../data/timtam.jpeg';
import funFact12 from '../data/melb_multiculture.jpg';
import funFact13 from '../data/anzac.jpg';


function RestaurantDetails({ name, cuisine, phone, address, rating, web_url }) {
  console.log('Cuisine:', cuisine);
  console.log('Phone:', phone);
  console.log('Address:', address);
  return (
    <div className="max-w-md mx-auto flex justify-around flex-col group bg-white rounded-lg overflow-hidden hover:shadow-lg transition" href={web_url} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 300px' }}>
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
    </div>
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
        const apiKeys = process.env.REACT_APP_TRIPADVISOR_API_KEY.split(',');
       

       
        const restaurantData = [];
  
        for (const apiKey of apiKeys) {
          for (const locationId of locationIds) {
            const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}`;
            try {
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();
                restaurantData.push(data);
                break; // Break the inner loop if successful
              }
            } catch (error) {
              console.error('Error fetching restaurant data:', error);
            }
          }
          if (restaurantData.length > 0) {
            // Data fetched successfully, break the outer loop
            break;
          }
        }
  
        console.log('Restaurant Details:', restaurantData);
        return restaurantData;
          
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        return [];
      }
    };
  
    // Call fetchRestaurantDetails with locationIds
  
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
    "Melbourne has the highest number of cafes and restaurants per number of people than any other city in the world.",
    "The top-rated restaurant in Melbourne is a tram! The Colonial Tramcar Restaurant takes passengers around the city while they dine on meals prepared by some of the best chefs in the city!",
    "Melbourne generally imports 30 tons of coffee beans per day. That is enough to make 3M cups of coffee",
    "Melbourne is the city with the largest Greek population outside of Athens.",
    "Lamingtons are a beloved Australian dessert",
    "Australia produces some of the finest seafood in the world",
    "The meat pie is an Aussie staple",
    "Kangaroo meat is consumed in Australia",
    "Bush tucker is a unique culinary experience in Australia",
    "Tim Tams are a beloved Australian chocolate biscuit",
    "Australian cuisine is heavily influenced by diverse cultural backgrounds",
    "The ANZAC biscuit originated during world war 1 is a symbol of remembrance for Australian and New Zealand soldiers."];

  const handleClick = (index) => {
    setFactIndex(index);
  };

  const renderFunFacts = () => {
    const funFactImages = [funFact1, funFact2, funFact3, funFact4,
      funFact5,funFact6,funFact7,funFact8,funFact9,funFact10,funFact11,funFact12,
      funFact13];
  
  return (
    <div className="bg-yellow-200">
      <div className="container mx-auto py-4">
        <h1 className="text-4xl font-bold mb-4 text-center text-black"> FOOD FACTS </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-xl">
            <Splide options={{
              perPage: 2,
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
          <div className="relative mt-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-teal-100 rounded-lg p-4 shadow-md text-center w-64 h-54">
                <p className="text-lg font-medium font-sans text-black">{funFacts[factIndex]}</p>
              </div>
            </div>
        </div>   
        )}
      </div>
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

      <div className="bg-yellow-100">
      <div className="mt-20"></div>
      <div className="container mx-auto py-4">
       <h1 className="text-5xl font-bold mb-4  text-center text-black"> UNCOVER THE BEST CAFES AND FINEST ASIAN CUISINES</h1>
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
        <div className="bg-yellow-300">
          {/* Slider */}
            <div className="container mx-auto py-4 py-6 relative">
              <h1 className="text-5xl font-bold mb-4 text-center text-black">Satisfy Your Cravings: Find Restaurants by Cuisine</h1>
                <RestaurantSearch />
            </div>
      <Footer />
  </div>
</div>
  );
}

export default BreakfastRestaurants;