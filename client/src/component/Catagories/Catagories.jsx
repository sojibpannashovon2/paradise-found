import React from 'react';
import { categories } from './categoriesData';
import CategoryBox from './CategoryBox';

const Catagories = () => {
      // console.log(categories);
      return (
            <>
                  <div className='pt-4 flex flex-row justify-between items-center overflow-x-auto '>
                        {categories?.map(category => {
                              return <CategoryBox label={category?.label} icon={category?.icon} key={category?.label} />
                        })}

                  </div>
            </>

      );
};

export default Catagories;