import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Papa from "papaparse";
import CuisineData from "../data/cuisineFinal.csv"; // Importing the CSV file
import "animate.css/animate.css";
import bannerImage from "../data/restaurant_banner.jpg";
import SpinWheel from "./spin-wheel";
import foodBackground from "../data/restaurant_banner.jpg"; // Common food background image

function RestaurantSearch() {
 const [selectedModule, setSelectedModule] = useState("");
 const [selectedCuisine, setSelectedCuisine] = useState("");
 const [selectedSuburb, setSelectedSuburb] = useState("");
 const [restaurants, setRestaurants] = useState([]);
 const [filteredRestaurants, setFilteredRestaurants] = useState([]);
 const [allCuisines, setAllCuisines] = useState([]);
 const [filteredCuisines, setFilteredCuisines] = useState([]);
 const [allSuburbs, setAllSuburbs] = useState([]);
 const [filteredSuburbs, setFilteredSuburbs] = useState([]);

 useEffect(() => {
   document.title = `Restaurant Search`;
   // Parse CSV data and set restaurants on component mount
   parseCSV(CuisineData);
 }, []);

 const parseCSV = (file) => {
   Papa.parse(file, {
     download: true,
     header: true,
     complete: (result) => {
       console.log("Parsed data:", result.data);
       const allRestaurants = result.data
         .map((row) => ({
           cuisine: row["Cuisine"] && row["Cuisine"].trim(), // Trim whitespace and handle undefined/null
           name: row["Trading name"],
           suburb: row["Suburb"],
           googleLink: row["Google Search Link"],
         }))
         .filter((restaurant) => restaurant.cuisine);

       // Extract unique cuisines
       const uniqueCuisines = [
         ...new Set(allRestaurants.map((restaurant) => restaurant.cuisine)),
       ];
       setAllCuisines(uniqueCuisines);
       setFilteredCuisines(uniqueCuisines);
       setRestaurants(allRestaurants);

       // Extract unique suburb names
       const suburbs = result.data
         .map((row) => row["Suburb"])
         .filter((suburb) => suburb);
       const uniqueSuburbs = [...new Set(suburbs)];
       setAllSuburbs(uniqueSuburbs);
       setFilteredSuburbs(uniqueSuburbs);
     },
   });
 };

 const handleCuisineChange = (event) => {
   const value = (event.target.value || "").trim().toLowerCase(); // Trim whitespaces from input value
   setSelectedCuisine(value);

   if (allCuisines && allCuisines.length > 0) {
     if (value.length > 0) {
       const filtered = allCuisines.filter((cuisine) =>
         cuisine.trim().toLowerCase().startsWith(value)
       );
       setFilteredCuisines(filtered);
     } else {
       setSelectedCuisine(""); // If value is empty, clear the selected cuisine
       setFilteredCuisines([]); // Clear the filtered cuisines
     }
   }
 };

 const handleSuburbChange = (event) => {
   const value = event.target.value; 
   if (value) {
     const trimmedValue = value.trim().toLowerCase(); 
     setSelectedSuburb(trimmedValue);

     const filtered = allSuburbs.filter((suburb) =>
       suburb.trim().toLowerCase().startsWith(trimmedValue)
     );
     setFilteredSuburbs(filtered);
   } else {
     setSelectedSuburb(""); 
     setFilteredSuburbs([]); 
   }
 };

 const handleCuisineSelect = (cuisine) => {
   setSelectedCuisine(cuisine);
   filterRestaurants(cuisine, selectedSuburb);
   setFilteredCuisines([]);
 };

 const handleSuburbSelect = (suburb) => {
   setSelectedSuburb(suburb);
   filterRestaurants(selectedCuisine, suburb);
   setFilteredSuburbs([]);
 };

 const filterRestaurants = (selectedCuisine, selectedSuburb) => {
   const filtered = restaurants.filter((restaurant) => {
     if (restaurant && restaurant.cuisine && restaurant.suburb) {
       return (
         restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase() &&
         restaurant.suburb.toLowerCase() === selectedSuburb.toLowerCase()
       );
     }
     return false;
   });
   setFilteredRestaurants(filtered);
 };

 return (
   <div>
     <div className="flex justify-center">
           <div className="p-4 w-3/4 rounded-lg shadow-lg">
             <ul className="mt-4 grid grid-cols-2 gap-4">
               <li
                 className={`cursor-pointer bg-white rounded-md shadow-lg p-4 transition duration-300 transform hover:shadow-xl hover:scale-105 ${
                   selectedModule === "Search Restaurant"
                     ? "border-2 border-blue-600"
                     : ""
                 }`}
                 onClick={() => setSelectedModule("Search Restaurant")}
               >
                 <h3 className="text-3xl text-black font-bold">
                   Find By Cuisine
                 </h3>
                 <p className="text-black-400">
                   Enter your prefered Cuisine below!
                 </p>
               </li>
               <li
                 className={`cursor-pointer bg-white rounded-md shadow-lg p-4 transition duration-300 transform hover:shadow-xl hover:scale-105 ${
                   selectedModule === "Play Spin Wheel"
                     ? "border-2 border-blue-600"
                     : ""
                 }`}
                 onClick={() => setSelectedModule("Play Spin Wheel")}
               >
                 <h3 className="text-3xl text-black font-bold">Play Spin Wheel</h3>
                 <p className="text-black-400">
                  Click Spin & we will help you decide!
                 </p>
               </li>
             </ul>
           </div>
         </div>

     {selectedModule !== "Play Spin Wheel" && (
       <>
         {/* Search Bar */}
         <div className="search-bar flex flex-col mt-8 items-center">
           <div className="mb-4">
             <label
               htmlFor="cuisine"
               className="mr-4 text-xl text-black font-bold"
             >
              Cuisine:
             </label>
             <input
              type="text"
              id="cuisine"
              className="border-2 border-gray-300 bg-teal-600 h-10 px-5 pr-10 rounded-lg text-lg text-stone-50 focus:outline-none w-96"
              value={selectedCuisine}
              onChange={handleCuisineChange}
              placeholder="Type your preferred cuisine here..."
              style={{ textTransform: 'lowercase' }}
            />
             {selectedCuisine && /[a-zA-Z]/.test(selectedCuisine) && (
               <div className="mt-2 w-full bg-white rounded-md shadow-lg">
                 <ul className="divide-y divide-gray-200">
                   {filteredCuisines.map((cuisine, index) => (
                     <li
                       key={index}
                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                       onClick={() => handleCuisineSelect(cuisine)}
                     >
                       {cuisine}
                     </li>
                   ))}
                 </ul>
               </div>
             )}
           </div>
           <div>
             <label
               htmlFor="suburb"
               className="mr-4 text-xl  text-black font-bold"
             >
               suburb:
             </label>
             <input
               type="text"
               id="suburb"
               className="border-2 border-gray-300 bg-teal-600 h-10 px-5 pr-10 rounded-lg text-lg text-stone-50 focus:outline-none w-96"
               value={selectedSuburb}
               onChange={handleSuburbChange}
               placeholder="Type your preferred suburb here..."
             />
             {/* Render the suburb dropdown only when there are letters inputted */}
             {selectedSuburb && /[a-zA-Z]/.test(selectedSuburb) && (
               <div className="mt-2 w-full bg-white rounded-md shadow-lg">
                 <ul className="divide-y divide-gray-200">
                   {filteredSuburbs.map((suburb, index) => (
                     <li
                       key={index}
                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                       onClick={() => handleSuburbSelect(suburb)}
                     >
                       {suburb}
                     </li>
                   ))}
                 </ul>
               </div>
             )}
           </div>
         </div>
         <div style={{ backgroundImage: `url(${foodBackground})`, backgroundSize: "cover" }}>
          <div className="container mx-auto relative">
            <Splide
              options={{
                perPage: 5,
                rewind: true,
                gap: '1rem',
                autoplay: true,
                pauseOnHover: true,
                pagination: false,
                arrows: true,
                classes: {
                  arrows: 'splide__arrows',
                  arrow: 'splide__arrow',
                  prev: 'splide__arrow--prev',
                  next: 'splide__arrow--next',
                },
              }}
            >
             {filteredRestaurants.map((restaurant, index) => (
  <SplideSlide key={index}>
    <a
      href={restaurant.googleLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4"
    >
      <div className="bg-white rounded-lg shadow-lg transition duration-300 transform hover:shadow-xl hover:scale-105">
        <div className="p-4">
          
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <p className="text-gray-600">Suburb: {restaurant.suburb}</p>
          <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
          <p className={`text-blue-600 ${index === 0 ? 'underline' : ''}`}>Google Link</p>
        </div>
      </div>
    </a>
  </SplideSlide>
))}

            </Splide>
          </div>
        </div>

        {/* No restaurants found messages */}
        {filteredRestaurants.length === 0 &&
          selectedCuisine &&
          selectedSuburb && (
            <div className="filtered-restaurants mt-6">
              <h2 className="text-xl font-bold mb-2">
                No restaurants found with the selected cuisine!
              </h2>
            </div>
          )}
       </>
     )}

     {/* Play Spin Wheel */}
     {selectedModule === "Play Spin Wheel" && (
       <div className="spin-wheel-container">
         <SpinWheel />
       </div>
     )}
   </div>
 );
}

export default RestaurantSearch;
