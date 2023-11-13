import React from 'react';
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';
const Logo = () => {
      return <Link to={`/`}>
            <img className='hidden md:block shadow-sm rounded-md hover:shadow-md' src={logo} alt="logo" width='200' height='100' />
      </Link>
};

export default Logo;