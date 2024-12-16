const ScrollingImages = ({ roomData }) => {
  // Dynamically get the image links
  console.log(roomData);
  const images = [
    roomData.image1,
    roomData.image2,
    roomData.image3,
    roomData.image4,
  ];

  return (
    <div className="overflow-hidden relative w-full h-40">
      <div className="flex w-max animate-scroll">
        {images.map(
          (src, index) =>
            src && ( // Render only if the image source exists
              <img
                key={index}
                src={src}
                alt={`Room Image ${index + 1}`}
                className="w-40 h-40 object-cover mx-2 shadow-md shadow-green-800 rounded-lg"
              />
            )
        )}
        {/* Duplicate images for smooth infinite scroll */}
        {images.map(
          (src, index) =>
            src && (
              <img
                key={`duplicate-${index}`}
                src={src}
                alt={`Duplicate Room Image ${index + 1}`}
                className="w-40 h-40 object-cover mx-2 shadow-md shadow-green-800 rounded-lg"
              />
            )
        )}
      </div>
    </div>
  );
};

export default ScrollingImages;
