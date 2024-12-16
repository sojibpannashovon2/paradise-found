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
    <div className=" p-10 w-full md:w-auto rounded-xl shadow-sm hover:shadow-md transition cursor-pointer hover:border-gradient-to-r hover:border-[3px] hover:from-blue-700 hover:to-green-700">
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl font-semibold px-6">
          Search Your Destnation From Anywhere
        </div>
        <div className="hidden sm:block text-xl font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any Place Or Locaton
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
            className="transition duration-300 ease-in-out hover:scale-110 p-2 bg-green-800 rounded-full text-white cursor-pointer hover:bg-red-500"
            onClick={handleSearch} // Trigger search on button click
          >
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
