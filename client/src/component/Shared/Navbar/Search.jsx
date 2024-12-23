import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search input

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm); // Pass the search term to the parent component
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <>
      <div className="my-10 border-2 border-green-800 rounded-xl">
        <div className="p-8  ">
          <div className="flex flex-row items-center justify-between font-mono">
            <div className="text-xl font-semibold px-6">
              Search Your Destination From Anywhere
            </div>
            <div className="hidden sm:block text-xl font-semibold px-6 border-x-[1px] flex-1 text-center">
              Any Place Or Location
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
              <input
                type="text"
                className="p-1 text-sm border rounded-full outline-none"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input
                onKeyDown={handleKeyPress} // Trigger search when Enter is pressed
              />
              <div
                className="transition text-lg duration-300 ease-in-out hover:scale-110 p-2 bg-green-800 rounded-full text-white cursor-pointer hover:bg-red-500"
                onClick={handleSearch} // Trigger search on button click
              >
                <BiSearch size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
