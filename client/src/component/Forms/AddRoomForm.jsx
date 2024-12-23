import React from "react";
import { DateRange } from "react-date-range";
import { TbFidgetSpinner } from "react-icons/tb";
import { categories } from "../Catagories/categoriesData";
import { RiImageAddFill } from "react-icons/ri";
const AddRoomForm = ({
  handleSubmit,
  dates,
  handleDates,
  loading,
  handleImageChange,
  uploadButtonText,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                name="location"
                id="location"
                type="text"
                placeholder="Location"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-sky-300 focus:outline-sky-500 rounded-md"
                name="category"
              >
                {categories.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              <DateRange
                onChange={handleDates}
                ranges={[dates]}
                rangeColors={["#87CEEB"]}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                required
              />
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(event) => {
                        handleImageChange(event.target.files[0]);
                      }}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-sky-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-sky-500">
                      {uploadButtonText}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                  name="total_guest"
                  id="guest"
                  type="number"
                  placeholder="Total guest"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="bedrooms" className="block text-gray-600">
                  Bedrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                  name="bedrooms"
                  id="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="bathrooms" className="block text-gray-600">
                  Bathrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                  name="bathrooms"
                  id="bathrooms"
                  type="number"
                  placeholder="Bathrooms"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:sky-300 w-full h-32 px-4 py-3 text-gray-800  border border-sky-300 focus:outline-sky-500 "
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="bathrooms"
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-text-gradient text-lg font-semibold font-sans"
            >
              Add At Least 4 Places Image Around Your Room
              <div className="flex gap-3 my-2">
                <RiImageAddFill />
                <RiImageAddFill />
                <RiImageAddFill />
                <RiImageAddFill />
              </div>
            </label>
            <div className="flex gap-2">
              <input
                className="pl-3  py-3 text-gray-800 border border-sky-500 focus:outline-sky-700 rounded-md "
                name="name1"
                id="name1"
                type="text"
                placeholder="Location Name One"
                required
              />

              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                name="image1"
                id="image1"
                type="text"
                placeholder="Image Location Link1"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                className="pl-3  py-3 text-gray-800 border border-sky-500 focus:outline-sky-700 rounded-md "
                name="name2"
                id="name2"
                type="text"
                placeholder="Location Name Two"
                required
              />

              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                name="image2"
                id="image2"
                type="text"
                placeholder="Image Location Link2"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                className="pl-3  py-3 text-gray-800 border border-sky-500 focus:outline-sky-700 rounded-md "
                name="name3"
                id="name3"
                type="text"
                placeholder="Location Name Tree"
                required
              />

              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                name="image3"
                id="image3"
                type="text"
                placeholder="Image Location Link3"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                className="pl-3  py-3 text-gray-800 border border-sky-500 focus:outline-sky-700 rounded-md "
                name="name4"
                id="name4"
                type="text"
                placeholder="Location Name Four"
                required
              />

              <input
                className="w-full px-4 py-3 text-gray-800 border border-sky-300 focus:outline-sky-500 rounded-md "
                name="image4"
                id="image4"
                type="text"
                placeholder="Image Location Link4"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-sky-500"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRoomForm;
