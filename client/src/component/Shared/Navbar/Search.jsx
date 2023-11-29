import { BiSearch } from 'react-icons/bi'

const Search = () => {
      return (
            <div className='border-[1px] w-full md:w-auto  rounded-full shadow-sm hover:shadow-md transition cursor-pointer p-1'>
                  <div className='flex flex-row items-center justify-between'>
                        <div className='text-sm font-semibold px-6'>Anywhere</div>
                        <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                              Any Week
                        </div>
                        <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                              <div className='hidden sm:block'>Add Guests</div>
                              <div className='p-1 bg-blue-500 rounded-full text-white'>
                                    <BiSearch size={12} />
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Search