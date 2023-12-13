import React from 'react';
import {Link} from 'react-router-dom'
const EmptyState = ({message, address, label}) => {
    return (
        <div className='flex flex-col justify-center items-center py-48 gap-4 bg-slate-200'>
            <p className='text-3xl font-bold'>{message}</p>
            <Link className='border-[1px] border-green-400 px-4 py-2 font-semibold hover:bg-green-300 rounded-md' to={address}>{label}</Link>
  
        </div>
    );
};

export default EmptyState;