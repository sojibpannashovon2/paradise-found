

import React, { useState } from 'react';
const Carousel = () => {



const images = [
  'https://upload.wikimedia.org/wikipedia/commons/7/7f/Saint-martin%27s-island.JPG',
  'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/01/16170702/tiger-1600x900.jpg',
  'https://tourbuzzbd.com/wp-content/uploads/2023/08/Sajek-Valley-01.jpg',
];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="relative w-full  mx-auto h-[400px]">
        {/* Carousel Images */}
        <div className="overflow-hidden relative h-[400px] w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover h-[400px] rounded-xl"
              />
            </div>
          ))}
        </div>
  
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          ‹
        </button>
  
        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        >
          ›
        </button>
  
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-full h-[400px] rounded-full ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
              }`}
            ></button>
          ))}
        </div>
      </div>
    );
  };

export default Carousel;