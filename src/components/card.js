import React, { useState } from 'react';

function CardComponent({ title, description, image, restaurantDetails }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="relative bg-white border shadow-sm rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)}>
      <div className="aspect-w-16 aspect-h-9">
        <img className="object-cover" src={image} alt="Image Description" />
      </div>
      {showDetails && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-3xl font-bold py-2 px-4 rounded cursor-pointer" onClick={toggleDetails}>
          {restaurantDetails}
        </div>
      )}
      <div className="p-4 md:p-5">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CardComponent;
