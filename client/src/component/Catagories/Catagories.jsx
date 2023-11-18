import React from 'react';
import { categories } from './categoriesData';

const Catagories = () => {
      // console.log(categories);
      return (
            <>
                  <div className='pt-4 flex flex-row justify-between items-center overflow-x-auto '>
                        {categories?.map(category => {
                              return <p>{category?.label}</p>
                        })}

                  </div>
            </>

      );
};

export default Catagories;