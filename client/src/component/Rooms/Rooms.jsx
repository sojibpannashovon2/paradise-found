import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "../Shared/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";
import { getAllRooms } from "../../Api/rooms";
import Search from "../Shared/Navbar/Search";

const Rooms = () => {
  const [rooms, setRooms] = useState([]); // State to store room data
  const [loading, setLoading] = useState(false); // Loading state
  const [params, setParams] = useSearchParams(); // Query parameters from URL
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  const category = params.get("category"); // Get category from query params

  // Fetch rooms data whenever category or searchQuery changes
  useEffect(() => {
    setLoading(true);
    getAllRooms(searchQuery) // Pass the search query to the API
      .then((data) => {
        if (category) {
          const filtered = data?.filter((room) => room?.category === category);
          setRooms(filtered);
        } else {
          setRooms(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [category, searchQuery]);

  // Function to handle search input from the Search component
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state
  };

  if (loading) {
    return <Loader />;
  }
  //console.log(rooms);
  return (
    <div>
      {/* Search Component */}
      <div className="my-10">
        <Search onSearch={handleSearch} />
      </div>

      {/* Room Cards */}
      {rooms && rooms.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {rooms.map((room, index) => (
            <Card room={room} key={index} />
          ))}
        </div>
      ) : (
        <div className="pt-12">
          <Heading
            title={`No rooms available for this category`}
            subtitle={`Try searching with a different keyword or category.`}
            center={true}
          />
        </div>
      )}
    </div>
  );
};

export default Rooms;
