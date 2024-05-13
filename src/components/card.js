import React, { useState } from 'react';
import restaurantDetails from './restaurant';

function CardComponent({ title, description, image, restaurantDetails, toggleDetails, webUrl}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleCardDetails = (event) => {
    event.preventDefault(); 
    setShowDetails(!showDetails);
    toggleDetails(); 
  };

  return (
    <a className="relative block bg-white border shadow-sm rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 hover:bg-zinc-800 transition duration-300" href={webUrl} target="_blank" rel="noopener noreferrer" onClick={toggleCardDetails}>
      <div className="aspect-w-16 aspect-h-9">
        <img className="object-cover" src={image} alt="Image Description" />
      </div>
     
      <div className="p-4 md:p-5">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {description}
        </p>
        <button className="mt-2 text-sm text-gray-500 dark:text-neutral-400 underline">
          {showDetails ? 'Hide Restaurants' : 'Show Restaurants'}
        </button>
        {showDetails && (
          <div className="mt-4 text-sm text-gray-500 dark:text-neutral-400">
            {restaurantDetails}
          </div>
          
        )}
      </div>
    </a>
  );
}

export default CardComponent;
